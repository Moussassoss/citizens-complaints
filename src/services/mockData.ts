import { Complaint, Admin } from '../types';
import { generateTicketId, mapCategoryToAgency } from '../utils/helpers';

// Mock admins data
export const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Jean Mutesi',
    email: 'rtda@example.com',
    password: 'password123',
    agency: 'RTDA'
  },
  {
    id: '2',
    name: 'Emmanuel Habimana',
    email: 'reg@example.com',
    password: 'password123',
    agency: 'REG'
  },
  {
    id: '3',
    name: 'Alice Uwase',
    email: 'wasac@example.com',
    password: 'password123',
    agency: 'WASAC'
  },
  {
    id: '4',
    name: 'Patrick Ishimwe',
    email: 'nida@example.com',
    password: 'password123',
    agency: 'NIDA'
  },
  {
    id: '5',
    name: 'Marie Ingabire',
    email: 'health@example.com',
    password: 'password123',
    agency: 'MINISANTE'
  },
  {
    id: '6',
    name: 'Eric Niyonsaba',
    email: ' educ@example.com',
    password: 'password123',
    agency: 'MINEDUC'
  },
  {
    id: '7',
    name: 'Claude Mugabo',
    email: 'district@example.com',
    password: 'password123',
    agency: 'District Office'
  },
  {
    id: '8',
    name: 'Grace Mukamana',
    email: 'dgie@example.com',
    password: 'password123',
    agency: 'DGIE'
  }
];

// Mock complaints data
export const mockComplaints: Complaint[] = [
  {
    ticket_id: 'RW-12345678-0001',
    citizen_name: 'Claude Mugabo',
    phone: '+250781234567',
    email: 'claude@example.com',
    province: 'Kigali',
    district: 'Gasabo',
    sector: 'Remera',
    category: 'Roads & Infrastructure',
    description: 'There is a large pothole on the main road in Remera that has caused several accidents.',
    assigned_agency: 'RTDA',
    status: 'In Progress',
    admin_response: 'Thank you for your report. We have dispatched a team to assess the situation.',
    created_at: new Date('2025-03-10T09:23:45')
  },
  {
    ticket_id: 'RW-12345678-0002',
    citizen_name: 'Grace Mukamana',
    phone: '+250722345678',
    province: 'Eastern',
    district: 'Bugesera',
    sector: 'Gashora',
    category: 'Electricity',
    description: 'Frequent power outages in our area for the past week.',
    assigned_agency: 'REG',
    status: 'Pending',
    created_at: new Date('2025-03-12T14:30:22')
  },
  {
    ticket_id: 'RW-12345678-0003',
    citizen_name: 'Eric Niyonzima',
    phone: '+250733456789',
    email: 'eric@example.com',
    province: 'Southern',
    district: 'Huye',
    sector: 'Karama',
    category: 'Water & Sanitation',
    description: 'No water supply for 3 days in our neighborhood.',
    assigned_agency: 'WASAC',
    status: 'Resolved',
    admin_response: 'The water supply has been restored. The issue was caused by scheduled maintenance.',
    created_at: new Date('2025-03-05T10:45:12')
  },
  {
    ticket_id: 'RW-12345678-0004',
    citizen_name: 'Alice Uwase',
    phone: '+250744567890',
    email: 'alice@example.com',
    province: 'Northern',
    district: 'Musanze',
    sector: 'Busogo',
    category: 'Identity Issues',
    description: 'I need assistance with my national ID renewal process.',
    assigned_agency: 'NIDA',
    status: 'Pending',
    admin_response: '',   
    created_at: new Date('2025-03-15T11:00:00')
  },
  {
    ticket_id: 'RW-12345678-0005',
    citizen_name: 'Marie Ingabire',
    phone: '+250755678901',
    email: 'marie@gmail.com',
    province: 'Western',
    district: 'Rubavu',
    sector: 'Gisenyi',
    category: 'Health',
    description: 'I need information about the nearest health center.',
    assigned_agency: 'MINISANTE',
    status: 'In Progress',
    admin_response: 'We are looking into your request and will get back to you shortly.',
    created_at: new Date('2025-03-20T08:15:30')
  },
  {
    ticket_id: 'RW-12345678-0006',
    citizen_name: 'Jean Mutesi',
    phone: '+250766789012',
    email: 'jean@gmail.com',
    province: 'Kigali',
    district: 'Kicukiro',
    sector: 'Gikondo',
    category: 'Local Government Services',
    description: 'I have a complaint about the local government service I received.',
    assigned_agency: 'District Office',
    status: 'Pending',
    admin_response: '',
    created_at: new Date('2025-03-25T13:45:00')
  },
  {
    ticket_id: 'RW-12345678-0007',
    citizen_name: 'Emmanuel Habimana',
    phone: '+250777890123',
    email: 'emmanuel@gmail.com',
    province: 'Southern',
    district: 'Gisagara',
    sector: 'Kigembe',
    category: 'Education',
    description: 'I need information about school enrollment procedures.',
    assigned_agency: 'MINEDUC',
    status: 'In Progress',
    admin_response: 'We are currently reviewing your request and will respond soon.',
    created_at: new Date('2025-03-30T09:00:00')
  },
  {
    ticket_id: 'RW-12345678-0008',
    citizen_name: 'Adam Niyonsaba',
    phone: '+250788901234',
    email: 'adam@gmail.com',
    province: 'Eastern',
    district: 'Rwamagana',
    sector: 'Muhazi',
    category: 'Immigration',
    description: 'I need assistance with my visa application.',
    assigned_agency: 'DGIE',
    status: 'Resolved',
    admin_response: 'Your visa application has been approved. Please check your email for details.',
    created_at: new Date('2025-04-01T10:30:00')
  }
];

// Service functions
let complaints = [...mockComplaints];
let admins = [...mockAdmins];

export const getComplaints = () => [...complaints];

export const getComplaintById = (ticketId: string) => 
  complaints.find(complaint => complaint.ticket_id === ticketId);

export const addComplaint = (complaintData: Omit<Complaint, 'ticket_id' | 'assigned_agency' | 'status' | 'created_at'>) => {
  const newComplaint: Complaint = {
    ...complaintData,
    ticket_id: generateTicketId(),
    assigned_agency: mapCategoryToAgency(complaintData.category as any),
    status: 'Pending',
    created_at: new Date()
  };
  
  complaints = [newComplaint, ...complaints];
  return newComplaint;
};

export const updateComplaintStatus = (ticketId: string, status: Complaint['status'], adminResponse?: string) => {
  complaints = complaints.map(complaint => 
    complaint.ticket_id === ticketId 
      ? { ...complaint, status, admin_response: adminResponse || complaint.admin_response }
      : complaint
  );
  
  return getComplaintById(ticketId);
};

export const getComplaintsByAgency = (agency: string) => 
  complaints.filter(complaint => complaint.assigned_agency === agency);

export const authenticateAdmin = (email: string, password: string) => {
  const admin = admins.find(a => a.email === email && a.password === password);
  
  if (!admin) return null;
  
  // Never return the password in a real app
  const { password: _, ...adminWithoutPassword } = admin;
  return adminWithoutPassword;
};