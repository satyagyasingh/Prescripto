import { doctorModel } from "../models/doctor.model.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fee,
      address,
    } = req.body;

    if (!req.file) {
      return res.status(422).json({
        success: false,
        message: "Image file is required",
      });
    }
    const filename = req.file; // Use the path property provided by multer
    

    console.log({ name, email, password, speciality, degree, experience, about, fee, address,available });

    // Check if any required field is missing
    if (!name || !email || !speciality || !password || !degree || !experience || !about || !fee || !address) {
      return res.status(422).json({
        error: "missing required fields",
      });
    }
    //for now dont check emails
    if(!validator.isEmail(email)){
        return res.json({
            success : false,
            message : "please give valid email",
        })
    }

    if(password.length<8){
        return res.json({
            success : false,
            message : "please enter strong password",
        })
    }

    //hashing doctor password
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password,salt)

    //upload image to cloudinary
    const image  = await cloudinary.uploader.upload(filename.path)

    const imageURL = image.secure_url;


    const doctorData ={
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
      available,
      date :  Date.now(),
      password : hashedPassword,
      image : imageURL,
    }

    const doctor = new doctorModel(doctorData);
    console.log("doctor to be created");

    // Save doctor to the database
    await doctor.save();

    // Send success response
    res.status(200).json({
      success : true,
      message: "doctor saved",
      // image: image,
      // doctor: doctor,
    });


  } catch (error) {
    console.error("Error while saving doctor:", error);
    res.status(500).json({
      err : error,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

//api for admin login

const loginAdmin = async (req,res) => {
  try{

    const {email ,password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
      res.json({success : true, token})
    }else{
      res.json({
        success : false,
        message : "invalid credentials"
      })
    }


  } catch (error) {
    console.error("Error while logging in admin:", error);
    res.status(500).json({
      err : error,
      error: "Internal Server Error",
      details: error.message,
    });
  }
}

export { addDoctor ,loginAdmin};
