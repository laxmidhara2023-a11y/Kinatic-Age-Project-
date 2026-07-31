import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import PaymentModal from '../components/PaymentModal'
import PrescriptionModal from '../components/PrescriptionModal'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { appointments, cancelAppointment, currencySymbol } = useContext(AppContext)
  const navigate = useNavigate()

  const [selectedPayApp, setSelectedPayApp] = useState(null)
  const [selectedRxApp, setSelectedRxApp] = useState(null)

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
      
      {/* Header */}
      <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>My Appointments</h1>
          <p className='text-xs text-gray-500'>Manage your upcoming visits, payments, and medical prescriptions</p>
        </div>

        <span className='text-xs font-semibold px-3 py-1 bg-indigo-50 text-primary rounded-full'>
          Total ({appointments.length})
        </span>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className='bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4 max-w-lg mx-auto'>
          <div className='w-16 h-16 rounded-full bg-indigo-50 text-primary mx-auto flex items-center justify-center text-2xl font-bold'>
            📅
          </div>
          <h3 className='text-xl font-bold text-gray-900'>No Appointments Yet</h3>
          <p className='text-xs text-gray-500 leading-relaxed'>
            You haven't scheduled any doctor appointments yet. Browse top specialists and book a consultation in seconds.
          </p>
          <button 
            onClick={() => navigate('/doctors')}
            className='bg-primary text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20 inline-flex items-center gap-2'
          >
            <span>Find Doctors & Book</span>
            <ArrowRight className='w-4 h-4' />
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {appointments.map((item, index) => (
            <div 
              key={index}
              className='bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative overflow-hidden'
            >
              
              {/* Doctor Details */}
              <div className='flex items-start gap-4'>
                <img 
                  src={item.docData.image} 
                  alt={item.docData.name} 
                  className='w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-slate-100 border border-gray-200/60 shrink-0'
                />

                <div className='space-y-1.5'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-lg font-bold text-gray-900'>{item.docData.name}</h3>
                    <span className='text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-primary uppercase'>
                      {item.docData.speciality}
                    </span>
                  </div>

                  <p className='text-xs text-gray-500 font-medium'>{item.docData.degree}</p>

                  <div className='pt-1 space-y-1 text-xs text-gray-600'>
                    <div className='flex items-center gap-1.5 font-semibold text-gray-800'>
                      <Calendar className='w-3.5 h-3.5 text-primary' />
                      <span>Date & Time: <span className='text-indigo-600'>{item.slotDate.replace(/_/g, '/')} | {item.slotTime}</span></span>
                    </div>

                    <div className='flex items-center gap-1.5 text-gray-500'>
                      <MapPin className='w-3.5 h-3.5 text-gray-400' />
                      <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                    </div>

                    {item.notes && (
                      <p className='text-[11px] text-gray-500 italic bg-slate-50 p-2 rounded-xl border border-slate-100 max-w-md mt-1'>
                        Note: "{item.notes}"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badges & Action Buttons */}
              <div className='flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 shrink-0'>
                
                {/* Status Indicator Pill */}
                <div className='mb-1'>
                  {item.cancelled ? (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100'>
                      <XCircle className='w-3.5 h-3.5' /> Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100'>
                      <CheckCircle2 className='w-3.5 h-3.5' /> Completed
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100'>
                      <Clock className='w-3.5 h-3.5' /> Upcoming Visit
                    </span>
                  )}
                </div>

                {/* Actions */}
                {!item.cancelled && !item.isCompleted && (
                  <>
                    {!item.payment ? (
                      <button 
                        onClick={() => setSelectedPayApp(item)}
                        className='bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5'
                      >
                        <CreditCard className='w-3.5 h-3.5' />
                        Pay Online ({currencySymbol}{item.amount})
                      </button>
                    ) : (
                      <span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-center flex items-center justify-center gap-1'>
                        <CheckCircle2 className='w-3.5 h-3.5' /> Paid Online
                      </span>
                    )}

                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className='bg-slate-100 text-gray-600 hover:bg-red-50 hover:text-red-600 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all border border-gray-200/60 text-center'
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}

                {/* Completed View Prescription */}
                {item.isCompleted && (
                  <button 
                    onClick={() => setSelectedRxApp(item)}
                    className='bg-indigo-50 text-primary hover:bg-primary hover:text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all border border-indigo-100 flex items-center justify-center gap-1.5'
                  >
                    <FileText className='w-3.5 h-3.5' />
                    {item.prescription ? 'View Prescription' : 'Prescription Pending'}
                  </button>
                )}

              </div>

            </div>
          ))}
        </div>
      )}

      {/* Payment Gateway Modal */}
      {selectedPayApp && (
        <PaymentModal 
          appointment={selectedPayApp} 
          onClose={() => setSelectedPayApp(null)} 
        />
      )}

      {/* Prescription View Modal */}
      {selectedRxApp && (
        <PrescriptionModal 
          appointment={selectedRxApp} 
          onClose={() => setSelectedRxApp(null)} 
        />
      )}

    </div>
  )
}

export default MyAppointments
