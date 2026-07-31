import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { User, Phone, Mail, MapPin, Calendar, Camera, Save, Edit3, ShieldCheck } from 'lucide-react'

const MyProfile = () => {
  const { userData, setUserData, showToast } = useContext(AppContext)
  
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleSave = () => {
    setUserData(formData)
    setIsEdit(false)
    showToast('success', 'Profile updated successfully!')
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8'>
      
      {/* Profile Header Card */}
      <div className='bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden'>
        
        <div className='flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left'>
          {/* Avatar */}
          <div className='relative group'>
            <img 
              src={formData.image} 
              alt={formData.name} 
              className='w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md'
            />
            {isEdit && (
              <label className='absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform'>
                <Camera className='w-4 h-4' />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0]
                      const reader = new FileReader()
                      reader.onload = (upload) => {
                        setFormData(prev => ({ ...prev, image: upload.target.result }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
              </label>
            )}
          </div>

          <div>
            {isEdit ? (
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className='text-2xl font-extrabold text-gray-900 border-b-2 border-primary focus:outline-none bg-transparent'
              />
            ) : (
              <h1 className='text-2xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start gap-2'>
                {formData.name}
                <ShieldCheck className='w-5 h-5 text-primary' />
              </h1>
            )}
            <p className='text-xs text-gray-500 font-medium mt-1'>{formData.email}</p>
            <span className='inline-block mt-2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase'>
              Verified Patient Account
            </span>
          </div>
        </div>

        {/* Edit / Save Action Button */}
        <button 
          onClick={isEdit ? handleSave : () => setIsEdit(true)}
          className={`px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${isEdit ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20' : 'bg-slate-100 text-gray-800 hover:bg-slate-200'}`}
        >
          {isEdit ? (
            <>
              <Save className='w-4 h-4' />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit3 className='w-4 h-4' />
              <span>Edit Profile</span>
            </>
          )}
        </button>

      </div>

      {/* Main Profile Info Form */}
      <div className='bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8'>
        
        {/* Contact Information */}
        <div className='space-y-4'>
          <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2'>
            Contact Information
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs'>
            
            <div className='space-y-1.5'>
              <label className='text-gray-500 font-medium flex items-center gap-1.5'>
                <Mail className='w-3.5 h-3.5 text-primary' />
                Email Address
              </label>
              <p className='font-semibold text-gray-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100'>
                {formData.email}
              </p>
            </div>

            <div className='space-y-1.5'>
              <label className='text-gray-500 font-medium flex items-center gap-1.5'>
                <Phone className='w-3.5 h-3.5 text-primary' />
                Phone Number
              </label>
              {isEdit ? (
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className='w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'
                />
              ) : (
                <p className='font-semibold text-gray-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100'>
                  {formData.phone}
                </p>
              )}
            </div>

            <div className='sm:col-span-2 space-y-1.5'>
              <label className='text-gray-500 font-medium flex items-center gap-1.5'>
                <MapPin className='w-3.5 h-3.5 text-primary' />
                Residential Address
              </label>
              {isEdit ? (
                <div className='space-y-2'>
                  <input 
                    type="text" 
                    value={formData.address.line1}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    placeholder="Address Line 1"
                    className='w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'
                  />
                  <input 
                    type="text" 
                    value={formData.address.line2}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    placeholder="Address Line 2"
                    className='w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'
                  />
                </div>
              ) : (
                <p className='font-semibold text-gray-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100'>
                  {formData.address.line1}, {formData.address.line2}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Basic Demographic Information */}
        <div className='space-y-4 pt-2'>
          <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2'>
            Basic Demographics
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs'>
            
            <div className='space-y-1.5'>
              <label className='text-gray-500 font-medium flex items-center gap-1.5'>
                <User className='w-3.5 h-3.5 text-primary' />
                Gender
              </label>
              {isEdit ? (
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className='w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className='font-semibold text-gray-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100'>
                  {formData.gender}
                </p>
              )}
            </div>

            <div className='space-y-1.5'>
              <label className='text-gray-500 font-medium flex items-center gap-1.5'>
                <Calendar className='w-3.5 h-3.5 text-primary' />
                Date of Birth
              </label>
              {isEdit ? (
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                  className='w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'
                />
              ) : (
                <p className='font-semibold text-gray-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100'>
                  {formData.dob}
                </p>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default MyProfile
