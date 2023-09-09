import User from "../models/User.js";

export const getUserInfo = async (req, res, next) =>{

    try{
    const data = await User.findById(req.user.id).select('name email');  // id from payload in controllers/auth.js 
    return res.status(200).json(data);
 }
  catch(err){
    return next(err); // Error
  }
}


export const updateUser = async(req, res ,next) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {  // Finding the user by id & updating the name & email
            name:req.body.name,
            email: req.body.email       
        }, {
            new:true // Return updated user
        }).select('name email'); // Selecting name & email
        
        return res.status(200).json(updatedUser); // Passing the updated user 
    } catch(err){
        return next(err);
    }
}