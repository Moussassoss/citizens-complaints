import React, { useState } from 'react';
import { ChevronLeft, Clock, MapPin, MessageSquare, Phone, User } from 'lucide-react';
import { Complaint } from '../../types';
import Card, { CardContent, CardHeader, CardFooter } from '../UI/Card';
import Button from '../UI/Button';
import TextArea from '../UI/TextArea';
import Select from '../UI/Select';
import { formatDate } from '../../utils/helpers';
import { updateStatus } from '../../services/complaintService';
import Alert from '../UI/Alert';

interface ComplaintDetailsProps {
  complaint: Complaint;
  onBack: () => void;
  isAdmin?: boolean;
  onUpdateComplaint?: (updatedComplaint: Complaint) => void;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({ 
  complaint,
  onBack,
  isAdmin = false,
  onUpdateComplaint
}) => {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(complaint.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' }
  ];
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Complaint['status']);
  };
  
  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status === complaint.status && !response) {
      setAlert({
        type: 'error',
        message: 'Please change the status or add a response before submitting.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const updatedComplaint = await updateStatus(
        complaint.ticket_id,
        status,
        response || complaint.admin_response
      );
      
      setAlert({
        type: 'success',
        message: 'Complaint status updated successfully.'
      });
      
      if (onUpdateComplaint) {
        onUpdateComplaint(updatedComplaint);
      }
      
      // Clear the response field after successful submission
      setResponse('');
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to update complaint status. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        leftIcon={<ChevronLeft className="h-4 w-4" />}
        className="mb-4"
      >
        Back to List
      </Button>
      
      <Card className="mb-6">
        <CardHeader className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Complaint Details</h2>
          <div className={`px-3 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
            {complaint.status}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Ticket ID</h3>
              <p className="text-lg font-bold text-blue-600">{complaint.ticket_id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
              <p className="text-base text-gray-900">{formatDate(complaint.created_at)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p className="text-base text-gray-900">{complaint.category}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Assigned Agency</h3>
              <p className="text-base text-gray-900">{complaint.assigned_agency}</p>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-md mt-1">{complaint.description}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Citizen Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                  <p className="text-base text-gray-900">{complaint.citizen_name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                  <p className="text-base text-gray-900">{complaint.phone}</p>
                </div>
              </div>
              
              {complaint.email && (
                <div className="flex items-center md:col-span-2">
                  <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-base text-gray-900">{complaint.email}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center md:col-span-2">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="text-base text-gray-900">
                    {complaint.sector}, {complaint.district}, {complaint.province}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {complaint.admin_response && (
            <div className="mt-6 p-4 border border-blue-200 rounded-md bg-blue-50">
              <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Admin Response
              </h3>
              <p className="text-base text-blue-900">{complaint.admin_response}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isAdmin && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800">Update Status</h2>
          </CardHeader>
          
          <CardContent>
            {alert && (
              <Alert
                variant={alert.type}
                message={alert.message}
                dismissible
                onDismiss={() => setAlert(null)}
                className="mb-6"
              />
            )}
            
            <form onSubmit={handleSubmit}>
              <Select
                label="Status"
                name="status"
                value={status}
                onChange={handleStatusChange}
                options={statusOptions}
              />
              
              <TextArea
                label="Response to Citizen"
                name="response"
                value={response}
                onChange={handleResponseChange}
                placeholder="Provide additional information or instructions to the citizen..."
                rows={4}
              />
              
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="mt-4"
                fullWidth
              >
                Update Complaint
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplaintDetails;