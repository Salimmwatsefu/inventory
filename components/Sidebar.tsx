import { useContext, useState} from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';
import Modal from './Modal';
import Login from './user/SignIn';
import SignUp from './user/SignUp';
import { useModalContext } from './ModalContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  PointOfSale as PointOfSaleIcon,
  Summarize as SummarizeIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout} = useContext(AuthContext);
  

  const { isLoginModalOpen, isSignUpModalOpen, openLoginModal, openSignUpModal, closeModals } =
    useModalContext();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 


  return (
    <div>
      <div className="lg:hidden">
        <button
          className="fixed top-0 left-0 bg-black text-white p-2 focus:outline-none z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
      )}

      <div
        className={`fixed bg-black text-white p-4 top-0 bottom-0 w-64 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-[209px] sm:w-80 z-50 `}
      >
        <div className="pb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="grid h-16 uppercase w-full place-content-center rounded-lg font-extrabold text-2xl text-orange-600">
              Kuku Hub
            </span>
            <button
              className="focus:outline-none text-white lg:hidden"
              onClick={toggleSidebar}
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-5">
            <Link href={'/graphs'} className="flex items-center gap-2 rounded-lg mx-3 bg-gray-100 px-5 py-2 text-black">
              <DashboardIcon className="text-gray-800 text-2xl" />
              <span className="text-sm font-semibold">Dashboard</span>
            </Link>

             {/*Categories */}

      <Link href={'/employees'}>
      
      <summary
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 mt-5 text-white hover:bg-gray-100 hover:text-gray-700"
      >
        <div className="flex items-center gap-2">
        <PeopleIcon className='text-gray-500 text-2xl'/>
          
          <span className="text-sm font-medium">Employees</span>
        </div>
      </summary>
      </Link>
    


    {/*Products */}

    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
      >
        <div className="flex items-center gap-2">
          <InventoryIcon className='text-gray-500 text-2xl'/>
          
          <span className="text-sm font-medium">Products</span>
        </div>

        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
        <Link
          href="/products"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
        >
          <span className="text-sm font-medium">Manage Products </span>
        </Link>

      </nav>
    </details>

    {/*Sales */}

    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
      >
        <div className="flex items-center gap-2">
          <PointOfSaleIcon className='text-gray-500 text-2xl'/>
          
          <span className="text-sm font-medium">Sales</span>
        </div>

        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
        <Link
          href="/sales"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
        >
          <span className="text-sm font-medium">Manage Sales </span>
        </Link>

        
      </nav>
      <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
        <Link
          href="/salesReport"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
        >
          <SummarizeIcon className='text-gray-500 text-2xl'/>
          <span className="text-sm font-medium">Sales Report </span>
        </Link>

        
      </nav>
    </details>

    {/*Account */}

<details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700 "
      >
        <div className="flex items-center gap-2">
          <ManageAccountsIcon className='text-gray-500 text-2xl'/>

          <span className="text-sm font-medium"> Account </span>
        </div>

        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <nav aria-label="Account Nav" className="mt-2 flex flex-col px-4">
        <button 
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
         
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Icon SVG */}
          </svg>

          <span className="text-sm font-medium"> My Profile</span>
        </button>
        
      
        <button 
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
          onClick={logout}
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Icon SVG */}
          </svg>

          <span className="text-sm font-medium"> Sign Out</span>
        </button>
      </nav>
    </details>
  </nav>
</div>
          

<div className="flex py-5 gap-10 items-center justify-center">
        {user ? (
          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a href="#" className="flex items-center gap-2 bg-black p-4 hover:bg-gray-50">
            <div className="h-10 w-10 bg-orange-600 text-white flex items-center justify-center rounded-full">
          {/* Extract the first letter from user.name and capitalize it */}
          <span className="text-xl font-semibold">{user.name.charAt(0).toUpperCase()}</span>
        </div>
              <div>
                <p className='text-xs'>Welcome back</p>
                <p className="text-xs text-orange-600">
                  <strong className="block font-medium ">{user.name}</strong>
                  
                </p>
              </div>
            </a>
          </div>
        ) : (
          <p className='font-semibold'>Please login first</p>
        )}
      </div>
      </div>
      <Modal onClose={closeModals} isOpen={isLoginModalOpen}>
        <Login />
      </Modal>
      <Modal onClose={closeModals} isOpen={isSignUpModalOpen}>
        <SignUp />
      </Modal>
    </div>
  );
}
