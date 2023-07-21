import { useState } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  

  return (
    <>
      <Head>
        <title >Kuku Hub</title>
        <meta
          name="description"
          content="An inventory management system"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hen.png" type="image/png" />
      </Head>

  
        <>
          <Navbar />
          <Sidebar />
          <main className="lg:ml-[200px] pt-16 bg-gray-200 h-screen !overflow-x-hidden">
            <div className="bg-gray-200">{children}</div>
          </main>
        </>
      
    </>
  );
}
