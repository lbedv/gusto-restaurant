import React, { useState, useEffect, useRef, useCallback } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import restaurantInteriorThumb from '../assets/images/gallery/restaurant-interior-thumb.webp';
import restaurantInteriorFull from '../assets/images/gallery/restaurant-interior-full.webp';
import chefCookingThumb from '../assets/images/gallery/chef-cooking-thumb.webp';
import chefCookingFull from '../assets/images/gallery/chef-cooking-full.webp';
import outdoorSeatingThumb from '../assets/images/gallery/outdoor-seating-thumb.webp';
import outdoorSeatingFull from '../assets/images/gallery/outdoor-seating-full.webp';
import barThumb from '../assets/images/gallery/bar-thumb.webp';
import barFull from '../assets/images/gallery/bar-full.webp';
import restaurantStaffThumb from '../assets/images/gallery/restaurant-staff-thumb.webp';
import restaurantStaffFull from '../assets/images/gallery/restaurant-staff-full.webp';
import privateLoungeThumb from '../assets/images/gallery/private-lounge-thumb.webp';
import privateLoungeFull from '../assets/images/gallery/private-lounge-full.webp';
import beefWellingtonImg from '../assets/images/menu/beef-wellington.webp';
import beefWellingtonFull from '../assets/images/gallery/beef-wellington-full.webp';
import mediterraneanSaladImg from '../assets/images/menu/mediterranean-salad.webp';
import mediterraneanSaladFull from '../assets/images/gallery/mediterranean-salad-full.webp';
import chocolateFondantImg from '../assets/images/menu/chocolate-fondant.webp';
import chocolateFondantFull from '../assets/images/gallery/chocolate-fondant-full.webp';
import caesarSaladImg from '../assets/images/menu/caesar-salad.webp';
import caesarSaladFull from '../assets/images/gallery/caesar-salad-full.webp';
import lambChopsImg from '../assets/images/menu/lamb-chops.webp';
import lambChopsFull from '../assets/images/gallery/lamb-chops-full.webp';
import cappucinoImg from '../assets/images/menu/cappuccino.webp';
import cappuctioFull from '../assets/images/gallery/cappuccino-full.webp';

type GalleryImage = {
  id: number;
  thumb: string;
  full: string;
  alt: string;
  category: 'interior' | 'staff' | 'food';
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    thumb: restaurantInteriorThumb,
    full: restaurantInteriorFull,
    alt: 'Interiér restaurace',
    category: 'interior'
  },
  {
    id: 2,
    thumb: chefCookingThumb,
    full: chefCookingFull,
    alt: 'Šéfkuchař při práci',
    category: 'staff'
  },
  {
    id: 3,
    thumb: beefWellingtonImg,
    full: beefWellingtonFull,
    alt: 'Hovězí Wellington',
    category: 'food'
  },
  {
    id: 4,
    thumb: mediterraneanSaladImg,
    full: mediterraneanSaladFull,
    alt: 'Středomořský salát',
    category: 'food'
  },
  {
    id: 5,
    thumb: chocolateFondantImg,
    full: chocolateFondantFull,
    alt: 'Čokoládový fondant',
    category: 'food'
  },
  {
    id: 6,
    thumb: outdoorSeatingThumb,
    full: outdoorSeatingFull,
    alt: 'Venkovní posezení',
    category: 'interior'
  },
  {
    id: 7,
    thumb: barThumb,
    full: barFull,
    alt: 'Bar',
    category: 'interior'
  },
  {
    id: 8,
    thumb: caesarSaladImg,
    full: caesarSaladFull,
    alt: 'Caesar salát',
    category: 'food'
  },
  {
    id: 9,
    thumb: lambChopsImg,
    full: lambChopsFull,
    alt: 'Kachní prsa',
    category: 'food'
  },
  {
    id: 10,
    thumb: cappucinoImg,
    full: cappuctioFull,
    alt: 'Tiramisu',
    category: 'food'
  },
  {
    id: 11,
    thumb: restaurantStaffThumb,
    full: restaurantStaffFull,
    alt: 'Personál restaurace',
    category: 'staff'
  },
  {
    id: 12,
    thumb: privateLoungeThumb,
    full: privateLoungeFull,
    alt: 'Privátní salonek',
    category: 'interior'
  }
];

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  // Filter images
  useEffect(() => {
    if (filter === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(image => image.category === filter as GalleryImage['category']));
    }
  }, [filter]);
  
  const navigateGallery = useCallback((direction: number) => {
    setCurrentImage(prev => (prev + direction + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);
  
  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === 'Escape') {
          setLightbox(false);
        } else if (e.key === 'ArrowRight') {
          navigateGallery(1);
        } else if (e.key === 'ArrowLeft') {
          navigateGallery(-1);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, navigateGallery]);
  
  // Handle click outside lightbox to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (lightboxRef.current && !lightboxRef.current.contains(e.target as Node)) {
        setLightbox(false);
      }
    };
    
    if (lightbox) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lightbox]);
  
  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightbox]);
  
  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
    setLightbox(true);
  }, []);

  return (
    <>
      <PageHeader 
        title="Galerie" 
        description="Prohlédněte si fotografie z naší restaurace"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-restaurant-600 text-white'
                  : 'bg-restaurant-100 text-restaurant-800 hover:bg-restaurant-200'
              }`}
            >
              Vše
            </button>
            
            <button
              onClick={() => setFilter('interior')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'interior'
                  ? 'bg-restaurant-600 text-white'
                  : 'bg-restaurant-100 text-restaurant-800 hover:bg-restaurant-200'
              }`}
            >
              Interiér
            </button>
            
            <button
              onClick={() => setFilter('food')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'food'
                  ? 'bg-restaurant-600 text-white'
                  : 'bg-restaurant-100 text-restaurant-800 hover:bg-restaurant-200'
              }`}
            >
              Jídlo
            </button>
            
            <button
              onClick={() => setFilter('staff')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                filter === 'staff'
                  ? 'bg-restaurant-600 text-white'
                  : 'bg-restaurant-100 text-restaurant-800 hover:bg-restaurant-200'
              }`}
            >
              Personál
            </button>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={image.thumb}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <Maximize2 className="text-white h-10 w-10" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Lightbox */}
          {lightbox && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
              <div 
                ref={lightboxRef}
                className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center p-4"
              >
                <button
                  onClick={() => setLightbox(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10"
                  aria-label="Zavřít galerii"
                >
                  <X size={32} />
                </button>
                
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                  <img
                    src={filteredImages[currentImage].full}
                    alt={filteredImages[currentImage].alt}
                    className="max-h-full max-w-full object-contain"
                  />
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateGallery(-1);
                    }}
                    className="absolute left-0 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full focus:outline-none"
                    aria-label="Předchozí obrázek"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateGallery(1);
                    }}
                    className="absolute right-0 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full focus:outline-none"
                    aria-label="Následující obrázek"
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
                
                <p className="text-white text-center mt-4">
                  {filteredImages[currentImage].alt} ({currentImage + 1}/{filteredImages.length})
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
