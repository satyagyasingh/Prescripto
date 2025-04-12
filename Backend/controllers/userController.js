import { userModel } from "../models/user.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET)

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "missing required fields" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please give valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter strong password" })
        }

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "user already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await new userModel({ name, email, password: hashedPassword }).save()

        res.json({ success: true, token: createToken(user._id) })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        res.json({ success: true, token: createToken(user._id) })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async (req, res) => {
    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "data missing" })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            dob,
            gender,
            address: typeof address === 'string' ? JSON.parse(address) : address
        })

        if (imageFile) {
            const upload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            await userModel.findByIdAndUpdate(userId, { image: upload.secure_url })
        }

        res.json({ success: true, message: "profile updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile }
