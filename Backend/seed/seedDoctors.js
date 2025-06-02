import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import { connectDB } from '../config/mongodb.js'
import { connectCloudinary } from '../config/cloudinary.js'
import { doctorModel } from '../models/doctor.model.js'
import { seedDoctors } from './doctors.js'

const imagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'images')
const password = process.env.SEED_DOCTOR_PASSWORD || 'doctor@123'

// reuses the cloudinary asset when the seed is run again instead of uploading a duplicate
const uploadImage = async (fileName) => {
    const publicId = `prescripto/doctors/${path.parse(fileName).name}`

    try {
        const existing = await cloudinary.api.resource(publicId)
        return { url: existing.secure_url, reused: true }
    } catch (error) {
        if (error.error?.http_code !== 404 && error.http_code !== 404) throw error
    }

    const uploaded = await cloudinary.uploader.upload(path.join(imagesDir, fileName), {
        public_id: publicId,
        resource_type: 'image'
    })
    return { url: uploaded.secure_url, reused: false }
}

const run = async () => {

    if (password.length < 8) {
        throw new Error('SEED_DOCTOR_PASSWORD must be at least 8 characters')
    }

    connectCloudinary()
    await connectDB()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let created = 0, updated = 0, uploaded = 0

    for (const doc of seedDoctors) {
        const { url, reused } = await uploadImage(doc.image)
        if (!reused) uploaded++

        const result = await doctorModel.updateOne(
            { email: doc.email },
            {
                $set: {
                    name: doc.name,
                    image: url,
                    speciality: doc.speciality,
                    degree: doc.degree,
                    experience: doc.experience,
                    about: doc.about,
                    fee: doc.fee,
                    address: doc.address
                },
                $setOnInsert: {
                    password: hashedPassword,
                    available: true,
                    date: Date.now(),
                    slots_booked: {}
                }
            },
            { upsert: true }
        )

        result.upsertedCount ? created++ : updated++
        console.log(`${result.upsertedCount ? 'created' : 'updated'}  ${doc.name}`)
    }

    console.log(`\ndone. created ${created}, updated ${updated}, images uploaded ${uploaded}`)
    console.log(`doctors sign in with their email and "${password}"`)

    await mongoose.disconnect()
}

// cloudinary rejects with a plain object rather than an Error
const describe = (error) => error.error?.message || error.message || JSON.stringify(error)

run().catch(async (error) => {
    console.error('seed failed:', describe(error))
    await mongoose.disconnect()
    process.exit(1)
})
