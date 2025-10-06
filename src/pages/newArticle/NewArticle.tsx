import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useArticles, Article } from '../../context/ArticleContext';
import './NewArticle.css';

const NewArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addArticle, updateArticle } = useArticles();
  const [editMode, setEditMode] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageNameInput, setImageNameInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Verificar se está em modo de edição
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
        setImageNameInput(articleData.image);
        setImageUrl(articleData.image);
      }
    }
  }, [location.state]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageNameInput(file.name);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Por favor, preencha o título e o conteúdo do artigo.');
      return;
    }

    const imageToUse = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

    if (editMode && articleId) {
      // Atualizar artigo existente
      updateArticle(articleId, {
        title: title.trim(),
        content: content.trim(),
        image: imageToUse
      });
      navigate('/meus-artigos');
    } else {
      // Criar novo artigo
      addArticle({
        title: title.trim(),
        content: content.trim(),
        image: imageToUse
      });
      navigate('/meus-artigos');
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
                {imageFile ? (
                  <div className="image-preview">
                    <img 
                      src={URL.createObjectURL(imageFile)} 
                      alt="Preview" 
                      className="preview-image"
                    />
                  </div>
                ) : imageUrl ? (
                  <div className="image-preview">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="preview-image"
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span>+</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <div className="banner-info">
            <h3 className="banner-title">Banner</h3>
            <input
              type="text"
              className="image-name-input"
              value={imageNameInput}
              onChange={(e) => setImageNameInput(e.target.value)}
              placeholder="Adicione uma imagem"
              onClick={() => document.getElementById('image-upload')?.click()}
              readOnly
            />
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
            >
              {editMode ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
