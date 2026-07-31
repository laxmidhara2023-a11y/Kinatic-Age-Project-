import React, { useContext, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { 
  Stethoscope, 
  User, 
  Calendar, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldAlert, 
  UserCheck, 
  Activity,
  PlusCircle,
  Clock,
  Sparkles
} from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, setToken, userData, userRole, setUserRole } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const logout = () => {
    setToken('')
    setShowProfileDropdown(false)
    navigate('/login')
  }

  const isAdminOrDoctorRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/doctor')

  return (
    <div className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 sm:px-10 py-3 transition-all'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/')} 
          className='flex items-center gap-2.5 cursor-pointer group select-none'
        >
          <div className='w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-transform'>
            <Stethoscope className='w-6 h-6' />
          </div>
          <div>
            <span className='text-2xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors'>
              Prescripto
            </span>
            <span className='text-[10px] font-semibold tracking-widest text-primary uppercase block -mt-1'>
              Healthcare
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!isAdminOrDoctorRoute && (
          <ul className='hidden md:flex items-center gap-8 font-medium text-gray-700 text-sm'>
            <NavLink to='/' className={({ isActive }) => `hover:text-primary transition-colors py-1 relative ${isActive ? 'text-primary font-semibold' : ''}`}>
              {({ isActive }) => (
                <>
                  HOME
                  {isActive && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in'></span>}
                </>
              )}
            </NavLink>
            <NavLink to='/doctors' className={({ isActive }) => `hover:text-primary transition-colors py-1 relative ${isActive ? 'text-primary font-semibold' : ''}`}>
              {({ isActive }) => (
                <>
                  ALL DOCTORS
                  {isActive && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in'></span>}
                </>
              )}
            </NavLink>
            <NavLink to='/about' className={({ isActive }) => `hover:text-primary transition-colors py-1 relative ${isActive ? 'text-primary font-semibold' : ''}`}>
              {({ isActive }) => (
                <>
                  ABOUT
                  {isActive && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in'></span>}
                </>
              )}
            </NavLink>
            <NavLink to='/contact' className={({ isActive }) => `hover:text-primary transition-colors py-1 relative ${isActive ? 'text-primary font-semibold' : ''}`}>
              {({ isActive }) => (
                <>
                  CONTACT
                  {isActive && <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in'></span>}
                </>
              )}
            </NavLink>
          </ul>
        )}

        {/* Action Controls & Profile Menu */}
        <div className='flex items-center gap-4'>

          {/* Role Switcher Pill */}
          <div className='hidden sm:flex items-center bg-gray-100 p-1 rounded-full text-xs font-medium text-gray-600 border border-gray-200'>
            <button 
              onClick={() => { setUserRole('patient'); navigate('/'); }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${userRole === 'patient' && !isAdminOrDoctorRoute ? 'bg-primary text-white shadow-sm' : 'hover:text-gray-900'}`}
            >
              <User className='w-3.5 h-3.5' />
              Patient
            </button>
            <button 
              onClick={() => { setUserRole('admin'); navigate('/admin'); }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${userRole === 'admin' || location.pathname.startsWith('/admin') ? 'bg-primary text-white shadow-sm' : 'hover:text-gray-900'}`}
            >
              <ShieldAlert className='w-3.5 h-3.5' />
              Admin Portal
            </button>
          </div>

          {/* User Profile Menu / Auth Button */}
          {token ? (
            <div className='relative'>
              <div 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className='flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors'
              >
                <img 
                  src={userData.image} 
                  alt="Profile" 
                  className='w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm'
                />
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </div>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div 
                  className='absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in'
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <div className='px-4 py-2.5 border-b border-gray-100'>
                    <p className='text-sm font-semibold text-gray-900 truncate'>{userData.name}</p>
                    <p className='text-xs text-gray-500 truncate'>{userData.email}</p>
                  </div>

                  <div className='py-1 text-sm text-gray-700'>
                    <button 
                      onClick={() => { navigate('/my-profile'); setShowProfileDropdown(false); }}
                      className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2.5 text-gray-700 hover:text-primary transition-colors'
                    >
                      <User className='w-4 h-4' />
                      My Profile
                    </button>
                    
                    <button 
                      onClick={() => { navigate('/my-appointments'); setShowProfileDropdown(false); }}
                      className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2.5 text-gray-700 hover:text-primary transition-colors'
                    >
                      <Calendar className='w-4 h-4' />
                      My Appointments
                    </button>

                    <button 
                      onClick={() => { navigate('/admin'); setShowProfileDropdown(false); }}
                      className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2.5 text-gray-700 hover:text-primary transition-colors sm:hidden'
                    >
                      <ShieldAlert className='w-4 h-4' />
                      Admin / Doctor Portal
                    </button>
                  </div>

                  <div className='border-t border-gray-100 pt-1'>
                    <button 
                      onClick={logout}
                      className='w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2.5 text-sm font-medium transition-colors'
                    >
                      <LogOut className='w-4 h-4' />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className='bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/25 hover:shadow-lg'
            >
              Create Account
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className='md:hidden text-gray-700 hover:text-primary p-1'
          >
            {showMenu ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {showMenu && (
        <div className='md:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-xl py-4 px-6 z-40 animate-fade-in'>
          <div className='flex flex-col gap-4 font-medium text-gray-700'>
            <NavLink 
              to='/' 
              onClick={() => setShowMenu(false)}
              className='py-2 hover:text-primary border-b border-gray-100'
            >
              Home
            </NavLink>
            <NavLink 
              to='/doctors' 
              onClick={() => setShowMenu(false)}
              className='py-2 hover:text-primary border-b border-gray-100'
            >
              All Doctors
            </NavLink>
            <NavLink 
              to='/about' 
              onClick={() => setShowMenu(false)}
              className='py-2 hover:text-primary border-b border-gray-100'
            >
              About Us
            </NavLink>
            <NavLink 
              to='/contact' 
              onClick={() => setShowMenu(false)}
              className='py-2 hover:text-primary border-b border-gray-100'
            >
              Contact
            </NavLink>
            
            <div className='pt-2 flex flex-col gap-2'>
              <button 
                onClick={() => { setUserRole('admin'); navigate('/admin'); setShowMenu(false); }}
                className='w-full py-2.5 rounded-xl bg-gray-100 text-gray-800 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-200'
              >
                <ShieldAlert className='w-4 h-4 text-primary' />
                Switch to Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
