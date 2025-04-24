import { doctorModel } from "../models/doctor.model.js";
import { appointmentModel } from "../models/appointment.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


const changeAvailability = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'availability Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId }).sort({ date: -1 })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body
        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment || appointment.docId !== docId) {
            return res.json({ success: false, message: "unauthorized action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
        res.json({ success: true, message: "appointment completed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body
        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment || appointment.docId !== docId) {
            return res.json({ success: false, message: "unauthorized action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const docData = await doctorModel.findById(docId)
        const slots_booked = docData.slots_booked

        if (slots_booked[appointment.slotDate]) {
            slots_booked[appointment.slotDate] = slots_booked[appointment.slotDate].filter(time => time !== appointment.slotTime)
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.json({ success: true, message: "appointment cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId }).sort({ date: -1 })

        const earnings = appointments.reduce((total, item) => {
            return item.isCompleted || item.payment ? total + item.amount : total
        }, 0)

        const patients = [...new Set(appointments.map(item => item.userId))]

        res.json({
            success: true,
            dashData: {
                earnings,
                appointments: appointments.length,
                patients: patients.length,
                latestAppointments: appointments.slice(0, 5)
            }
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fee, address, available, about } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fee, address, available, about })

        res.json({ success: true, message: "profile updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailability,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}
