const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = async(req,res)=>{
    try{
       const {name, email, password} = req.body;
       const oldUser = await User.findOne({email});
       if(oldUser){
           return res.status(400).json({
                        success:false, 
               message:"User already exist"
       });
       }

       const hashPassword = await bcrypt.hash(password,10);

       const user = await User.create({name, email, password:hashPassword});
       res.status(201).json({
          
       });
    }
    catch(err){
        res.status(500).json({
        success:false,
        message:"Unable to Register",
        error: err.message
     })
    }
};

const login = ()=>{};

const profile = ()=>{};

const logout = ()=>{};

module.exports = {register, login, profile, logout};