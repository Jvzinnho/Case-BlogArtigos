import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useArticles, Article } from '../../context/ArticleContext';
import './ArticleView.css';
import { formatImageUrl } from '../../utils/FormatImageUrl';

const ArticleView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getArticleById } = useArticles();
  

  const article = location.state?.article as Article || (id ? getArticleById(id) : undefined);

  if (!article) {
    return (
      <div className="article-view">
        <div className="article-not-found">
          <h2>Artigo não encontrado</h2>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-view">
      <div className="article-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        
        <div className="article-item">
          <div className="article-item-image">
            <img src={formatImageUrl(article.banner_url || '')} alt={article.title} />
          </div>
          <div className="article-item-meta">
            <img className="article-item-avatar" src="/src/assets/Avatar.png" alt="Autor" width="28" height="28" />
            <div className="article-item-byline">
              <span className="article-item-author">Autor</span>
              <time className="article-item-date">{article.createdAt}</time>
              <div className="article-likes">
                <span className="heart-icon">♥</span>
                <span className="likes-count">{article.likes}</span>
              </div>
            </div>
          </div>
          <h1 className="article-item-title">{article.title}</h1>
          <div className="article-item-text">
            <div className="article-item-full-content">
              <p>{article.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
