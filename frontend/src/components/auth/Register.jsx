import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './AuthForm.module.scss';

function Register() {

  const register = async (e) =>{
    e.preventDefault();  //Preventing reload on form submit
    const user ={
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,  //Reading form values
    };

    try{
      await axios.post('/api/auth/register',user); // Passing the user to the register route
      toast.success('Register Sucessfull'); // Register Success
    } catch(err){
      console.log(err);
      toast.error('Register Failed');  //Error
    }
  
  }

  return (
    <div className={classes.register} onSubmit={register}> 
      <h1 className={classes.title}>Register </h1>
      <form className={classes.authForm}>
        <label htmlFor="name">
          Name 
          <input type="text" name='name' placeholder='Full Name' required />
        </label> 

        <label htmlFor="email">
          Email 
          <input type="email" name='email' placeholder='Email' required />
        </label> 

        <label htmlFor="password">
          Password 
          <input type="password" name='password' placeholder='Password' required />
        </label> 
        <br />
        <button type="submit"> Register </button>
      </form>
    </div>

  )
}

export default Register;