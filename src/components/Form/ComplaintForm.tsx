import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, FileInput, MapPin, Phone, User } from 'lucide-react';
import Input from '../UI/Input';
import Select from '../UI/Select';
import TextArea from '../UI/TextArea';
import Button from '../UI/Button';
import Alert from '../UI/Alert';
import { complaintCategories, locationData } from '../../utils/helpers';
import { submitComplaint } from '../../services/complaintService';
import { Complaint } from '../../types';

const ComplaintForm: React.FC = () => {
  const [formData, setFormData] = useState({
    citizen_name: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    sector: '',
    category: '',
    description: '',
    attachment_url: ''
  });
  
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);
  const [sectors, setSectors] = useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    ticket?: string;
  } | null>(null);
  
  // Update districts when province changes
  useEffect(() => {
    if (formData.province) {
      const provinceDistricts = locationData.districts[formData.province as keyof typeof locationData.districts] || [];
      setDistricts(provinceDistricts.map(district => ({ value: district, label: district })));
      setFormData(prev => ({ ...prev, district: '', sector: '' }));
    } else {
      setDistricts([]);
    }
  }, [formData.province]);
  
  // Update sectors when district changes
  useEffect(() => {
    if (formData.district) {
      const districtSectors = locationData.sectors[formData.district] || [];
      setSectors(Array.isArray(districtSectors) 
        ? districtSectors.map(sector => ({ value: sector, label: sector }))
        : [{ value: districtSectors, label: districtSectors }]
      );
      setFormData(prev => ({ ...prev, sector: '' }));
    } else {
      setSectors([]);
    }
  }, [formData.district]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.citizen_name.trim()) {
      newErrors.citizen_name = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.province) {
      newErrors.province = 'Province is required';
    }
    
    if (!formData.district) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.sector) {
      newErrors.sector = 'Sector is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newComplaint = await submitComplaint(formData as Omit<Complaint, 'ticket_id' | 'assigned_agency' | 'status' | 'created_at'>);
      
      setSubmitResult({
        success: true,
        message: 'Your complaint has been successfully submitted!',
        ticket: newComplaint.ticket_id
      });
      
      // Reset form
      setFormData({
        citizen_name: '',
        phone: '',
        email: '',
        province: '',
        district: '',
        sector: '',
        category: '',
        description: '',
        attachment_url: ''
      });
      
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'There was an error submitting your complaint. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const provinceOptions = locationData.provinces.map(province => ({
    value: province,
    label: province
  }));
  
  const categoryOptions = complaintCategories.map(category => ({
    value: category,
    label: category
  }));
  
  if (submitResult?.success) {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Complaint Submitted Successfully!</h2>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for your feedback. Your complaint has been registered with the appropriate department.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-700">Your ticket ID is:</p>
          <p className="text-lg font-bold text-blue-600">{submitResult.ticket}</p>
          <p className="text-sm text-gray-600 mt-2">
            Please save this ID to track the status of your complaint.
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button
            onClick={() => setSubmitResult(null)}
            variant="outline"
          >
            Submit Another Complaint
          </Button>
          <Button
            onClick={() => window.location.href = `/track?ticketId=${submitResult.ticket}`}
          >
            Track Status
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a Complaint or Feedback</h2>
        
        {submitResult && !submitResult.success && (
          <Alert
            variant="error"
            message={submitResult.message}
            dismissible
            onDismiss={() => setSubmitResult(null)}
            className="mb-6"
          />
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="citizen_name"
              value={formData.citizen_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.citizen_name}
              required
              leftIcon={<User className="h-5 w-5" />}
            />
            
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +250781234567"
              error={errors.phone}
              required
              leftIcon={<Phone className="h-5 w-5" />}
            />
            
            <Input
              label="Email (Optional)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={errors.email}
            />
            
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
              placeholder="Select a category"
              error={errors.category}
              required
            />
            
            <Select
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              options={provinceOptions}
              placeholder="Select your province"
              error={errors.province}
              required
            />
            
            <Select
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              options={districts}
              placeholder={formData.province ? "Select your district" : "Select province first"}
              disabled={!formData.province}
              error={errors.district}
              required
            />
            
            <Select
              label="Sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              options={sectors}
              placeholder={formData.district ? "Select your sector" : "Select district first"}
              disabled={!formData.district}
              error={errors.sector}
              required
            />
            
            <Input
              label="Attachment (Optional)"
              name="attachment_url"
              type="file"
              onChange={handleChange}
              leftIcon={<FileInput className="h-5 w-5" />}
              className="py-1"
            />
          </div>
          
          <TextArea
            label="Description of Issue"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please describe your issue in detail..."
            rows={5}
            error={errors.description}
            required
            className="mt-2"
          />
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  By submitting this form, you confirm that all information provided is accurate to the best of your knowledge.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              leftIcon={<Check className="h-5 w-5" />}
            >
              Submit Complaint
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;