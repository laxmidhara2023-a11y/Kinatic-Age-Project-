import React, { createContext, useState, useEffect } from 'react'
import { doctorsData, initialAppointmentsData, assets } from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = '₹'
  
  // Local storage initialization for persistent state
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('prescripto_doctors_v2')
    return saved ? JSON.parse(saved) : doctorsData
  })

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('prescripto_appointments_v2')
    return saved ? JSON.parse(saved) : initialAppointmentsData
  })

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('prescripto_userdata_v2')
    return saved ? JSON.parse(saved) : {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      image: assets.profile_pic,
      address: {
        line1: '57th Cross, Indiranagar',
        line2: 'MG Road, Bengaluru'
      },
      gender: 'Male',
      dob: '1996-05-15'
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('prescripto_token') || 'demo_patient_token'
  })

  const [aToken, setAToken] = useState(() => {
    return localStorage.getItem('prescripto_aToken') || ''
  })

  const [dToken, setDToken] = useState(() => {
    return localStorage.getItem('prescripto_dToken') || ''
  })

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('prescripto_user_role') || 'patient' // 'patient' | 'admin' | 'doctor'
  })

  const [selectedDoctorId, setSelectedDoctorId] = useState('doc1') // Default doctor when in doctor portal

  const [toast, setToast] = useState(null)

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('prescripto_doctors_v2', JSON.stringify(doctors))
  }, [doctors])

  useEffect(() => {
    localStorage.setItem('prescripto_appointments_v2', JSON.stringify(appointments))
  }, [appointments])

  useEffect(() => {
    localStorage.setItem('prescripto_userdata_v2', JSON.stringify(userData))
  }, [userData])

  useEffect(() => {
    if (token) {
      localStorage.setItem('prescripto_token', token)
    } else {
      localStorage.removeItem('prescripto_token')
    }
  }, [token])

  useEffect(() => {
    if (aToken) {
      localStorage.setItem('prescripto_aToken', aToken)
    } else {
      localStorage.removeItem('prescripto_aToken')
    }
  }, [aToken])

  useEffect(() => {
    if (dToken) {
      localStorage.setItem('prescripto_dToken', dToken)
    } else {
      localStorage.removeItem('prescripto_dToken')
    }
  }, [dToken])

  useEffect(() => {
    localStorage.setItem('prescripto_user_role', userRole)
  }, [userRole])

  const adminLogout = () => {
    setAToken('')
    setDToken('')
    localStorage.removeItem('prescripto_aToken')
    localStorage.removeItem('prescripto_dToken')
    setUserRole('patient')
    showToast('success', 'Logged out of Admin Portal')
  }

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  // Toggle Doctor Availability (Admin function)
  const toggleDoctorAvailability = (docId) => {
    setDoctors(prev => prev.map(doc => {
      if (doc._id === docId) {
        const updated = { ...doc, available: !doc.available }
        showToast('success', `${doc.name} status updated to ${updated.available ? 'Available' : 'Unavailable'}`)
        return updated
      }
      return doc
    }))
  }

  // Add new doctor (Admin function)
  const addDoctor = (newDocData) => {
    const newId = `doc_${Date.now()}`
    const doctorObj = {
      _id: newId,
      ...newDocData,
      rating: 5.0,
      reviewsCount: 1,
      available: true
    }
    setDoctors(prev => [doctorObj, ...prev])
    showToast('success', `Dr. ${newDocData.name} added successfully!`)
  }

  // Book appointment (Patient function)
  const bookAppointment = (docId, slotDate, slotTime, notes = '') => {
    const docData = doctors.find(doc => doc._id === docId)
    if (!docData) {
      showToast('error', 'Doctor not found')
      return false
    }

    if (!docData.available) {
      showToast('error', 'Doctor is currently unavailable for appointments')
      return false
    }

    // Check if slot is already booked for this doctor
    const existing = appointments.find(app => app.docId === docId && app.slotDate === slotDate && app.slotTime === slotTime && !app.cancelled)
    if (existing) {
      showToast('error', 'This time slot is already booked. Please choose another time.')
      return false
    }

    const newAppointment = {
      _id: `app_${Date.now()}`,
      docId,
      docData,
      slotDate,
      slotTime,
      notes,
      amount: docData.fees,
      date: Date.now(),
      cancelled: false,
      payment: false,
      isCompleted: false,
      prescription: null,
      patientData: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        image: userData.image
      }
    }

    setAppointments(prev => [newAppointment, ...prev])
    showToast('success', `Appointment booked with ${docData.name} on ${slotDate.replace(/_/g, '/')} at ${slotTime}!`)
    return true
  }

  // Cancel appointment
  const cancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(app => {
      if (app._id === appointmentId) {
        return { ...app, cancelled: true }
      }
      return app
    }))
    showToast('success', 'Appointment cancelled successfully')
  }

  // Complete Payment for appointment
  const payAppointment = (appointmentId, paymentMethod = 'Online') => {
    setAppointments(prev => prev.map(app => {
      if (app._id === appointmentId) {
        return { ...app, payment: true, paymentMethod }
      }
      return app
    }))
    showToast('success', `Payment of ${currencySymbol}${appointments.find(a => a._id === appointmentId)?.amount} successful!`)
  }

  // Mark appointment as Completed (Doctor function)
  const completeAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(app => {
      if (app._id === appointmentId) {
        return { ...app, isCompleted: true }
      }
      return app
    }))
    showToast('success', 'Appointment marked as Completed')
  }

  // Save Prescription (Doctor function)
  const addPrescription = (appointmentId, prescriptionData) => {
    setAppointments(prev => prev.map(app => {
      if (app._id === appointmentId) {
        return { 
          ...app, 
          isCompleted: true,
          prescription: {
            ...prescriptionData,
            issuedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          }
        }
      }
      return app
    }))
    showToast('success', 'Digital prescription issued to patient!')
  }

  const value = {
    doctors,
    setDoctors,
    currencySymbol,
    token,
    setToken,
    aToken,
    setAToken,
    dToken,
    setDToken,
    adminLogout,
    userData,
    setUserData,
    appointments,
    setAppointments,
    userRole,
    setUserRole,
    selectedDoctorId,
    setSelectedDoctorId,
    toast,
    showToast,
    toggleDoctorAvailability,
    addDoctor,
    bookAppointment,
    cancelAppointment,
    payAppointment,
    completeAppointment,
    addPrescription
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
