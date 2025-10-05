import './Login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <main className="auth auth--login">
      <div className="auth__container">
        <h1 className="auth__title">Bem-vindo de volta!</h1>
        <p className="auth__description">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
        </p>
        
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <label className="auth__label">
            Email
            <input className="auth__input" type="email" placeholder="seu@email.com" required />
          </label>
          <label className="auth__label">
            Senha
            <input className="auth__input" type="password" placeholder="••••••••" required />
          </label>
          <div className="auth__actions">
            <Link className="auth__link" to="/esqueci-senha">Esqueci minha senha</Link>
          </div>
          <button className="auth__submit" type="submit">Entrar</button>
        </form>
        <p className="auth__hint">
          Não tem conta? <Link className="auth__link" to="/registrar">Criar conta</Link>
        </p>
      </div>
    </main>
  )
}



