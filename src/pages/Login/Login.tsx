import './Login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <main className="login">
      <div className="login-container">
        <h1 className="login-title">Bem-vindo de volta!</h1>
        <p className="login-description">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
        </p>
        
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <input className="login-form-input" type="email" placeholder="Email" required />
      
            <input className="login-form-input" type="password" placeholder="Senha" required />
          
          <div className="login-form-actions">
            <Link className="login-form-link" to="/esqueci-senha">Esqueci minha senha</Link>
          </div>
          <button className="login-form-button" type="submit">Entrar</button>
        </form>
        <p className="login-form-hint">
          Não tem conta? <Link className="login-form-link" to="/registrar">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}



