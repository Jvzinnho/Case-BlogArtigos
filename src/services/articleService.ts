import { API_CONFIG } from '../config/api';
import { api } from './api';

export interface Article {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at?: string;
  banner_url?: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  author_id: string;
}

export interface EditArticleData {
  id: string;
  title: string;
  content: string;
  author_id: string;
}

export interface DeleteArticleData {
  id: string;
  author_id: string;
}

export const articleService = {

  async createArticle(articleData: CreateArticleData, imageFile?: File): Promise<Article> {
    const formData = new FormData();
    

    formData.append('title', articleData.title);
    formData.append('content', articleData.content);
    formData.append('author_id', articleData.author_id);
    

    if (imageFile) {
      formData.append('banner', imageFile);
    }
    
    return await fetch(`${API_CONFIG.BASE_URL}/articles/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(response => response.json());
  },


  async editArticle(articleData: EditArticleData, imageFile?: File): Promise<Article> {
    const formData = new FormData();
    

    formData.append('id', articleData.id);
    formData.append('title', articleData.title);
    formData.append('content', articleData.content);
    formData.append('author_id', articleData.author_id);
    

    if (imageFile) {
      formData.append('banner', imageFile);
    }
    
    return await fetch(`${API_CONFIG.BASE_URL}/articles/edit`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(response => response.json());
  },


  async deleteArticle(deleteData: DeleteArticleData): Promise<{ message: string }> {
    return await api.request<{ message: string }>('/articles/remove', {
      method: 'DELETE',
      body: JSON.stringify(deleteData)
    });
  },


  async getArticleById(id: string): Promise<Article> {
    return await api.request<Article>(`/articles/${id}`);
  },


  async getAllArticles(): Promise<Article[]> {
    return await api.request<Article[]>('/articles/');
  },


  async getUserArticles(userId: string): Promise<Article[]> {
    return await api.request<Article[]>(`/articles/author/${userId}`);
  }
};
