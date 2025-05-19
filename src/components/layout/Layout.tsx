import React from 'react';
import Header from './Header';
import { Toaster } from 'sonner';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
