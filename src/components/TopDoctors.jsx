import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 my-4'>
      
      <div className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-semibold uppercase tracking-wider'>
        Top Recommended
      </div>

      <h2 className='text-3xl font-bold tracking-tight text-center'>
        Top Doctors to Book
      </h2>
      
      <p className='sm:w-1/3 text-center text-sm text-gray-600 leading-relaxed'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Doctor Cards Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 px-4 max-w-7xl'>
        {doctors.slice(0, 8).map((item, index) => (
          <div 
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between'
          >
            <div>
              {/* Doctor Avatar Image Header */}
              <div className='relative w-full h-56 bg-slate-100 overflow-hidden'>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
                
                {/* Availability Badge */}
                <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200/60 shadow-sm flex items-center gap-1.5 text-xs font-medium'>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`}></span>
                  <span className={item.available ? 'text-emerald-700' : 'text-red-600'}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className='absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
                  <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400' />
                  <span>{item.rating || '4.9'}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className='p-5 space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-primary'>
                    {item.speciality}
                  </span>
                  <span className='text-xs text-gray-500 font-medium flex items-center gap-1'>
                    <Clock className='w-3 h-3 text-gray-400' />
                    {item.experience}
                  </span>
                </div>

                <h3 className='text-lg font-bold text-gray-900 group-hover:text-primary transition-colors'>
                  {item.name}
                </h3>

                <p className='text-xs text-gray-500 line-clamp-1 flex items-center gap-1'>
                  <MapPin className='w-3 h-3 text-gray-400 shrink-0' />
                  {item.address.line1}, {item.address.line2}
                </p>
              </div>
            </div>

            {/* Card Footer Fee & Action */}
            <div className='px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50 mt-2'>
              <div>
                <span className='text-xs text-gray-400 block'>Consultation Fee</span>
                <span className='text-lg font-bold text-gray-900'>
                  {currencySymbol}{item.fees}
                </span>
              </div>

              <button 
                className='bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all'
              >
                <span>Book</span>
                <ArrowRight className='w-3.5 h-3.5' />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* View More Button */}
      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }}
        className='mt-8 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-sm font-semibold px-10 py-3 rounded-full transition-all shadow-sm flex items-center gap-2'
      >
        <span>View More Doctors</span>
        <ArrowRight className='w-4 h-4' />
      </button>

    </div>
  )
}

export default TopDoctors
