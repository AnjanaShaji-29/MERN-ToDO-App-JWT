import React, { useState } from 'react';
import classes from './TaskItem.module.scss';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';


function TaskItem({task, deleteTask}) { // Props - task, deleteTask from TaskList 
 const [isCompleted , setIsCompleted] =useState(task.completed); // Tracking the status of tasks
 const [isLoading, setisLoading] = useState(false);

 const handleCheckboxClick = async() =>{
    try{
        setisLoading(true); // Setting disabled state 
        await axios.put(`/api/tasks/${task._id}`,{ // Changing the task status 
            completed : !isCompleted
        });
        setIsCompleted(!isCompleted); // Change the task status to  manually 
        toast.success('Task Updated Successfully'); // Updated Successfully 
    }
    catch(err){
        console.log(err); //Error
    }
    finally{
        setisLoading(false); // To get back from disabled state
    }
 };

  return (
    <tr className={classes.task_item }>
        <td className={classes.task_name}>
            <div className={classes.checkbox} role={'checkbox'} aria-checked onChange={handleCheckboxClick} disabled={isLoading}>
                <input type='checkbox' checked={isCompleted}  tabIndex={-1} readOnly disabled={isLoading} />
            </div>
            <p> {task.title} </p>
        </td>
        <td> {isCompleted ? 'Completed' : 'Incomplete'} </td>
        <td> {moment(task.createdAt).format('MMM Do yy')} </td>
        <td> 
            <button className={classes.deleteBtn} type='button' onClick={() => deleteTask(task._id)}> 
             Delete 
            </button>
        </td>
    </tr>
  )
}

export default TaskItem;