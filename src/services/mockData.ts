import { Complaint, Admin } from '../types';
import { generateTicketId, mapCategoryToAgency } from '../utils/helpers';

// Mock admins data
export const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'Jean Mutesi',
    email: 'rtda@example.com',
    password: 'password123', // In a real app, this would be hashed
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
    district: 'Kayonza',
    sector: 'Mukarange',
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
    sector: 'Ngoma',
    category: 'Water & Sanitation',
    description: 'No water supply for 3 days in our neighborhood.',
    assigned_agency: 'WASAC',
    status: 'Resolved',
    admin_response: 'The water supply has been restored. The issue was caused by scheduled maintenance.',
    created_at: new Date('2025-03-05T10:45:12')
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