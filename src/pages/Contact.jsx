import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Mail, Phone, MapPin, Send, Briefcase, Clock, CheckCircle2 } from 'lucide-react'

const Contact = () => {
  const { showToast } = useContext(AppContext)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      showToast('success', 'Thank you! Your message has been sent to Prescripto support.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12'>
      
      {/* Header */}
      <div className='text-center space-y-3 max-w-2xl mx-auto'>
        <div className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-semibold uppercase tracking-wider'>
          Get In Touch
        </div>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
          Contact Prescripto Support
        </h1>
        <p className='text-sm text-gray-600 leading-relaxed'>
          Have questions about doctor bookings, partnerships, or digital health records? Our team is here to assist 24/7.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
        
        {/* Contact Info Sidebar */}
        <div className='space-y-6 lg:col-span-1'>
          
          <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6'>
            <h3 className='text-base font-bold text-gray-900 border-b border-gray-100 pb-3'>
              OUR OFFICE
            </h3>

            <div className='space-y-4 text-xs text-gray-600'>
              <div className='flex items-start gap-3'>
                <div className='w-9 h-9 rounded-xl bg-indigo-50 text-primary flex items-center justify-center shrink-0'>
                  <MapPin className='w-4 h-4' />
                </div>
                <div>
                  <span className='font-bold text-gray-900 block text-sm'>Headquarters</span>
                  <p className='mt-0.5 leading-relaxed'>100 Health Sciences Plaza, Suite 400, New York, NY 10001</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='w-9 h-9 rounded-xl bg-indigo-50 text-primary flex items-center justify-center shrink-0'>
                  <Phone className='w-4 h-4' />
                </div>
                <div>
                  <span className='font-bold text-gray-900 block text-sm'>Phone Support</span>
                  <p className='mt-0.5'>+1 (800) 555-0199 / +1 (212) 555-0144</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <div className='w-9 h-9 rounded-xl bg-indigo-50 text-primary flex items-center justify-center shrink-0'>
                  <Mail className='w-4 h-4' />
                </div>
                <div>
                  <span className='font-bold text-gray-900 block text-sm'>Email Inquiries</span>
                  <p className='mt-0.5'>support@prescripto.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Careers Callout */}
          <div className='bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl space-y-3'>
            <div className='inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full text-xs text-indigo-200 font-semibold'>
              <Briefcase className='w-3.5 h-3.5 text-primary' />
              <span>CAREERS AT PRESCRIPTO</span>
            </div>
            <h4 className='text-lg font-bold text-white'>Work With Us</h4>
            <p className='text-xs text-slate-300 leading-relaxed'>
              Learn more about our teams and job openings in healthcare technology and clinical care operations.
            </p>
            <button className='w-full mt-2 bg-primary text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-all'>
              Explore Open Roles
            </button>
          </div>

        </div>

        {/* Contact Form */}
        <div className='lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6'>
          <div>
            <h3 className='text-xl font-bold text-gray-900'>Send Us a Message</h3>
            <p className='text-xs text-gray-500 mt-1'>Fill out the form below and our medical relations team will reply within 2 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Your Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className='w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Your Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="sarah@example.com"
                  required
                  className='w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Subject / Topic</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Appointment Inquiry / General Support"
                required
                className='w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1.5'>Your Message</label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Write your message or question here..."
                required
                className='w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className='bg-primary text-white text-xs font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50'
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className='w-4 h-4' />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default Contact
