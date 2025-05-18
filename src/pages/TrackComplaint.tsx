import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import TrackingForm from '../components/Form/TrackingForm';
import ComplaintDetails from '../components/Dashboard/ComplaintDetails';
import { Complaint } from '../types';

const TrackComplaint: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTicketId = searchParams.get('ticketId') || '';
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  
  const handleTrackingResult = (complaint: Complaint) => {
    setComplaint(complaint);
  };
  
  const handleBack = () => {
    setComplaint(null);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Complaint</h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter your ticket ID to check the status of your complaint.
          </p>
        </div>
        
        {complaint ? (
          <ComplaintDetails 
            complaint={complaint} 
            onBack={handleBack} 
          />
        ) : (
          <TrackingForm 
            onResult={handleTrackingResult} 
            initialTicketId={initialTicketId}
          />
        )}
      </div>
    </Layout>
  );
};

export default TrackComplaint;