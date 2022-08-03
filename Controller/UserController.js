import User from "../models/UserSchema.js";

export const updateUser = async(req, res, next)=>{
                         try {
          
                         const user= await User.findByIdAndUpdate(
                         req.params.id,
                         {$set:req.body},
                         {new:true}
                                                  )
                         res.status(200).json(user)
                         } catch (error) {
                             next(error)                   
                         }

}

export const deleteUser = async(req, res,next) =>{

 try {
                                   
                         await User.findByIdAndDelete(req.params.id)
                         res.status(200).json('User deleted successfully')
                         } catch (error) {
                           next(error)                    
                                                  }    
}

export const getSpecificUser = async(req, res, next) =>{
                         try {
                                   
                         const getUser= await User.findById(req.params.id)
                         res.status(200).json(getUser)
                         } catch (error) {
                         next(error)                    
                         }      
}

export const getAllUsers = async(req, res, next) =>{
                         try {
                                   
                         const getAllUser= await User.find()
                         res.status(200).json(getAllUser)
                         } catch (error) {
                         next(error)                    
                         }
}