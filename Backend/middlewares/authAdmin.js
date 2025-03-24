import jwt from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = async (req,res,next) => {

    try{
        const { aToken } = req.headers;

        if (!aToken) {
          return res.json({
            success: false,
            message: `Not authorized login to add the doctor, AToken not found ${aToken}`,
          });
        }

        const decodedToken = jwt.verify(aToken, process.env.JWT_SECRET);

        console.log("decoded token : " + decodedToken.email);
        if (
          decodedToken.email != process.env.ADMIN_EMAIL ||
          decodedToken.password != process.env.ADMIN_PASSWORD
        ) {
          return res.json({
            success: false,
            message:
              "Not authorized login to add the doctor, AToken did not match",
          });
        }
        next()
    }catch (error){
        console.log(error)
        res.json({success : false,message : error.message })
    }
}

export default authAdmin;