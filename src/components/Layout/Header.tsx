import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Search, User, LogOut } from 'lucide-react';
import { isAuthenticated, logout, getCurrentAdmin } from '../../services/authService';
import Button from '../UI/Button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = getCurrentAdmin();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-lg">Rwanda Citizen Engagement</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/submit" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium">
              Submit Complaint
            </Link>
            <Link to="/track" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium">
              Track Status
            </Link>
            {authenticated ? (
              <Link to="/admin" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium">
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium">
                Admin Login
              </Link>
            )}
          </nav>

          <div className="flex items-center">
            {authenticated && (
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-center">
                    <div className="text-sm text-white mr-2">
                      <div className="font-medium">{admin?.name}</div>
                      <div className="text-xs">{admin?.agency}</div>
                    </div>
                    <User className="h-8 w-8 text-white bg-blue-700 p-1 rounded-full" />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-3 bg-blue-700 border-blue-500"
                  onClick={handleLogout}
                  rightIcon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-blue-700">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/submit" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
            Submit Complaint
          </Link>
          <Link to="/track" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
            Track Status
          </Link>
          {authenticated ? (
            <Link to="/admin" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
              Admin Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;