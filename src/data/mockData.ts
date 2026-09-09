import { CatalogItem, MemorialCase, ArrangementOrder, ObituaryProgramData, GuestRSVP } from '../types';

export const INITIAL_CATALOG: CatalogItem[] = [
  // Caskets
  {
    id: 'casket-1',
    category: 'casket',
    name: 'The Majestic Mahogany',
    subtitle: 'Hand-Carved Solid African Mahogany',
    description: 'A timeless masterpiece crafted from high-grade solid mahogany with hand-rubbed high-gloss piano finish and plush velvet interior.',
    price: 3450,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      material: 'Solid African Mahogany',
      dimensions: '83" L x 28" W x 23" H',
      interior: 'Pearl Champagne Velvet',
      finish: 'High-Gloss Piano Polish'
    }
  },
  {
    id: 'casket-2',
    category: 'casket',
    name: 'The Celestial Oak',
    subtitle: 'Heritage American White Oak',
    description: 'Elegant warm oak featuring soft curved corners, brass-finish handles, and a serene cream crepe bedding layer.',
    price: 2600,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      material: 'Solid White Oak Wood',
      dimensions: '82" L x 28" W x 22" H',
      interior: 'Serene Ivory Crepe',
      finish: 'Warm Satin Honey Amber'
    }
  },
  {
    id: 'casket-3',
    category: 'casket',
    name: 'The Eternal Rose Bronze',
    subtitle: '18-Gauge Bronze Plated Steel',
    description: 'Superior protection and refined aesthetic featuring rose gold accents, gasket seal protection, and white satin padding.',
    price: 4100,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    inStock: false, // Out of stock example to test edge case!
    specs: {
      material: '18-Gauge Heavy Steel',
      dimensions: '84" L x 29" W x 24" H',
      interior: 'Pure White Satin',
      finish: 'Brushed Rose Gold & Bronze'
    }
  },
  {
    id: 'casket-4',
    category: 'casket',
    name: 'The Eco-Willow Sanctuary',
    subtitle: '100% Biodegradable Woven Willow',
    description: 'Eco-friendly natural woven wicker casket lined with organic unbleached cotton, ideal for green burials and serene outdoor ceremonies.',
    price: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      material: 'Handwoven Natural Willow',
      dimensions: '80" L x 26" W x 20" H',
      interior: 'Unbleached Organic Cotton',
      finish: 'Natural Matte Willow'
    }
  },

  // Burial Plot Tiers
  {
    id: 'plot-1',
    category: 'plot',
    name: 'Hilltop Serenity Estate Plot',
    subtitle: 'Elevated Garden Sanctuary View',
    description: 'A premium double-depth burial plot situated atop the western oak knoll, overlooking scenic botanical gardens.',
    price: 5200,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      location: 'Section 4 - Hilltop Oak Garden',
      vaultType: 'Concrete Double Vault Included',
      landscape: 'Perpetual Grass Care & Flower Bed'
    }
  },
  {
    id: 'plot-2',
    category: 'plot',
    name: 'Garden of Peace Lawn Plot',
    subtitle: 'Central Meadow Promenade',
    description: 'A serene single plot along the tranquil fountain path, featuring flush granite memorial stone placement.',
    price: 3100,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      location: 'Section 2 - Fountain Meadow',
      vaultType: 'Standard Reinforced Concrete Vault',
      landscape: 'Standard Lawn Maintenance'
    }
  },
  {
    id: 'plot-3',
    category: 'plot',
    name: 'Family Heritage Pavilion Vault',
    subtitle: 'Private Covered Stone Crypt',
    description: 'An exclusive multi-person private stone pavilion crypt providing architectural grandeur and weather-shielded visitation space.',
    price: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      location: 'Mausoleum Plaza - West Crypt 12',
      vaultType: 'Sealed Marble & Granite Vault',
      landscape: 'Covered Private Terrace Access'
    }
  },

  // Pallbearers
  {
    id: 'pallbearer-1',
    category: 'pallbearer',
    name: 'Honor Guard Ceremonial Team',
    subtitle: 'Professional 6-Member escorts',
    description: 'Highly trained professional funeral escorts dressed in formal black suits, white gloves, and polished leather shoes.',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      teamSize: 6,
      attire: 'Formal Black Suit & White Satin Gloves',
      service: 'Church Escort, Processional & Vault Lowering'
    }
  },
  {
    id: 'pallbearer-2',
    category: 'pallbearer',
    name: 'Royal Champagne & Gold Escorts',
    subtitle: 'Premium Ceremonial Attire Tiers',
    description: 'Distinctive ceremonial team in navy suits with gold lapel pins and champagne satin gloves for elevated regal honoring.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    specs: {
      teamSize: 6,
      attire: 'Midnight Navy Suit & Gold Accents',
      service: 'Full Processional Escort & Floral Arrangement Management'
    }
  }
];

