import jwt from "jsonwebtoken";
import createError from './createError.js';

export default (req, res, next) =>{

    const token= req.cookies.access_token;  // Reading the cookie named access token
    
    if(!token){
        return next(createError({status:401, message: 'UnAuthorized'}));  // No token
    }

   return jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {  
        
    if(err){ 
        return next(createError({status:401, message: 'Invalid Token'})); // Invalid token
        } else{
            req.user = decoded;  
            return next(); // Go to next middleware 

        }
    });
};