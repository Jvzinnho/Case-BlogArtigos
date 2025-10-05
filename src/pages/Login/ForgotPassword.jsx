import './ForgotPassword.css'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <main className="auth auth--forgot">
      <div className="auth__container">
        <h1 className="auth__title">Recuperar senha</h1>
        <p className="auth__description">
          Informe seu email e enviaremos um link para redefinição da sua senha.
        </p>
        
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <label className="auth__label">
            Email
            <input className="auth__input" type="email" placeholder="seu@email.com" required />
          </label>
          <button className="auth__submit" type="submit">Enviar link</button>
        </form>
        <p className="auth__hint">
          <Link className="auth__link" to="/login">Voltar ao login</Link>
        </p>
      </div>
    </main>
  )
}



