import React from 'react'
import { Stethoscope, ShieldCheck, Zap, Heart, Award, Users, CheckCircle2 } from 'lucide-react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16'>
      
      {/* Header Banner */}
      <div className='text-center space-y-3 max-w-3xl mx-auto'>
        <div className='inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-50 text-primary rounded-full text-xs font-semibold uppercase tracking-wider'>
          About Prescripto
        </div>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
          Transforming Healthcare Access For Everyone
        </h1>
        <p className='text-sm text-gray-600 leading-relaxed'>
          Prescripto is committed to excellence in healthcare technology. We simplify doctor discovery, appointment scheduling, and digital health records.
        </p>
      </div>

      {/* Hero Content Grid */}
      <div className='bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        
        <div className='relative rounded-2xl overflow-hidden shadow-lg bg-indigo-50'>
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
            alt="Doctors team" 
            className='w-full h-80 sm:h-96 object-cover'
          />
          <div className='absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200/60 shadow-md flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg'>
                100+
              </div>
              <div>
                <p className='text-xs font-bold text-gray-900'>Verified Medical Specialists</p>
                <p className='text-[10px] text-gray-500'>Board-Certified Physicians</p>
              </div>
            </div>
            <Award className='w-6 h-6 text-amber-500' />
          </div>
        </div>

        <div className='space-y-6 text-gray-700 text-sm leading-relaxed'>
          <h2 className='text-2xl font-bold text-gray-900 leading-snug'>
            Welcome to Prescripto, Your Trusted Healthcare Partner
          </h2>
          <p>
            Prescripto was founded with a singular vision: to remove friction from medical consultations and empower individuals to make informed decisions about their well-being.
          </p>
          <p>
            Whether you are booking a routine health check-up, consulting a top dermatologist, or seeking specialized neurological care, Prescripto ensures seamless connections with verified medical professionals.
          </p>

          <div className='grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-gray-800'>
            <div className='flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100'>
              <CheckCircle2 className='w-4 h-4 text-emerald-500 shrink-0' />
              <span>Verified Specialist Profiles</span>
            </div>
            <div className='flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100'>
              <CheckCircle2 className='w-4 h-4 text-emerald-500 shrink-0' />
              <span>Instant Slot Booking</span>
            </div>
            <div className='flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100'>
              <CheckCircle2 className='w-4 h-4 text-emerald-500 shrink-0' />
              <span>Digital Prescriptions</span>
            </div>
            <div className='flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100'>
              <CheckCircle2 className='w-4 h-4 text-emerald-500 shrink-0' />
              <span>Secure Data Encryption</span>
            </div>
          </div>
        </div>

      </div>

      {/* Why Choose Us Cards */}
      <div className='space-y-8'>
        <h2 className='text-2xl font-bold text-gray-900 text-center'>
          Why Choose Prescripto
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          
          <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group'>
            <div className='w-12 h-12 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform'>
              <Zap className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-bold text-gray-900'>EFFICIENCY</h3>
            <p className='text-xs text-gray-600 leading-relaxed'>
              Streamlined appointment scheduling that fits seamlessly into your busy lifestyle. No waiting lines or manual phone booking required.
            </p>
          </div>

          <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group'>
            <div className='w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
              <ShieldCheck className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-bold text-gray-900'>CONVENIENCE</h3>
            <p className='text-xs text-gray-600 leading-relaxed'>
              Access a comprehensive network of trusted healthcare professionals in your area. View qualifications, fees, and patient reviews transparently.
            </p>
          </div>

          <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group'>
            <div className='w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform'>
              <Heart className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-bold text-gray-900'>PERSONALIZATION</h3>
            <p className='text-xs text-gray-600 leading-relaxed'>
              Tailored medical reminders, digital prescription history, and personalized care recommendations for you and your family.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default About
