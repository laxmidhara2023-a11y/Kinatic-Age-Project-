import hero_img from './hero.png'

export const assets = {
  hero_img,
  logo: 'Prescripto',
  profile_pic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  stripe_logo: 'https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-6-pack-logos-icons-2673898.png',
  razorpay_logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg',
}

export const specialityData = [
  {
    speciality: 'General physician',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    icon: 'Stethoscope',
    description: 'Diagnosis and treatment of general health conditions and preventative care.'
  },
  {
    speciality: 'Gynecologist',
    image: 'https://images.unsplash.com/photo-1594824813571-24a698277d33?auto=format&fit=crop&q=80&w=200',
    icon: 'HeartHandshake',
    description: 'Women’s reproductive health, pregnancy, and wellness specialists.'
  },
  {
    speciality: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=200',
    icon: 'Sparkles',
    description: 'Experts in skin, hair, nail disorders, and aesthetic treatments.'
  },
  {
    speciality: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=200',
    icon: 'Baby',
    description: 'Comprehensive medical care for infants, children, and young adults.'
  },
  {
    speciality: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    icon: 'Brain',
    description: 'Specialists in disorders of the brain, spinal cord, and nervous system.'
  },
  {
    speciality: 'Gastroenterologist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    icon: 'Activity',
    description: 'Digestive system, stomach, liver, and gastrointestinal care.'
  }
]

