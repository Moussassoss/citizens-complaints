import { 
  getComplaints, 
  getComplaintById, 
  addComplaint,
  updateComplaintStatus,
  getComplaintsByAgency
} from './mockData';

import { Complaint } from '../types';

// Get all complaints
export const getAllComplaints = () => {
  return getComplaints();
};

// Get a complaint by ticket ID
export const getComplaint = (ticketId: string) => {
  const complaint = getComplaintById(ticketId);
  
  if (!complaint) {
    throw new Error('Complaint not found');
  }
  
  return complaint;
};

// Submit a new complaint
export const submitComplaint = (
  complaintData: Omit<Complaint, 'ticket_id' | 'assigned_agency' | 'status' | 'created_at'>
) => {
  return addComplaint(complaintData);
};

// Update a complaint's status
export const updateStatus = (
  ticketId: string,
  status: Complaint['status'],
  adminResponse?: string
) => {
  const updatedComplaint = updateComplaintStatus(ticketId, status, adminResponse);
  
  if (!updatedComplaint) {
    throw new Error('Failed to update complaint status');
  }
  
  return updatedComplaint;
};

// Get complaints assigned to a specific agency
export const getAgencyComplaints = (agency: string) => {
  return getComplaintsByAgency(agency);
};