import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { articleService, Article as ApiArticle } from '../services/articleService';
import { authManager } from '../services/authManager';
import { debugApiResponse, extractArrayFromResponse } from '../utils/debugApi';




export interface Article {
  id: string;
  title: string;
  image?: string;
  banner_url?: string;
  createdAt: string;
  modifiedAt?: string;
  likes?: number;
  content: string;
  authorId: string;
}

interface ArticleContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  addArticle: (article: Omit<Article, 'id' | 'createdAt' | 'modifiedAt' | 'likes'>) => Promise<void>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  getArticleById: (id: string) => Article | undefined;
  getUserArticles: (authorId: string) => Article[];
  loadArticles: () => Promise<void>;
  loadUserArticles: (authorId: string) => Promise<void>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);


/*
const initialArticles: Article[] = [
  {
    id: '1',
    title: 'Desvendando o JavaScript: Dicas e Técnicas Essenciais para Desenvolvedores',
    image: image1,
    createdAt: 'Janeiro 15, 2025',
    modifiedAt: 'Janeiro 20, 2025',
    likes: 16,
    content: 'JavaScript é uma das linguagens de programação mais populares do mundo. Neste artigo, exploraremos técnicas avançadas que todo desenvolvedor deveria conhecer. Desde closures até async/await, vamos desvendar os segredos que fazem do JavaScript uma linguagem tão poderosa e flexível.',
    authorId: 'admin'
  },
  {
    id: '2',
    title: 'TypeScript: A Evolução Natural do JavaScript para Desenvolvimento Moderno',
    image: image2,
    createdAt: 'Janeiro 12, 2025',
    modifiedAt: 'Janeiro 18, 2025',
    likes: 12,
    content: 'TypeScript representa uma evolução natural do JavaScript, adicionando tipagem estática e ferramentas de desenvolvimento mais robustas. Descubra como TypeScript pode transformar sua experiência de desenvolvimento, oferecendo melhor IntelliSense, detecção precoce de erros e código mais maintível.',
    authorId: 'admin'
  }
];
*/


const initialArticles: Article[] = [];

const convertApiArticleToFrontend = (apiArticle: ApiArticle): Article => {
  return {
    id: apiArticle.id,
    title: apiArticle.title,
    content: apiArticle.content,
    authorId: apiArticle.author_id,
    banner_url: apiArticle.banner_url,
    createdAt: new Date(apiArticle.created_at).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    modifiedAt: apiArticle.updated_at 
      ? new Date(apiArticle.updated_at).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : undefined,
    likes: 0 // API não tem likes ainda
  };
};

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  console.log('ArticleProvider renderizado, articles:', articles.length, 'loading:', loading, 'error:', error);


  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await articleService.getAllArticles();
      

      debugApiResponse('getAllArticles', response);
      

      const apiArticles = extractArrayFromResponse(response);
      
      const convertedArticles = apiArticles.map(convertApiArticleToFrontend);
      setArticles(convertedArticles);
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
      setError('Erro ao carregar artigos');

      setArticles(prev => prev.length > 0 ? prev : []);
    } finally {
      setLoading(false);
    }
  };


  const loadUserArticles = async (authorId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await articleService.getUserArticles(authorId);
      

      debugApiResponse('getUserArticles', response);
      

      const apiArticles = extractArrayFromResponse(response);
      
      const convertedArticles = apiArticles.map(convertApiArticleToFrontend);
      setArticles(convertedArticles);
    } catch (error) {
      console.error('Erro ao carregar artigos do usuário:', error);
      setError('Erro ao carregar artigos do usuário');
    } finally {
      setLoading(false);
    }
  };


  const addArticle = async (newArticle: Omit<Article, 'id' | 'createdAt' | 'modifiedAt' | 'likes'>) => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = authManager.getUserId();
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      const apiArticle = await articleService.createArticle({
        title: newArticle.title,
        content: newArticle.content,
        author_id: userId
      });

      const convertedArticle = convertApiArticleToFrontend(apiArticle);
      setArticles(prev => [...prev, convertedArticle]);
    } catch (error) {
      console.error('Erro ao criar artigo:', error);
      setError('Erro ao criar artigo');
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const updateArticle = async (id: string, updatedArticle: Partial<Article>) => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = authManager.getUserId();
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      await articleService.editArticle({
        id,
        title: updatedArticle.title || '',
        content: updatedArticle.content || '',
        author_id: userId
      });


      setArticles(prev => prev.map(article => 
        article.id === id 
          ? { 
              ...article, 
              ...updatedArticle, 
              modifiedAt: new Date().toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }
          : article
      ));
    } catch (error) {
      console.error('Erro ao atualizar artigo:', error);
      setError('Erro ao atualizar artigo');
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const deleteArticle = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = authManager.getUserId();
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      await articleService.deleteArticle({
        id,
        author_id: userId
      });

      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      setError('Erro ao excluir artigo');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  const getUserArticles = (authorId: string) => {
    return articles.filter(article => article.authorId === authorId);
  };

  return (
    <ArticleContext.Provider value={{
      articles,
      loading,
      error,
      addArticle,
      updateArticle,
      deleteArticle,
      getArticleById,
      getUserArticles,
      loadArticles,
      loadUserArticles
    }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
