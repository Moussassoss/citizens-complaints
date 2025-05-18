export interface Complaint {
  ticket_id: string;
  citizen_name: string;
  phone: string;
  email?: string;
  province: string;
  district: string;
  sector: string;
  category: string;
  description: string;
  attachment_url?: string;
  assigned_agency: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  admin_response?: string;
  created_at: Date;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  agency: string;
}

export type ComplaintCategory = 
  | 'Roads & Infrastructure'
  | 'Electricity'
  | 'Water & Sanitation'
  | 'Identity Issues'
  | 'Local Government Services'
  | 'Education'
  | 'Health'
  | 'Immigration';

export type Province = 'Kigali' | 'Northern' | 'Southern' | 'Eastern' | 'Western';

export type Agency = 
  | 'RTDA'
  | 'REG'
  | 'WASAC'
  | 'NIDA'
  | 'MINISANTE'
  | 'DGIE'
  | 'District Office';

export interface LocationData {
  provinces: Province[];
  districts: Record<Province, string[]>;
  sectors: Record<string, string[]>;
}