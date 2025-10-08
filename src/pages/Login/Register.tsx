import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import arrowImage from '../../assets/arrow.png'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setIsLoading(false)
      return
    }

    if (!termsAccepted) {
      setError('Você deve aceitar os Termos de Uso e Política de Privacidade')
      setIsLoading(false)
      return
    }

    try {

      const success = await register(email, password)
      if (success) {
        navigate('/')
      } else {
        setError('Este email já está em uso')
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="register">
      <div className="register-container">
        <div className="register-header">
          <Link className="register-back-arrow" to="/login">
            <img src={arrowImage} alt="Voltar" width="24" height="24" />
          </Link>
          <h1 className="register-title">Registrar</h1>
        </div>
        
        <p className="register-description">
          Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade. Você poderá completar seu perfil depois.
        </p>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <input 
            className="register-input" 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            className="register-input" 
            type="password" 
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input 
            className="register-input" 
            type="password" 
            placeholder="Confirmar senha" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          
          {error && (
            <div style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button 
            className="register-submit" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
          
          <label className="register-checkbox-label">
            <input 
              className="register-checkbox" 
              type="checkbox" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span className="register-checkbox-text">
              Li e concordo com os Termos de Uso e a Política de Privacidade.
            </span>
          </label>
        </form>
      </div>
    </main>
  )
}



