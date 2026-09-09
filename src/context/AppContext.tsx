import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CatalogItem, 
  MemorialCase, 
  ArrangementOrder, 
  ObituaryProgramData, 
  GuestRSVP, 
  UserRole 
} from '../types';
import { 
  INITIAL_CATALOG, 
  INITIAL_CASES, 
  INITIAL_ORDERS, 
  INITIAL_PROGRAMS, 
  INITIAL_RSVPS 
} from '../data/mockData';
import { toggleAmbientChime, stopAmbientChime } from '../utils/ambientSound';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  cases: MemorialCase[];
  activeCaseId: string;
  setActiveCaseId: (id: string) => void;
  activeCase: MemorialCase | undefined;
  catalog: CatalogItem[];
  addCatalogItem: (item: CatalogItem) => void;
  updateCatalogItem: (item: CatalogItem) => void;
  orders: Record<string, ArrangementOrder>;
  updateOrder: (caseId: string, order: Partial<ArrangementOrder>) => void;
  programs: Record<string, ObituaryProgramData>;
  updateProgram: (caseId: string, programData: Partial<ObituaryProgramData>) => void;
  rsvps: GuestRSVP[];
  submitRSVP: (accessCode: string, name: string, seats: number, phone?: string) => { success: boolean; message: string; rsvp?: GuestRSVP };
  toggleCheckIn: (rsvpId: string) => void;
  createNewCase: (caseData: Omit<MemorialCase, 'id' | 'caseNumber'>) => MemorialCase;
  isSoundPlaying: boolean;
  toggleSound: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [userRole, setUserRole] = useState<UserRole>('family');
  
  const [cases, setCases] = useState<MemorialCase[]>(() => {
    const saved = localStorage.getItem('havencare_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [activeCaseId, setActiveCaseId] = useState<string>(() => {
    return cases[0]?.id || 'case-101';
  });

  const [catalog, setCatalog] = useState<CatalogItem[]>(() => {
    const saved = localStorage.getItem('havencare_catalog');
    return saved ? JSON.parse(saved) : INITIAL_CATALOG;
  });

  const [orders, setOrders] = useState<Record<string, ArrangementOrder>>(() => {
    const saved = localStorage.getItem('havencare_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [programs, setPrograms] = useState<Record<string, ObituaryProgramData>>(() => {
    const saved = localStorage.getItem('havencare_programs');
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });

  const [rsvps, setRsvps] = useState<GuestRSVP[]>(() => {
    const saved = localStorage.getItem('havencare_rsvps');
    return saved ? JSON.parse(saved) : INITIAL_RSVPS;
  });

  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('havencare_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('havencare_catalog', JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    localStorage.setItem('havencare_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('havencare_programs', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('havencare_rsvps', JSON.stringify(rsvps));
  }, [rsvps]);

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0];

  const addCatalogItem = (item: CatalogItem) => {
    setCatalog(prev => [item, ...prev]);
  };

  const updateCatalogItem = (updatedItem: CatalogItem) => {
    setCatalog(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const updateOrder = (caseId: string, updatedFields: Partial<ArrangementOrder>) => {
    setOrders(prev => ({
      ...prev,
      [caseId]: {
        ...(prev[caseId] || { caseId, status: 'draft', updatedAt: new Date().toISOString() }),
        ...updatedFields,
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const updateProgram = (caseId: string, programData: Partial<ObituaryProgramData>) => {
    setPrograms(prev => ({
      ...prev,
      [caseId]: {
        ...(prev[caseId] || {
          caseId,
          deceasedFullName: activeCase?.deceasedName || '',
          birthDate: '',
          passingDate: '',
          primaryPhotoUrl: '',
          galleryPhotos: [],
          biographyText: '',
          tributeQuotes: [],
          orderOfService: [],
          familyAcknowledgments: '',
          pallbearerNames: [],
          officiantName: ''
        }),
        ...programData
      }
    }));
  };

  const submitRSVP = (accessCode: string, name: string, seats: number, phone?: string) => {
    const targetCase = cases.find(c => c.rsvpAccessCode.trim().toUpperCase() === accessCode.trim().toUpperCase());
    if (!targetCase) {
      return { success: false, message: 'Invalid access code. Please check the invitation provided by the family.' };
    }

    // Check capacity
    const existingSeats = rsvps
      .filter(r => r.caseId === targetCase.id)
      .reduce((sum, r) => sum + r.seatsAllocated, 0);

    if (existingSeats + seats > targetCase.guestCapacity) {
      return { 
        success: false, 
        message: `Chapel seating capacity limit reached (${existingSeats}/${targetCase.guestCapacity} seats reserved). Please contact the family coordinator.` 
      };
    }

    const newRSVP: GuestRSVP = {
      id: `rsvp-${Date.now()}`,
      caseId: targetCase.id,
      accessCode: targetCase.rsvpAccessCode,
      guestName: name,
      guestPhone: phone,
      seatsAllocated: seats,
      checkedIn: false,
      rsvpDate: new Date().toISOString()
    };

    setRsvps(prev => [newRSVP, ...prev]);
    return { success: true, message: 'RSVP confirmed successfully!', rsvp: newRSVP };
  };

  const toggleCheckIn = (rsvpId: string) => {
    setRsvps(prev => prev.map(r => r.id === rsvpId ? { ...r, checkedIn: !r.checkedIn } : r));
  };

  const createNewCase = (caseData: Omit<MemorialCase, 'id' | 'caseNumber'>): MemorialCase => {
    const id = `case-${Date.now()}`;
    const caseNumber = `HC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    
    const newCase: MemorialCase = {
      ...caseData,
      id,
      caseNumber
    };

    setCases(prev => [newCase, ...prev]);
    setActiveCaseId(id);

    // Initialize blank program
    updateProgram(id, {
      caseId: id,
      deceasedFullName: newCase.deceasedName,
      birthDate: newCase.dateOfBirth,
      passingDate: newCase.dateOfPassing,
      primaryPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      galleryPhotos: [],
      biographyText: '',
      tributeQuotes: ["In loving memory of a life beautifully lived."],
      orderOfService: [
        { id: '1', time: newCase.serviceTime, title: 'Opening Service', presenter: 'Officiant' }
      ],
      familyAcknowledgments: 'Thank you for your warmth and prayers.',
      pallbearerNames: [],
      officiantName: 'Officiant'
    });

    return newCase;
  };

  const toggleSound = () => {
    toggleAmbientChime((playing) => {
      setIsSoundPlaying(playing);
    });
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        cases,
        activeCaseId,
        setActiveCaseId,
        activeCase,
        catalog,
        addCatalogItem,
        updateCatalogItem,
        orders,
        updateOrder,
        programs,
        updateProgram,
        rsvps,
        submitRSVP,
        toggleCheckIn,
        createNewCase,
        isSoundPlaying,
        toggleSound
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
