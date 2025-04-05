import mongoose from "mongoose";

const connectDB = async () => {

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing, copy .env.example to .env and fill it")
    }

    mongoose.connection.on('connected' , ()=> console.log("Database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)

}

export {connectDB}
