import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors, currencySymbol } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDocs, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
      setRelDocs(filtered)
    }
  }, [doctors, speciality, docId])

  if (relDocs.length === 0) return null

  return (
    <div className='flex flex-col items-center gap-4 py-12 text-gray-900 my-8 border-t border-gray-100'>
      <div className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-semibold uppercase tracking-wider'>
        Recommendations
      </div>

      <h2 className='text-2xl font-bold tracking-tight text-center'>
        Related Specialists
      </h2>
      
      <p className='text-center text-sm text-gray-500 max-w-md'>
        Explore other top-rated {speciality} doctors available for consultation.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 px-4 max-w-7xl'>
        {relDocs.slice(0, 4).map((item, index) => (
          <div 
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between'
          >
            <div>
              <div className='relative w-full h-52 bg-slate-100 overflow-hidden'>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
                
                <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200/60 shadow-sm flex items-center gap-1.5 text-xs font-medium'>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`}></span>
                  <span className={item.available ? 'text-emerald-700' : 'text-red-600'}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className='absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
                  <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400' />
                  <span>{item.rating || '4.9'}</span>
                </div>
              </div>

              <div className='p-4 space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-primary'>
                    {item.speciality}
                  </span>
                  <span className='text-xs text-gray-500 font-medium'>
                    {item.experience}
                  </span>
                </div>

                <h3 className='text-base font-bold text-gray-900 group-hover:text-primary transition-colors'>
                  {item.name}
                </h3>
              </div>
            </div>

            <div className='px-4 pb-4 pt-2 flex items-center justify-between border-t border-gray-50 mt-2'>
              <div>
                <span className='text-[10px] text-gray-400 block uppercase'>Fee</span>
                <span className='text-base font-bold text-gray-900'>
                  {currencySymbol}{item.fees}
                </span>
              </div>

              <button className='bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all'>
                <span>Book</span>
                <ArrowRight className='w-3 h-3' />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