export const doctorsData = [
  {
    _id: 'doc1',
    name: 'Dr. Shah Rukh Khan',
    image: '/doctors/doc1.jpg',
    speciality: 'General physician',
    degree: 'MBBS, MD (Internal Medicine)',
    experience: '15 Years',
    about: 'Dr. Shah Rukh Khan has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective management strategies for chronic conditions.',
    fees: 500,
    rating: 5.0,
    reviewsCount: 450,
    available: true,
    address: {
      line1: 'Mannat Healthcare, Bandstand',
      line2: 'Bandra West, Mumbai'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Deepika Padukone',
    image: '/doctors/doc2.png',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (Obstetrics & Gynaecology)',
    experience: '10 Years',
    about: 'Dr. Deepika Padukone is dedicated to empowering women throughout all stages of life, specializing in prenatal care, minimally invasive gynecological procedures, and reproductive health.',
    fees: 600,
    rating: 4.9,
    reviewsCount: 380,
    available: true,
    address: {
      line1: 'Prabhadevi Wellness Center',
      line2: 'Worli, Mumbai'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Priyanka Chopra',
    image: '/doctors/doc3.jpg',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '12 Years',
    about: 'Dr. Priyanka Chopra provides personalized dermatological care ranging from acne management and skin allergies to advanced anti-aging treatments and laser therapies.',
    fees: 550,
    rating: 4.9,
    reviewsCount: 310,
    available: true,
    address: {
      line1: 'Juhu Tara Road Skin Clinic',
      line2: 'Juhu, Mumbai'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Amitabh Bachchan',
    image: '/doctors/doc4.jpg',
    speciality: 'Pediatrician',
    degree: 'MBBS, DCH (Pediatrics)',
    experience: '25 Years',
    about: 'Dr. Amitabh Bachchan creates a warm and reassuring environment for child growth monitoring, vaccinations, pediatric infectious diseases, and developmental care.',
    fees: 700,
    rating: 5.0,
    reviewsCount: 620,
    available: true,
    address: {
      line1: 'Jalsa Pediatric Institute',
      line2: 'Juhu Scheme, Mumbai'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Vidya Balan',
    image: '/doctors/doc5.jpg',
    speciality: 'Neurologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '11 Years',
    about: 'Dr. Vidya Balan specializes in neurological conditions including migraine disorders, epilepsy management, stroke rehabilitation, and memory health.',
    fees: 650,
    rating: 4.9,
    reviewsCount: 290,
    available: true,
    address: {
      line1: 'Chembur Neuro Speciality',
      line2: 'Central Avenue, Mumbai'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Hrithik Roshan',
    image: '/doctors/doc6.jpg',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM (Gastroenterology)',
    experience: '14 Years',
    about: 'Dr. Hrithik Roshan offers compassionate diagnostic endoscopy, liver wellness programs, and holistic digestive health therapies for acid reflux and IBS.',
    fees: 600,
    rating: 4.9,
    reviewsCount: 340,
    available: true,
    address: {
      line1: 'Juhu Beach Diagnostic Center',
      line2: 'Juhu, Mumbai'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Akshay Kumar',
    image: '/doctors/doc7.jpg',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '16 Years',
    about: 'Dr. Akshay Kumar focuses on preventative wellness screenings, fitness and lifestyle modification advice, and family health management.',
    fees: 500,
    rating: 4.8,
    reviewsCount: 410,
    available: true,
    address: {
      line1: 'Lokhandwala Fitness & Health',
      line2: 'Andheri West, Mumbai'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Katrina Kaif',
    image: '/doctors/doc8.jpg',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '9 Years',
    about: 'Dr. Katrina Kaif is an experienced obstetrician dedicated to safe maternal-fetal care and women’s health wellness.',
    fees: 550,
    rating: 4.9,
    reviewsCount: 275,
    available: true,
    address: {
      line1: 'Bandra West Women Clinic',
      line2: 'Hill Road, Mumbai'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Kareena Kapoor',
    image: '/doctors/doc9.jpg',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '13 Years',
    about: 'Dr. Kareena Kapoor specializes in pediatric and adult dermatology, cosmetic rejuvenation, and eczema care.',
    fees: 600,
    rating: 4.9,
    reviewsCount: 360,
    available: true,
    address: {
      line1: 'Fortune Heights Aesthetic Clinic',
      line2: 'Bandra West, Mumbai'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Ayushmann Khurrana',
    image: '/doctors/doc10.jpg',
    speciality: 'Pediatrician',
    degree: 'MBBS, MD (Pediatrics)',
    experience: '8 Years',
    about: 'Dr. Ayushmann Khurrana is passionate about child nutrition, pediatric preventive care, and adolescent medicine.',
    fees: 450,
    rating: 4.8,
    reviewsCount: 220,
    available: true,
    address: {
      line1: 'Andheri Child Wellness',
      line2: 'Seven Bungalows, Mumbai'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Alia Bhatt',
    image: '/doctors/doc11.jpg',
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '7 Years',
    about: 'Dr. Alia Bhatt brings expertise in neuro-diagnostics, neuropathy care, and brain health optimization.',
    fees: 600,
    rating: 4.9,
    reviewsCount: 300,
    available: true,
    address: {
      line1: 'Vastu Neuro Care',
      line2: 'Pali Hill, Mumbai'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Ranbir Kapoor',
    image: '/doctors/doc12.jpg',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '10 Years',
    about: 'Dr. Ranbir Kapoor provides evidence-based therapies for digestive system conditions and gastrointestinal health.',
    fees: 550,
    rating: 4.8,
    reviewsCount: 280,
    available: true,
    address: {
      line1: 'Pali Hill Digestive Center',
      line2: 'Bandra West, Mumbai'
    }
  }
]

export const initialAppointmentsData = [
  {
    _id: 'app_101',
    docId: 'doc1',
    docData: doctorsData[0],
    slotDate: '02_08_2026',
    slotTime: '10:00 AM',
    amount: 50,
    date: Date.now() - 86400000 * 2,
    cancelled: false,
    payment: true,
    isCompleted: false,
    prescription: null
  },
  {
    _id: 'app_102',
    docId: 'doc3',
    docData: doctorsData[2],
    slotDate: '05_08_2026',
    slotTime: '02:30 PM',
    amount: 40,
    date: Date.now() - 86400000 * 1,
    cancelled: false,
    payment: false,
    isCompleted: false,
    prescription: null
  }
]
