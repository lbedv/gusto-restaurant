import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

type NavLinksProps = {
  onClick?: () => void;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-16 md:h-auto ${
      isMenuOpen || isScrolled 
        ? 'bg-background shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 md:py-3 flex justify-between items-center h-full">
        <Link to="/" className="text-2xl md:text-3xl font-bold font-serif text-restaurant-800">
          Gusto
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-restaurant-800 focus:outline-none z-50"
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 top-16 bottom-0 bg-background z-30 md:hidden animate-fade-in overflow-y-auto">
          <nav className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <NavLinks onClick={toggleMenu} />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ onClick }: NavLinksProps) => (
  <>
    <Link to="/" className="px-2 py-2 hover:text-restaurant-600 bg-restaurant-100/30 rounded-md font-medium transition-colors " onClick={onClick}>
      Domů
    </Link>
    <Link to="/menu" className="px-2 py-2 hover:text-restaurant-600 bg-restaurant-100/30 rounded-md font-medium transition-colors" onClick={onClick}>
      Menu
    </Link>
    <Link to="/order" className="px-2 py-2 hover:text-restaurant-600 bg-restaurant-100/30 rounded-md font-medium transition-colors" onClick={onClick}>
      Objednávka
    </Link>
    <Link to="/gallery" className="px-2 py-2 hover:text-restaurant-600 bg-restaurant-100/30 rounded-md font-medium transition-colors" onClick={onClick}>
      Galerie
    </Link>
    <Link to="/about" className="px-2 py-2 hover:text-restaurant-600 bg-restaurant-100/30 rounded-md font-medium transition-colors" onClick={onClick}>
      O nás
    </Link>
    <Link to="/contact" className="px-2 py-2 hover:text-restaurant-600 bg-restaurant-100/30 rounded-md font-medium transition-colors" onClick={onClick}>
      Kontakt
    </Link>
  </>
);

export default Header;
