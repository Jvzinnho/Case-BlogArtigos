import './Home.css'
import avatarDefault from '../../assets/Avatar.png'

const mockArticles = [
  {
    id: '1',
    title: 'Introdução ao React com Vite',
    image: 'https://picsum.photos/seed/react/640/360',
    author: { name: 'Ana Souza', avatar: avatarDefault },
    date: '2025-10-05',
  },
  {
    id: '2',
    title: 'Boas práticas de CSS moderno',
    image: 'https://picsum.photos/seed/css/640/360',
    author: { name: 'Bruno Lima', avatar: avatarDefault },
    date: '2025-10-03',
  },
  {
    id: '3',
    title: 'Guia rápido de Hooks',
    image: 'https://picsum.photos/seed/hooks/640/360',
    author: { name: 'Carla Menezes', avatar: avatarDefault },
    date: '2025-10-01',
  },
]

export default function Home() {
  return (
    <main className="home">
      <section className="home__grid">
        {mockArticles.map((article) => (
          <article className="card" key={article.id}>
            <a href={`/artigos/${article.id}`} className="card__media-wrap">
              <img className="card__media" src={article.image} alt={article.title} />
            </a>
            <h2 className="card__title">{article.title}</h2>
            <div className="card__meta">
              <img className="card__avatar" src={article.author.avatar} alt={article.author.name} width="28" height="28" />
              <div className="card__byline">
                <span className="card__author">{article.author.name}</span>
                <time className="card__date" dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

