import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import RefreshHandler from './utils/RefreshHandler'
import { useState } from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import Forgot from './pages/auth/Forgot'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
     <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgot-password" element={<Forgot/>} />
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>} />} />
    </Routes>
    </>
  )
}

export default App