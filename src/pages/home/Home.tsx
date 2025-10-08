import { useNavigate } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import { useEffect } from 'react';
import './Home.css'
import avatarDefault from '../../assets/Avatar.png'
import { formatImageUrl } from '../../utils/FormatImageUrl';

export default function Home() {
  const { articles, loadArticles, loading } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const homeArticles = articles.slice(0, 2);

  const handleArticleClick = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      navigate(`/article/${articleId}`, { state: { article } });
    }
  };

  return (
    <main className="home">
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Carregando artigos...</p>
        </div>
      )}
      
      {!loading && homeArticles.length > 0 && (
        <section className="home-grid">
          {homeArticles.map((article) => (
          <article className="home-card" key={article.id}>
            <div 
              className="home-card-media-wrap"
              onClick={() => handleArticleClick(article.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                className="home-card-media" 
                src={formatImageUrl(article.banner_url || '')} 
                alt={article.title} 
              />
            </div>
            <h2 className="home-card-title" onClick={() => handleArticleClick(article.id)} style={{ cursor: 'pointer' }}>
              {article.title}
            </h2>
            <div className="home-card-meta">
              <img className="home-card-avatar" src={avatarDefault} alt="Autor" width="28" height="28" />
              <div className="home-card-byline">
                <span className="home-card-author">Autor</span>
                <time className="home-card-date">{article.createdAt}</time>
              </div>
            </div>
          </article>
        ))}
        </section>
      )}
    </main>
  )
}

