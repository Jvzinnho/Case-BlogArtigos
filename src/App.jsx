import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/login/Register.jsx'
import ForgotPassword from './pages/login/ForgotPassword.jsx'
import Article from './pages/article/Article.jsx'

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
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
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
