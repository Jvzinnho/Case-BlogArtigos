import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import Recover from './pages/Login/Recover'
import Article from './pages/article/Article'
import Profile from './pages/profile/Profile'
import NewArticle from './pages/newArticle/NewArticle'

function AppContent() {
  const location = useLocation()
  const isAuthPage = ['/login', '/registrar', '/esqueci-senha'].includes(location.pathname)
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/esqueci-senha" element={<Recover />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/criar-artigo" element={<NewArticle />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
