import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock de usuários para teste
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'teste@teste.com',
    password: '123456',
    name: 'Usuário Teste',
    createdAt: 'Janeiro 1, 2025'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há usuário logado no localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar se email já existe
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // Criar novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    
    // Adicionar ao mock de usuários
    mockUsers.push({ ...newUser, password });
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout
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
