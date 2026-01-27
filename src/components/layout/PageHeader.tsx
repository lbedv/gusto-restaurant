import React from 'react';
import { PageHeaderProps } from '../../types';
import headerBgSmall from '../../assets/images/hero/header-sm.webp';
import headerBgMedium from '../../assets/images/hero/header-md.webp';
import headerBgLarge from '../../assets/images/hero/header-lg.webp';

const PageHeader = ({ 
  title, 
  description, 
  backgroundImage
}: PageHeaderProps) => {
  // Use responsive header background if no custom background is provided
  const getBgImage = () => {
    if (backgroundImage) return backgroundImage;
    // Return small by default, will be handled by picture element
    return headerBgSmall;
  };

  return (
    <section 
      className="relative pt-32 pb-16 md:pt-48 md:pb-24 bg-restaurant-900 overflow-hidden"
    >
      <picture className="absolute inset-0 z-0">
        <source media="(min-width: 1024px)" srcSet={headerBgLarge} />
        <source media="(min-width: 768px)" srcSet={headerBgMedium} />
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 z-0" 
          style={{ backgroundImage: `url(${getBgImage()})` }}
        />
      </picture>
      
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
