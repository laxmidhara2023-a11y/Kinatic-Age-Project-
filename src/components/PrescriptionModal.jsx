import React from 'react'
import { X, Stethoscope, Printer, Download, CheckCircle2, Calendar, FileText, User } from 'lucide-react'

const PrescriptionModal = ({ appointment, onClose }) => {
  if (!appointment || !appointment.prescription) return null

  const { prescription, docData, patientData } = appointment

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in'>
      <div className='bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative flex flex-col max-h-[90vh]'>
        
        {/* Header Bar */}
        <div className='bg-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0'>
          <div className='flex items-center gap-2'>
            <Stethoscope className='w-5 h-5 text-primary' />
            <h3 className='text-base font-bold'>Digital Medical Prescription</h3>
          </div>

          <div className='flex items-center gap-2'>
            <button 
              onClick={handlePrint}
              className='p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 px-3 transition-colors'
            >
              <Printer className='w-3.5 h-3.5' />
              <span>Print</span>
            </button>

            <button 
              onClick={onClose}
              className='p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className='p-6 overflow-y-auto space-y-6 text-gray-800' id="printable-prescription">
          
          {/* Clinic & Doctor Header */}
          <div className='flex flex-col sm:flex-row items-start justify-between border-b border-gray-200 pb-6 gap-4'>
            <div>
              <div className='flex items-center gap-2 text-primary font-extrabold text-xl mb-1'>
                <Stethoscope className='w-6 h-6' />
                <span>Prescripto Health Medical Center</span>
              </div>
              <p className='text-xs text-gray-500'>100 Health Sciences Plaza, Suite 400, New York</p>
              <p className='text-xs text-gray-500'>Phone: +1 (800) 555-0199 | License: #MED-2026-8942</p>
            </div>

            <div className='bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-right min-w-[200px]'>
              <h4 className='font-bold text-sm text-gray-900'>{docData.name}</h4>
              <p className='text-xs text-primary font-medium'>{docData.degree}</p>
              <p className='text-xs text-gray-500'>{docData.speciality}</p>
            </div>
          </div>

          {/* Patient Details */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs'>
            <div>
              <span className='text-gray-400 block uppercase font-medium'>Patient Name</span>
              <span className='font-bold text-gray-900 text-sm'>{patientData?.name || 'Alex Johnson'}</span>
            </div>
            <div>
              <span className='text-gray-400 block uppercase font-medium'>Date Issued</span>
              <span className='font-semibold text-gray-800'>{prescription.issuedDate || 'Today'}</span>
            </div>
            <div>
              <span className='text-gray-400 block uppercase font-medium'>Appt Reference</span>
              <span className='font-mono font-semibold text-indigo-600'>{appointment._id}</span>
            </div>
          </div>

          {/* Diagnosis & Clinical Notes */}
          <div className='space-y-2'>
            <h5 className='text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5'>
              <FileText className='w-3.5 h-3.5 text-primary' />
              Clinical Diagnosis & Symptoms
            </h5>
            <div className='p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-sm font-medium text-amber-900'>
              {prescription.diagnosis || 'Routine general checkup & wellness review.'}
            </div>
          </div>

          {/* Prescribed Medications Table */}
          <div className='space-y-2'>
            <h5 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
              Rx - Prescribed Medications
            </h5>
            
            <div className='border border-gray-200 rounded-2xl overflow-hidden'>
              <table className='w-full text-left text-xs'>
                <thead className='bg-slate-100 text-gray-700 font-semibold border-b border-gray-200'>
                  <tr>
                    <th className='p-3'>Medicine Name</th>
                    <th className='p-3'>Dosage</th>
                    <th className='p-3'>Frequency</th>
                    <th className='p-3'>Duration</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 font-medium text-gray-800'>
                  {prescription.medicines && prescription.medicines.length > 0 ? (
                    prescription.medicines.map((med, idx) => (
                      <tr key={idx} className='hover:bg-slate-50'>
                        <td className='p-3 font-semibold text-primary'>{med.name}</td>
                        <td className='p-3'>{med.dosage}</td>
                        <td className='p-3'>{med.frequency}</td>
                        <td className='p-3'>{med.duration}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className='p-3 text-center text-gray-400'>No medicines listed</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctor Advice / Notes */}
          {prescription.instructions && (
            <div className='space-y-1.5'>
              <h5 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>Special Instructions & Advice</h5>
              <p className='text-xs text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed'>
                {prescription.instructions}
              </p>
            </div>
          )}

          {/* Footer Signature */}
          <div className='pt-6 border-t border-gray-200 flex items-center justify-between'>
            <div className='text-xs text-gray-400'>
              <p className='flex items-center gap-1 text-emerald-600 font-semibold mb-0.5'>
                <CheckCircle2 className='w-3.5 h-3.5' /> Verified Electronic Prescription
              </p>
              <p>Generated automatically via Prescripto Portal</p>
            </div>

            <div className='text-center'>
              <div className='font-serif italic text-lg font-bold text-indigo-900 border-b border-gray-300 pb-1 mb-1'>
                {docData.name}
              </div>
              <p className='text-[10px] text-gray-400 uppercase tracking-wider font-semibold'>Authorized Doctor Signature</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default PrescriptionModal
