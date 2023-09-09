import React from 'react';
import axios from 'axios';
import classes from './AuthForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login() {

  const navigate = useNavigate(); 
  const login = async(e) => {
    e.preventDefault();                      //Preventing reload on form submit
    const email = e.target.email.value;
    const password = e.target.password.value; //Reading form values
    try{
      await axios.post('/api/auth/login', {  // Passing the login credentials to the login route
        email,password
      });
      
      navigate('/');                        // Navigate to the home route
      toast.success('Login Success'); // Login Success
    } catch(err){
      console.log(err);
      toast.error('Login Failed'); //Error
    } 
  }




  return (
    <div className={classes.register}>
    <h1 className={classes.title}> Login </h1>
    <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
            Email 
            <input type="email" name="email" placeholder="email" required />
        </label>
        <label htmlFor="password">
            Password 
            <input type="password" name="password" placeholder="password" required />
        </label>
        <br />
        <button type="submit"> Login </button>
    </form>
    </div>
  )
}

export default Login;