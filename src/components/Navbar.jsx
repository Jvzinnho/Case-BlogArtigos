import './Navbar.css'
import avatarDefault from '../assets/Avatar.png'

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <div className="navbar__left">
          <a href="/" className="navbar__link">Home</a>
          <a href="/artigos" className="navbar__link">Artigos</a>
        </div>
        <div className="navbar__right">
          <img
            className="navbar__avatar"
            src={avatarDefault}
            alt="Avatar do usuário"
            width="32"
            height="32"
          />
        </div>
      </nav>
    </header>
  )
}

