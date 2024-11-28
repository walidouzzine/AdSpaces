export const translations = {
  fr: {
    common: {
      search: 'Rechercher',
      login: 'Se connecter',
      register: 'S\'inscrire',
      logout: 'Se déconnecter',
      dashboard: 'Tableau de bord',
      settings: 'Paramètres',
      notifications: 'Notifications',
      viewDetails: 'Voir les détails',
      addNew: 'Ajouter',
      save: 'Enregistrer',
      cancel: 'Annuler',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      loading: 'Chargement...',
      brandName: 'AdSpace',
      french: 'Français',
      english: 'Anglais',
      myBoard: 'Mon Tableau',
      myAdSpaces: 'Mes Espaces Publicitaires',
      addAdSpace: 'Ajouter un Espace Publicitaire',
      noAdSpacesFound: 'Aucun espace publicitaire trouvé',
      errorFetchingAdSpaces: 'Erreur lors de la récupération des espaces publicitaires',
      errorCreatingAdSpace: 'Erreur lors de la création de l\'espace publicitaire',
      adSpaceCreated: 'Espace publicitaire créé avec succès',
      error: 'Erreur',
      success: 'Succès',
      delete: 'Supprimer',
      edit: 'Modifier',
      status: 'Statut',
      available: 'Disponible',
      booked: 'Réservé',
      unavailable: 'Indisponible',
      role: {
        client: 'Client',
        owner: 'Propriétaire',
        admin: 'Administrateur'
      }
    },
    nav: {
      spaces: 'Espaces',
      about: 'À propos',
    },
    auth: {
      signIn: {
        title: 'Connectez-vous à votre compte',
        button: 'Se connecter',
        loading: 'Connexion en cours...',
        noAccount: 'Pas de compte ? Inscrivez-vous',
      },
      signUp: {
        title: 'Créez votre compte',
        button: 'S\'inscrire',
        loading: 'Création du compte...',
        haveAccount: 'Déjà un compte ? Connectez-vous',
      },
    },
    home: {
      hero: {
        title: 'Trouvez Votre Espace',
        highlight: 'Publicitaire Parfait',
        subtitle: 'Découvrez et réservez des emplacements publicitaires premium. Des panneaux d\'affichage aux écrans numériques, augmentez la visibilité de votre marque.',
        cta: {
          primary: 'Explorer les espaces',
          secondary: 'En savoir plus',
        },
      },
      features: {
        title: 'Pourquoi Nous Choisir',
        subtitle: 'Tout ce dont vous avez besoin pour maximiser votre impact publicitaire et atteindre votre public cible efficacement.',
        items: [
          {
            title: 'Recherche Intelligente',
            description: 'Trouvez l\'espace publicitaire parfait avec des filtres avancés et une recherche basée sur la localisation.',
          },
          {
            title: 'Réservation en Temps Réel',
            description: 'Vérifiez la disponibilité et réservez des espaces instantanément avec notre système de calendrier en direct.',
          },
          {
            title: 'Paiements Sécurisés',
            description: 'Traitez les paiements en toute sécurité avec notre passerelle de paiement de confiance.',
          },
        ],
      },
      discover: {
        title: 'Découvrez les Espaces Près de Chez Vous',
        subtitle: 'Parcourez les espaces publicitaires disponibles dans votre région et trouvez l\'emplacement parfait pour votre prochaine campagne.',
      },
      welcome: {
        title: 'Bienvenue sur AdSpace',
        subtitle: 'Choisissez votre chemin pour commencer',
        findAdSpace: 'Trouver un Espace Publicitaire',
        findAdSpaceDesc: 'Parcourez les espaces publicitaires disponibles et trouvez l\'endroit parfait pour votre campagne',
        proposeAdSpace: 'Proposer un Espace Publicitaire',
        proposeAdSpaceDesc: 'Listez votre espace publicitaire et connectez-vous avec les annonceurs potentiels',
      },
    },
    spaces: {
      title: 'Espaces Publicitaires',
      searchPlaceholder: 'Rechercher par lieu ou mots-clés...',
      viewMap: 'Trouver sur la carte',
      mapView: 'Vue de la carte',
      filters: {
        all: 'Tous les types',
        billboard: 'Panneaux d\'affichage',
        digital: 'Affichages numériques',
        transit: 'Transport',
        street: 'Mobilier urbain',
      },
      moreFilters: 'Plus de filtres',
      per: 'par',
    },
    dashboard: {
      welcome: 'Bienvenue ! Voici ce qui se passe.',
      stats: {
        views: 'Vues Totales',
        bookings: 'Réservations Totales',
        revenue: 'Revenus',
        clients: 'Clients Actifs',
      },
      performance: {
        title: 'Aperçu des Performances',
        metrics: {
          views: 'Vues',
          clicks: 'Clics',
          bookings: 'Réservations',
        },
      },
      listings: {
        title: 'Annonces Actives',
        add: 'Ajouter une Annonce',
        status: 'Statut',
        active: 'Actif',
      },
      metrics: {
        views: 'Vues',
        clicks: 'Clics',
        bookings: 'Réservations'
      }
    },
    adSpaceForm: {
      title: 'Ajouter un Nouvel Espace Publicitaire',
      basicInformation: 'Informations de Base',
      titleField: 'Titre',
      description: 'Description',
      type: 'Type',
      types: {
        billboard: 'Panneau d\'affichage',
        digital: 'Numérique',
        transit: 'Transport',
        street: 'Rue'
      },
      location: 'Emplacement',
      address: 'Adresse',
      coordinates: 'Coordonnées',
      latitude: 'Latitude',
      longitude: 'Longitude',
      dimensions: 'Dimensions',
      width: 'Largeur',
      height: 'Hauteur',
      unit: 'Unité',
      price: 'Prix',
      amount: 'Montant',
      currency: 'Devise',
      period: 'Période',
      periods: {
        day: 'Jour',
        week: 'Semaine',
        month: 'Mois'
      },
      submit: 'Créer l\'Espace Publicitaire',
      close: 'Fermer',
      validation: {
        required: 'Ce champ est requis',
        invalidEmail: 'Adresse email invalide',
        minLength: 'Minimum {{count}} caractères requis',
        maxLength: 'Maximum {{count}} caractères autorisés',
        invalidPrice: 'Prix invalide',
        invalidCoordinates: 'Coordonnées invalides'
      },
      status: {
        available: 'Disponible',
        booked: 'Réservé',
        maintenance: 'En maintenance'
      }
    },
    errors: {
      notFound: {
        title: 'Page non trouvée',
        message: 'Désolé, la page que vous recherchez n\'existe pas.',
        backHome: 'Retour à l\'accueil'
      },
      passwordMatch: 'Les mots de passe ne correspondent pas',
      invalidCredentials: 'Email ou mot de passe invalide',
      requiredField: 'Ce champ est requis'
    }
  },
  en: {
    common: {
      search: 'Search',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      settings: 'Settings',
      notifications: 'Notifications',
      viewDetails: 'View Details',
      addNew: 'Add New',
      save: 'Save',
      cancel: 'Cancel',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loading: 'Loading...',
      brandName: 'AdSpace',
      french: 'French',
      english: 'English',
      myBoard: 'My Board',
      myAdSpaces: 'My Ad Spaces',
      addAdSpace: 'Add Ad Space',
      noAdSpacesFound: 'No ad spaces found',
      errorFetchingAdSpaces: 'Error fetching ad spaces',
      errorCreatingAdSpace: 'Error creating ad space',
      adSpaceCreated: 'Ad space created successfully',
      error: 'Error',
      success: 'Success',
      delete: 'Delete',
      edit: 'Edit',
      status: 'Status',
      available: 'Available',
      booked: 'Booked',
      unavailable: 'Unavailable',
      role: {
        client: 'Client',
        owner: 'Owner',
        admin: 'Administrator'
      }
    },
    nav: {
      spaces: 'Spaces',
      about: 'About',
    },
    auth: {
      signIn: {
        title: 'Sign in to your account',
        button: 'Sign in',
        loading: 'Signing in...',
        noAccount: 'Don\'t have an account? Sign up',
      },
      signUp: {
        title: 'Create your account',
        button: 'Sign up',
        loading: 'Creating account...',
        haveAccount: 'Already have an account? Sign in',
      },
    },
    home: {
      hero: {
        title: 'Find Your Perfect',
        highlight: 'Advertising Space',
        subtitle: 'Discover and book premium advertising locations in prime spots. From billboards to digital displays, elevate your brand visibility.',
        cta: {
          primary: 'Explore Spaces',
          secondary: 'Learn More',
        },
      },
      features: {
        title: 'Why Choose Us',
        subtitle: 'Everything you need to maximize your advertising impact and reach your target audience effectively.',
        items: [
          {
            title: 'Smart Search',
            description: 'Find the perfect advertising space with advanced filters and location-based search.',
          },
          {
            title: 'Real-time Booking',
            description: 'Check availability and book spaces instantly with our live calendar system.',
          },
          {
            title: 'Secure Payments',
            description: 'Process payments securely with our trusted payment gateway integration.',
          },
        ],
      },
      discover: {
        title: 'Discover Spaces Near You',
        subtitle: 'Browse available advertising spaces in your area and find the perfect spot for your next campaign.',
      },
      welcome: {
        title: 'Welcome to AdSpace',
        subtitle: 'Choose your path to get started',
        findAdSpace: 'Find an AdSpace',
        findAdSpaceDesc: 'Browse available advertising spaces and find the perfect spot for your campaign',
        proposeAdSpace: 'Propose an AdSpace',
        proposeAdSpaceDesc: 'List your advertising space and connect with potential advertisers',
      },
    },
    spaces: {
      title: 'Advertising Spaces',
      searchPlaceholder: 'Search by location or keywords...',
      viewMap: 'Find in the Map',
      mapView: 'Map View',
      filters: {
        all: 'All Types',
        billboard: 'Billboards',
        digital: 'Digital Displays',
        transit: 'Transit',
        street: 'Street Furniture',
      },
      moreFilters: 'More Filters',
      per: 'per',
    },
    dashboard: {
      welcome: 'Welcome back! Here\'s what\'s happening.',
      stats: {
        views: 'Total Views',
        bookings: 'Total Bookings',
        revenue: 'Revenue',
        clients: 'Active Clients',
      },
      performance: {
        title: 'Performance Overview',
        metrics: {
          views: 'Views',
          clicks: 'Clicks',
          bookings: 'Bookings',
        },
      },
      listings: {
        title: 'Active Listings',
        add: 'Add New Listing',
        status: 'Status',
        active: 'Active',
      },
      metrics: {
        views: 'Views',
        clicks: 'Clicks',
        bookings: 'Bookings'
      }
    },
    adSpaceForm: {
      title: 'Add New Ad Space',
      basicInformation: 'Basic Information',
      titleField: 'Title',
      description: 'Description',
      type: 'Type',
      types: {
        billboard: 'Billboard',
        digital: 'Digital',
        transit: 'Transit',
        street: 'Street'
      },
      location: 'Location',
      address: 'Address',
      coordinates: 'Coordinates',
      latitude: 'Latitude',
      longitude: 'Longitude',
      dimensions: 'Dimensions',
      width: 'Width',
      height: 'Height',
      unit: 'Unit',
      price: 'Price',
      amount: 'Amount',
      currency: 'Currency',
      period: 'Period',
      periods: {
        day: 'Day',
        week: 'Week',
        month: 'Month'
      },
      submit: 'Create Ad Space',
      close: 'Close',
      validation: {
        required: 'This field is required',
        invalidEmail: 'Invalid email address',
        minLength: 'Minimum {{count}} characters required',
        maxLength: 'Maximum {{count}} characters allowed',
        invalidPrice: 'Invalid price',
        invalidCoordinates: 'Invalid coordinates'
      },
      status: {
        available: 'Available',
        booked: 'Booked',
        maintenance: 'Under Maintenance'
      }
    },
    errors: {
      notFound: {
        title: 'Page Not Found',
        message: 'Sorry, the page you are looking for does not exist.',
        backHome: 'Back to Home'
      },
      passwordMatch: 'Passwords do not match',
      invalidCredentials: 'Invalid email or password',
      requiredField: 'This field is required'
    }
  }
};
