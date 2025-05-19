import { Link } from 'react-router-dom';
import { ChefHat, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-stone-600/80 to-amber-800/70 animate-gradient-shift z-0"
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
            Kulinářský zážitek, který vás okouzlí
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Připravte se na nezapomenutelný zážitek v restauraci Gusto, kde tradiční recepty 
            spojujeme s moderními technikami a čerstvými, lokálními surovinami.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link 
              to="/menu" 
              className="inline-flex items-center px-6 py-3 rounded-lg btn-primary"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Prohlédnout menu
            </Link>
            
            <Link
              to="/order" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-restaurant-900 hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-restaurant-900 transition-colors"
            >
              <ChefHat className="mr-2 h-5 w-5" />
              Objednat online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
