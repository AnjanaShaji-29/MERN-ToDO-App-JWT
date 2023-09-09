import mongoose from "mongoose";

const { Schema } = mongoose;
const taskSchema = new Schema (
    {
        title:
        {
            type:String,
            required : true,
        },
        completed: {
            type: Boolean,
            required:false,
            default:false,
        },
        user:{                          
            type:Schema.Types.ObjectId, 
            ref: "User", // Refering the User model
            required : true,
        },
    },{timestamps : true} // Defining the Task schema with timestamp
);

export default mongoose.model("Task", taskSchema); //Creating Task model from the taskSchema