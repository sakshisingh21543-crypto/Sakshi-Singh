const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authMiddleware = async (req,res,next) =>{
    try{
       const authHeader = req.headers.authorization;

       if(!authHeader || authHeader.startsWith("Bearer")){
        return res.ststus(401).json({
            success:false,
            message:"Token Not Found"
        });
       }

       //Now work with token...
       let token = authHeader.split(" ")[1];
       const decoded = jwt.verify(token, process.env.SECRET_KEY);
       const user = await User.findById({ id: decoded.id });
       //without password....
       if(!user) {
        return res.status(401).json({
            success:false,
            message: "User Not Found"
        });
       }
       console.log("Middleware wala User");
       req.user = user;
       next();

    }
     catch(err) {
        console.log("Some error in authentication", err);
        return res.json({
            success: false,
            message: "Invalid Token"
        })
     }
};