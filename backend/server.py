from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import List, Optional
from datetime import datetime

from models import (
    Admin, AdminLogin, Product, ProductCreate, ProductUpdate,
    Category, CategoryCreate, CategoryUpdate,
    ContactMessage, ContactMessageCreate
)
from auth import verify_password, get_password_hash, create_access_token
from middleware import verify_admin_token
from seed_data import initial_categories, initial_products

# Setup
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
admins_collection = db.admins
products_collection = db.products
categories_collection = db.categories
contact_messages_collection = db.contact_messages

# Create the main app
app = FastAPI(title="Furniture Design Business API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================
# STARTUP - SEED DATA
# ============================================
@app.on_event("startup")
async def startup_db():
    """Initialize database with seed data"""
    try:
        # Check if admin exists
        admin_exists = await admins_collection.find_one({"username": "patrickmahamba"})
        if not admin_exists:
            # Create default admin
            admin = Admin(
                username="patrickmahamba",
                password=get_password_hash("Design@Business2026")
            )
            await admins_collection.insert_one(admin.dict())
            logger.info("Default admin user created")
        
        # Check if categories exist
        categories_count = await categories_collection.count_documents({})
        if categories_count == 0:
            for cat_data in initial_categories:
                category = Category(**cat_data)
                await categories_collection.insert_one(category.dict())
            logger.info(f"Seeded {len(initial_categories)} categories")
        
        # Check if products exist
        products_count = await products_collection.count_documents({})
        if products_count == 0:
            for prod_data in initial_products:
                product = Product(**prod_data)
                await products_collection.insert_one(product.dict())
            logger.info(f"Seeded {len(initial_products)} products")
        
        logger.info("Database initialization complete")
    except Exception as e:
        logger.error(f"Error during startup: {e}")


# ============================================
# AUTHENTICATION ROUTES
# ============================================
@api_router.post("/auth/login")
async def login(credentials: AdminLogin):
    """Admin login"""
    try:
        # Find admin
        admin = await admins_collection.find_one({"username": credentials.username})
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Nom d'utilisateur ou mot de passe incorrect"
            )
        
        # Verify password
        if not verify_password(credentials.password, admin["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Nom d'utilisateur ou mot de passe incorrect"
            )
        
        # Create token
        access_token = create_access_token(data={"sub": admin["username"]})
        
        return {
            "success": True,
            "message": "Connexion réussie",
            "token": access_token,
            "username": admin["username"]
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la connexion"
        )


# ============================================
# PRODUCTS ROUTES
# ============================================
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    inStock: Optional[bool] = None,
    search: Optional[str] = None
):
    """Get all products with optional filters"""
    try:
        query = {}
        
        if category:
            query["category"] = category
        
        if inStock is not None:
            query["inStock"] = inStock
        
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}}
            ]
        
        products = await products_collection.find(query).to_list(1000)
        return [Product(**product) for product in products]
    except Exception as e:
        logger.error(f"Error fetching products: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération des produits"
        )


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    try:
        product = await products_collection.find_one({"id": product_id})
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produit non trouvé"
            )
        return Product(**product)
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching product: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération du produit"
        )


@api_router.post("/products", response_model=Product)
async def create_product(
    product_data: ProductCreate,
    _: dict = Depends(verify_admin_token)
):
    """Create a new product (admin only)"""
    try:
        product = Product(**product_data.dict())
        await products_collection.insert_one(product.dict())
        logger.info(f"Product created: {product.name}")
        return product
    except Exception as e:
        logger.error(f"Error creating product: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la création du produit"
        )


@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_data: ProductUpdate,
    _: dict = Depends(verify_admin_token)
):
    """Update a product (admin only)"""
    try:
        # Check if product exists
        existing_product = await products_collection.find_one({"id": product_id})
        if not existing_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produit non trouvé"
            )
        
        # Update only provided fields
        update_data = {k: v for k, v in product_data.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.utcnow()
        
        await products_collection.update_one(
            {"id": product_id},
            {"$set": update_data}
        )
        
        # Return updated product
        updated_product = await products_collection.find_one({"id": product_id})
        logger.info(f"Product updated: {product_id}")
        return Product(**updated_product)
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error updating product: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la mise à jour du produit"
        )


