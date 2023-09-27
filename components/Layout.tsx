import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Loading from './Loading';


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  

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

      {isLoading && <Loading />}

      {!isLoading && (

  
        <>
          <Navbar />
          <Sidebar />
          <main className="lg:ml-[200px] pt-16 bg-gray-200 h-screen !overflow-x-hidden">
            <div className="bg-gray-200">{children}</div>
          </main>
        </>
      )}
      
    </>
  );
}
