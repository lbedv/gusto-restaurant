import React from 'react';
import { PageHeaderProps } from '../../types';

const PageHeader = ({ 
  title, 
  description, 
  backgroundImage = '/gusto-restaurant/images/restaurant-header-bg.jpg' 
}: PageHeaderProps) => {
  return (
    <section 
      className="relative pt-32 pb-16 md:pt-48 md:pb-24 bg-restaurant-900 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover opacity-40 bg-center z-0" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="max-w-2xl mx-auto text-lg text-gray-200">{description}</p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
