import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser=async (req,res)=>{
    const {email,password}=req.body
    try {
      const user=await userModel.findOne({email})
      if(!user)
        {
            return res.json({success:false,message:"User doesn't exist"})
        } 
        const isMatched=await bcrypt.compare(password,user.password) 
        if(!isMatched){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const registerUser=async (req,res)=>{
    const {name,password,email}=req.body;
    try {
        const exist=await userModel.findOne({email})
        if(exist){
            res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            res.json({success:false,message:"Please a enter a valid email"})
        }
        if(password.length < 8){
            res.json({success:false,message:"Please enter a strong password"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const newuser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user=await newuser.save()
        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}