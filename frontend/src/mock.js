// Mock data for Furniture Design Business

export const categories = [
  {
    id: 'meubles',
    name: 'Meubles',
    description: 'Tables, chaises, armoires et plus',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
  },
  {
    id: 'fauteuils',
    name: 'Fauteuils & Garnissage',
    description: 'Fauteuils confortables et service de garnissage',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
  },
  {
    id: 'rideaux',
    name: 'Rideaux & Fixation',
    description: 'Rideaux élégants et service de fixation',
    image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80'
  },
  {
    id: 'tapis',
    name: 'Tapis',
    description: 'Tapis de qualité pour votre intérieur',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'
  },
  {
    id: 'accessoires',
    name: 'Accessoires Déco',
    description: 'Velours, pieds de fauteuils et plus',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
  }
];

export const products = [
  {
    id: '1',
    name: 'Canapé d\'angle en cuir',
    category: 'fauteuils',
    price: 850,
    description: 'Canapé d\'angle luxueux en cuir véritable, confortable et élégant. Parfait pour votre salon.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 5
  },
  {
    id: '2',
    name: 'Table à manger en bois massif',
    category: 'meubles',
    price: 650,
    description: 'Table élégante en bois massif pour 6 personnes. Design moderne et robuste.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 3
  },
  {
    id: '3',
    name: 'Rideaux velours dorés',
    category: 'rideaux',
    price: 180,
    description: 'Rideaux en velours de qualité supérieure avec finitions dorées. Installation incluse.',
    images: [
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 12
  },
  {
    id: '4',
    name: 'Tapis persan moderne',
    category: 'tapis',
    price: 280,
    description: 'Tapis persan au design moderne avec motifs élégants. Dimensions: 200x300cm.',
    images: [
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 8
  },
  {
    id: '5',
    name: 'Fauteuil relax garnissage premium',
    category: 'fauteuils',
    price: 420,
    description: 'Fauteuil relax avec garnissage premium. Service de regarnissage disponible.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 6
  },
  {
    id: '6',
    name: 'Ensemble de coussins décoratifs',
    category: 'accessoires',
    price: 75,
    description: 'Set de 4 coussins décoratifs en velours avec motifs dorés.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 20
  },
  {
    id: '7',
    name: 'Armoire en bois sculpté',
    category: 'meubles',
    price: 950,
    description: 'Armoire artisanale en bois sculpté avec finitions dorées. Pièce unique.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 2
  },
  {
    id: '8',
    name: 'Pieds de fauteuils dorés',
    category: 'accessoires',
    price: 45,
    description: 'Set de 4 pieds de fauteuils en métal doré. Installation facile.',
    images: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '9',
    name: 'Tringles à rideaux luxe',
    category: 'rideaux',
    price: 120,
    description: 'Tringles à rideaux en métal avec finitions dorées. Installation professionnelle.',
    images: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 15
  },
  {
    id: '10',
    name: 'Canapé 3 places velours',
    category: 'fauteuils',
    price: 720,
    description: 'Canapé 3 places en velours marron avec pieds dorés. Élégance garantie.',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    inStock: false,
    stockQuantity: 0
  },
  {
    id: '11',
    name: 'Console d\'entrée design',
    category: 'meubles',
    price: 380,
    description: 'Console d\'entrée au design moderne avec tiroirs. Finitions de qualité.',
    images: [
      'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 4
  },
  {
    id: '12',
    name: 'Tapis shaggy luxe',
    category: 'tapis',
    price: 195,
    description: 'Tapis shaggy doux et confortable. Coloris beige et marron.',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80'
    ],
    inStock: true,
    stockQuantity: 10
  }
];

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