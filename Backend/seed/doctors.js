const about = 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.'

const richmond = (n) => ({ line1: `${n}th Cross, Richmond`, line2: 'Circle, Ring Road, London' })

const seedDoctors = [
    { image: 'doc1.png', name: 'Dr. Richard James', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(17) },
    { image: 'doc2.png', name: 'Dr. Emily Larson', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', fee: 60, address: richmond(27) },
    { image: 'doc3.png', name: 'Dr. Sarah Patel', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', fee: 30, address: richmond(37) },
    { image: 'doc4.png', name: 'Dr. Christopher Lee', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', fee: 40, address: richmond(47) },
    { image: 'doc5.png', name: 'Dr. Jennifer Garcia', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(57) },
    { image: 'doc6.png', name: 'Dr. Andrew Williams', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(57) },
    { image: 'doc7.png', name: 'Dr. Christopher Davis', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(17) },
    { image: 'doc8.png', name: 'Dr. Timothy White', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', fee: 60, address: richmond(27) },
    { image: 'doc9.png', name: 'Dr. Ava Mitchell', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', fee: 30, address: richmond(37) },
    { image: 'doc10.png', name: 'Dr. Jeffrey King', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', fee: 40, address: richmond(47) },
    { image: 'doc11.png', name: 'Dr. Zoe Kelly', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(57) },
    { image: 'doc12.png', name: 'Dr. Patrick Harris', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(57) },
    { image: 'doc13.png', name: 'Dr. Chloe Evans', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', fee: 50, address: richmond(17) },
    { image: 'doc14.png', name: 'Dr. Ryan Martinez', speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', fee: 60, address: richmond(27) },
    { image: 'doc15.png', name: 'Dr. Amelia Hill', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Years', fee: 30, address: richmond(37) }
].map(doc => ({
    ...doc,
    about,
    email: doc.name.replace(/^Dr\.\s*/, '').toLowerCase().replace(/\s+/g, '.') + '@prescripto.com'
}))

export { seedDoctors }
