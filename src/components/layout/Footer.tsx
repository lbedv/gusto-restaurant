import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';

/**
 * Footer component
 * Displays restaurant contact information, navigation, and copyright
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-restaurant-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-restaurant-200">Gusto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-restaurant-300 mt-1 flex-shrink-0" />
                <span>
                  Restaurace Gusto<br />
                  Dlouhá 123<br />
                  110 00 Praha 1
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-restaurant-300 flex-shrink-0" />
                <span>+420 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-restaurant-300 flex-shrink-0" />
                <span>Po-Pá: 11:00-22:00<br />So-Ne: 12:00-23:00</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-restaurant-200">Navigace</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-restaurant-300 transition-colors">
                  Domů
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-restaurant-300 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-restaurant-300 transition-colors">
                  Online objednávka
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-restaurant-300 transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-restaurant-300 transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-restaurant-300 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-restaurant-200">Otevírací doba</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1">Pondělí</td>
                  <td className="text-right">11:00 - 22:00</td>
                </tr>
                <tr>
                  <td className="py-1">Úterý</td>
                  <td className="text-right">11:00 - 22:00</td>
                </tr>
                <tr>
                  <td className="py-1">Středa</td>
                  <td className="text-right">11:00 - 22:00</td>
                </tr>
                <tr>
                  <td className="py-1">Čtvrtek</td>
                  <td className="text-right">11:00 - 22:00</td>
                </tr>
                <tr>
                  <td className="py-1">Pátek</td>
                  <td className="text-right">11:00 - 23:00</td>
                </tr>
                <tr>
                  <td className="py-1">Sobota</td>
                  <td className="text-right">12:00 - 23:00</td>
                </tr>
                <tr>
                  <td className="py-1">Neděle</td>
                  <td className="text-right">12:00 - 22:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-restaurant-800 text-center text-sm text-restaurant-400">
          <p>&copy; {currentYear} Gusto Restaurant. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
