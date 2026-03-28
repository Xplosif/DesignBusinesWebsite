# Initial seed data for categories and admin user

initial_categories = [
    {
        'id': 'meubles',
        'name': 'Meubles',
        'description': 'Tables, chaises, armoires et plus',
        'image': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    },
    {
        'id': 'fauteuils',
        'name': 'Fauteuils & Garnissage',
        'description': 'Fauteuils confortables et service de garnissage',
        'image': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    },
    {
        'id': 'rideaux',
        'name': 'Rideaux & Fixation',
        'description': 'Rideaux élégants et service de fixation',
        'image': 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80'
    },
    {
        'id': 'tapis',
        'name': 'Tapis',
        'description': 'Tapis de qualité pour votre intérieur',
        'image': 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'
    },
    {
        'id': 'accessoires',
        'name': 'Accessoires Déco',
        'description': 'Velours, pieds de fauteuils et plus',
        'image': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
    }
]

initial_products = [
    {
        'name': 'Canapé d\'angle en cuir',
        'category': 'fauteuils',
        'price': 850,
        'description': 'Canapé d\'angle luxueux en cuir véritable, confortable et élégant. Parfait pour votre salon.',
        'images': [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
            'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80'
        ],
        'inStock': True,
        'stockQuantity': 5
    },
    {
        'name': 'Table à manger en bois massif',
        'category': 'meubles',
        'price': 650,
        'description': 'Table élégante en bois massif pour 6 personnes. Design moderne et robuste.',
        'images': [
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
        ],
        'inStock': True,
        'stockQuantity': 3
    },
    {
        'name': 'Rideaux velours dorés',
        'category': 'rideaux',
        'price': 180,
        'description': 'Rideaux en velours de qualité supérieure avec finitions dorées. Installation incluse.',
        'images': [
            'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80'
        ],
        'inStock': True,
        'stockQuantity': 12
    },
    {
        'name': 'Tapis persan moderne',
        'category': 'tapis',
        'price': 280,
        'description': 'Tapis persan au design moderne avec motifs élégants. Dimensions: 200x300cm.',
        'images': [
            'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80'
        ],
        'inStock': True,
        'stockQuantity': 8
    },
    {
        'name': 'Fauteuil relax garnissage premium',
        'category': 'fauteuils',
        'price': 420,
        'description': 'Fauteuil relax avec garnissage premium. Service de regarnissage disponible.',
        'images': [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
        ],
        'inStock': True,
        'stockQuantity': 6
    },
    {
        'name': 'Ensemble de coussins décoratifs',
        'category': 'accessoires',
        'price': 75,
        'description': 'Set de 4 coussins décoratifs en velours avec motifs dorés.',
        'images': [
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
        ],
        'inStock': True,
        'stockQuantity': 20
    }
]