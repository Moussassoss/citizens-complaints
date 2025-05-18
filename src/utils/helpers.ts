import { ComplaintCategory, Agency, LocationData } from '../types';

// Generate a unique ticket ID
export const generateTicketId = (): string => {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RW-${timestamp}-${random}`;
};

// Map categories to appropriate government agencies
export const mapCategoryToAgency = (category: ComplaintCategory): Agency => {
  switch (category) {
    case 'Roads & Infrastructure':
      return 'RTDA';
    case 'Electricity':
      return 'REG';
    case 'Water & Sanitation':
      return 'WASAC';
    case 'Identity Issues':
      return 'NIDA';
    case 'Health':
      return 'MINISANTE';
    case 'Immigration':
      return 'DGIE';
    case 'Local Government Services':
    case 'Education':
    default:
      return 'District Office';
  }
};

// Categories for complaints
export const complaintCategories: ComplaintCategory[] = [
  'Roads & Infrastructure',
  'Electricity',
  'Water & Sanitation',
  'Identity Issues',
  'Local Government Services',
  'Education',
  'Health',
  'Immigration'
];

// Government agencies
export const governmentAgencies: Agency[] = [
  'RTDA',
  'REG',
  'WASAC',
  'NIDA',
  'MINISANTE',
  'DGIE',
  'District Office'
];

// Location data for Rwanda
export const locationData: LocationData = {
  provinces: ['Kigali', 'Northern', 'Southern', 'Eastern', 'Western'],
  districts: {
    'Kigali': ['Nyarugenge', 'Gasabo', 'Kicukiro'],
    'Northern': ['Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo'],
    'Southern': ['Gisagara', 'Huye'],
    'Eastern': ['Bugesera', 'Rwamagana'],
    'Western': ['Karongi', 'Rubavu']
  },
  sectors: {
    'Nyarugenge': ['Gitega', 'Kanyinya', 'Kigali', 'Kimisagara', 'Mageragere', 'Muhima', 'Nyakabanda', 'Nyamirambo', 'Nyarugenge', 'Rwezamenyo'],
    'Gasabo': ['Bumbogo', 'Gatsata', 'Gikomero', 'Gisozi', 'Jabana', 'Jali', 'Kacyiru', 'Kimihurura', 'Kimironko', 'Kinyinya', 'Ndera', 'Nduba', 'Remera', 'Rusororo', 'Rutunga'],
    'Kicukiro': ['Gahanga', 'Gatenga', 'Gikondo', 'Kagarama', 'Kanombe', 'Kicukiro', 'Kigarama', 'Masaka', 'Niboye', 'Nyarugunga'],
    'Gicumbi': ['Byumba'],
    'Musanze': ['Busogo'],
    'Rulindo': ['Burega'],
    'Gisagara':['Kigembe'],
    'Huye': ['Karama'],
    'Bugesera': ['Gashora'],
    'Rwamagana': ['Muhazi'],
    'Rubavu': ['Gisenyi'],

    'Burera': ['Sectors in Burera'],
    'Gakenke': ['Sectors in Gakenke'],
    // Add abbreviated lists for other districts
  }
};

// Format date to a readable string
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};