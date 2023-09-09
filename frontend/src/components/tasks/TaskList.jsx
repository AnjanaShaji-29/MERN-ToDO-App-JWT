import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import classes from './TaskList.module.scss';
import TaskItem from './TaskItem';

function TaskList() {

    const [taskList, setTaskList] = useState([]); //keep track of the task list
    const [isAddingNew, setisAddingNew] = useState(false); 
    const[newTask, setnewTask] = useState(''); // New task

    const addNewTask = async (e) => {  //Adding the new task
        e.preventDefault();
       
        if(newTask.length <= 0){    //New task length <=0
            toast.error('Task is empty'); 
            return;
        }

        try{
            const {data} = await axios.post('/api/tasks',{  // Passing the new task to tasks route
                title:newTask
            });

            toast.success('New task created');  // New task created 
            setTaskList([{...data},...taskList]);  // Adding newtask to tasklist
            setnewTask(''); // Making new task empty
            setisAddingNew(false); // Closing form

        }
        catch(err){
            console.log(err); // Error
        }
    };


    const getTasks = async () =>{
        try{
            const {data} = await axios.get('/api/tasks/myTasks'); //Reading the tasks
            setTaskList(
                data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)), //Sorting the task
                );
        }
        catch(err){
            console.log(err); //Error
        }
       
    };

    const addNewButtonClick = () =>{
        setisAddingNew(!isAddingNew); //Show/Hide the form while clicking Add New button
    }

    useEffect(() =>{
        getTasks(); // Calling the getTasks function for only once 
    }, []);


    const deleteTask = async (id) => {
        try {
          await axios.delete(`/api/tasks/${id}`); // Deleting the task using passed task id
          toast.success('Task deleted');          // Task Deleted 
          setTaskList(taskList.filter((task) => task._id !== id)); // Removing the deleted task from tasklist 
        } catch (err) {
          console.log(err); //Error
        }
      };
    


  return (
    <div>
        <div className={classes.topBar}>
            <button type='button' className={classes.addNew} onClick={addNewButtonClick}>
                Add New
            </button>
        </div>

        { isAddingNew && (
            <form className={classes.addNewForm} onSubmit={addNewTask}>
                <input type="text" value={newTask} onChange={e => setnewTask(e.target.value)} placeholder="Task Title" />
                <button type="submit"> Add </button>
            </form>
        )}
        
            {taskList.length > 0 ? (
                <table className={classes.taskList_table}> 
                <tbody>
                    {taskList.map((task) => (
                        <TaskItem task={task} deleteTask={deleteTask}  key={task._id} />
            ))}
                </tbody>
                </table>
            ): 'No task found'}
        
    </div>
  )
}

export default TaskList;