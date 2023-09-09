
import Task from "../models/Task.js";
import createError from "../utils/createError.js";

export const createTask = async(req, res, next) =>{
    try{
        const newTask=  new Task({  //Creating new task
            title:req.body.title,
            user: req.user.id,
            completed:req.body.completed,
        });
        const savedTask = await newTask.save(); // Saving new Task created into DB
        return res.status(201).json(savedTask); // Returning the new task
    } 
    catch(err){
        return next(err); //Error
    }
};

export const getAllTasks = async(req, res, next) =>{
    try{
        const tasks = await Task.find({}); // Finding all task from DB
        return res.status(200).json(tasks); // Returning all tasks
    }
    catch(err){
        return next(err); //Error
    }

};

export const getCurrentUserTasks = async(req, res ,next) =>{
    try{
        const tasks = await Task.find({user: req.user.id}) // Find tasks created by the current user
        return res.status(200).json(tasks); // Return tasks created by the current user
    }
    catch(err){
        return next(err); // Error
    }
};


export const updateTask = async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.taskId).exec(); // Finding the task having id from the route using params

      if (!task) return next(createError({ status: 404, message: 'Task not found' })); // task not available 
      if (task.user.toString() !== req.user.id) return next(createError({ status: 401, message: "It's not your todo." })); // Comparing user from task & user from payload  
  
      const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, { // Finding task by id and updating using new value
        title: req.body.title,
        completed: req.body.completed,
      }, { new: true });

      return res.status(200).json(updatedTask); //Return updated Task
    } catch (err) {
      return next(err); //Error
    }
  };

  

  export const deleteTask = async(req, res, next) =>{
    try{
        const task = await Task.findById(req.params.taskId).exec();  // Finding the task id using passed id 

        if (!task) return next(createError({ status: 404, message: 'Task not found' })); //If task is available or not
        if (task.user.toString() !== req.user.id) return next(createError({ status: 401, message: "It's not your todo." })); // Comparing user from task & user from payload  
    
        await Task.findByIdAndDelete(req.params.taskId); // Finding the task using passed id and deleting 
        return res.status(200).json('Task Deleted Successfully');
    }
    catch(err){
        return next(err); // Error
    }
   
  };