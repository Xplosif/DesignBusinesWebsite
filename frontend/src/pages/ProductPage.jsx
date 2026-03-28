import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Check, X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { companyInfo, productsService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await productsService.getById(id);
        setProduct(productData);

        // Fetch related products
        const allProducts = await productsService.getAll({ category: productData.category });
        const related = allProducts.filter(p => p.id !== id).slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
        <Link to="/catalogue/all">
          <Button className="bg-[#8B4513] hover:bg-[#A0522D]">Retour au catalogue</Button>
        </Link>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par le produit: ${product.name} (Prix: $${product.price})`
    );
    window.open(
      `https://wa.me/${companyInfo.phone.replace(/\s+/g, '')}?text=${message}`,
      '_blank'
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF8F0]">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#8B4513] transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour
          </button>
        </div>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-[#D4AF37]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'} >
              {product.inStock ? 'En Stock' : 'Épuisé'}
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">{product.name}</h1>
            <div className="flex items-baseline space-x-3 mb-6">
              <p className="text-5xl font-bold text-[#8B4513]">${product.price}</p>
              <span className="text-gray-500">USD</span>
            </div>

            {product.inStock && (
              <div className="flex items-center space-x-2 mb-6">
                <Check className="text-green-500" size={20} />
                <span className="text-gray-700">
                  <span className="font-semibold">{product.stockQuantity}</span> unité(s) disponible(s)
                </span>
              </div>
            )}

            <div className="border-t border-b py-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleWhatsAppContact}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 text-lg font-semibold"
              >
                <MessageCircle className="mr-2" size={24} />
                Discuter sur WhatsApp
              </Button>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white py-6 text-lg"
                >
                  Formulaire de Contact
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <Card className="mt-6 p-4 bg-gradient-to-br from-[#FFF8F0] to-white">
              <h3 className="font-semibold text-gray-900 mb-3">Besoin d'aide ?</h3>
              <p className="text-sm text-gray-600 mb-2">
                Téléphone : <a href={`tel:${companyInfo.phone}`} className="text-[#8B4513] hover:underline">{companyInfo.phone}</a>
              </p>
              <p className="text-sm text-gray-600">
                Email : <a href={`mailto:${companyInfo.email}`} className="text-[#8B4513] hover:underline">{companyInfo.email}</a>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Produits <span className="text-[#8B4513]">Similaires</span>
          </h2>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/produit/${relatedProduct.id}`}>
                <Card className="overflow-hidden card-hover h-full border-2 border-transparent hover:border-[#D4AF37] transition-all">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        relatedProduct.inStock ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {relatedProduct.inStock ? 'En Stock' : 'Épuisé'}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-2xl font-bold text-[#8B4513]">${relatedProduct.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;