@api_router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    _: dict = Depends(verify_admin_token)
):
    """Delete a product (admin only)"""
    try:
        result = await products_collection.delete_one({"id": product_id})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produit non trouvé"
            )
        
        logger.info(f"Product deleted: {product_id}")
        return {"success": True, "message": "Produit supprimé avec succès"}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error deleting product: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la suppression du produit"
        )


# ============================================
# CATEGORIES ROUTES
# ============================================
@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    """Get all categories"""
    try:
        categories = await categories_collection.find().to_list(100)
        return [Category(**category) for category in categories]
    except Exception as e:
        logger.error(f"Error fetching categories: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération des catégories"
        )


@api_router.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: str):
    """Get a single category by ID"""
    try:
        category = await categories_collection.find_one({"id": category_id})
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Catégorie non trouvée"
            )
        return Category(**category)
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching category: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération de la catégorie"
        )


@api_router.post("/categories", response_model=Category)
async def create_category(
    category_data: CategoryCreate,
    _: dict = Depends(verify_admin_token)
):
    """Create a new category (admin only)"""
    try:
        # Check if category ID already exists
        existing = await categories_collection.find_one({"id": category_data.id})
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Une catégorie avec cet ID existe déjà"
            )
        
        category = Category(**category_data.dict())
        await categories_collection.insert_one(category.dict())
        logger.info(f"Category created: {category.name}")
        return category
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error creating category: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la création de la catégorie"
        )


@api_router.put("/categories/{category_id}", response_model=Category)
async def update_category(
    category_id: str,
    category_data: CategoryUpdate,
    _: dict = Depends(verify_admin_token)
):
    """Update a category (admin only)"""
    try:
        # Check if category exists
        existing_category = await categories_collection.find_one({"id": category_id})
        if not existing_category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Catégorie non trouvée"
            )
        
        # Update only provided fields
        update_data = {k: v for k, v in category_data.dict().items() if v is not None}
        
        await categories_collection.update_one(
            {"id": category_id},
            {"$set": update_data}
        )
        
        # Return updated category
        updated_category = await categories_collection.find_one({"id": category_id})
        logger.info(f"Category updated: {category_id}")
        return Category(**updated_category)
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error updating category: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la mise à jour de la catégorie"
        )


@api_router.delete("/categories/{category_id}")
async def delete_category(
    category_id: str,
    _: dict = Depends(verify_admin_token)
):
    """Delete a category (admin only)"""
    try:
        result = await categories_collection.delete_one({"id": category_id})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Catégorie non trouvée"
            )
        
        logger.info(f"Category deleted: {category_id}")
        return {"success": True, "message": "Catégorie supprimée avec succès"}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error deleting category: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la suppression de la catégorie"
        )


# ============================================
# CONTACT MESSAGES ROUTES
# ============================================
@api_router.post("/contact")
async def submit_contact_form(message_data: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        message = ContactMessage(**message_data.dict())
        await contact_messages_collection.insert_one(message.dict())
        logger.info(f"Contact message received from: {message.email}")
        return {
            "success": True,
            "message": "Message envoyé avec succès ! Nous vous contacterons bientôt."
        }
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de l'envoi du message"
        )


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(_: dict = Depends(verify_admin_token)):
    """Get all contact messages (admin only)"""
    try:
        messages = await contact_messages_collection.find().sort("createdAt", -1).to_list(1000)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération des messages"
        )


# ============================================
# HEALTH CHECK
# ============================================
@api_router.get("/")
async def root():
    return {"message": "Furniture Design Business API - Running"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}


# Include the router in the main app
app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
