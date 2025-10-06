import React, { useState } from 'react';
import './NewArticle.css';

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');
  const [imageNameInput, setImageNameInput] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
      setImageNameInput(file.name);
    }
  };

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar o artigo
    console.log('Salvando artigo:', { title, content, imageFile });
  };

  return (
    <div className="new-article">
      <div className="new-article-container">
        <div className="new-article-title">Editar Artigo</div>
        
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
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
