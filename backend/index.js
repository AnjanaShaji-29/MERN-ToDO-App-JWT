import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 8000;
const app = express();

//middleware
app.use(cors()); // Share resource between two origins
app.use(morgan('tiny')); // Log the HTTP requests
app.use(express.json()); // Enable JSON
app.use(cookieParser()); // Enable working with cookies

//routes
app.use('/api',allRoutes)

// error handler

app.use((err, req, res, next) =>{
    console.log({err});
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({message, stack: err.stack});
});

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("MongoDB Connected");  //Connected Successfully
    } 
    catch(err){
        console.log(err); // Error
        process.exit(1);  //Exiting the process 
    }
};

app.listen(PORT, ()=>{

    connectDB(); // Calling the connection function
    console.log(`Server is running at port ${PORT}`);
});
