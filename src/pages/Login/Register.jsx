import './Register.css'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <main className="auth auth--register">
      <div className="auth__container">
        <h1 className="auth__title">Criar conta</h1>
        <p className="auth__description">
          Junte-se a nós e tenha acesso a artigos exclusivos, favoritar e muito mais.
        </p>
        
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <label className="auth__label">
            Nome
            <input className="auth__input" type="text" placeholder="Seu nome" required />
          </label>
          <label className="auth__label">
            Email
            <input className="auth__input" type="email" placeholder="seu@email.com" required />
          </label>
          <label className="auth__label">
            Senha
            <input className="auth__input" type="password" placeholder="••••••••" required />
          </label>
          <button className="auth__submit" type="submit">Registrar</button>
        </form>
        <p className="auth__hint">
          Já tem conta? <Link className="auth__link" to="/login">Entrar</Link>
        </p>
      </div>
    </main>
  )
}



