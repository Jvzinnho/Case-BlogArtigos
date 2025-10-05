import './Recover.css'
import { Link } from 'react-router-dom'
import arrowImage from '../../assets/arrow.png'

export default function Recover() {
  return (
    <main className="recover">
      <div className="recover-container">
        <div className="recover-header">
          <Link className="recover-arrow" to="/login">
            <img src={arrowImage} alt="Voltar" width="16" height="16" />
          </Link>
          <h1 className="recover-title">Esqueci a senha</h1>
        </div>
        
        <p className="recover-description">
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
        
        <form className="recover-form" onSubmit={(e) => e.preventDefault()}>
          <input className="recover-input" type="email" placeholder="Email" required />
          <button className="recover-button" type="submit">Alterar</button>
        </form>
      </div>
    </main>
  )
}



