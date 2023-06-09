import React, { useState } from 'react';
import Link from 'next/link';
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
            <Link href="/" className="flex items-center gap-2 rounded-lg mx-3 bg-gray-100 px-5 py-2 text-black">
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
        <a
          href="#"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>

          <span className="text-sm font-medium"> Details </span>
        </a>

        <a
          href="#"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>

          <span className="text-sm font-medium"> Security </span>
        </a>

        <form action="/logout">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="text-sm font-medium"> Logout </span>
          </button>
        </form>
      </nav>
    </details>
  </nav>
</div>
          

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" className="flex items-center gap-2 bg-black p-4 hover:bg-gray-50">
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs text-gray-500">
                <strong className="block font-medium">Eric Frusciante</strong>
                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
