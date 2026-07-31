import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Star, Clock, MapPin, Search, Filter, ArrowRight, CheckCircle, SlidersHorizontal } from 'lucide-react'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [sortBy, setSortBy] = useState('popular') // 'popular' | 'experience' | 'fee-low' | 'fee-high' | 'rating'
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)

  const specialitiesList = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Gastroenterologist'
  ]

  useEffect(() => {
    let result = [...doctors]

    // Speciality filter
    if (speciality) {
      result = result.filter(doc => doc.speciality === speciality)
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(q) || 
        doc.speciality.toLowerCase().includes(q) ||
        doc.degree.toLowerCase().includes(q) ||
        doc.address.line1.toLowerCase().includes(q) ||
        doc.address.line2.toLowerCase().includes(q)
      )
    }

    // Availability toggle
    if (onlyAvailable) {
      result = result.filter(doc => doc.available)
    }

    // Sorting
    if (sortBy === 'experience') {
      result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience))
    } else if (sortBy === 'fee-low') {
      result.sort((a, b) => a.fees - b.fees)
    } else if (sortBy === 'fee-high') {
      result.sort((a, b) => b.fees - a.fees)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setFilterDoc(result)
  }, [doctors, speciality, searchQuery, onlyAvailable, sortBy])

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
      
      {/* Header Banner */}
      <div className='bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6'>
        <div>
          <span className='text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/50'>
            Verified Specialists Directory
          </span>
          <h1 className='text-2xl sm:text-3xl font-extrabold mt-3 text-white'>
            {speciality ? `${speciality} Specialists` : 'All Medical Doctors'}
          </h1>
          <p className='text-xs sm:text-sm text-slate-300 mt-1 max-w-xl'>
            Browse certified physicians, check real-time available time slots, and schedule instant consultations.
          </p>
        </div>

        {/* Live Search Input */}
        <div className='relative w-full md:w-80 shrink-0'>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, speciality, location..."
            className='w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:bg-white/20 focus:border-indigo-400 transition-all'
          />
          <Search className='w-4 h-4 text-slate-400 absolute left-3.5 top-3.5' />
        </div>
      </div>

      {/* Main Grid Layout: Left Sidebar + Right Doctors Grid */}
      <div className='flex flex-col lg:flex-row gap-8 items-start'>
        
        {/* Mobile Filter Toggle Button */}
        <div className='lg:hidden w-full flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm'>
          <button 
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className='flex items-center gap-2 text-sm font-semibold text-gray-800'
          >
            <SlidersHorizontal className='w-4 h-4 text-primary' />
            <span>Filter Specialities ({speciality || 'All'})</span>
          </button>

          <span className='text-xs text-gray-500 font-medium'>
            {filterDoc.length} Doctors Found
          </span>
        </div>

        {/* Filter Sidebar */}
        <div className={`w-full lg:w-64 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-6 shrink-0 ${showFilterDrawer ? 'block' : 'hidden lg:block'}`}>
          
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-3'>
              Browse Specialities
            </h3>

            <div className='space-y-1.5 text-sm font-medium text-gray-600'>
              <button
                onClick={() => { navigate('/doctors'); setShowFilterDrawer(false); }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${!speciality ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <span>All Specialities</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${!speciality ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {doctors.length}
                </span>
              </button>

              {specialitiesList.map((spec, index) => {
                const count = doctors.filter(d => d.speciality === spec).length
                const isActive = speciality === spec
                return (
                  <button
                    key={index}
                    onClick={() => { navigate(`/doctors/${spec}`); setShowFilterDrawer(false); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${isActive ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20' : 'hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <span className='truncate'>{spec}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className='border-t border-gray-100 pt-4 space-y-4'>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
              Quick Filters
            </h3>

            {/* Availability Toggle */}
            <label className='flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 font-medium'>
              <input 
                type="checkbox" 
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className='w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer'
              />
              <span>Available Now Only</span>
            </label>

            {/* Sorting Select */}
            <div>
              <label className='block text-xs text-gray-500 mb-1.5 font-medium'>Sort Doctors By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-primary'
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Doctors Grid Column */}
        <div className='flex-1 w-full space-y-4'>
          
          {/* Results Summary Bar */}
          <div className='hidden sm:flex items-center justify-between text-xs text-gray-500 font-medium px-1'>
            <p>Showing <span className='text-gray-900 font-bold'>{filterDoc.length}</span> doctors available</p>
            {speciality && (
              <button 
                onClick={() => navigate('/doctors')} 
                className='text-primary hover:underline'
              >
                Clear speciality filter
              </button>
            )}
          </div>

          {filterDoc.length === 0 ? (
            <div className='bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-3'>
              <div className='w-16 h-16 rounded-2xl bg-indigo-50 text-primary mx-auto flex items-center justify-center text-xl font-bold'>
                🔍
              </div>
              <h3 className='text-xl font-bold text-gray-900'>No Doctors Found</h3>
              <p className='text-sm text-gray-500 max-w-sm mx-auto'>
                No doctors match your search or filter criteria. Try clearing filters or searching for another keyword.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setOnlyAvailable(false); navigate('/doctors'); }}
                className='bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all'
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {filterDoc.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
                  className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between'
                >
                  <div>
                    <div className='relative w-full h-56 bg-slate-100 overflow-hidden'>
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

                  <div className='px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50 mt-2'>
                    <div>
                      <span className='text-xs text-gray-400 block'>Consultation Fee</span>
                      <span className='text-lg font-bold text-gray-900'>
                        {currencySymbol}{item.fees}
                      </span>
                    </div>

                    <button className='bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all'>
                      <span>Book Slot</span>
                      <ArrowRight className='w-3.5 h-3.5' />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Doctors
