import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ArrowRight, Sparkles } from 'lucide-react'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col md:flex-row bg-gradient-to-r from-primary via-indigo-600 to-indigo-800 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-16 shadow-2xl shadow-primary/20 relative overflow-hidden'>
      
      {/* Glow details */}
      <div className='absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none'></div>

      {/* Left Side Info */}
      <div className='flex-1 py-10 sm:py-16 md:py-20 lg:py-24 lg:pl-5 z-10 text-white'>
        
        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-indigo-100 mb-4'>
          <Sparkles className='w-3.5 h-3.5 text-amber-300' />
          <span>JOIN OVER 50,000+ HAPPY PATIENTS</span>
        </div>

        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight'>
          Book Appointment <br />
          <span className='text-indigo-200'>With 100+ Trusted</span> Doctors
        </h2>

        <p className='text-sm text-indigo-100 mt-3 max-w-md leading-relaxed'>
          Take control of your health journey today. Fast booking, certified specialists, and transparent healthcare.
        </p>

        <button 
          onClick={() => { navigate('/login'); scrollTo(0, 0); }}
          className='mt-8 bg-white text-gray-900 text-sm font-bold px-8 py-3.5 rounded-full hover:bg-slate-100 transition-all shadow-xl hover:scale-105 inline-flex items-center gap-2 group'
        >
          <span>Create Account Now</span>
          <ArrowRight className='w-4 h-4 text-primary group-hover:translate-x-1 transition-transform' />
        </button>
      </div>

      {/* Right Side Illustration */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative flex items-end justify-center z-10'>
        <img 
          className='w-full max-w-md h-auto object-cover rounded-b-2xl drop-shadow-2xl' 
          src={assets.hero_img} 
          alt="Book doctor appointment banner" 
        />
      </div>

    </div>
  )
}

export default Banner
