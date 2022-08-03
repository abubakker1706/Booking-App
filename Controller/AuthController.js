import User from "../models/UserSchema.js";
import bcryptjs from "bcryptjs"
import { createError } from "../Utils/error.js";
import jwt from 'jsonwebtoken'

export const registerUser=async(req, res, next) =>{


const salt=  bcryptjs.genSaltSync(10)
const hashPassword =  bcryptjs.hashSync(req.body.password, salt)
const newUser = new User({
                         username: req.body.username,
                         password: hashPassword,
                         email: req.body.email
})

try {
         const savedUser = await newUser.save()
         res.status(202).json(savedUser)

} catch (err) {
     next(err);                    
}
}
export const LoginUser=async(req, res, next) =>{


                        
                         
 try {
const user = await User.findOne({username:req.body.username})
if(!user) return next(createError(404,'User is not found'))
const isPasswordCorrect = await bcryptjs.compare(
                         req.body.password, 
                         user.password)
if(!isPasswordCorrect) return next(createError(400,'incorrect password'))

const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)//secretkey string can be anything or to create random secret key use this comment in terminal openssl rand -bas e64 32

const{password,isAdmin,...otherDetails}=user._doc // this remove password and isAdmin from result and give username nd email
res.cookie("access_token",token,{
httpOnly:true,
}).status(200).json({detalis:{...otherDetails},isAdmin})
                         
 } catch (err) {
 next(err);                    
 }
}