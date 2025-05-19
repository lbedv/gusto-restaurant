import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-restaurant-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
            Stránka nebyla nalezena
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Je nám líto, ale požadovaná stránka neexistuje. Možná byla přesunuta nebo smazána.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 rounded-lg btn-primary"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
