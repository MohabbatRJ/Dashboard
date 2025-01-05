

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/layout/header/ Header'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/singup/Signup'
import Profile from './pages/profile/Profile'
import NotFound from './pages/not-found/NotFound'
import Footer from './components/layout/footer/Footer'
import ProtectedRoute from './protected-routes/ProtectedRoute'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  

  return (
    <>
      <Router>
        <Header />
        <main className={`h-full px-0 mt-16 ${isLoggedIn ? 'xl:ml-64 ' : ''} `}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
