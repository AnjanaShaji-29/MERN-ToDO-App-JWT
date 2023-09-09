import axios from 'axios';
import { useEffect, useState } from 'react';

export default () => {
  const [auth, setAuth] = useState(); 

  const verifyAuth = async () => {
    try {
      const res = await axios.get('/api/auth/is_logged_in'); // Return true or false from is_logged_in
      return res.data; 
    } catch (err) {
      console.log(err); // Error
      return false; // Return false
    }
  };

  useEffect(() => {
    (
      async () => {
        const data = await verifyAuth(); // Calling verifyAuth function
        setAuth(data); // Passing data (true/false) 
      }
    )();
  }, []);

  return { auth }; // Return true or false
};