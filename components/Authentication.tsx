import React, { useState, useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import Signin from './user/SignIn';
import Signup from './user/SignUp';
import { useModalContext } from './ModalContext';


const Authentication: React.FC = () => {
  const { isSignUpModalOpen, closeModals } = useModalContext();
  const [showSignin, setShowSignin] = useState(true);

  const handleLogin = () => {
    setShowSignin(true);
    closeModals();
  };

  const handleSignUp = () => {
    setShowSignin(false);
    closeModals();
  };

  return (
    <div className='bg-[#1a1616] h-screen pt-16'>
      
      {showSignin ? (
        <Signin />
      ) : (
        <Signup />
      )}

      <div className="text-sm text-gray-400 text-center mt-9 ">
        {showSignin ? (
          <>
            Do not have an account?
            <button
              className="underline text-orange-600 ml-2 font-semibold"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?
            <button
              className="underline text-orange-600 ml-2 font-semibold"
              onClick={handleLogin}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
