import React, { createContext, useContext, useState, ReactNode } from 'react';
import image1 from '../assets/Image1 home.png';
import image2 from '../assets/image 2 home.png';

export interface Article {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  modifiedAt: string;
  likes: number;
  content: string;
  authorId: string;
}

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'createdAt' | 'modifiedAt' | 'likes'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
  getUserArticles: (authorId: string) => Article[];
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

// Artigos iniciais (2 artigos da home)
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

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const addArticle = (newArticle: Omit<Article, 'id' | 'createdAt' | 'modifiedAt' | 'likes'>) => {
    const id = Date.now().toString();
    const now = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const article: Article = {
      ...newArticle,
      id,
      createdAt: now,
      modifiedAt: now,
      likes: 0
    };
    
    setArticles(prev => [...prev, article]);
  };

  const updateArticle = (id: string, updatedArticle: Partial<Article>) => {
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
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
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
      addArticle,
      updateArticle,
      deleteArticle,
      getArticleById,
      getUserArticles
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
