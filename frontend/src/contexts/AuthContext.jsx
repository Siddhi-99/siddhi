import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // API base URL
  const API_BASE_URL = 'http://localhost:8000';

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!(user || admin) && !!token;
  };

  // Check if user is admin
  const isAdmin = () => {
    return !!admin && admin.role === 'admin';
  };

  // Check if user is regular user
  const isUser = () => {
    return !!user && user.role === 'user';
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Login admin
  const loginAdmin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAdmin(data.admin);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Signup user
  const signupUser = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Signup admin
  const signupAdmin = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Admin signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  };

  // Get current user profile
  const getProfile = async () => {
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else if (data.admin) {
          setAdmin(data.admin);
          localStorage.setItem('admin', JSON.stringify(data.admin));
        }
        return data;
      } else {
        // Token is invalid, logout
        logout();
        return null;
      }
    } catch (error) {
      console.error('Get profile error:', error);
      logout();
      return null;
    }
  };

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check if we have a token
      if (token) {
        // Try to get profile to validate token
        await getProfile();
      } else {
        // Check localStorage for existing user/admin data
        const savedUser = localStorage.getItem('user');
        const savedAdmin = localStorage.getItem('admin');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        if (savedAdmin) {
          setAdmin(JSON.parse(savedAdmin));
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    admin,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    isUser,
    loginUser,
    loginAdmin,
    signupUser,
    signupAdmin,
    logout,
    getProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
