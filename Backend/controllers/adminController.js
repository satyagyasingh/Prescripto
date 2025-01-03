import { doctorModel } from "../models/doctor.model.js";
import validator from 'validator';

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
      fee,
      address,
    } = req.body;
    const image = req.file?.filename || "no file";

    console.log({ name, email, password, speciality, degree, experience, about, fee, address, image });

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



    const doctor = new doctorModel({
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
      image,
      date : 1,
      available : 1
    });

    console.log("doctor to be created");

    // Save doctor to the database
    await doctor.save();

    // Send success response
    res.status(200).json({
      message: "doctor saved",
      image: image,
      doctor: doctor,
    });


  } catch (error) {
    console.error("Error while saving doctor:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export { addDoctor };