export const INITIAL_CASES: MemorialCase[] = [
  {
    id: 'case-101',
    caseNumber: 'HC-2026-089',
    deceasedName: 'Eleanor Vance Montgomery',
    dateOfBirth: '1942-04-12',
    dateOfPassing: '2026-09-01',
    venueName: 'Grace Cathedral Chapel',
    venueAddress: '1100 California St, San Francisco, CA',
    serviceDate: '2026-09-15',
    serviceTime: '11:00 AM',
    rsvpAccessCode: 'HAVEN1',
    guestCapacity: 120,
    activeStatus: 'planning',
    familyContactName: 'Marcus Montgomery',
    familyContactEmail: 'marcus.m@example.com',
    familyContactPhone: '(555) 234-5678'
  },
  {
    id: 'case-102',
    caseNumber: 'HC-2026-090',
    deceasedName: 'Arthur Robert Sterling',
    dateOfBirth: '1938-11-20',
    dateOfPassing: '2026-08-28',
    venueName: 'St. Jude Memorial Chapel',
    venueAddress: '450 Oak Avenue, Palo Alto, CA',
    serviceDate: '2026-09-18',
    serviceTime: '02:00 PM',
    rsvpAccessCode: 'PEACE2',
    guestCapacity: 80,
    activeStatus: 'approved',
    familyContactName: 'Clara Sterling',
    familyContactEmail: 'clara.s@example.com',
    familyContactPhone: '(555) 987-6543'
  }
];

export const INITIAL_ORDERS: Record<string, ArrangementOrder> = {
  'case-101': {
    caseId: 'case-101',
    casketId: 'casket-1',
    plotId: 'plot-1',
    pallbearerId: 'pallbearer-1',
    specialNotes: 'Please position white lilies near the casket head. Family requests solemn instrumental organ processional.',
    status: 'submitted',
    updatedAt: '2026-09-08T14:30:00Z'
  }
};

export const INITIAL_PROGRAMS: Record<string, ObituaryProgramData> = {
  'case-101': {
    caseId: 'case-101',
    deceasedFullName: 'Eleanor Vance Montgomery',
    birthDate: 'April 12, 1942',
    passingDate: 'September 1, 2026',
    primaryPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    biographyText: 'Eleanor Vance Montgomery was a devoted mother, educator, and philanthropist whose warm presence touched countless lives. Born in San Francisco, she dedicated over 35 years to teaching literature at St. Helena Academy. Her passion for classic poetry, organic gardening, and community mentorship leaves a lasting legacy of love, wisdom, and grace.',
    tributeQuotes: [
      "To live in hearts we leave behind is not to die.",
      "A life so beautifully lived deserves to be beautifully remembered.",
      "Love never dies, it simply changes forms."
    ],
    orderOfService: [
      { id: '1', time: '11:00 AM', title: 'Musical Prelude', presenter: 'Grace Cathedral Ensemble' },
      { id: '2', time: '11:15 AM', title: 'Opening Prayer & Scripture', presenter: 'Rev. Thomas Sterling' },
      { id: '3', time: '11:30 AM', title: 'Eulogy & Family Tributes', presenter: 'Marcus Montgomery & Family' },
      { id: '4', time: '11:50 AM', title: 'Memorial Video Reel', presenter: 'HavenCare Photo Story' },
      { id: '5', time: '12:15 PM', title: 'Benediction & Processional', presenter: 'Honor Guard Pallbearers' }
    ],
    familyAcknowledgments: 'The Montgomery family expresses their deepest gratitude for your heartfelt prayers, flowers, and presence during this period of remembrance.',
    pallbearerNames: ['Marcus Montgomery', 'Julian Montgomery', 'David Sterling', 'Alexander Hayes', 'Robert Chen', 'Samuel Brooks'],
    officiantName: 'Rev. Thomas Sterling'
  }
};

export const INITIAL_RSVPS: GuestRSVP[] = [
  {
    id: 'rsvp-1',
    caseId: 'case-101',
    accessCode: 'HAVEN1',
    guestName: 'Elizabeth & Arthur Pendelton',
    guestPhone: '(555) 444-1212',
    seatsAllocated: 2,
    checkedIn: true,
    rsvpDate: '2026-09-03T10:15:00Z'
  },
  {
    id: 'rsvp-2',
    caseId: 'case-101',
    accessCode: 'HAVEN1',
    guestName: 'Dr. Gregory Vance',
    guestPhone: '(555) 888-9900',
    seatsAllocated: 1,
    checkedIn: false,
    rsvpDate: '2026-09-04T16:20:00Z'
  }
];
