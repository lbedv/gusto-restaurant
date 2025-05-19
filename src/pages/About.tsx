
import React, { useRef } from 'react';
import PageHeader from '../components/layout/PageHeader';

const AboutPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <>
      <PageHeader 
        title="O nás" 
        description="Seznamte se s naší restaurací a našimi hodnotami"
        backgroundImage="/images/about-header.jpg"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-restaurant-900 mb-6">Náš příběh</h2>
              <p className="text-gray-700 mb-4">
                Restaurace Gusto vznikla v roce 2005 jako malý rodinný podnik s velkými ambicemi. Naším cílem od počátku
                bylo vytvořit místo, kde se spojuje vynikající jídlo s příjemnou atmosférou a profesionálním, přesto
                přátelským přístupem.
              </p>
              <p className="text-gray-700 mb-4">
                Za téměř dvě desetiletí jsme se z malé restaurace vypracovali na jedno z nejoblíbenějších
                gastronomických míst v Praze. Naše menu spojuje tradiční české recepty s moderními mezinárodními vlivy,
                přičemž klademe důraz na kvalitní a čerstvé suroviny od místních dodavatelů.
              </p>
              <p className="text-gray-700">
                V průběhu let jsme získali řadu ocenění a uznání, ale největší odměnou je pro nás spokojenost našich
                hostů. Mnozí z nich se k nám pravidelně vracejí, a to je pro nás tím nejlepším potvrzením, že svou
                práci děláme dobře.
              </p>
            </div>
            
            <div className="relative">
              <div 
                className="rounded-lg overflow-hidden shadow-xl"
                onClick={toggleVideo}
                role="button"
                aria-label="Přehrát nebo pozastavit video"
              >
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  poster="/images/restaurant-video-poster.jpg"
                  controls
                >
                  <source src="/videos/restaurant-promo.mp4" type="video/mp4" />
                  Váš prohlížeč nepodporuje přehrávání videa.
                </video>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="bg-restaurant-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-restaurant-900 text-center mb-8">Naše hodnoty</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-restaurant-800 mb-4">Kvalitní suroviny</h3>
                <p className="text-gray-600">
                  Spolupracujeme s lokálními dodavateli a farmáři, abychom zajistili, že naše jídla jsou připravena
                  z těch nejkvalitnějších a nejčerstvějších surovin. Věříme, že kvalitní ingredience jsou základem
                  vynikajícího jídla.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-restaurant-800 mb-4">Udržitelnost</h3>
                <p className="text-gray-600">
                  Snažíme se minimalizovat náš dopad na životní prostředí. Používáme sezónní produkty, recyklujeme,
                  kompostujeme a snažíme se eliminovat plýtvání potravinami. Naše odpovědnost vůči planetě bereme vážně.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-restaurant-800 mb-4">Pohostinnost</h3>
                <p className="text-gray-600">
                  V restauraci Gusto věříme, že jídlo má lidi spojovat. Proto vytváříme přátelskou a vřelou atmosféru,
                  kde se každý host cítí vítaný a může si v klidu vychutnat svůj kulinářský zážitek.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-restaurant-900 text-center mb-8">Náš tým</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Chef */}
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img
                    src="/images/chef.jpg"
                    alt="Šéfkuchař Jan Novák"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-restaurant-900">Jan Novák</h3>
                <p className="text-restaurant-600">Šéfkuchař</p>
                <p className="text-gray-600 mt-2">
                  Jan je naším šéfkuchařem už více než 10 let. Jeho kreativní přístup a vášeň pro gastronomii
                  jsou hnací silou naší kuchyně.
                </p>
              </div>
              
              {/* Sous Chef */}
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img
                    src="/images/sous-chef.jpg"
                    alt="Zástupce šéfkuchaře Marie Svobodová"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-restaurant-900">Marie Svobodová</h3>
                <p className="text-restaurant-600">Zástupkyně šéfkuchaře</p>
                <p className="text-gray-600 mt-2">
                  Marie se specializuje na dezerty a pečivo. Její sladké kreace jsou dokonalým zakončením
                  každého menu.
                </p>
              </div>
              
              {/* Manager */}
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img
                    src="/images/manager.jpg"
                    alt="Manažer Petr Kovář"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-restaurant-900">Petr Kovář</h3>
                <p className="text-restaurant-600">Manažer restaurace</p>
                <p className="text-gray-600 mt-2">
                  Petr dohlíží na chod restaurace a zajišťuje, aby každý host odcházel s úsměvem a plánoval
                  svou další návštěvu.
                </p>
              </div>
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div>
            <h2 className="text-3xl font-bold text-restaurant-900 text-center mb-8">Co o nás říkají hosté</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Navštívili jsme restauraci Gusto na výročí a byl to nezapomenutelný zážitek. Jídlo bylo
                  naprosto vynikající, obsluha profesionální a atmosféra útulná. Určitě se vrátíme!"
                </p>
                <p className="font-medium text-restaurant-900">Markéta H.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Gusto je moje oblíbená restaurace v Praze. Jejich hovězí Wellington je absolutně božský
                  a personál je vždy velmi pozorný a přátelský. Vřele doporučuji!"
                </p>
                <p className="font-medium text-restaurant-900">Tomáš V.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Skvělá restaurace s příjemným prostředím. Jedinou výtkou by mohla být delší čekací doba
                  ve špičce, ale kvalita jídla to více než vynahradí."
                </p>
                <p className="font-medium text-restaurant-900">Jana M.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
