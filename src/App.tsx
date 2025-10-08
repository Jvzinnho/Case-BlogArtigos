import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ArticleProvider } from './context/ArticleContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import Recover from './pages/Login/Recover'
import Article from './pages/article/Article'
import Profile from './pages/profile/Profile'
import NewArticle from './pages/newArticle/NewArticle'
import MyArticle from './pages/myArticle/MyArticle'
import ArticleView from './pages/articleView/ArticleView'

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
        <Route path="/perfil" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/criar-artigo" element={
          <ProtectedRoute>
            <NewArticle />
          </ProtectedRoute>
        } />
        <Route path="/meus-artigos" element={
          <ProtectedRoute>
            <MyArticle />
          </ProtectedRoute>
        } />
        <Route path="/new-article" element={
          <ProtectedRoute>
            <NewArticle />
          </ProtectedRoute>
        } />
        <Route path="/article/:id" element={<ArticleView />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    
      <AuthProvider>
        <ArticleProvider>
          <Router>
            <AppContent />
          </Router>
        </ArticleProvider>
      </AuthProvider>
    
  )
}

export default App
