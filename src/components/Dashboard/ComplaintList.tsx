import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Complaint } from '../../types';
import Card, { CardContent, CardHeader } from '../UI/Card';
import { formatDate } from '../../utils/helpers';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { complaintCategories, locationData } from '../../utils/helpers';

interface ComplaintListProps {
  complaints: Complaint[];
  onSelectComplaint: (complaint: Complaint) => void;
}

const ComplaintList: React.FC<ComplaintListProps> = ({ complaints, onSelectComplaint }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...complaintCategories.map(category => ({ value: category, label: category }))
  ];

  const provinceOptions = [
    { value: '', label: 'All Provinces' },
    ...locationData.provinces.map(province => ({ value: province, label: province }))
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'category':
        setFilterCategory(value);
        break;
      case 'province':
        setFilterProvince(value);
        break;
      case 'status':
        setFilterStatus(value);
        break;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterCategory('');
    setFilterProvince('');
    setFilterStatus('');
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

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.citizen_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || complaint.category === filterCategory;
    const matchesProvince = !filterProvince || complaint.province === filterProvince;
    const matchesStatus = !filterStatus || complaint.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesProvince && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="w-full md:w-3/4">
            <Input
              placeholder="Search by ticket ID, name, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              leftIcon={<Search className="h-5 w-5" />}
              className="mb-0"
            />
          </div>
          
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            rightIcon={<Filter className="h-5 w-5" />}
          >
            Filters
          </Button>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Category"
                name="category"
                value={filterCategory}
                onChange={handleFilterChange}
                options={categoryOptions}
              />
              
              <Select
                label="Province"
                name="province"
                value={filterProvince}
                onChange={handleFilterChange}
                options={provinceOptions}
              />
              
              <Select
                label="Status"
                name="status"
                value={filterStatus}
                onChange={handleFilterChange}
                options={statusOptions}
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-md">
            <p className="text-gray-500">No complaints found matching your filters.</p>
          </div>
        ) : (
          filteredComplaints.map(complaint => (
            <Card 
              key={complaint.ticket_id}
              className="cursor-pointer transform transition hover:scale-[1.01]"
              onClick={() => onSelectComplaint(complaint)}
            >
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      {complaint.ticket_id}
                      <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      From: {complaint.citizen_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {complaint.sector}, {complaint.district}, {complaint.province}
                    </p>
                    <p className="text-sm text-gray-800 mt-2">
                      {complaint.description.length > 150 
                        ? complaint.description.substring(0, 150) + '...' 
                        : complaint.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                    <span className="text-sm text-gray-500">
                      {formatDate(complaint.created_at)}
                    </span>
                    <span className="text-sm font-medium mt-1 text-blue-600">
                      {complaint.category}
                    </span>
                    <span className="text-sm font-medium mt-1 bg-gray-100 px-2 py-1 rounded">
                      {complaint.assigned_agency}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintList;