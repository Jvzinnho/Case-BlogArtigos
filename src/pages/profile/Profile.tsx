import './profile.css'
import { useAuth } from '../../context/AuthContext'
import avatarDefault from '../../assets/Avatar.png'

export default function Profile() {
  const { user } = useAuth()
  return (
    <main className="profile">
      <div className="profile-container">
        
        <div className="profile-content">
          <div className="profile-avatar-section">
            <img className="profile-avatar" src={avatarDefault} alt="Foto do perfil" />
          </div>
          
          <div className="profile-form-section">
            <div className="profile-form-group">
              <div className="profile-form-row">
                <div className="profile-form-field">
                  <label className="profile-form-label">Nome</label>
                  <input 
                    className="profile-form-input" 
                    type="text" 
                    placeholder="Seu nome" 
                    value={user?.name || ''} 
                  />
                </div>
                <div className="profile-form-field">
                  <label className="profile-form-label">Sobrenome</label>
                  <input 
                    className="profile-form-input" 
                    type="text" 
                    placeholder="Seu sobrenome" 
                  />
                </div>
              </div>
            </div>
            
            <div className="profile-form-divider"></div>
            
            <div className="profile-form-group">
              <div className="profile-form-field">
                <label className="profile-form-label">Email</label>
                <input 
                  className="profile-form-input" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={user?.email || ''} 
                />
              </div>
              <div className="profile-form-field">
                <label className="profile-form-label">Senha</label>
                <input 
                  className="profile-form-input" 
                  type="password" 
                  placeholder="••••••••" 
                  value="••••••••" 
                  readOnly
                />
              </div>
              <div className="profile-form-field">
                <label className="profile-form-label">Confirmar senha</label>
                <input 
                  className="profile-form-input" 
                  type="password" 
                  placeholder="••••••••" 
                  value="••••••••" 
                  readOnly
                />
              </div>
            </div>
            
            <button className="profile-form-button" type="button">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
