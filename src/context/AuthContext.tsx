import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authManager } from '../services/authManager';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom'

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (profileData: { name?: string; email?: string; password?: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeAuth = async () => {
      const userData = await userService.getProfile(localStorage.getItem('token') || '');
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    if (!user)
      initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { user: userData, token } = await authManager.login({ email, password });
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const userData = await authManager.register({ name, email, password });
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: { name?: string; email?: string; password?: string }): Promise<boolean> => {
    try {
      setLoading(true);
      const userData = await authManager.updateProfile(profileData);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authManager.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      updateProfile,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
