import React, { useEffect, useState } from 'react';
import axios from'axios';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import classes from './Navbar.module.scss';
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async() =>{
        try{
            const {data} = await axios.get('/api/users/me'); // Reading the current user details 
            setUser(data); // Setting the 'user' with current user details
        }
        catch(err){
            console.log(err);  // Error
        }
       
    };

    useEffect(()=>{
        getUser();  // Calling the getUSer function for only one time 
    }, []);
 
    const handleLogout = async () => {
        try{
            await axios.get('/api/auth/logout'); // Gettiing the logout route
            setUser(null); // Setting the user to null 
            toast.success('User Logged out'); // Logout successfull 
            navigate('/auth'); // Navigate to auth route after logout
        }
        catch(err){
            console.log(err);  // Error
        }
    }



    if(!user) return null; // Return null if no user found

  return (
   <header>
    <div className={classes.userInfo}>
    <FaUserAlt className={classes.userIcon} />
    <div>
    <h1 className={classes.name}> {user.name} </h1> 
        <p className={classes.email}> {user.email} </p>
        <Link to='/edit-profile' className={classes.editBtn}> Edit </Link>
    </div>
    </div>
    <nav>
        <button type='button' className={classes.logout} onClick={handleLogout}>
            Logout
        </button>
    </nav> 
   </header>
  )
}

export default Navbar;