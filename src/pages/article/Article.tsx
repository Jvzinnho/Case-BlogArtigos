import './Article.css'
import { useState } from 'react'
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
    preview: 'A inteligência artificial está revolucionando a maneira como as empresas operam e se relacionam com seus clientes. Desde chatbots até algoritmos de aprendizado de máquina, a IA está transformando setores inteiros e criando novas oportunidades de negócio que antes eram inimagináveis.',
    content: `A inteligência artificial está revolucionando a maneira como as empresas operam e se relacionam com seus clientes. Desde chatbots até algoritmos de aprendizado de máquina, a IA está transformando setores inteiros e criando novas oportunidades de negócio que antes eram inimagináveis.

Nos últimos anos, vimos uma explosão de aplicações práticas da IA em diversos setores. No varejo, algoritmos de recomendação personalizam a experiência do cliente. Na saúde, sistemas de diagnóstico por imagem auxiliam médicos a identificar doenças com maior precisão. Na indústria, sensores inteligentes otimizam processos de produção em tempo real.

O impacto da IA vai além da automação de tarefas repetitivas. Ela está criando novos modelos de negócio e transformando a forma como tomamos decisões. Empresas que abraçam essa tecnologia estão vendo aumentos significativos em eficiência, redução de custos e melhoria na qualidade dos serviços oferecidos.

No entanto, a implementação da IA também traz desafios. Questões de privacidade, viés algorítmico e o impacto no mercado de trabalho são temas que precisam ser cuidadosamente considerados. É fundamental que as organizações desenvolvam estratégias éticas e responsáveis para o uso dessa tecnologia.

O futuro da IA promete ainda mais inovações. Com o desenvolvimento de sistemas mais avançados e a integração com outras tecnologias emergentes como IoT e blockchain, estamos apenas no início de uma transformação digital que moldará o mundo dos negócios nas próximas décadas.`
  },
  {
    id: '2',
    title: 'Computação Quântica: O Próximo Grande Salto para a Tecnologia',
    image: image2,
    author: { name: 'Bruno Lima', avatar: avatarDefault },
    date: '2025-01-12',
    preview: 'A computação quântica representa uma revolução tecnológica que promete resolver problemas complexos em segundos, algo que levaria milhares de anos para os computadores tradicionais. Com o poder dos qubits, estamos à beira de uma nova era computacional.',
    content: `A computação quântica representa uma revolução tecnológica que promete resolver problemas complexos em segundos, algo que levaria milhares de anos para os computadores tradicionais. Com o poder dos qubits, estamos à beira de uma nova era computacional.

Diferentemente dos bits tradicionais que existem apenas em estados de 0 ou 1, os qubits podem existir em múltiplos estados simultaneamente através do fenômeno da superposição quântica. Isso permite que computadores quânticos processem informações de forma exponencialmente mais rápida que os sistemas convencionais.

As aplicações potenciais são vastas e revolucionárias. Na criptografia, a computação quântica pode quebrar códigos que hoje são considerados seguros, mas também pode criar novos métodos de criptografia ultra-seguros. Na medicina, pode acelerar significativamente o desenvolvimento de novos medicamentos através da simulação molecular.

Grandes empresas como IBM, Google e Microsoft estão investindo pesadamente em pesquisa e desenvolvimento de computadores quânticos. Recentemente, vimos marcos importantes como a demonstração da supremacia quântica pelo Google e o lançamento de serviços quânticos em nuvem pela IBM.

Apesar dos avanços, ainda enfrentamos desafios significativos. A estabilidade dos qubits, o controle de erros e a escalabilidade são questões técnicas que precisam ser resolvidas antes que a computação quântica se torne amplamente acessível. Mas o progresso é constante e promissor.

O futuro da computação quântica não está distante. Especialistas preveem que em uma década teremos sistemas quânticos práticos que transformarão indústrias inteiras, desde finanças até inteligência artificial, abrindo possibilidades que hoje só existem na ficção científica.`
  }
]

export default function Article() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const toggleExpansion = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId)
  }

  return (
    <main className="article">
      <div className="article-container">
        <div className="article-grid">
          {mockArticles.map((article) => (
            <div className="article-item" key={article.id}>
              <div className="article-item-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article-item-content">
                <h2 className="article-item-title">{article.title}</h2>
                <div 
                  className="article-item-text"
                  onClick={() => toggleExpansion(article.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {expandedArticle === article.id ? (
                    <div className="article-item-full-content">
                      {article.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="article-item-preview">{article.preview}</p>
                  )}
                </div>
                <div className="article-item-meta">
                  <img className="article-item-avatar" src={article.author.avatar} alt={article.author.name} width="28" height="28" />
                  <div className="article-item-byline">
                    <span className="article-item-author">{article.author.name}</span>
                    <time className="article-item-date" dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
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
