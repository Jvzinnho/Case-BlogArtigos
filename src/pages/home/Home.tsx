import { useNavigate } from 'react-router-dom';
import { useArticles } from '../../context/ArticleContext';
import './Home.css'
import avatarDefault from '../../assets/Avatar.png'

export default function Home() {
  const { articles } = useArticles();
  const navigate = useNavigate();

  // Mostrar apenas os 2 primeiros artigos na home
  const homeArticles = articles.slice(0, 2);

  const handleArticleClick = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      navigate(`/article/${articleId}`, { state: { article } });
    }
  };

  return (
    <main className="home">
      <section className="home-grid">
        {homeArticles.map((article) => (
          <article className="home-card" key={article.id}>
            <div 
              className="home-card-media-wrap"
              onClick={() => handleArticleClick(article.id)}
              style={{ cursor: 'pointer' }}
            >
              <img className="home-card-media" src={article.image} alt={article.title} />
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
    </main>
  )
}

