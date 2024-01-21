// components/Layout.tsx
import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { AuthContext } from './AuthContext';
import Signin from './user/SignIn';
import Signup from './user/SignUp';
import { useRouter } from 'next/router';
import Authentication from './Authentication';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user and token are present
    setIsAuthenticated(!!user && !!token);
  }, [user, token]);

  if (!isAuthenticated) {
    // User is not signed in, render sign-in page
    return (
      <>
        <Head>
          <title>Kuku Hub</title>
          <meta
            name="description"
            content="An inventory management system"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/hen.png" type="image/png" />
        </Head>
        <Authentication />
     
      </>
    );
  }

  // User is signed in, render main app
  return (
    <>
      <Head>
        <title>Kuku Hub</title>
        <meta
          name="description"
          content="An inventory management system"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hen.png" type="image/png" />
      </Head>
      <Navbar />
      <Sidebar />
      <main className="lg:ml-[200px] pt-16 bg-gray-200 h-screen !overflow-x-hidden">
        <div className="bg-gray-200">{children}</div>
      </main>
    </>
  );
};

export default Layout;
