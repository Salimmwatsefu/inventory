import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useModalContext } from '../ModalContext';
import { InputAdornment, IconButton, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  const [signUpSuccess, setSignUpSuccess] = useState(false);
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
        showSuccessToast('User created successfully!');
        setSignUpSuccess(true); 
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

  useEffect(() => {
    if (signUpSuccess) {
      openLoginModal();
    }
  }, [signUpSuccess, openLoginModal]);

  return (
    <div className='md:ml-10 ml-5 mt-6'>
       <h1 className=' font-extrabold text-3xl text-orange-600'>KUKU HUB</h1>
      <p className=' font-semibold text-2xl mt-3 text-gray-700'>Welcome</p>
      <p className='text-gray-400 mt-2'>Create an account</p>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div >
          <label htmlFor="name">Username</label><br/>
          <Input
            type="text"
            name="name"
            placeholder='John'
            value={formData.name}
            color='warning'
            onChange={handleChange}
            required
            className='bg-gray-100 py-2 pl-6 rounded-sm md:w-72 w-60 mt-3'
          />
        </div>
        <div className='mt-2'>
          <label htmlFor="email">Email</label><br/>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            color='warning'
            required
            className='bg-gray-100 py-2 pl-6 rounded-sm md:w-72 w-60 mt-3'
          />
        </div>
        <div className='mt-2'>
          <label htmlFor="password" >Password</label><br/>
          <Input
             type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            color='warning'
            onChange={handleChange}
            required
            className='bg-gray-100 py-2 pl-6 rounded-sm md:w-72 w-60 mt-3'
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
          <label htmlFor="password_confirmation">Confirm Password</label><br/>
          <Input
             type={showPassword ? 'text' : 'password'}
            name="password_confirmation"
            color='warning'
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className='bg-gray-100 py-2 pl-6 rounded-sm md:w-72 w-60 mt-3'
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
        <button type="submit" className='bg-slate-50 text-orange-600 hover:bg-orange-600 border hover:text-white transition-all duration-500 text-lg py-3 font-semibold md:w-72 w-60 mt-5  border-orange-600'>Sign Up</button>
        <p className="text-xs text-gray-500 text-center mt-9 -ml-14">
          Already have an account?
          <button onClick={openLoginModal} className="underline text-orange-600 ml-2 font-semibold">
            Login
          </button>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
