import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MenuItem } from '../../types';
import beefWellingtonImg from '../../assets/images/menu/beef-wellington.webp';
import mediterraneanSaladImg from '../../assets/images/menu/mediterranean-salad.webp';
import chocolateFondantImg from '../../assets/images/menu/chocolate-fondant.webp';

// Sample featured menu items
const featuredItems: MenuItem[] = [
  {
    id: 1,
    name: 'Hovězí Wellington',
    description: 'Hovězí svíčková s houbovou směsí zabalená v listovém těstě',
    price: 345,
    image: beefWellingtonImg,
    category: 'Hlavní chody'
  },
  {
    id: 2,
    name: 'Středomořský salát',
    description: 'Čerstvý salát s grilovanou zeleninou, feta sýrem a olivami',
    price: 195,
    image: mediterraneanSaladImg,
    category: 'Předkrmy'
  },
  {
    id: 3,
    name: 'Čokoládový fondant',
    description: 'Teplý čokoládový dezert s tekutým středem a vanilkovou zmrzlinou',
    price: 145,
    image: chocolateFondantImg,
    category: 'Dezerty'
  }
];

/**
 * Featured Menu component
 * Displays a selection of featured restaurant menu items
 */
const FeaturedMenu: React.FC = () => {
  return (
    <section className="py-16 bg-restaurant-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-restaurant-900 mb-4">
            Naše speciality
          </h2>
          <p className="text-restaurant-600 max-w-2xl mx-auto">
            Objevte vybrané speciality z našeho menu, které připravujeme s láskou a péčí
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="text-sm font-medium text-restaurant-500 mb-1">{item.category}</div>
                <h3 className="text-xl font-semibold text-restaurant-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-restaurant-800">{item.price} Kč</span>
                  <Link 
                    to="/menu" 
                    className="text-restaurant-600 hover:text-restaurant-800 font-medium flex items-center"
                  >
                    Zobrazit více
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/menu" 
            className="inline-flex items-center px-6 py-3 rounded-lg btn-primary"
          >
            Kompletní menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
