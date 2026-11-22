import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, ImagePlus, X } from 'lucide-react';
import { productsService, categoriesService, uploadService } from '../../services/api';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stockQuantity: '',
    inStock: true
  });
  const [imageFiles, setImageFiles] = useState([]); // [{ file, preview }]
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsService.getAll(),
        categoriesService.getAll()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        stockQuantity: product.stockQuantity.toString(),
        inStock: product.inStock
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        stockQuantity: '',
        inStock: true
      });
    }
    setImageFiles([]);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    imageFiles.forEach((img) => URL.revokeObjectURL(img.preview));
    setIsDialogOpen(false);
    setEditingProduct(null);
    setImageFiles([]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const images = files.filter((f) => f.type.startsWith('image/'));
    if (images.length !== files.length) {
      toast.error('Seuls les fichiers image sont acceptés');
    }
    const newImages = images.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImageFiles((prev) => [...prev, ...newImages]);
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImageFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length < 3) {
      toast.error('Veuillez sélectionner au minimum 3 images');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const imageUrls = await uploadService.uploadImages(imageFiles.map((img) => img.file));

      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        images: imageUrls,
        stockQuantity: parseInt(formData.stockQuantity),
        inStock: formData.inStock
      };

      if (editingProduct) {
        await productsService.update(editingProduct.id, productData);
        toast.success('Produit modifié avec succès');
      } else {
        await productsService.create(productData);
        toast.success('Produit ajouté avec succès');
      }

      handleCloseDialog();
      await fetchData(); // Refresh data
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.detail || 'Erreur lors de l\'enregistrement du produit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await productsService.delete(id);
        toast.success('Produit supprimé avec succès');
        await fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error(error.detail || 'Erreur lors de la suppression du produit');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Produits</h1>
          <p className="text-gray-600">{products.length} produit(s) au total</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white"
        >
          <Plus className="mr-2" size={20} />
          Ajouter un Produit
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
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
      </div>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Catégorie</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Prix</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${product.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700">{product.stockQuantity}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'}>
                      {product.inStock ? 'En Stock' : 'Épuisé'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nom du produit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (USD) *
                </label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité en stock *
                </label>
                <Input
                  required
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description du produit"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images du produit * (minimum 3)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors"
                >
                  <ImagePlus size={32} className="mb-2" />
                  <span className="text-sm font-medium">Sélectionner des images depuis votre appareil</span>
                  <span className="text-xs text-gray-400 mt-1">
                    {imageFiles.length} image(s) sélectionnée(s) — minimum 3 requis
                  </span>
                </button>

                {imageFiles.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {imageFiles.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Aperçu ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-[#8B4513] border-gray-300 rounded focus:ring-[#8B4513]"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  Produit en stock
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white"
              >
                {isSubmitting ? 'Enregistrement...' : (editingProduct ? 'Modifier' : 'Ajouter')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;