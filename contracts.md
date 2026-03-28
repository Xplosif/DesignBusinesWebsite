# Furniture Design Business - API Contracts

## Backend Implementation Plan

### 1. Database Models (MongoDB)

#### Admin Model
- username: string (unique)
- password: string (hashed with bcrypt)
- createdAt: datetime

#### Product Model
- name: string
- category: string (reference to category id)
- price: number
- description: string
- images: array of strings (URLs)
- stockQuantity: number
- inStock: boolean
- createdAt: datetime
- updatedAt: datetime

#### Category Model
- id: string (unique)
- name: string
- description: string
- image: string (URL)
- createdAt: datetime

#### ContactMessage Model
- name: string
- email: string
- phone: string (optional)
- subject: string
- message: string
- createdAt: datetime

### 2. API Endpoints

#### Authentication
- POST /api/auth/login - Admin login
  - Body: { username, password }
  - Returns: { success, message, token }

#### Products
- GET /api/products - Get all products (with optional filters)
  - Query params: category, inStock, search
- GET /api/products/:id - Get single product
- POST /api/products - Create product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

#### Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get single category
- POST /api/categories - Create category (admin only)
- PUT /api/categories/:id - Update category (admin only)
- DELETE /api/categories/:id - Delete category (admin only)

#### Contact Messages
- POST /api/contact - Submit contact form
  - Body: { name, email, phone, subject, message }
- GET /api/contact - Get all messages (admin only)

### 3. Frontend Integration Changes

#### Remove Mock Data
- Remove imports from mock.js in all pages
- Replace with API calls using axios

#### API Service Layer
Create `/app/frontend/src/services/api.js`:
- productService: CRUD operations for products
- categoryService: CRUD operations for categories
- authService: Login/logout
- contactService: Submit contact form

#### Admin Authentication
- Store JWT token in localStorage
- Add token to all admin API requests
- Implement token validation on protected routes

### 4. Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected admin routes
- Input validation
- CORS configuration

### 5. Backend Implementation Steps
1. Create database models
2. Implement authentication system
3. Create API routes for products
4. Create API routes for categories
5. Create contact form endpoint
6. Add middleware for authentication
7. Seed initial admin user

### 6. Frontend Integration Steps
1. Create API service layer
2. Replace mock data with API calls in all pages
3. Update admin pages to use real CRUD operations
4. Update contact form to submit to backend
5. Add loading states and error handling
