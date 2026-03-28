import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { companyInfo, testimonials, categoriesService, productsService } from '../services/api';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          categoriesService.getAll(),
          productsService.getAll({ inStock: true })
        ]);
        console.log('HomePage - Products loaded:', productsData.length);
        console.log('HomePage - Categories loaded:', categoriesData.length);
        setCategories(categoriesData);
        setFeaturedProducts(productsData.slice(0, 4));
      } catch (error) {
        console.error('HomePage - Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section relative bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFFAF5] py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="text-[#D4AF37]" size={24} />
                <span className="text-[#8B4513] font-semibold uppercase tracking-wide text-sm">
                  Bienvenue chez
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#8B4513]">Furniture Design</span>
                <br />
                <span className="text-[#A0522D]">Business</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light italic">
                {companyInfo.slogan}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
                Découvrez notre collection exclusive de meubles élégants, services de garnissage premium et accessoires de décoration qui transformeront votre intérieur.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalogue/all">
                  <Button className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl">
                    Explorer le Catalogue
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37] hover:text-white px-8 py-6 text-lg">
                    Nous Contacter
                  </Button>
                </Link>
              </div>
            </div>
            <div className="slide-in-right">
              <img 
                src="https://customer-assets.emergentagent.com/job_db14b7bd-ed3f-4182-bc59-0985af6ad221/artifacts/fkf7zzsl_1764530562322.jpg" 
                alt="Furniture Design Business" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-[#8B4513]">Catégories</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/catalogue/${category.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="overflow-hidden card-hover border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-br from-white to-[#FFFAF5]">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#8B4513] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-white to-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Produits <span className="text-[#8B4513]">en Vedette</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full"></div>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/produit/${product.id}`}>
                <Card className="overflow-hidden card-hover h-full border-2 border-transparent hover:border-[#D4AF37] transition-all">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.inStock && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        En Stock
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-[#8B4513]">${product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/catalogue/all">
              <Button className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white px-8 py-3">
                Voir Tous les Produits
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-[#8B4513]">Services</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.services.map((service, index) => (
              <Card key={index} className="p-6 card-hover border-l-4 border-[#D4AF37]">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] flex items-center justify-center flex-shrink-0">
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{service}</h3>
                    <p className="text-sm text-gray-600">Service professionnel et personnalisé</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos <span className="text-[#8B4513]">clients</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 card-hover">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-[#FFD700] fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre intérieur ?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-[#1a1a1a] px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl">
              Contactez-nous Maintenant
              <ArrowRight className="ml-2" size={22} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;