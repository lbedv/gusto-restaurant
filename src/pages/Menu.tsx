import React, { useState, useEffect, useCallback } from 'react';
import { getMenuItemsByCategory, allergens } from '../services/menuService';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import PageHeader from '../components/layout/PageHeader';
import { Info, Plus } from 'lucide-react';

const MenuPage = () => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('starter');
  const menuCategories = getMenuItemsByCategory();
  const [showAllergens, setShowAllergens] = useState(false);
  
  // Handle smooth scrolling to categories
  const scrollToCategory = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  
  // Handle intersection observer to update active category
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    menuCategories.forEach(category => {
      const element = document.getElementById(`category-${category.id}`);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveCategory(category.id);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(element);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [menuCategories]);
  
  // Handle adding items to cart
  const handleAddToCart = useCallback((itemId: number) => {
    const category = menuCategories.find(cat => 
      cat.items.some(item => item.id === itemId)
    );
    
    if (category) {
      const item = category.items.find(item => item.id === itemId);
      if (item) {
        addItem(item, 1);
        toast.success(`${item.name} přidán do košíku`);
      }
    }
  }, [menuCategories, addItem]);

  return (
    <>
      <PageHeader 
        title="Naše menu" 
        description="Prozkoumejte naši nabídku plnou chutných pokrmů"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-4 min-w-max">
              {menuCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-restaurant-600 text-white' 
                      : 'bg-restaurant-100 text-restaurant-800 hover:bg-restaurant-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
              
              <button
                onClick={() => setShowAllergens(!showAllergens)}
                className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
                  showAllergens 
                    ? 'bg-restaurant-600 text-white' 
                    : 'bg-restaurant-100 text-restaurant-800 hover:bg-restaurant-200'
                }`}
                title="Zobrazit alergeny"
              >
                <Info size={18} className="mr-2" />
                Alergeny
              </button>
            </div>
          </div>
          
          {/* Allergens Information */}
          {showAllergens && (
            <div className="mb-8 p-4 bg-restaurant-50 rounded-lg border border-restaurant-200">
              <h3 className="text-lg font-semibold mb-3">Seznam alergenů</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(allergens).map(([code, name]) => (
                  <div key={code} className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-restaurant-600 text-white rounded-full text-xs font-bold mr-2">
                      {code}
                    </span>
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Menu Categories */}
          <div className="space-y-16">
            {menuCategories.map(category => (
              <div key={category.id} id={`category-${category.id}`} className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold text-restaurant-900 mb-8 pb-2 border-b border-restaurant-200">
                  {category.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.items.map(item => (
                    <div key={item.id} className="menu-item">
                      <div className="flex">
                        {/* Item Image */}
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Item Details */}
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-semibold text-restaurant-900">
                              {item.name}
                            </h3>
                            <span className="font-bold text-restaurant-800">
                              {item.price} Kč
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-2 text-sm">
                            {item.description}
                          </p>
                          
                          {/* Allergens */}
                          {item.allergens && item.allergens.length > 0 && (
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <span className="mr-2">Alergeny:</span>
                              <div className="flex space-x-1">
                                {item.allergens.map(allergen => (
                                  <span 
                                    key={allergen} 
                                    className="inline-flex items-center justify-center w-5 h-5 bg-restaurant-100 text-restaurant-800 rounded-full text-xs"
                                    title={allergens[allergen]}
                                  >
                                    {allergen}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <button 
                            className="flex items-center text-sm font-medium text-white bg-restaurant-600 hover:bg-restaurant-700 transition-colors rounded-full px-4 py-1 mt-2"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Přidat do košíku
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
