import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors'
import { 
  BadgeCheck, 
  Info, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, bookAppointment, token } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [patientNotes, setPatientNotes] = useState('')

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // Fetch Doctor Info
  useEffect(() => {
    const doctor = doctors.find(doc => doc._id === docId)
    setDocInfo(doctor || null)
  }, [doctors, docId])

  // Generate Available Slots for Next 7 Days
  useEffect(() => {
    if (!docInfo) return

    let today = new Date()
    let timeSlotsList = []

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(20, 0, 0, 0) // End at 8 PM

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0) // Start at 10 AM
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day < 10 ? '0' + day : day}_${month < 10 ? '0' + month : month}_${year}`

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          slotDate
        })

        // Increment by 30 mins
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      timeSlotsList.push(timeSlots)
    }

    setDocSlots(timeSlotsList)
    if (timeSlotsList.length > 0 && timeSlotsList[0].length > 0) {
      setSlotTime(timeSlotsList[0][0].time)
    }
  }, [docInfo])

  const handleBooking = () => {
    if (!token) {
      navigate('/login')
      return
    }

    if (!slotTime) {
      return
    }

    const selectedDaySlots = docSlots[slotIndex]
    if (!selectedDaySlots || selectedDaySlots.length === 0) return

    const slotDate = selectedDaySlots[0].slotDate

    const success = bookAppointment(docId, slotDate, slotTime, patientNotes)
    if (success) {
      navigate('/my-appointments')
    }
  }

  if (!docInfo) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4'>
        <div className='w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin'></div>
        <p className='text-sm font-medium text-gray-500'>Loading Doctor Profile...</p>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10'>
      
      {/* Doctor Summary Card */}
      <div className='bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-8 items-start relative overflow-hidden'>
        
        {/* Doctor Photo */}
        <div className='w-full sm:w-72 h-80 rounded-2xl bg-indigo-50 overflow-hidden shrink-0 shadow-md relative group'>
          <img 
            src={docInfo.image} 
            alt={docInfo.name} 
            referrerPolicy="no-referrer"
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          />
          <div className='absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-gray-800 shadow-sm'>
            <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400' />
            <span>{docInfo.rating || '4.9'} ({docInfo.reviewsCount || '120'} Reviews)</span>
          </div>
        </div>

        {/* Doctor Details */}
        <div className='flex-1 space-y-4 w-full'>
          
          <div className='flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4'>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900'>
                  {docInfo.name}
                </h1>
                <BadgeCheck className='w-6 h-6 text-primary shrink-0' />
              </div>

              <div className='flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-600 font-medium'>
                <span className='px-3 py-1 bg-indigo-50 text-primary rounded-full font-semibold'>
                  {docInfo.speciality}
                </span>
                <span>{docInfo.degree}</span>
                <span className='px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-700 font-medium'>
                  {docInfo.experience} Experience
                </span>
              </div>
            </div>

            <div className='bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 text-right'>
              <span className='text-[10px] text-emerald-700 uppercase font-bold tracking-wider block'>Consultation Fee</span>
              <span className='text-2xl font-extrabold text-emerald-800'>{currencySymbol}{docInfo.fees}</span>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5'>
              <Info className='w-4 h-4 text-primary' />
              About Doctor
            </h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              {docInfo.about}
            </p>
          </div>

          {/* Location & Address */}
          <div className='pt-2 flex items-start gap-2 text-xs text-gray-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-100'>
            <MapPin className='w-4 h-4 text-primary shrink-0 mt-0.5' />
            <div>
              <span className='font-semibold text-gray-800 block'>Practice Location</span>
              <span>{docInfo.address.line1}, {docInfo.address.line2}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Booking Calendar & Slot Selector */}
      <div className='bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6'>
        
        <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
          <div className='flex items-center gap-2.5'>
            <div className='w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-primary'>
              <CalendarIcon className='w-5 h-5' />
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-900'>Select Appointment Time</h2>
              <p className='text-xs text-gray-500'>Choose your preferred date & 30-minute time slot</p>
            </div>
          </div>
          
          <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 hidden sm:inline-block'>
            Instant Confirmation
          </span>
        </div>

        {/* 7-Day Selector Pills */}
        <div className='flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin'>
          {docSlots.map((item, index) => {
            if (item.length === 0) return null
            const dateObj = item[0].datetime
            const dayName = daysOfWeek[dateObj.getDay()]
            const dayNum = dateObj.getDate()
            const isSelected = slotIndex === index

            return (
              <div 
                key={index}
                onClick={() => { setSlotIndex(index); if (item.length > 0) setSlotTime(item[0].time); }}
                className={`flex flex-col items-center justify-center py-4 px-6 rounded-2xl min-w-[76px] cursor-pointer transition-all ${isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105 font-bold' : 'bg-slate-50 text-gray-700 hover:bg-indigo-50 hover:text-primary border border-gray-100'}`}
              >
                <span className='text-xs font-semibold tracking-wider uppercase opacity-80'>{dayName}</span>
                <span className='text-xl font-extrabold mt-0.5'>{dayNum}</span>
              </div>
            )
          })}
        </div>

        {/* Time Slot Selector */}
        <div className='space-y-3 pt-2'>
          <label className='block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5'>
            <Clock className='w-3.5 h-3.5 text-primary' />
            Available Time Slots
          </label>

          <div className='flex items-center gap-3 flex-wrap max-h-48 overflow-y-auto p-1'>
            {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
              docSlots[slotIndex].map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${item.time === slotTime ? 'bg-primary text-white font-semibold shadow-md shadow-primary/25' : 'bg-slate-50 text-gray-700 hover:bg-slate-100 border border-gray-200/60'}`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))
            ) : (
              <p className='text-xs text-gray-400 italic py-2'>No slots available for selected date.</p>
            )}
          </div>
        </div>

        {/* Optional Symptoms Note */}
        <div className='space-y-2 pt-2'>
          <label className='block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5'>
            <FileText className='w-3.5 h-3.5 text-primary' />
            Reason for Visit / Symptoms (Optional)
          </label>
          <textarea
            rows={2}
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
            placeholder="Briefly describe your symptoms or reason for appointment..."
            className='w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all'
          />
        </div>

        {/* Book Action Button */}
        <div className='pt-4 border-t border-gray-100 flex items-center justify-between'>
          <div>
            <span className='text-xs text-gray-400 block'>Selected Time</span>
            <span className='text-sm font-bold text-gray-900'>
              {docSlots[slotIndex]?.[0]?.slotDate.replace(/_/g, '/')} at {slotTime || 'N/A'}
            </span>
          </div>

          <button 
            onClick={handleBooking}
            disabled={!docInfo.available || !slotTime}
            className='bg-primary text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center gap-2'
          >
            <span>Book Appointment</span>
            <ArrowRight className='w-4 h-4' />
          </button>
        </div>

      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />

    </div>
  )
}

export default Appointment
