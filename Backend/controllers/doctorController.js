

import { doctorModel } from "../models/doctor.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
// APi for adding doctor

const addDoctor = async (req,res) => {
    try {
        const {name,email,password,speciality,degree,experience,
            about,fees,address} = req.body
        
        
    }catch{

    }
}

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

export {
    changeAvailability,
    doctorList
}
