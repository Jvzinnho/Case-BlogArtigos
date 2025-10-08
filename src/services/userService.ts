import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const userService = {

  async register(userData: RegisterData): Promise<LoginResponse> {
    return await api.request<LoginResponse>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },


  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return await api.request<LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },


  async updateProfile(profileData: { id: string; name?: string; email?: string; password?: string }): Promise<{ user: User }> {
    return await api.request<{ user: User }>('/users/updateProfile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },


  async getUserById(id: string): Promise<User> {
    return await api.request<User>(`/users/${id}`);
  },


  async getAllUsers(): Promise<User[]> {
    return await api.request<User[]>('/users/');
  },

  async getProfile(token: string): Promise<User> {
    return await api.request<User>('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
};
