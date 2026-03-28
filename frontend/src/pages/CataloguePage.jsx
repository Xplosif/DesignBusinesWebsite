import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { productsService, categoriesService } from '../services/api';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const CataloguePage = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStock, setFilterStock] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentCategory = categories.find(c => c.id === category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productsService.getAll(),
          categoriesService.getAll()
        ]);
        console.log('CataloguePage - Products loaded:', productsData.length);
        console.log('CataloguePage - Categories loaded:', categoriesData.length);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('CataloguePage - Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by stock
    if (filterStock === 'inStock') {
      filtered = filtered.filter(p => p.inStock);
    } else if (filterStock === 'outOfStock') {
      filtered = filtered.filter(p => !p.inStock);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

    console.log('CataloguePage - Filtered products:', filtered.length);
    return filtered;
  }, [products, category, searchTerm, sortBy, filterStock]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF8F0]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {currentCategory ? currentCategory.name : 'Tous les Produits'}
          </h1>
          {currentCategory && (
            <p className="text-xl text-white/90">{currentCategory.description}</p>
          )}
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3">
            <Link to="/catalogue/all">
              <Button
                variant={!category || category === 'all' ? 'default' : 'outline'}
                className={!category || category === 'all' ? 'bg-[#8B4513] hover:bg-[#A0522D]' : ''}
              >
                Tous
              </Button>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} to={`/catalogue/${cat.id}`}>
                <Button
                  variant={category === cat.id ? 'default' : 'outline'}
                  className={category === cat.id ? 'bg-[#8B4513] hover:bg-[#A0522D]' : ''}
                >
                  {cat.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom (A-Z)</SelectItem>
              <SelectItem value="price-asc">Prix (Croissant)</SelectItem>
              <SelectItem value="price-desc">Prix (Décroissant)</SelectItem>
            </SelectContent>
          </Select>

          {/* Stock Filter */}
          <Select value={filterStock} onValueChange={setFilterStock}>
            <SelectTrigger>
              <SelectValue placeholder="Disponibilité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les produits</SelectItem>
              <SelectItem value="inStock">En stock</SelectItem>
              <SelectItem value="outOfStock">Épuisé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-[#8B4513]">{filteredProducts.length}</span> produit(s) trouvé(s)
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/produit/${product.id}`}>
                <Card className="overflow-hidden card-hover h-full border-2 border-transparent hover:border-[#D4AF37] transition-all">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-3 right-3 ${
                        product.inStock
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {product.inStock ? 'En Stock' : 'Épuisé'}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-[#8B4513]">${product.price}</p>
                      {product.inStock && (
                        <p className="text-sm text-gray-500">{product.stockQuantity} disponible(s)</p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CataloguePage;