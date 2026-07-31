import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Smartphone, Building2 } from 'lucide-react'
import { assets } from '../assets/assets'

const PaymentModal = ({ appointment, onClose }) => {
  const { payAppointment, currencySymbol } = useContext(AppContext)
  
  const [method, setMethod] = useState('card') // 'card' | 'upi' | 'netbanking'
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242')
  const [expiry, setExpiry] = useState('12/28')
  const [cvv, setCvv] = useState('123')
  const [upiId, setUpiId] = useState('alex@upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      payAppointment(appointment._id, method.toUpperCase())
      
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 1200)
  }

  if (!appointment) return null

  return (
    <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in'>
      <div className='bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative'>
        
        {/* Header */}
        <div className='bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-indigo-300 border border-primary/30'>
              <ShieldCheck className='w-6 h-6' />
            </div>
            <div>
              <h3 className='text-lg font-bold text-white'>Secure Checkout</h3>
              <p className='text-xs text-indigo-200'>256-bit Encrypted SSL Gateway</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className='p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          
          {/* Order Summary */}
          <div className='bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img 
                src={appointment.docData.image} 
                alt={appointment.docData.name} 
                className='w-12 h-12 rounded-xl object-cover border border-gray-200'
              />
              <div>
                <p className='text-sm font-bold text-gray-900'>{appointment.docData.name}</p>
                <p className='text-xs text-gray-500'>{appointment.slotDate.replace(/_/g, '/')} at {appointment.slotTime}</p>
              </div>
            </div>
            
            <div className='text-right'>
              <p className='text-xs text-gray-400 font-medium uppercase'>Total Amount</p>
              <p className='text-xl font-extrabold text-primary'>{currencySymbol}{appointment.amount}</p>
            </div>
          </div>

          {isSuccess ? (
            <div className='py-8 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in'>
              <div className='w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2'>
                <CheckCircle2 className='w-10 h-10' />
              </div>
              <h4 className='text-xl font-bold text-gray-900'>Payment Successful!</h4>
              <p className='text-xs text-gray-500 max-w-xs'>
                Your booking is confirmed with {appointment.docData.name}. Receipt sent to your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className='space-y-4'>
              
              {/* Payment Method Tabs */}
              <div className='grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-2xl text-xs font-semibold text-gray-600'>
                <button 
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${method === 'card' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
                >
                  <CreditCard className='w-3.5 h-3.5' />
                  Card
                </button>
                <button 
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${method === 'upi' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
                >
                  <Smartphone className='w-3.5 h-3.5' />
                  UPI / QR
                </button>
                <button 
                  type="button"
                  onClick={() => setMethod('netbanking')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${method === 'netbanking' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
                >
                  <Building2 className='w-3.5 h-3.5' />
                  NetBanking
                </button>
              </div>

              {/* Method Forms */}
              {method === 'card' && (
                <div className='space-y-3 pt-2 animate-fade-in'>
                  <div>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>Card Number</label>
                    <div className='relative'>
                      <input 
                        type="text" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 focus:outline-none focus:border-primary focus:bg-white'
                      />
                      <CreditCard className='w-4 h-4 text-gray-400 absolute right-3 top-3' />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-3'>
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>Expiry Date</label>
                      <input 
                        type="text" 
                        value={expiry} 
                        onChange={(e) => setExpiry(e.target.value)}
                        required
                        className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 focus:outline-none focus:border-primary'
                      />
                    </div>
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>CVV Code</label>
                      <input 
                        type="password" 
                        value={cvv} 
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                        required
                        className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 focus:outline-none focus:border-primary'
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === 'upi' && (
                <div className='space-y-3 pt-2 animate-fade-in'>
                  <div>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>Virtual Payment Address (VPA / UPI ID)</label>
                    <input 
                      type="text" 
                      value={upiId} 
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okaxis or mobile@upi"
                      required
                      className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'
                    />
                  </div>
                  <p className='text-[11px] text-gray-500'>
                    A payment request notification will be sent to your UPI app.
                  </p>
                </div>
              )}

              {method === 'netbanking' && (
                <div className='space-y-3 pt-2 animate-fade-in'>
                  <label className='block text-xs font-medium text-gray-700 mb-1'>Select Popular Bank</label>
                  <select className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-primary'>
                    <option>Chase Bank</option>
                    <option>Bank of America</option>
                    <option>Wells Fargo</option>
                    <option>Citibank</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button 
                type="submit"
                disabled={isProcessing}
                className='w-full mt-4 bg-primary text-white font-semibold py-3 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-sm disabled:opacity-50'
              >
                {isProcessing ? (
                  <>
                    <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className='w-4 h-4' />
                    <span>Pay {currencySymbol}{appointment.amount} Now</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  )
}

export default PaymentModal
