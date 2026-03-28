import { useState, useEffect } from 'react';
import { Package, FolderTree, DollarSign, TrendingUp } from 'lucide-react';
import { productsService, categoriesService } from '../../services/api';
import { Card } from '../../components/ui/card';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsService.getAll(),
          categoriesService.getAll()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const totalCategories = categories.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);

  const stats = [
    {
      title: 'Total Produits',
      value: totalProducts,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'En Stock',
      value: inStockProducts,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Catégories',
      value: totalCategories,
      icon: FolderTree,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Valeur Stock',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-[#D4AF37] to-[#FFD700]',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700'
    }
  ];

  const lowStockProducts = products.filter(p => p.inStock && p.stockQuantity < 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
        <p className="text-gray-600">Bienvenue dans votre panneau d'administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={stat.textColor} size={28} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="p-6 mb-8 border-l-4 border-orange-500">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Alerte Stock Faible</h2>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold">
                  {product.stockQuantity} restant(s)
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Products */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Produits Récents</h2>
        <div className="space-y-3">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                product.inStock
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? 'En Stock' : 'Épuisé'}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;