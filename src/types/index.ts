export type CategoryType = 'casket' | 'plot' | 'pallbearer';

export interface CatalogItem {
  id: string;
  category: CategoryType;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  specs: {
    material?: string;
    dimensions?: string;
    interior?: string;
    location?: string;
    vaultType?: string;
    teamSize?: number;
    attire?: string;
    [key: string]: any;
  };
}

export interface MemorialCase {
  id: string;
  caseNumber: string;
  deceasedName: string;
  dateOfBirth: string;
  dateOfPassing: string;
  venueName: string;
  venueAddress: string;
  serviceDate: string;
  serviceTime: string;
  rsvpAccessCode: string;
  guestCapacity: number;
  activeStatus: 'planning' | 'approved' | 'completed';
  familyContactName: string;
  familyContactEmail: string;
  familyContactPhone: string;
}

export interface ArrangementOrder {
  caseId: string;
  casketId?: string;
  plotId?: string;
  pallbearerId?: string;
  specialNotes?: string;
  status: 'draft' | 'submitted' | 'approved';
  updatedAt: string;
}

export interface ServiceScheduleItem {
  id: string;
  time: string;
  title: string;
  presenter?: string;
}

export interface ObituaryProgramData {
  caseId: string;
  deceasedFullName: string;
  birthDate: string;
  passingDate: string;
  primaryPhotoUrl: string;
  galleryPhotos: string[];
  biographyText: string;
  tributeQuotes: string[];
  orderOfService: ServiceScheduleItem[];
  familyAcknowledgments: string;
  pallbearerNames: string[];
  officiantName: string;
}

export interface GuestRSVP {
  id: string;
  caseId: string;
  accessCode: string;
  guestName: string;
  guestPhone?: string;
  seatsAllocated: number;
  checkedIn: boolean;
  rsvpDate: string;
}

export type UserRole = 'admin' | 'family' | 'guest';
