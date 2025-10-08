import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/')
      } else {
        setError('Email ou senha incorretos')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login">
      <div className="login-container">
        <h1 className="login-title">Bem-vindo de volta!</h1>
        <p className="login-description">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
        </p>
        
        <form className="login-form" onSubmit={handleSubmit}>
            <input 
              className="login-form-input" 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
      
            <input 
              className="login-form-input" 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          
          <div className="login-form-actions">
            <Link className="login-form-link" to="/esqueci-senha">Esqueci minha senha</Link>
          </div>
          
          {error && (
            <div style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button 
            className="login-form-button" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="login-form-hint">
          Não tem conta? <Link className="login-form-link" to="/registrar">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}



