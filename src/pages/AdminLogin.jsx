import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Stethoscope, Lock, Mail, ShieldAlert, UserCheck, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'

const AdminLogin = () => {
  const [state, setState] = useState('Admin') // 'Admin' | 'Doctor'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { setAToken, setDToken, setUserRole, showToast } = useContext(AppContext)

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (!email || !password) {
      showToast('error', 'Please fill in all fields')
      return
    }

    if (state === 'Admin') {
      // Admin Login Logic
      const token = `admin_jwt_${Date.now()}`
      setAToken(token)
      setUserRole('admin')
      showToast('success', 'Admin authenticated successfully! Welcome to Control Panel.')
    } else {
      // Doctor Login Logic
      const token = `doctor_jwt_${Date.now()}`
      setDToken(token)
      setUserRole('doctor')
      showToast('success', 'Doctor authenticated successfully! Welcome to Doctor Portal.')
    }
  }

  const handleDemoAdmin = () => {
    setEmail('admin@prescripto.com')
    setPassword('admin123')
    const token = 'admin_demo_secret_token_2026'
    setAToken(token)
    setUserRole('admin')
    showToast('success', 'Logged in as Demo Admin!')
  }

  const handleDemoDoctor = () => {
    setEmail('doctor@prescripto.com')
    setPassword('doctor123')
    const token = 'doctor_demo_secret_token_2026'
    setDToken(token)
    setUserRole('doctor')
    showToast('success', 'Logged in as Demo Doctor!')
  }

  return (
    <div className='min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50/50'>
      <div className='bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md p-8 space-y-6 relative'>
        
        {/* Glowing Ambient Backdrop Accent */}
        <div className='absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none'></div>
        <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none'></div>

        {/* Top Header Logo */}
        <div className='text-center space-y-2 relative z-10'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white mx-auto flex items-center justify-center shadow-xl shadow-slate-900/20 border border-slate-700/50'>
            {state === 'Admin' ? (
              <ShieldAlert className='w-7 h-7 text-amber-400' />
            ) : (
              <UserCheck className='w-7 h-7 text-emerald-400' />
            )}
          </div>

          <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>
            <span>{state}</span> <span className='text-primary'>Portal Login</span>
          </h2>

          <p className='text-xs text-gray-500 max-w-xs mx-auto'>
            Enter authorized credentials to access the secure Prescripto {state.toLowerCase()} management suite
          </p>
        </div>

        {/* State Tab Switcher */}
        <div className='flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/80 text-xs font-semibold'>
          <button 
            type='button'
            onClick={() => { setState('Admin'); setEmail(''); setPassword(''); }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${state === 'Admin' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ShieldAlert className='w-3.5 h-3.5 text-amber-400' />
            <span>Admin</span>
          </button>

          <button 
            type='button'
            onClick={() => { setState('Doctor'); setEmail(''); setPassword(''); }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${state === 'Doctor' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <UserCheck className='w-3.5 h-3.5 text-emerald-400' />
            <span>Doctor</span>
          </button>
        </div>

        {/* Demo Login Quick Actions */}
        <div className='bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 p-3.5 rounded-2xl border border-indigo-100/80 text-xs space-y-2 text-center'>
          <p className='font-bold text-slate-800 flex items-center justify-center gap-1.5'>
            <Sparkles className='w-3.5 h-3.5 text-amber-500' />
            One-Click Demo Authentication
          </p>
          <div className='flex items-center justify-center gap-2'>
            <button 
              type='button'
              onClick={handleDemoAdmin}
              className='px-3.5 py-2 bg-slate-900 text-white rounded-xl font-semibold shadow-sm hover:bg-slate-800 transition-colors text-[11px] flex items-center gap-1.5'
            >
              <ShieldAlert className='w-3.5 h-3.5 text-amber-400' />
              Demo Admin
            </button>
            <button 
              type='button'
              onClick={handleDemoDoctor}
              className='px-3.5 py-2 bg-white text-emerald-700 rounded-xl font-semibold shadow-sm hover:bg-emerald-50 transition-colors text-[11px] border border-emerald-200 flex items-center gap-1.5'
            >
              <UserCheck className='w-3.5 h-3.5 text-emerald-600' />
              Demo Doctor
            </button>
          </div>
        </div>

        {/* Authentication Form */}
        <form onSubmit={onSubmitHandler} className='space-y-4'>
          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1'>
              {state} Email Address
            </label>
            <div className='relative'>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder={state === 'Admin' ? 'admin@prescripto.com' : 'doctor@prescripto.com'}
                required
                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
              />
              <Mail className='w-4 h-4 text-gray-400 absolute left-3 top-3' />
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className='w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
              />
              <Lock className='w-4 h-4 text-gray-400 absolute left-3 top-3' />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className='w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider'
          >
            <span>Login to {state} Control Center</span>
            <ArrowRight className='w-4 h-4' />
          </button>
        </form>

        {/* Footer Note */}
        <p className='text-[11px] text-center text-gray-400 pt-2 border-t border-gray-100'>
          Restricted access for system administrators & verified medical personnel only.
        </p>

      </div>
    </div>
  )
}

export default AdminLogin
