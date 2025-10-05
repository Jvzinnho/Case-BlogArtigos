import './Navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import avatarDefault from '../assets/Avatar.png'
import logoImage from '../assets/Logo.png'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  return (
    <header className="navbar">
      <nav className="navbar-card">
        <div className="navbar-card-left">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/artigos" className="navbar-link">Artigos</Link>
        </div>
        <div className="navbar-card-right">
          <Link to="/login" className="navbar-link">Login</Link>
          <div className="navbar-avatar-container">
            <img
              className="navbar-avatar"
              src={avatarDefault}
              alt="Avatar do usuário"
              width="32"
              height="32"
              onClick={toggleDropdown}
              style={{ marginLeft: 12, cursor: 'pointer' }}
            />
            {isDropdownOpen && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <img className="navbar-dropdown-logo" src={logoImage} alt="Logo" />
                  <button className="navbar-dropdown-close" onClick={closeDropdown}>
                    ✕
                  </button>
                </div>
                <div className="navbar-dropdown-menu">
                  <Link to="/perfil" className="navbar-dropdown-item" onClick={closeDropdown}>
                    Perfil
                  </Link>
                  <Link to="/meus-artigos" className="navbar-dropdown-item" onClick={closeDropdown}>
                    Meus Artigos
                  </Link>
                  <Link to="/criar-artigo" className="navbar-dropdown-item" onClick={closeDropdown}>
                    Criar novo Artigo
                  </Link>
                </div>
                <div className="navbar-dropdown-bottom">
                  <Link to="/login" className="navbar-dropdown-item navbar-dropdown-item--logout" onClick={closeDropdown}>
                    Sair
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

