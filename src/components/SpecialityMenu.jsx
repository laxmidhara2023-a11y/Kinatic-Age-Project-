import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets'
import { 
  Stethoscope, 
  HeartHandshake, 
  Sparkles, 
  Baby, 
  Brain, 
  Activity,
  ChevronRight
} from 'lucide-react'

const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'Stethoscope': return <Stethoscope className="w-7 h-7 text-primary" />
    case 'HeartHandshake': return <HeartHandshake className="w-7 h-7 text-rose-500" />
    case 'Sparkles': return <Sparkles className="w-7 h-7 text-amber-500" />
    case 'Baby': return <Baby className="w-7 h-7 text-sky-500" />
    case 'Brain': return <Brain className="w-7 h-7 text-purple-500" />
    case 'Activity': return <Activity className="w-7 h-7 text-emerald-500" />
    default: return <Stethoscope className="w-7 h-7 text-primary" />
  }
}

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
      <div className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-semibold uppercase tracking-wider'>
        Find Specialist
      </div>
      
      <h2 className='text-3xl font-bold text-gray-900 tracking-tight text-center'>
        Find by Speciality
      </h2>
      
      <p className='sm:w-1/3 text-center text-sm text-gray-600 leading-relaxed'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Speciality Category Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pt-8 w-full max-w-6xl px-4'>
        {specialityData.map((item, index) => (
          <Link 
            key={index} 
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer'
          >
            <div className='w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-50 transition-all'>
              {getIconComponent(item.icon)}
            </div>
            
            <h3 className='text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors'>
              {item.speciality}
            </h3>

            <span className='mt-2 text-[11px] text-gray-400 font-medium inline-flex items-center gap-0.5 group-hover:text-primary transition-colors'>
              View All <ChevronRight className='w-3 h-3' />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
