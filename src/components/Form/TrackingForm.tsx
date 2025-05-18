import React, { useState } from 'react';
import { Search, Ticket } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Alert from '../UI/Alert';
import { getComplaint } from '../../services/complaintService';
import { Complaint } from '../../types';

interface TrackingFormProps {
  onResult?: (complaint: Complaint) => void;
  initialTicketId?: string;
}

const TrackingForm: React.FC<TrackingFormProps> = ({ onResult, initialTicketId = '' }) => {
  const [ticketId, setTicketId] = useState(initialTicketId);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketId(e.target.value);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketId.trim()) {
      setError('Please enter a ticket ID');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const complaint = await getComplaint(ticketId);
      
      if (onResult) {
        onResult(complaint);
      }
    } catch (error) {
      setError('No complaint found with this ticket ID. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Your Complaint</h2>
        
        {error && (
          <Alert
            variant="error"
            message={error}
            dismissible
            onDismiss={() => setError(null)}
            className="mb-6"
          />
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Ticket ID"
            name="ticketId"
            value={ticketId}
            onChange={handleChange}
            placeholder="Enter your ticket ID (e.g., RW-12345678-0001)"
            leftIcon={<Ticket className="h-5 w-5" />}
            required
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              leftIcon={<Search className="h-5 w-5" />}
            >
              Track Complaint
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackingForm;