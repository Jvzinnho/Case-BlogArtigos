import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useArticles, Article } from '../../context/ArticleContext';
import { useAuth } from '../../context/AuthContext';
import { articleService } from '../../services/articleService';
import { validateImage, createImagePreview, formatFileSize } from '../../utils/imageValidation';
import './NewArticle.css';
import { formatImageUrl } from '../../utils/FormatImageUrl';

const NewArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addArticle, updateArticle } = useArticles();
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (location.state) {
      const { editMode: isEditMode, articleData } = location.state as { 
        editMode: boolean; 
        articleData: Article 
      };
      
      if (isEditMode && articleData) {
        setEditMode(true);
        setArticleId(articleData.id);
        setTitle(articleData.title);
        setContent(articleData.content);
        if (articleData.banner_url) {
          setImagePreview(formatImageUrl(articleData.banner_url || ''));
        }
      }
    }
  }, [location.state]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      const validation = validateImage(file);
      if (!validation.isValid) {
        setImageError(validation.error || 'Erro na validação');
        return;
      }
      
      setImageError('');
      setImageFile(file);
      

      try {
        const preview = await createImagePreview(file);
        setImagePreview(preview);
      } catch (error) {
        setImageError('Erro ao processar imagem');
      }
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Por favor, preencha o título e o conteúdo do artigo.');
      return;
    }

    if (!user) {
      alert('Você precisa estar logado para criar um artigo.');
      navigate('/login');
      return;
    }

    if (content.length < 51) {
      alert('O conteúdo do artigo deve ter pelo menos 50 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      if (editMode && articleId) {

        const updatedArticle = await articleService.editArticle({
          id: articleId,
          title: title.trim(),
          content: content.trim(),
          author_id: user.id
        }, imageFile || undefined);
        
        await updateArticle(articleId, {
          title: updatedArticle.title,
          content: updatedArticle.content,
          image: updatedArticle.banner_url || ''
        });
      } else {

        const newArticle = await articleService.createArticle({
          title: title.trim(),
          content: content.trim(),
          author_id: user.id
        }, imageFile || undefined);
        
        await addArticle({
          title: newArticle.title,
          content: newArticle.content,
          image: newArticle.banner_url || '',
          authorId: user.id
        });
      }
      setTimeout(() => {
        window.location.href = '/meus-artigos'
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      alert('Erro ao salvar artigo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-article">
      <div className="new-article-container">
        <div className="new-article-title">
          {editMode ? 'Editar Artigo' : 'Criar Novo Artigo'}
        </div>
        
        <div className="banner-section">
          <div className="banner-image-container">
            <div className="image-upload-area">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-upload-input"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                {imagePreview ? (
                  <div className="image-preview">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="preview-image"
                    />
                    {imageFile && (
                      <div className="image-info">
                        <span className="image-name">{imageFile.name}</span>
                        <span className="image-size">({formatFileSize(imageFile.size)})</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span>+</span>
                    <p>Clique para adicionar uma imagem</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <div className="banner-info">
            <h3 className="banner-title">Banner</h3>
            {imageError && (
              <div className="image-error">
                {imageError}
              </div>
            )}
            <div className="image-upload-hint">
              Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)
            </div>
          </div>
        </div>

        <div className="new-article-form">
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Titulo</label>
              <input
                type="text"
                id="title"
                className="form-input-small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Adicione um título"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">Texto</label>
              <textarea
                id="content"
                className="form-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva seu artigo"
                rows={15}
              />
            </div>
          </div>

          <div className="save-section">
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : (editMode ? 'Atualizar' : 'Salvar')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
