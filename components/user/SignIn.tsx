import React, { useState, useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import { InputAdornment, IconButton, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useModalContext } from '../ModalContext';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { openSignUpModal, closeModals } = useModalContext();

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, password);
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  return (
    <div className='md:ml-14 ml-7 mt-16'>
      <h1 className=' font-extrabold text-3xl text-orange-600'>KUKU HUB</h1>
      <p className=' font-semibold text-2xl mt-5 text-gray-700'>Welcome Back</p>
      <p className='text-gray-400 mt-2'>Please log in</p>
    <form onSubmit={handleLogin} className='mt-5'>
      <div>
        <label htmlFor="name" className='text-gray-800'>Username</label><br/>
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
      <label htmlFor="name" className='text-gray-800'>Password</label><br/>
      <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="..............."
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
      <button type="submit" className='bg-slate-50 text-orange-600 hover:bg-orange-600 border hover:text-white transition-all duration-500 text-lg py-3 font-semibold md:w-72 w-60 mt-10  border-orange-600'>Login</button>

      <p className="text-xs text-gray-500 text-center mt-9 -ml-14">
          Do not have an account?
          <button onClick={openSignUpModal} className="underline text-orange-600 ml-2 font-semibold">
            Sign up
          </button>
        </p>
    </form>
    </div>
  );
};

export default Login;
