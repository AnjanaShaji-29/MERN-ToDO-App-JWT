import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './EditProfileForm.module.scss';

function EditProfileForm() {
  const [user, setUser] = useState({ // Initialize the empty user object 
    name: '',
    email: '',
  });

  useEffect(() => { // Displaying current user details in the edit form
    (
      async () => {
        try {
          const { data } = await axios.get('/api/users/me'); // Getting the current user details
          setUser(data); // Setting the 'user' with returned data
        } catch (err) {
          console.log(err); // Error
        }
      }
    )();
  }, []);

  const updateUserInfo = (e) => { // Updating user in the form
    setUser({
      ...user, // Appending the current user value
      [e.target.name]: e.target.value, // Updating the new value in the form
    });
  };

  const updateProfile = async (e) => { // Updating the user details
    e.preventDefault();
    try {
      const res = await axios.put('/api/users/me', user); // Updating the user details in DB
      toast.success('Profile updated successfully'); // Update Successfull
      setUser(res.data); // Setting the 'user' to new updated value
    } catch (err) {
      console.log(err); // Error
    }
  };

  return (
    <div>
      <Link className={classes.backBtn} to="/">
        <BsArrowLeftShort />
        Home
      </Link>
      <div>
        <h1>Edit Profile</h1>
        <form className={classes.editForm} onSubmit={updateProfile}>
          <label htmlFor="name">
            Full Name:
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo}
            />
          </label>
          <label htmlFor="email">
            email:
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              value={user.email} 
              onChange={updateUserInfo}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;