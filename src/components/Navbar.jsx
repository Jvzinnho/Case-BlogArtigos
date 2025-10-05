import './Navbar.css'
import { Link } from 'react-router-dom'
import avatarDefault from '../assets/Avatar.png'

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <div className="navbar__left">
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/artigos" className="navbar__link">Artigos</Link>
        </div>
        <div className="navbar__right">
          <Link to="/login" className="navbar__link">Login</Link>
          <img
            className="navbar__avatar"
            src={avatarDefault}
            alt="Avatar do usuário"
            width="32"
            height="32"
            style={{ marginLeft: 12 }}
          />
        </div>
      </nav>
    </header>
  )
}

