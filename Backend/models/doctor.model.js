import { mongoose } from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fee: { type: Number, required: true },
    slots_booked : {type : Object, default : {}}
},{minimize : false}); // lets empty feilds not being deleted


const doctorModel = mongoose.model.doctor || mongoose.model('doctor',doctorSchema)

export {doctorModel}