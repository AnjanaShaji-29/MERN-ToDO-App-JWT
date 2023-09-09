import React, { useEffect } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import classes from './Auth.module.scss';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();
  const {auth} = useAuth(); // Checking if authenticated or not using useAuth hook

  useEffect( () =>{
    if(auth){
      navigate('/');  // if authenticate, route to home page 
    }
  },[auth, navigate]);

  return (
  <Layout>
    <div className={ classes.form_container }> 
        <Login /> 
        <Register />
    </div>
  </Layout>
  )
}

export default Auth;