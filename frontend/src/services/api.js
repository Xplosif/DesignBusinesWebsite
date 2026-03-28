import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

// Set up axios interceptor to add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// AUTH SERVICE
// ============================================
export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        username,
        password
      });
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminUsername', response.data.username);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  }
};

// ============================================
// PRODUCTS SERVICE
// ============================================
export const productsService = {
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.inStock !== undefined) params.append('inStock', filters.inStock);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`${API}/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des produits' };
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du produit' };
    }
  },

  create: async (productData) => {
    try {
      const response = await axios.post(`${API}/products`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la création du produit' };
    }
  },

  update: async (id, productData) => {
    try {
      const response = await axios.put(`${API}/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour du produit' };
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression du produit' };
    }
  }
};

// ============================================
// CATEGORIES SERVICE
// ============================================
export const categoriesService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des catégories' };
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API}/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de la catégorie' };
    }
  },

  create: async (categoryData) => {
    try {
      const response = await axios.post(`${API}/categories`, categoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la création de la catégorie' };
    }
  },

  update: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API}/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour de la catégorie' };
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API}/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression de la catégorie' };
    }
  }
};

// ============================================
// CONTACT SERVICE
// ============================================
export const contactService = {
  submit: async (messageData) => {
    try {
      const response = await axios.post(`${API}/contact`, messageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'envoi du message' };
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API}/contact`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des messages' };
    }
  }
};

// ============================================
// COMPANY INFO (Static)
// ============================================
export const companyInfo = {
  name: 'Furniture Design Business',
  slogan: 'L\'élégance au service de votre intérieur',
  address: 'RDC, Ville de Beni, Commune MULEKERA, Quartier Matonge, Avenue Munganga n°08',
  phone: '+243 970 581 323',
  email: 'designbusiness44@gmail.com',
  ceo: {
    name: 'Patrick Mahamba',
    title: 'Fondateur & CEO',
    bio: 'Passionné par le design et l\'artisanat depuis plus de 15 ans, Patrick Mahamba a fondé Furniture Design Business avec la vision de rendre l\'élégance accessible à tous. Son expertise en ameublement et sa connaissance approfondie des tendances internationales font de lui un leader dans le domaine du mobilier et de la décoration en RDC.'
  },
  about: 'Furniture Design Business est une entreprise spécialisée dans la vente de meubles de qualité, le garnissage de fauteuils, et la décoration intérieure. Située à Beni en RDC, nous proposons une large gamme de produits allant des meubles sur mesure aux accessoires décoratifs. Notre engagement : offrir à nos clients des produits d\'exception et un service personnalisé.',
  services: [
    'Vente de meubles sur mesure',
    'Garnissage et réparation de fauteuils',
    'Installation de rideaux',
    'Service de nettoyage (tapis et canapés)',
    'Vente d\'accessoires déco',
    'Conseil en aménagement intérieur',
    'Livraison et installation'
  ],
  coordinates: {
    lat: 0.501504,
    lng: 29.474128
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=0.501504,29.474128'
};

export const testimonials = [
  {
    id: 1,
    name: 'Marie Kasongo',
    role: 'Cliente satisfaite',
    text: 'Service exceptionnel ! J\'ai acheté un salon complet et le garnissage est impeccable. Je recommande vivement !',
    rating: 5
  },
  {
    id: 2,
    name: 'Jean-Pierre Mumbere',
    role: 'Propriétaire d\'hôtel',
    text: 'Nous avons meublé tout notre hôtel avec Furniture Design Business. Qualité professionnelle et respect des délais.',
    rating: 5
  },
  {
    id: 3,
    name: 'Claudine Kahindo',
    role: 'Décoratrice',
    text: 'Un partenaire de confiance pour tous mes projets. Large choix et excellent rapport qualité-prix.',
    rating: 5
  }
];
