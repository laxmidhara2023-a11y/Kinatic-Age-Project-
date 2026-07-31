import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import AdminLogin from './AdminLogin'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  Stethoscope, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Search,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Clock,
  Send,
  X,
  LogOut
} from 'lucide-react'

const AdminDashboard = () => {
  const { 
    aToken,
    dToken,
    adminLogout,
    doctors, 
    appointments, 
    currencySymbol, 
    toggleDoctorAvailability, 
    addDoctor, 
    completeAppointment, 
    addPrescription,
    cancelAppointment 
  } = useContext(AppContext)

  if (!aToken && !dToken) {
    return <AdminLogin />
  }

  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'add-doctor' | 'doctors-list' | 'all-appointments' | 'doctor-panel'

  // Add Doctor Form State
  const [docName, setDocName] = useState('')
  const [docEmail, setDocEmail] = useState('')
  const [docSpeciality, setDocSpeciality] = useState('General physician')
  const [docDegree, setDocDegree] = useState('MBBS')
  const [docExperience, setDocExperience] = useState('3 Years')
  const [docFees, setDocFees] = useState('50')
  const [docAbout, setDocAbout] = useState('')
  const [docAddressLine1, setDocAddressLine1] = useState('')
  const [docAddressLine2, setDocAddressLine2] = useState('')
  const [docImage, setDocImage] = useState('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400')

  // Prescription Modal State for Doctor Panel
  const [prescriptionApp, setPrescriptionApp] = useState(null)
  const [rxDiagnosis, setRxDiagnosis] = useState('')
  const [rxMedicines, setRxMedicines] = useState([
    { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days' },
    { name: 'Amoxicillin 250mg', dosage: '1 capsule', frequency: 'Thrice daily', duration: '7 days' }
  ])
  const [rxInstructions, setRxInstructions] = useState('Drink plenty of water and rest well.')

  const handleAddDoctorSubmit = (e) => {
    e.preventDefault()
    addDoctor({
      name: docName,
      email: docEmail,
      speciality: docSpeciality,
      degree: docDegree,
      experience: docExperience,
      fees: Number(docFees),
      about: docAbout || `Dr. ${docName} is a dedicated ${docSpeciality} providing exceptional medical care to patients.`,
      address: {
        line1: docAddressLine1 || '100 Medical Center Way',
        line2: docAddressLine2 || 'Suite 200'
      },
      image: docImage
    })

    // Reset Form
    setDocName('')
    setDocEmail('')
    setDocAbout('')
    setActiveTab('doctors-list')
  }

  const handleAddMedicineRow = () => {
    setRxMedicines(prev => [...prev, { name: '', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days' }])
  }

  const handleMedicineChange = (index, field, value) => {
    setRxMedicines(prev => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  const handleSaveRx = (e) => {
    e.preventDefault()
    if (!prescriptionApp) return
    addPrescription(prescriptionApp._id, {
      diagnosis: rxDiagnosis,
      medicines: rxMedicines,
      instructions: rxInstructions
    })
    setPrescriptionApp(null)
  }

  // Calculate Metrics
  const totalDoctors = doctors.length
  const totalAppointments = appointments.length
  const completedAppointments = appointments.filter(a => a.isCompleted).length
  const totalRevenue = appointments
    .filter(a => a.payment && !a.cancelled)
    .reduce((sum, a) => sum + (a.amount || 0), 0)

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
      
      {/* Top Header */}
      <div className='bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30'>
            <ShieldAlert className='w-6 h-6' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-white'>Admin & Doctor Management Portal</h1>
            <p className='text-xs text-indigo-200'>System Control Center for Prescripto Platform</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            {aToken ? 'Admin Authenticated' : 'Doctor Authenticated'}
          </span>

          <button 
            onClick={adminLogout}
            className='px-3.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full text-xs font-semibold border border-red-500/30 transition-colors flex items-center gap-1.5 cursor-pointer'
          >
            <LogOut className='w-3.5 h-3.5' />
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        
        <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center shrink-0'>
            <Stethoscope className='w-7 h-7' />
          </div>
          <div>
            <p className='text-2xl font-extrabold text-gray-900'>{totalDoctors}</p>
            <p className='text-xs text-gray-500 font-medium uppercase'>Total Doctors</p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0'>
            <Calendar className='w-7 h-7' />
          </div>
          <div>
            <p className='text-2xl font-extrabold text-gray-900'>{totalAppointments}</p>
            <p className='text-xs text-gray-500 font-medium uppercase'>Booked Appointments</p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
            <CheckCircle2 className='w-7 h-7' />
          </div>
          <div>
            <p className='text-2xl font-extrabold text-gray-900'>{completedAppointments}</p>
            <p className='text-xs text-gray-500 font-medium uppercase'>Completed Visits</p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0'>
            <DollarSign className='w-7 h-7' />
          </div>
          <div>
            <p className='text-2xl font-extrabold text-gray-900'>{currencySymbol}{totalRevenue}</p>
            <p className='text-xs text-gray-500 font-medium uppercase'>Platform Revenue</p>
          </div>
        </div>

      </div>

      {/* Tabs Bar */}
      <div className='flex items-center gap-2 overflow-x-auto bg-gray-100 p-1.5 rounded-2xl text-xs font-semibold text-gray-600 border border-gray-200/60'>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${activeTab === 'dashboard' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
        >
          <Calendar className='w-4 h-4' />
          Dashboard Overview
        </button>

        <button 
          onClick={() => setActiveTab('doctors-list')}
          className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${activeTab === 'doctors-list' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
        >
          <Stethoscope className='w-4 h-4' />
          Doctors List ({doctors.length})
        </button>

        <button 
          onClick={() => setActiveTab('add-doctor')}
          className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${activeTab === 'add-doctor' ? 'bg-white text-primary shadow-sm' : 'hover:text-gray-900'}`}
        >
          <UserPlus className='w-4 h-4' />
          Add Doctor
        </button>

        <button 
          onClick={() => setActiveTab('doctor-panel')}
          className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 ${activeTab === 'doctor-panel' ? 'bg-slate-900 text-white shadow-sm' : 'hover:text-gray-900'}`}
        >
          <FileText className='w-4 h-4 text-amber-400' />
          Doctor Consult Panel
        </button>
      </div>

      {/* TAB CONTENT 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className='bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 animate-fade-in'>
          <h3 className='text-lg font-bold text-gray-900'>Recent Appointments</h3>
          
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-xs'>
              <thead className='bg-slate-50 text-gray-700 font-semibold border-b border-gray-200'>
                <tr>
                  <th className='p-3.5'>Doctor</th>
                  <th className='p-3.5'>Patient</th>
                  <th className='p-3.5'>Date & Time</th>
                  <th className='p-3.5'>Amount</th>
                  <th className='p-3.5'>Status</th>
                  <th className='p-3.5 text-right'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 font-medium text-gray-800'>
                {appointments.map((app, index) => (
                  <tr key={index} className='hover:bg-slate-50/80'>
                    <td className='p-3.5 flex items-center gap-2.5'>
                      <img src={app.docData.image} alt="" className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <p className='font-bold text-gray-900'>{app.docData.name}</p>
                        <p className='text-[10px] text-gray-400'>{app.docData.speciality}</p>
                      </div>
                    </td>

                    <td className='p-3.5'>
                      <p className='font-bold text-gray-900'>{app.patientData?.name || 'Aarav Sharma'}</p>
                      <p className='text-[10px] text-gray-400'>{app.patientData?.email || 'aarav@example.com'}</p>
                    </td>

                    <td className='p-3.5'>
                      <span className='font-semibold text-gray-900'>{app.slotDate.replace(/_/g, '/')}</span>
                      <span className='text-[10px] text-gray-400 block'>{app.slotTime}</span>
                    </td>

                    <td className='p-3.5 font-bold text-gray-900'>
                      {currencySymbol}{app.amount}
                    </td>

                    <td className='p-3.5'>
                      {app.cancelled ? (
                        <span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600'>Cancelled</span>
                      ) : app.isCompleted ? (
                        <span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700'>Completed</span>
                      ) : (
                        <span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700'>Booked</span>
                      )}
                    </td>

                    <td className='p-3.5 text-right'>
                      {!app.cancelled && !app.isCompleted && (
                        <button 
                          onClick={() => cancelAppointment(app._id)}
                          className='text-red-600 hover:underline font-semibold'
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: DOCTORS LIST MANAGEMENT */}
      {activeTab === 'doctors-list' && (
        <div className='bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6 animate-fade-in'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-bold text-gray-900'>Registered Doctors Directory</h3>
              <p className='text-xs text-gray-500'>Toggle availability switch to change live status on patient app</p>
            </div>

            <button 
              onClick={() => setActiveTab('add-doctor')}
              className='bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm'
            >
              <PlusCircle className='w-4 h-4' /> Add New Doctor
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {doctors.map((item, index) => (
              <div 
                key={index}
                className='bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden p-4 space-y-3 flex flex-col justify-between'
              >
                <div className='flex items-center gap-3'>
                  <img src={item.image} alt={item.name} className='w-14 h-14 rounded-2xl object-cover bg-white border border-gray-200' />
                  <div>
                    <h4 className='font-bold text-sm text-gray-900 line-clamp-1'>{item.name}</h4>
                    <span className='text-[10px] font-semibold text-primary bg-indigo-50 px-2 py-0.5 rounded-full'>
                      {item.speciality}
                    </span>
                    <p className='text-[11px] text-gray-500 mt-0.5'>{item.experience} Exp | {currencySymbol}{item.fees}</p>
                  </div>
                </div>

                <div className='pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-medium'>
                  <span className={item.available ? 'text-emerald-600 font-bold' : 'text-red-500'}>
                    {item.available ? '● Available' : '○ Unavailable'}
                  </span>

                  <button 
                    onClick={() => toggleDoctorAvailability(item._id)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${item.available ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-200 text-gray-700 hover:bg-slate-300'}`}
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: ADD DOCTOR FORM */}
      {activeTab === 'add-doctor' && (
        <div className='bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto animate-fade-in'>
          <div>
            <h3 className='text-xl font-bold text-gray-900'>Add Doctor Profile</h3>
            <p className='text-xs text-gray-500 mt-1'>Register a new specialist physician to Prescripto directory</p>
          </div>

          <form onSubmit={handleAddDoctorSubmit} className='space-y-4 text-xs'>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Doctor Name</label>
                <input 
                  type="text" 
                  value={docName} 
                  onChange={(e) => setDocName(e.target.value)} 
                  placeholder="Dr. Full Name"
                  required
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>

              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Doctor Email</label>
                <input 
                  type="email" 
                  value={docEmail} 
                  onChange={(e) => setDocEmail(e.target.value)} 
                  placeholder="doctor@prescripto.com"
                  required
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Speciality</label>
                <select 
                  value={docSpeciality}
                  onChange={(e) => setDocSpeciality(e.target.value)}
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Degree / Qualifications</label>
                <input 
                  type="text" 
                  value={docDegree} 
                  onChange={(e) => setDocDegree(e.target.value)} 
                  placeholder="MBBS, MD"
                  required
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>

              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Experience</label>
                <input 
                  type="text" 
                  value={docExperience} 
                  onChange={(e) => setDocExperience(e.target.value)} 
                  placeholder="e.g. 4 Years"
                  required
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Consultation Fee ({currencySymbol})</label>
                <input 
                  type="number" 
                  value={docFees} 
                  onChange={(e) => setDocFees(e.target.value)} 
                  placeholder="50"
                  required
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>

              <div>
                <label className='block font-semibold text-gray-700 mb-1'>Photo Image URL</label>
                <input 
                  type="text" 
                  value={docImage} 
                  onChange={(e) => setDocImage(e.target.value)} 
                  placeholder="https://..."
                  required
                  className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>
            </div>

            <div>
              <label className='block font-semibold text-gray-700 mb-1'>About Bio</label>
              <textarea 
                rows={3}
                value={docAbout}
                onChange={(e) => setDocAbout(e.target.value)}
                placeholder="Doctor's background, accomplishments, and medical philosophy..."
                className='w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
              />
            </div>

            <button 
              type="submit"
              className='w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-all text-xs shadow-lg shadow-primary/20'
            >
              Save & Register Doctor
            </button>
          </form>

        </div>
      )}

      {/* TAB CONTENT 4: DOCTOR CONSULT PANEL */}
      {activeTab === 'doctor-panel' && (
        <div className='bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6 animate-fade-in'>
          <div>
            <h3 className='text-lg font-bold text-gray-900'>Doctor Consultation Workspace</h3>
            <p className='text-xs text-gray-500'>Mark appointments as completed and issue digital prescriptions to patients</p>
          </div>

          <div className='space-y-4'>
            {appointments.map((app, index) => (
              <div 
                key={index}
                className='bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
              >
                <div className='flex items-center gap-4'>
                  <img src={app.docData.image} alt="" className='w-12 h-12 rounded-xl object-cover border border-gray-300' />
                  <div>
                    <h4 className='font-bold text-sm text-gray-900'>{app.patientData?.name || 'Aarav Sharma'}</h4>
                    <p className='text-xs text-indigo-600 font-medium'>Assigned Doctor: {app.docData.name}</p>
                    <p className='text-[11px] text-gray-500'>Date: {app.slotDate.replace(/_/g, '/')} at {app.slotTime}</p>
                  </div>
                </div>

                <div className='flex items-center gap-2 self-end sm:self-center'>
                  {app.isCompleted ? (
                    <span className='px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1'>
                      <CheckCircle2 className='w-3.5 h-3.5' /> Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => completeAppointment(app._id)}
                      className='px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors'
                    >
                      Mark Completed
                    </button>
                  )}

                  <button 
                    onClick={() => { setPrescriptionApp(app); setRxDiagnosis(app.notes || 'General Checkup'); }}
                    className='px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5'
                  >
                    <FileText className='w-3.5 h-3.5 text-amber-400' />
                    {app.prescription ? 'Edit Prescription' : 'Issue Prescription'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prescription Generator Modal for Doctor Panel */}
      {prescriptionApp && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in'>
          <div className='bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative'>
            <div className='bg-slate-900 p-5 text-white flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FileText className='w-5 h-5 text-amber-400' />
                <h3 className='font-bold text-sm'>Issue Digital Prescription</h3>
              </div>
              <button onClick={() => setPrescriptionApp(null)} className='text-gray-400 hover:text-white'>
                <X className='w-5 h-5' />
              </button>
            </div>

            <form onSubmit={handleSaveRx} className='p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto'>
              <div>
                <label className='block font-bold text-gray-700 mb-1'>Patient</label>
                <p className='p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-sm'>
                  {prescriptionApp.patientData?.name || 'Aarav Sharma'} ({prescriptionApp.docData.name})
                </p>
              </div>

              <div>
                <label className='block font-bold text-gray-700 mb-1'>Clinical Diagnosis</label>
                <input 
                  type="text" 
                  value={rxDiagnosis} 
                  onChange={(e) => setRxDiagnosis(e.target.value)} 
                  placeholder="Diagnosis summary..."
                  required
                  className='w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>

              <div>
                <div className='flex items-center justify-between mb-2'>
                  <label className='font-bold text-gray-700'>Prescribed Medicines (Rx)</label>
                  <button 
                    type="button"
                    onClick={handleAddMedicineRow}
                    className='text-primary hover:underline font-semibold'
                  >
                    + Add Medicine
                  </button>
                </div>

                <div className='space-y-2'>
                  {rxMedicines.map((med, idx) => (
                    <div key={idx} className='grid grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl border border-gray-200'>
                      <input 
                        type="text" 
                        value={med.name} 
                        onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)} 
                        placeholder="Medicine name"
                        className='p-1.5 bg-white border border-gray-200 rounded-lg text-xs'
                      />
                      <input 
                        type="text" 
                        value={med.dosage} 
                        onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)} 
                        placeholder="Dosage"
                        className='p-1.5 bg-white border border-gray-200 rounded-lg text-xs'
                      />
                      <input 
                        type="text" 
                        value={med.frequency} 
                        onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)} 
                        placeholder="Frequency"
                        className='p-1.5 bg-white border border-gray-200 rounded-lg text-xs'
                      />
                      <input 
                        type="text" 
                        value={med.duration} 
                        onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)} 
                        placeholder="Duration"
                        className='p-1.5 bg-white border border-gray-200 rounded-lg text-xs'
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className='block font-bold text-gray-700 mb-1'>Advice / Special Instructions</label>
                <textarea 
                  rows={2}
                  value={rxInstructions}
                  onChange={(e) => setRxInstructions(e.target.value)}
                  className='w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-primary'
                />
              </div>

              <button 
                type="submit"
                className='w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 text-xs shadow-md shadow-primary/20 flex items-center justify-center gap-2'
              >
                <Send className='w-4 h-4' />
                <span>Save & Issue Prescription</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminDashboard
