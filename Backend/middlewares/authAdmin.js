import jwt from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = async (req,res,next) => {

    try{
        const {atoken} = req.headers;

        if(!atoken){
            return res.json({success :false, message :'Not authorized login to add the doctor'})
        }

        const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET)

        console.log("decoded token : "+ decodedToken.email)
        if(decodedToken.email != process.env.ADMIN_EMAIL ||decodedToken.password !=  process.env.ADMIN_PASSWORD){
            return res.json({success :false, message :'Not authorized login to add the doctor'})
        }
        next()
    }catch (error){
        console.log(error)
        res.json({success : false,message : error.message })
    }
}

export default authAdmin;