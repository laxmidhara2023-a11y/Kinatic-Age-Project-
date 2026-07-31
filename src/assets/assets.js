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
    name: 'Dr. Richard James',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    speciality: 'General physician',
    degree: 'MBBS, MD (Internal Medicine)',
    experience: '4 Years',
    about: 'Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective management strategies for chronic conditions.',
    fees: 50,
    rating: 4.9,
    reviewsCount: 124,
    available: true,
    address: {
      line1: '17th Cross, Richmond Circle',
      line2: 'Ring Road, New York'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Emily Larson',
    image: 'https://images.unsplash.com/photo-1594824813571-24a698277d33?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (Obstetrics & Gynaecology)',
    experience: '3 Years',
    about: 'Dr. Emily Larson is dedicated to empowering women throughout all stages of life, specializing in prenatal care, minimally invasive gynecological procedures, and reproductive health.',
    fees: 60,
    rating: 4.8,
    reviewsCount: 98,
    available: true,
    address: {
      line1: '27th Cross, Park Avenue',
      line2: 'Downtown, Boston'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Sarah Patel',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '1 Year',
    about: 'Dr. Sarah Patel provides personalized dermatological care ranging from acne management and skin allergies to advanced anti-aging treatments and laser therapies.',
    fees: 40,
    rating: 4.7,
    reviewsCount: 82,
    available: true,
    address: {
      line1: '37th Cross, Broadway Boulevard',
      line2: 'Suite 400, Chicago'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Christopher Lee',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Pediatrician',
    degree: 'MBBS, DCH (Pediatrics)',
    experience: '2 Years',
    about: 'Dr. Christopher Lee creates a warm and reassuring environment for child growth monitoring, vaccinations, pediatric infectious diseases, and developmental care.',
    fees: 45,
    rating: 4.9,
    reviewsCount: 140,
    available: true,
    address: {
      line1: '47th Cross, Sunshine Lane',
      line2: 'Westside, San Francisco'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Jennifer Garcia',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Neurologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '5 Years',
    about: 'Dr. Jennifer Garcia specializes in neurological conditions including migraine disorders, epilepsy management, stroke rehabilitation, and memory health.',
    fees: 75,
    rating: 4.9,
    reviewsCount: 210,
    available: true,
    address: {
      line1: '57th Cross, Metro View',
      line2: 'Medical District, Seattle'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Andrew Williams',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM (Gastroenterology)',
    experience: '4 Years',
    about: 'Dr. Andrew Williams offers compassionate diagnostic endoscopy, liver wellness programs, and holistic digestive health therapies for acid reflux and IBS.',
    fees: 65,
    rating: 4.8,
    reviewsCount: 115,
    available: true,
    address: {
      line1: '67th Cross, Ocean Heights',
      line2: 'Marina Bay, Miami'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Christopher Davis',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '6 Years',
    about: 'Dr. Christopher Davis focuses on preventative wellness screenings, lifestyle modification advice, and family health management.',
    fees: 55,
    rating: 4.9,
    reviewsCount: 165,
    available: true,
    address: {
      line1: '12th Elm Street',
      line2: 'Austin, Texas'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Timothy White',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '7 Years',
    about: 'Dr. Timothy White is an experienced obstetrician dedicated to safe maternal-fetal care and women’s health wellness.',
    fees: 70,
    rating: 4.9,
    reviewsCount: 180,
    available: true,
    address: {
      line1: '88 Hillside Drive',
      line2: 'Denver, Colorado'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Ava Martinez',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '3 Years',
    about: 'Dr. Ava Martinez specializes in pediatric and adult dermatology, cosmetic rejuvenation, and eczema care.',
    fees: 50,
    rating: 4.8,
    reviewsCount: 92,
    available: true,
    address: {
      line1: '45 Sunset Boulevard',
      line2: 'Los Angeles, California'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Jeffrey King',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
    speciality: 'Pediatrician',
    degree: 'MBBS, MD (Pediatrics)',
    experience: '5 Years',
    about: 'Dr. Jeffrey King is passionate about child nutrition, pediatric preventive care, and adolescent medicine.',
    fees: 50,
    rating: 4.8,
    reviewsCount: 130,
    available: true,
    address: {
      line1: '90 Pine Wood Way',
      line2: 'Atlanta, Georgia'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Zoe Bennett',
    image: 'https://images.unsplash.com/photo-1594824813571-24a698277d33?auto=format&fit=crop&q=80&w=400',
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '4 Years',
    about: 'Dr. Zoe Bennett brings expertise in neuro-diagnostics, neuropathy care, and brain health optimization.',
    fees: 80,
    rating: 4.9,
    reviewsCount: 175,
    available: true,
    address: {
      line1: '14 Magnolia Avenue',
      line2: 'Philadelphia, Pennsylvania'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Patrick Harris',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '5 Years',
    about: 'Dr. Patrick Harris provides evidence-based therapies for digestive system conditions and gastrointestinal health.',
    fees: 60,
    rating: 4.7,
    reviewsCount: 88,
    available: true,
    address: {
      line1: '33 Riverfront Drive',
      line2: 'Dallas, Texas'
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
