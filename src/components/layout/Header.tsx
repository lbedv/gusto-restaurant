import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
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
    <header className={`fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
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
          className="md:hidden text-restaurant-800 focus:outline-none"
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-20 md:hidden animate-fade-in">
          <nav className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <NavLinks onClick={toggleMenu} />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ onClick }: { onClick?: () => void }) => (
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
