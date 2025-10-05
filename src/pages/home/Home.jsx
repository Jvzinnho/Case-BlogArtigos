import './Home.css'
import avatarDefault from '../../assets/Avatar.png'
import image1 from '../../assets/Image1 home.png'
import image2 from '../../assets/image 2 home.png'

const mockArticles = [
  {
    id: '1',
    title: 'Inteligência Artificial: O Futuro da Automação e da Transformação Digital',
    image: image1,
    author: { name: 'Ana Souza', avatar: avatarDefault },
    date: '2025-01-15',
  },
  {
    id: '2',
    title: 'Computação Quântica: O Próximo Grande Salto para a Tecnologia',
    image: image2,
    author: { name: 'Bruno Lima', avatar: avatarDefault },
    date: '2025-01-12',
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

