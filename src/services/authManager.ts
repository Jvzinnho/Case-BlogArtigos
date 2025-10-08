import { userService, User, LoginCredentials, RegisterData } from './userService';
import { api } from './api';

class AuthManager {
  private user: User | null = null;

  constructor() {
    this.user = this.getStoredUser();
    this.initializeAuth();
  }


  private initializeAuth() {
    if (this.user) {

      const token = localStorage.getItem('token');
      if (token) {
        api.setAuthToken(token);
      }
    }
  }


  setUser(userData: User, token?: string) {
    this.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (token) {
      localStorage.setItem('token', token);
      api.setAuthToken(token);
    }
  }


  getStoredUser(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }


  isLoggedIn(): boolean {
    return !!this.user;
  }


  getCurrentUser(): User | null {
    return this.user;
  }


  getUserId(): string | null {
    return this.user?.id || null;
  }


  async login(credentials: LoginCredentials): Promise<{ user: User, token: string }> {
    try {
      const response = await userService.login(credentials);
      this.setUser(response.user, response.token);
      return { user:response.user, token:response.token};
    } catch (error) {
      throw error;
    }
  }


  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await userService.register(userData);
      this.setUser(response.user, response.token);
      return response.user;
    } catch (error) {
      throw error;
    }
  }


  logout() {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.removeAuthToken();
  }


  updateUser(userData: Partial<User>) {
    if (this.user) {
      this.user = { ...this.user, ...userData };
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }


  async updateProfile(profileData: { name?: string; email?: string; password?: string }): Promise<User> {
    try {
      if (!this.user) {
        throw new Error('Usuário não autenticado');
      }

      const response = await userService.updateProfile({
        id: this.user.id,
        ...profileData
      });


      this.updateUser(response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  }
}

export const authManager = new AuthManager();
