import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema (
    {
        name:
        {
            type:String,
            required : true,
        },
        email: {
            type: String,
            required:true,
            unique:true,
        },

        password:{
            type:String,
            required: true,
        },
       
    },{timestamps : true} // Defining the User Schema with timestamp
);

export default mongoose.model("User", userSchema); // Creating the User model from the userSchema