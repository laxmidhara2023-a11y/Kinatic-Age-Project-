import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Lock, Mail, User, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react'

const Login = () => {
  const { setToken, setUserRole, showToast } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up') // 'Sign Up' | 'Login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setToken('demo_token_authenticated')
    setUserRole('patient')
    showToast('success', state === 'Sign Up' ? 'Account created successfully! Logged in as Patient.' : 'Logged in successfully!')
    navigate('/')
  }

  const handleDemoPatient = () => {
    setName('Alex Johnson')
    setEmail('alex.johnson@example.com')
    setPassword('demo1234')
    setToken('demo_token_patient')
    setUserRole('patient')
    showToast('success', 'Logged in as Demo Patient!')
    navigate('/')
  }

  const handleDemoAdmin = () => {
    setToken('demo_token_admin')
    setUserRole('admin')
    showToast('success', 'Switched to Admin Portal!')
    navigate('/admin')
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-12'>
      <div className='bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden w-full max-w-md p-8 space-y-6 relative'>
        
        {/* Top Header Logo */}
        <div className='text-center space-y-2'>
          <div className='w-12 h-12 rounded-2xl bg-primary text-white mx-auto flex items-center justify-center shadow-lg shadow-primary/30'>
            <Stethoscope className='w-7 h-7' />
          </div>

          <h2 className='text-2xl font-extrabold text-gray-900'>
            {state === 'Sign Up' ? 'Create Prescripto Account' : 'Welcome Back'}
          </h2>

          <p className='text-xs text-gray-500'>
            {state === 'Sign Up' ? 'Please sign up to book an appointment with certified doctors' : 'Please log in to manage your appointments and profile'}
          </p>
        </div>

        {/* Demo Login Quick Actions Bar */}
        <div className='bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-xs space-y-2 text-center'>
          <p className='font-bold text-indigo-900 flex items-center justify-center gap-1'>
            <Sparkles className='w-3.5 h-3.5 text-amber-500' />
            Quick Demo Portals
          </p>
          <div className='flex items-center justify-center gap-2'>
            <button 
              onClick={handleDemoPatient}
              className='px-3 py-1.5 bg-white rounded-xl text-primary font-semibold shadow-sm hover:bg-slate-50 transition-colors border border-indigo-100'
            >
              Patient Demo
            </button>
            <button 
              onClick={handleDemoAdmin}
              className='px-3 py-1.5 bg-slate-900 text-white rounded-xl font-semibold shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-1'
            >
              <ShieldAlert className='w-3 h-3 text-amber-400' />
              Admin Portal
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className='space-y-4'>
          {state === 'Sign Up' && (
            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1'>Full Name</label>
              <div className='relative'>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  required
                  className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white'
                />
                <User className='w-4 h-4 text-gray-400 absolute left-3 top-3' />
              </div>
            </div>
          )}

          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1'>Email Address</label>
            <div className='relative'>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white'
              />
              <Mail className='w-4 h-4 text-gray-400 absolute left-3 top-3' />
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-700 mb-1'>Password</label>
            <div className='relative'>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white'
              />
              <Lock className='w-4 h-4 text-gray-400 absolute left-3 top-3' />
            </div>
          </div>

          <button 
            type="submit"
            className='w-full bg-primary text-white font-semibold py-3 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 text-xs flex items-center justify-center gap-2 mt-2'
          >
            <span>{state === 'Sign Up' ? 'Create Account' : 'Log In'}</span>
            <ArrowRight className='w-4 h-4' />
          </button>
        </form>

        {/* Toggle between Sign Up / Login */}
        <div className='text-center pt-2 text-xs text-gray-500'>
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span 
                onClick={() => setState('Login')}
                className='text-primary font-bold cursor-pointer hover:underline'
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{' '}
              <span 
                onClick={() => setState('Sign Up')}
                className='text-primary font-bold cursor-pointer hover:underline'
              >
                Click here
              </span>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Login
