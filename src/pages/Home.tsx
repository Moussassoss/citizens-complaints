import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, Search } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Rwanda Citizen Engagement System
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Submit and track complaints or feedback about public services in Rwanda
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Button
                size="lg"
                onClick={() => navigate('/submit')}
                leftIcon={<FileText className="h-5 w-5" />}
              >
                Submit Complaint
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={() => navigate('/track')}
                leftIcon={<Search className="h-5 w-5" />}
              >
                Track Status
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures your concerns are heard and addressed efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Submit Your Complaint</h3>
              <p className="text-gray-600 text-center">
                Fill out our simple form with details about your issue, including location and category.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Automated Routing</h3>
              <p className="text-gray-600 text-center">
                Your complaint is automatically assigned to the appropriate government agency.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Track & Get Updates</h3>
              <p className="text-gray-600 text-center">
                Use your unique ticket ID to track the status of your complaint until resolution.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Service Categories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We handle a wide range of public service issues across Rwanda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Roads & Infrastructure', agency: 'RTDA' },
              { name: 'Electricity', agency: 'REG' },
              { name: 'Water & Sanitation', agency: 'WASAC' },
              { name: 'Identity Issues', agency: 'NIDA' },
              { name: 'Local Government Services', agency: 'District Offices' },
              { name: 'Education', agency: 'MINEDUC' },
              { name: 'Health', agency: 'MINISANTE' },
              { name: 'Immigration', agency: 'DGIE' },
            ].map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Handled by: {category.agency}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button
              onClick={() => navigate('/submit')}
              leftIcon={<FileText className="h-5 w-5" />}
            >
              Submit a Complaint
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold">Ready to submit your complaint?</h2>
              <p className="mt-4 text-lg text-blue-100">
                Help us improve public services in Rwanda by sharing your experiences and concerns.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="bg-white text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate('/submit')}
                >
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 md:w-1/2 md:pl-8">
              <ul className="space-y-4">
                {[
                  'Track your complaint status in real-time',
                  'Direct routing to the appropriate government agency',
                  'Receive official responses to your concerns',
                  'Help improve public services for all citizens'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;