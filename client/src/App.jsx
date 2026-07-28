import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Login from './pages/Login'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/bbanking/auth/login" replace />
  }
  return children
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/bbanking/auth/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="p-6">Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/bbanking/auth/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App