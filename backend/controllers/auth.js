import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import createError from "../utils/createError.js";

export const register =  async (req,res,next) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(createError({status:400, message: 'Name,Email & Password is required'}));   // Any of the value is missing 
    }

    try{
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt); // Encrypting the password

        const newUser = new User({   
            name:req.body.name,
            email: req.body.email,
            password: hashedPassword   // Creating new User with name,email & hashed password
        });

        await newUser.save(); // Save the new user into user table
        return res.status(201).json('New User Created');
    }
    catch(err){
        console.log(err);
        return next(err);  // Error
    }

};

export const login = async (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return next(createError({status:400, message: 'Email & Password is required'}));  //Any of the value is missing
    }
    try{
        const user = await User.findOne({email:req.body.email}).select( // Finding the correct userdetails from DB
            'name email password'
        );

        if(!user){
            return next(createError({status:404, message: 'No User found!'}));  //  No user found
        }

        const isPasswordCorrect = await bcryptjs.compare(req.body.password,user.password); // Comparing the password 
        if(!isPasswordCorrect){
            return next(createError({status:404, message: 'Password Incorrect!'})); //Password Incorrect
        }

        const payload ={
            id: user._id,
            name: user.name //Creating cookie using user id and name
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{ // JSON Web Token
            expiresIn : '1d' 
        })

        return res.cookie('access_token', token , { // accesstoken - name of cookie
            httpOnly: true // Accessibly by server only
        }).status(200).
        json({'message': "Login success"})  // Login success
    }

    catch(err){
        console.log(err); //Error
        return next(err);
    }

};


export const logout = (req, res)=>{
 res.clearCookie('access_token');  //clear cookie
 return res.status(200).json({message:'Logout Success'}); 
};

export const isLoggedIn = (req, res)=>{  // Return true or false based on token
   
    const token = req.cookies.access_token; // Getting the token
    if(!token){
        return res.json(false); // Return false
    }
    return jwt.verify(token, process.env.JWT_SECRET , (err)=>{
        if(err){
            return res.json(false); // Return false
        } else {
            return res.json(true); // Return true
        }
    });
};

