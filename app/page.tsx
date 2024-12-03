'use client'

import { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Dashboard } from './components/Dashboard'
import { AdminPage } from './components/AdminPage'
import { ModeratorPage } from './components/ModeratorPage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  const navigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleLogin = (username: string, role: string) => {
    setUser({ username, role })
    navigate('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    navigate('home')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />
      case 'register':
        return <Register onRegister={() => navigate('login')} />
      case 'dashboard':
        return user ? <Dashboard user={user} onNavigate={navigate} onLogout={handleLogout} /> : null
      case 'admin':
        return user?.role === 'admin' ? <AdminPage /> : <Unauthorized />
      case 'moderator':
        return user?.role === 'admin' || user?.role === 'moderator' ? <ModeratorPage /> : <Unauthorized />
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to RBAC Demo</h1>
            <div className="space-y-4">
              <button onClick={() => navigate('login')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
              <button onClick={() => navigate('register')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register</button>
            </div>
          </div>
        )
    }
  }

  return <div className="container mx-auto px-4">{renderPage()}</div>
}

function Unauthorized() {
  return <div className="text-red-500 text-center mt-8">You are not authorized to view this page.</div>
}

