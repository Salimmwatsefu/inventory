import React, { useState, useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import { InputAdornment, IconButton, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useModalContext } from '../ModalContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Signin: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { openSignUpModal, closeModals } = useModalContext();

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, password);
      closeModals();
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  const navigateToSignUp = () => {
    // Use the router to navigate to the sign-up page
    router.push('/signup'); // Update with your actual sign-up page route
  };


  return (
    <div className='flex justify-center items-center'>
      <div className=' bg-white rounded-md md:w-[55%] w-[80%] md:flex  gap-20 pb-10 md:pb-0.5 mt-28 md:mt-0.5'>
        <div className='ml-10'>
      <h1 className=' font-extrabold text-3xl text-orange-600 mt-10'>KUKU HUB</h1>
      <p className='text-gray-400 mt-2 font-semibold text-lg'>Login</p>
    <form onSubmit={handleLogin} className='mt-5'>
      <div>
       
      <Input
        type="text"
        placeholder="Username"
        value={name}
        color='warning'
        onChange={(e) => setName(e.target.value)}
        className='bg-gray-100 py-2 pl-6 rounded-sm md:w-72 w-60 mt-3 '
      />
      </div>

      <div className='mt-6'>
     
      <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          color='warning'
          onChange={(e) => setPassword(e.target.value)}
          className='bg-gray-100 py-2 pl-6 pr-10 rounded-sm md:w-72 w-60 mt-3 '
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
      <div className=' '>
      <button type="submit" className='bg-slate-50 text-orange-600 hover:bg-orange-600 border hover:text-white transition-all duration-500 text- py-2 rounded-3xl font-semibold md:w-40 w-40 mt-10  border-orange-600'>Login</button>
      </div>
    </form>
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

export default Signin;
