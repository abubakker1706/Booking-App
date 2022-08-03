import jwt from 'jsonwebtoken'
import {createError} from './error.js'


export const verifyToken=(req, res, next) =>{
  const token = req.cookies.access_token
  if(!token) return next(createError(401,'You are not authorized to access'))

  jwt.verify(token,process.env.JWT,(error,user) =>{
if(error) {return next(createError(403,'Invalid token'))}
req.user = user // req.user can be anything example req.hello ,req.username
next()
  })
}

export const verifyUser = (req, res, next) =>{
verifyToken(req, res,next,()=>{
if(req.user.id===req.params.id || req.user.isAdmin){
next()
}else{
 return next(createError(403,'Access denied'))                
}
})
}
export const verifyAdmin = (req, res, next) =>{
                         verifyToken(req, res,next,()=>{
                         if(req.user.isAdmin){
                         next()
                         }else{
                          return next(createError(403,'Access denied'))                
                         }
                         })
                         }