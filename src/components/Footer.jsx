import React from 'react'
import { Stethoscope, Heart, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='bg-slate-900 text-slate-300 pt-16 pb-8 px-4 sm:px-10 mt-20 border-t border-slate-800'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800'>
        
        {/* Brand Column */}
        <div className='md:col-span-2 space-y-4'>
          <div className='flex items-center gap-2.5 cursor-pointer' onClick={() => navigate('/')}>
            <div className='w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30'>
              <Stethoscope className='w-6 h-6' />
            </div>
            <span className='text-2xl font-bold tracking-tight text-white'>
              Prescripto
            </span>
          </div>

          <p className='text-sm text-slate-400 leading-relaxed max-w-md'>
            Prescripto is a premier healthcare platform bridging patients with world-class medical specialists. Book hassle-free appointments, access verified doctor profiles, manage digital prescriptions, and prioritize your family’s wellbeing.
          </p>

          <div className='flex items-center gap-4 text-xs text-slate-400 pt-2'>
            <span className='flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
              24/7 Virtual Assistance
            </span>
            <span className='flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700'>
              100% HIPAA Compliant
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className='space-y-3'>
          <h4 className='text-sm font-semibold text-white uppercase tracking-wider'>Company</h4>
          <ul className='space-y-2 text-sm text-slate-400'>
            <li>
              <button onClick={() => navigate('/')} className='hover:text-primary transition-colors flex items-center gap-1'>
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/doctors')} className='hover:text-primary transition-colors flex items-center gap-1'>
                Find Doctors
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/about')} className='hover:text-primary transition-colors flex items-center gap-1'>
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/contact')} className='hover:text-primary transition-colors flex items-center gap-1'>
                Contact & Support
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/admin')} className='hover:text-primary transition-colors flex items-center gap-1 text-primary/90 font-medium'>
                Admin & Doctor Portal <ArrowUpRight className='w-3.5 h-3.5' />
              </button>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className='space-y-3'>
          <h4 className='text-sm font-semibold text-white uppercase tracking-wider'>Get In Touch</h4>
          <ul className='space-y-2.5 text-sm text-slate-400'>
            <li className='flex items-center gap-2.5'>
              <Phone className='w-4 h-4 text-primary shrink-0' />
              <span>+91 (800) 555-0199</span>
            </li>
            <li className='flex items-center gap-2.5'>
              <Mail className='w-4 h-4 text-primary shrink-0' />
              <span>support@prescripto.com</span>
            </li>
            <li className='flex items-start gap-2.5'>
              <MapPin className='w-4 h-4 text-primary shrink-0 mt-1' />
              <span>100 Health Sciences Plaza, MG Road, Bengaluru, Karnataka 560001</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className='max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
        <p>© 2026 Prescripto Healthcare Inc. All rights reserved.</p>
        <div className='flex items-center gap-6'>
          <a href="#" className='hover:text-slate-400 transition-colors'>Privacy Policy</a>
          <a href="#" className='hover:text-slate-400 transition-colors'>Terms of Service</a>
          <a href="#" className='hover:text-slate-400 transition-colors'>Security Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
