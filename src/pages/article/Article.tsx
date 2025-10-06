import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/ArticleContext'
import './Article.css'
import avatarDefault from '../../assets/Avatar.png'

export default function Article() {
  const { articles } = useArticles()
  const navigate = useNavigate()
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const toggleExpansion = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId)
  }

  const handleArticleClick = (article: any) => {
    navigate(`/article/${article.id}`, { state: { article } })
  }

  return (
    <main className="article">
      <div className="article-container">
        <div className="article-grid">
          {articles.map((article) => (
            <div className="article-item" key={article.id}>
              <div 
                className="article-item-image"
                onClick={() => handleArticleClick(article)}
                style={{ cursor: 'pointer' }}
              >
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article-item-content">
                <h2 
                  className="article-item-title"
                  onClick={() => handleArticleClick(article)}
                  style={{ cursor: 'pointer' }}
                >
                  {article.title}
                </h2>
                <div 
                  className="article-item-text"
                  onClick={() => toggleExpansion(article.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {expandedArticle === article.id ? (
                    <div className="article-item-full-content">
                      <p>{article.content}</p>
                    </div>
                  ) : (
                    <p className="article-item-preview">
                      {article.content.length > 200 
                        ? `${article.content.substring(0, 200)}...` 
                        : article.content
                      }
                    </p>
                  )}
                </div>
                <div className="article-item-meta">
                  <img className="article-item-avatar" src={avatarDefault} alt="Autor" width="28" height="28" />
                  <div className="article-item-byline">
                    <span className="article-item-author">Autor</span>
                    <time className="article-item-date">{article.createdAt}</time>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
