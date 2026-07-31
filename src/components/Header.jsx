import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Star, Users, CalendarCheck } from 'lucide-react'
import { assets } from '../assets/assets'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 rounded-3xl px-6 md:px-12 lg:px-16 my-6 shadow-2xl shadow-primary/20 overflow-hidden relative'>
      
      {/* Decorative background glows */}
      <div className='absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none'></div>
      <div className='absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none'></div>

      {/* Left Column Text */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-16 lg:py-20 z-10 text-white'>
        
        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wide'>
          <ShieldCheck className='w-4 h-4 text-emerald-300' />
          <span>VERIFIED SPECIALISTS PLATFORM</span>
        </div>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight'>
          Book Appointment <br /> 
          <span className='text-indigo-200'>With 100+ Trusted</span> Doctors
        </h1>

        <div className='flex flex-col sm:flex-row items-center gap-4 text-sm font-light text-indigo-100'>
          <div className='flex -space-x-2 overflow-hidden'>
            <img className='inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover' src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="" />
            <img className='inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover' src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="" />
            <img className='inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="" />
            <div className='flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-indigo-500 text-white font-bold text-xs'>
              +12k
            </div>
          </div>
          <p className='text-xs sm:text-sm max-w-xs leading-relaxed'>
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-4 pt-2'>
          <a 
            href="#speciality"
            className='flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-slate-100 transition-all shadow-xl hover:scale-105 group'
          >
            <span>Book Appointment</span>
            <ArrowRight className='w-4 h-4 text-primary group-hover:translate-x-1 transition-transform' />
          </a>

          <button 
            onClick={() => navigate('/doctors')}
            className='flex items-center gap-2 bg-indigo-800/40 hover:bg-indigo-800/60 text-white text-sm font-medium px-6 py-3.5 rounded-full border border-white/20 transition-all backdrop-blur-sm'
          >
            <span>Explore All Doctors</span>
          </button>
        </div>

        {/* Highlight Stats */}
        <div className='grid grid-cols-3 gap-6 pt-4 border-t border-white/10 w-full max-w-md'>
          <div>
            <p className='text-2xl font-extrabold text-white'>100+</p>
            <p className='text-[11px] text-indigo-200 uppercase font-medium'>Doctors</p>
          </div>
          <div>
            <p className='text-2xl font-extrabold text-white'>99.8%</p>
            <p className='text-[11px] text-indigo-200 uppercase font-medium'>Satisfaction</p>
          </div>
          <div>
            <p className='text-2xl font-extrabold text-white'>24/7</p>
            <p className='text-[11px] text-indigo-200 uppercase font-medium'>Instant Slots</p>
          </div>
        </div>

      </div>

      {/* Right Column Graphic */}
      <div className='md:w-1/2 relative flex items-end justify-center pt-8 md:pt-0 z-10'>
        <div className='relative max-w-md w-full'>
          <img 
            className='w-full h-auto object-cover rounded-b-2xl drop-shadow-2xl' 
            src={assets.hero_img} 
            alt="Prescripto Doctor Banner" 
          />
        </div>
      </div>

    </div>
  )
}

export default Header
