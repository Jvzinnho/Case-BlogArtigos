import './profile.css'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import avatarDefault from '../../assets/Avatar.png'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')


  useEffect(() => {
    if (user) {

      const fullName = user.name || ''
      const nameParts = fullName.split(' ')
      setFirstName(nameParts[0] || '')
      setLastName(nameParts.slice(1).join(' ') || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      setMessage('As senhas não coincidem')
      return
    }

    try {
      setIsLoading(true)
      setMessage('')
      
      const profileData: { name?: string; email?: string; password?: string } = {}
      
      if (firstName.trim() || lastName.trim()) {
        profileData.name = `${firstName.trim()} ${lastName.trim()}`.trim()
      }
      
      if (email !== user?.email) {
        profileData.email = email
      }
      
      if (password) {
        profileData.password = password
      }

      const success = await updateProfile(profileData)
      if (success) {
        setMessage('Perfil atualizado com sucesso!')
        setPassword('')
        setConfirmPassword('')
      } else {
        setMessage('Erro ao atualizar perfil')
      }
    } catch (error) {
      setMessage('Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="profile-form-field">
                  <label className="profile-form-label">Sobrenome</label>
                  <input 
                    className="profile-form-input" 
                    type="text" 
                    placeholder="Seu sobrenome" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profile-form-field">
                <label className="profile-form-label">Nova Senha (opcional)</label>
                <input 
                  className="profile-form-input" 
                  type="password" 
                  placeholder="Nova senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="profile-form-field">
                <label className="profile-form-label">Confirmar Nova Senha</label>
                <input 
                  className="profile-form-input" 
                  type="password" 
                  placeholder="Confirmar nova senha" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            
            {message && (
              <div style={{ 
                color: message.includes('sucesso') ? 'green' : 'red', 
                fontSize: '0.875rem', 
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                {message}
              </div>
            )}
            
            <button 
              className="profile-form-button" 
              type="button"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
