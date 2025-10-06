import './Register.css'
import { Link } from 'react-router-dom'
import arrowImage from '../../assets/arrow.png'

export default function Register() {
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
          Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
        </p>
        
        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <input className="register-input" type="email" placeholder="Email" required />
          <input className="register-input" type="password" placeholder="Senha" required />
          <input className="register-input" type="password" placeholder="Confirmar senha" required />
          
          <button className="register-submit" type="submit">Criar conta</button>
          
          <label className="register-checkbox-label">
            <input className="register-checkbox" type="checkbox" required />
            <span className="register-checkbox-text">
              Li e concordo com os Termos de Uso e a Política de Privacidade.
            </span>
          </label>
        </form>
      </div>
    </main>
  )
}



