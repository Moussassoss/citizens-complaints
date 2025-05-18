import React from 'react';
import Layout from '../components/Layout/Layout';
import ComplaintForm from '../components/Form/ComplaintForm';

const SubmitComplaint: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit Your Complaint</h1>
          <p className="mt-2 text-lg text-gray-600">
            Help us improve public services by sharing your concerns and experiences.
          </p>
        </div>
        
        <ComplaintForm />
      </div>
    </Layout>
  );
};

export default SubmitComplaint;