// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import NextNProgress from 'nextjs-progressbar';
import '@/styles/globals.css';
import  {AuthProvider}  from '@/components/AuthContext';
import { ModalProvider } from '@/components/ModalContext';



const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {


  return (
    <ModalProvider>
    <AuthProvider>
     
      <Layout>
        <NextNProgress color="#D76400" />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
    </ModalProvider>
  );
};

export default MyApp;
