import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useModalContext } from '../ModalContext';
import { InputAdornment, IconButton, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const { openLoginModal, closeModals } = useModalContext();
  const [showPassword, setShowPassword] = useState(false);

  const apiURL = 'https://kuku-hub-ba097a50ef10.herokuapp.com'


  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios.post(`${apiURL}/signup`, formData)
      .then((response) => {
        // Handle successful sign-up here, e.g., redirect to a different page or show a success message.
        console.log('User created successfully!', response.data);
        showSuccessToast('Sign up successful!, Please Log in');
      })
      .catch((error) => {
        // Handle sign-up errors here, e.g., show an error message.
        console.error('Error creating user:', error.response.data);
        showErrorToast('Error creating user.');
      });
  };

  const showSuccessToast = (message: string): void => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000, // 3 seconds
    });
  };

  const showErrorToast = (message: string): void => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 5000, // 5 seconds
    });
  };


  return (
    <div className='flex justify-center items-center'>
      <div className='bg-white rounded-md md:w-[55%] w-[80%] md:flex  gap-20 pb-10 md:pb-0.5 mt-28 md:mt-0.5'>
        <div className='ml-10'>

        
       <h1 className=' font-extrabold text-3xl text-orange-600 mt-5'>KUKU HUB</h1>
      <p className='text-gray-400 mt-2'>Create an account</p>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div >
          <Input
            type="text"
            name="name"
            placeholder='Username'
            value={formData.name}
            color='warning'
            onChange={handleChange}
            required
            className='bg-gray-100 py-1.5 pl-6 rounded-sm md:w-72 w-60 mt-3'
          />
        </div>
        <div className='mt-2'>
         
          <Input
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            color='warning'
            required
            className='bg-gray-100 py-1.5 pl-6 rounded-sm md:w-72 w-60 mt-3'
          />
        </div>
        <div className='mt-2'>
          <Input
             type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            placeholder='Password'
            color='warning'
            onChange={handleChange}
            required
            className='bg-gray-100 py-1.5 pl-6 pr-10 rounded-sm md:w-72 w-60 mt-3'
            endAdornment={
              <InputAdornment position="end" variant="standard">
                <IconButton
                  onClick={handlePasswordToggle}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <div className='mt-2'>
          
          <Input
             type={showPassword ? 'text' : 'password'}
            name="password_confirmation"
            color='warning'
            placeholder='Confirm Password'
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className='bg-gray-100 py-1.5 pl-6 pr-10 rounded-sm md:w-72 w-60 mt-3'
            endAdornment={
              <InputAdornment position="end" variant="standard">
                <IconButton
                  onClick={handlePasswordToggle}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <div>
        <button type="submit" className='bg-slate-50 text-orange-600 hover:bg-orange-600 border hover:text-white transition-all duration-500 py-2 rounded-3xl font-semibold md:w-40 w-40 mt-5  border-orange-600'>Sign Up</button>
        </div>
        
      </form>
      <ToastContainer />
      </div>

      <div className=' rounded-md hidden md:block'>
      <Image
      src={'https://images.unsplash.com/photo-1576615039667-c7a34b96f505?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      width={300}
      height={100}
      quality={100}
      alt='image'
      className = ' rounded-r-md'
      />
    </div>
      </div>
    </div>
  );
};

export default SignUp;
