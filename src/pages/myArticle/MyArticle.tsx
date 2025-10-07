import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles, Article } from '../../context/ArticleContext';
import { useAuth } from '../../context/AuthContext';
import './MyArticle.css';

const MyArticle: React.FC = () => {
  const navigate = useNavigate();
  const { getUserArticles, deleteArticle } = useArticles();
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  
  // Pegar apenas os artigos do usuário logado
  const userArticles = user ? getUserArticles(user.id) : [];

  const handleEdit = (article: Article) => {
    // Navegar para a página de edição com os dados do artigo
    navigate('/new-article', { 
      state: { 
        editMode: true, 
        articleData: article 
      } 
    });
  };

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (articleToDelete) {
      deleteArticle(articleToDelete.id);
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setArticleToDelete(null);
  };

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  return (
    <div className="my-articles">
      <div className="my-articles-container">
        <h1 className="my-articles-title">Meus Artigos</h1>
        
        <div className="articles-list">
          {userArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>Você ainda não criou nenhum artigo.</p>
              <button 
                onClick={() => navigate('/criar-artigo')}
                style={{
                  marginTop: '16px',
                  padding: '12px 24px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Criar Primeiro Artigo
              </button>
            </div>
          ) : (
            userArticles.map((article) => (
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
                    onClick={() => handleDeleteClick(article)}
                    title="Deletar artigo"
                  >
                    🗑️
                  </button>
                  
                  <button 
                    className="action-button edit-button"
                    onClick={() => handleEdit(article)}
                    title="Editar artigo"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && articleToDelete && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2 className="delete-modal-title">Excluir Artigo?</h2>
            
            <div className="article-preview-card">
              <h3 className="article-preview-title">{articleToDelete.title}</h3>
              <div className="article-preview-dates">
                <div className="preview-date-item">
                  <span className="preview-date-label">Criado em:</span>
                  <span className="preview-date-value">{articleToDelete.createdAt}</span>
                </div>
                <div className="preview-date-item">
                  <span className="preview-date-label">Alterado em:</span>
                  <span className="preview-date-value">{articleToDelete.modifiedAt}</span>
                </div>
              </div>
            </div>
            
            <p className="delete-confirmation-text">
              Tem certeza de que deseja excluir este artigo? Esta ação não poderá ser desfeita.
            </p>
            
            <div className="delete-modal-buttons">
              <button 
                className="cancel-button"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleConfirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticle;
