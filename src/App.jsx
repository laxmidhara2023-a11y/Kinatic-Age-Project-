import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import AppContextProvider, { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Toast notification component
const ToastNotification = () => {
  const { toast } = useContext(AppContext)

  if (!toast) return null

  return (
    <div className='fixed bottom-6 right-6 z-50 animate-fade-in'>
      <div className={`px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-semibold ${toast.type === 'error' ? 'bg-red-900 text-white border-red-800' : 'bg-slate-900 text-white border-slate-800'}`}>
        {toast.type === 'error' ? (
          <AlertCircle className='w-4 h-4 text-red-400 shrink-0' />
        ) : (
          <CheckCircle2 className='w-4 h-4 text-emerald-400 shrink-0' />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  )
}

const AppContent = () => {
  return (
    <div className='min-h-screen bg-slate-50/50 flex flex-col text-slate-800 antialiased selection:bg-primary selection:text-white'>
      <ScrollToTop />
      <Navbar />
      
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
      <ToastNotification />
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </Router>
  )
}

export default App
