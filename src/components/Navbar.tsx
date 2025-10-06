import './Navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import avatarDefault from '../assets/Avatar.png'
import logoImage from '../assets/Logo.png'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeDropdown()
  }

  return (
    <header className="navbar">
      <nav className="navbar-card">
        <div className="navbar-card-left">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/artigos" className="navbar-link">Artigos</Link>
        </div>
        <div className="navbar-card-right">
          {!isAuthenticated && (
            <Link to="/login" className="navbar-link">Login</Link>
          )}
          
          {isAuthenticated && (
            <span className="navbar-user-name" style={{ marginRight: '12px', fontSize: '0.875rem', color: '#64748b' }}>
              Olá, {user?.name}
            </span>
          )}
          
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
                  {!isAuthenticated ? (
                    <>
                      <Link to="/login" className="navbar-dropdown-item" onClick={closeDropdown}>
                        Perfil
                      </Link>
                      <Link to="/login" className="navbar-dropdown-item" onClick={closeDropdown}>
                        Meus Artigos
                      </Link>
                      <Link to="/login" className="navbar-dropdown-item" onClick={closeDropdown}>
                        Criar novo Artigo
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/perfil" className="navbar-dropdown-item" onClick={closeDropdown}>
                        Perfil
                      </Link>
                      <Link to="/meus-artigos" className="navbar-dropdown-item" onClick={closeDropdown}>
                        Meus Artigos
                      </Link>
                      <Link to="/criar-artigo" className="navbar-dropdown-item" onClick={closeDropdown}>
                        Criar novo Artigo
                      </Link>
                    </>
                  )}
                </div>
                {isAuthenticated && (
                  <div className="navbar-dropdown-bottom">
                    <Link 
                      to="/login" 
                      className="navbar-dropdown-item navbar-dropdown-item--logout" 
                      onClick={handleLogout}
                    >
                      Sair
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

