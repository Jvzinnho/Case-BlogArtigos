import './Register.css'
import { Link } from 'react-router-dom'
import arrowImage from '../../assets/arrow.png'

export default function Register() {
  return (
    <main className="auth auth--register">
      <div className="auth__container">
        <div className="auth__header">
          <Link className="auth__back-arrow" to="/login">
            <img src={arrowImage} alt="Voltar" width="24" height="24" />
          </Link>
          <h1 className="auth__title">Registrar</h1>
        </div>
        
        <p className="auth__description">
          Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
        </p>
        
        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <input className="auth__input" type="email" placeholder="Email" required />
          <input className="auth__input" type="password" placeholder="Senha" required />
          <input className="auth__input" type="password" placeholder="Confirmar senha" required />
          
          <button className="auth__submit" type="submit">Criar conta</button>
          
          <label className="auth__checkbox-label">
            <input className="auth__checkbox" type="checkbox" required />
            <span className="auth__checkbox-text">
              Li e concordo com os Termos de Uso e a Política de Privacidade.
            </span>
          </label>
        </form>
      </div>
    </main>
  )
}



