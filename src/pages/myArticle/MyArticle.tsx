import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles, Article } from '../../context/ArticleContext';
import './MyArticle.css';
import deleteIcon from '../../assets/delete button.png';
import editIcon from '../../assets/edit button.png';

const MyArticle: React.FC = () => {
  const navigate = useNavigate();
  const { articles, deleteArticle } = useArticles();

  const handleEdit = (article: Article) => {
    // Navegar para a página de edição com os dados do artigo
    navigate('/new-article', { 
      state: { 
        editMode: true, 
        articleData: article 
      } 
    });
  };

  const handleDelete = (articleId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este artigo?')) {
      deleteArticle(articleId);
    }
  };

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  return (
    <div className="my-articles">
      <div className="my-articles-container">
        <h1 className="my-articles-title">Meus Artigos</h1>
        
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-content" onClick={() => handleArticleClick(article)} style={{ cursor: 'pointer' }}>
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                
                <div className="article-info">
                  <h3 className="article-title">{article.title}</h3>
                </div>
              </div>
              
              <div className="article-bottom-section">
                <div className="article-dates">
                  <div className="date-item">
                    <span className="date-label">Criado em:</span>
                    <span className="date-value">{article.createdAt}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">Alterado em:</span>
                    <span className="date-value">{article.modifiedAt}</span>
                  </div>
                </div>
                
                <div className="likes-section">
                  <span className="heart-icon">♥</span>
                  <span className="likes-count">{article.likes}</span>
                </div>
                
                <div className="article-actions">
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleDelete(article.id)}
                    title="Deletar artigo"
                  >
                    <img 
                      src={deleteIcon} 
                      alt="Deletar" 
                      onError={(e) => {
                        console.log('Erro ao carregar ícone delete:', deleteIcon);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </button>
                  
                  <button 
                    className="action-button edit-button"
                    onClick={() => handleEdit(article)}
                    title="Editar artigo"
                  >
                    <img 
                      src={editIcon} 
                      alt="Editar" 
                      onError={(e) => {
                        console.log('Erro ao carregar ícone edit:', editIcon);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyArticle;
