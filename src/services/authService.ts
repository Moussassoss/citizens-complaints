import { authenticateAdmin } from './mockData';

// Store the admin session in localStorage
export const login = async (email: string, password: string) => {
  const admin = authenticateAdmin(email, password);
  
  if (admin) {
    localStorage.setItem('admin', JSON.stringify(admin));
    return admin;
  }
  
  throw new Error('Invalid credentials');
};

// Clear the admin session from localStorage
export const logout = () => {
  localStorage.removeItem('admin');
};

// Get the current admin from localStorage
export const getCurrentAdmin = () => {
  const adminJson = localStorage.getItem('admin');
  return adminJson ? JSON.parse(adminJson) : null;
};

// Check if an admin is logged in
export const isAuthenticated = () => {
  return !!getCurrentAdmin();
};