import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/images/restaurant-interior.jpg" 
                alt="Interiér restaurace" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-48 rounded-lg z-0 hidden md:block">
              <img 
                src="/images/chef-cooking.jpg" 
                alt="Šéfkuchař při práci" 
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-restaurant-900 mb-6">
              Vášeň pro gastronomii již od roku 2005
            </h2>
            
            <p className="text-gray-700 mb-6">
              Restaurace Gusto je výsledkem mnohaletých zkušeností a vášně pro kvalitní gastronomii. 
              Naše kuchyně kombinuje tradiční české recepty s moderními mezinárodními vlivy a vytváří 
              tak jedinečné kulinářské zážitky, které potěší všechny smysly.
            </p>
            
            <p className="text-gray-700 mb-6">
              Používáme pouze ty nejkvalitnější, čerstvé a sezónní suroviny. Spolupracujeme s místními 
              dodavateli a farmáři, abychom zajistili, že každé jídlo, které servírujeme, je připraveno 
              z prvotřídních ingrediencí.
            </p>
            
            <p className="text-gray-700 mb-8">
              Náš tým profesionálních kuchařů a personálu je zde, aby vám poskytl nezapomenutelný 
              zážitek. Věříme, že dobrá restaurace není jen o vynikajícím jídle, ale také o příjemné 
              atmosféře a perfektní službě.
            </p>
            
            <Link 
              to="/about" 
              className="inline-flex items-center px-6 py-3 rounded-lg btn-primary"
            >
              Více o nás
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
