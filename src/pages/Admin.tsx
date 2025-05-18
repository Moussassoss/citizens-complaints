import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ComplaintList from '../components/Dashboard/ComplaintList';
import ComplaintDetails from '../components/Dashboard/ComplaintDetails';
import { getCurrentAdmin, isAuthenticated } from '../services/authService';
import { getAgencyComplaints } from '../services/complaintService';
import { Complaint } from '../types';
import Alert from '../components/UI/Alert';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    const fetchComplaints = async () => {
      try {
        const admin = getCurrentAdmin();
        
        if (!admin) {
          navigate('/login');
          return;
        }
        
        const adminComplaints = getAgencyComplaints(admin.agency);
        setComplaints(adminComplaints);
        setLoading(false);
      } catch (error) {
        setError('Failed to load complaints. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchComplaints();
  }, [navigate]);
  
  const handleSelectComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };
  
  const handleBack = () => {
    setSelectedComplaint(null);
  };
  
  const handleUpdateComplaint = (updatedComplaint: Complaint) => {
    // Update the selected complaint
    setSelectedComplaint(updatedComplaint);
    
    // Update the complaint in the list
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.ticket_id === updatedComplaint.ticket_id ? updatedComplaint : complaint
      )
    );
  };
  
  const admin = getCurrentAdmin();
  
  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedComplaint ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome back, {admin?.name} | {admin?.agency}
              </p>
            </div>
            
            {error && (
              <Alert
                variant="error"
                message={error}
                dismissible
                onDismiss={() => setError(null)}
                className="mb-6"
              />
            )}
            
            <ComplaintList
              complaints={complaints}
              onSelectComplaint={handleSelectComplaint}
            />
          </>
        ) : (
          <ComplaintDetails
            complaint={selectedComplaint}
            onBack={handleBack}
            isAdmin={true}
            onUpdateComplaint={handleUpdateComplaint}
          />
        )}
      </div>
    </Layout>
  );
};

export default Admin;