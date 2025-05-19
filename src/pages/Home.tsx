import React, { useEffect, useRef, Suspense } from 'react';
import { MapPin } from 'lucide-react';
import Hero from '../components/home/Hero';
import FeaturedMenu from '../components/home/FeaturedMenu';
import AboutSection from '../components/home/AboutSection';
import ContactForm from '../components/ui/ContactForm';

const HomePage = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const restaurantLocation = [50.0874654, 14.4214764];

  useEffect(() => {
    // Dynamically import Leaflet and its CSS
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([L]) => {
      // Initialize Leaflet map
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = L.default.map(mapRef.current).setView(restaurantLocation, 15);

        // Add OpenStreetMap tiles
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current);

        // Add marker for restaurant
        L.default.marker(restaurantLocation)
          .addTo(mapInstanceRef.current)
          .bindPopup('Restaurace Gusto<br>Dlouhá 123, Praha 1')
          .openPopup();

        // Request user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = [position.coords.latitude, position.coords.longitude];
              L.default.marker(userLocation)
                .addTo(mapInstanceRef.current)
                .bindPopup('Vaše poloha')
                .openPopup();
              L.default.polyline([userLocation, restaurantLocation], { color: 'blue' }).addTo(mapInstanceRef.current);
              const bounds = L.default.latLngBounds([userLocation, restaurantLocation]);
              mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
            },
            (error) => {
              console.warn('Geolocation error:', error.message);
              mapInstanceRef.current.setView(restaurantLocation, 15);
            },
            { timeout: 10000, enableHighAccuracy: true }
          );
        } else {
          console.warn('Geolocation is not supported by this browser.');
        }

        // Fix Leaflet marker icons (if needed)
        delete L.default.Icon.Default.prototype._getIconUrl;
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      }
    }).catch((error) => {
      console.error('Failed to load Leaflet:', error);
    });

    // Cleanup on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Hero />
      <FeaturedMenu />
      <AboutSection />

      {/* Contact Section */}
      <section className="bg-restaurant-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-restaurant-900 mb-4">
              Rezervujte si stůl
            </h2>
            <p className="text-restaurant-600 max-w-2xl mx-auto">
              Máte zájem o rezervaci stolu? Vyplňte kontaktní formulář a my vás budeme kontaktovat.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-restaurant-800 mb-6">Kontaktní formulář</h3>
              <Suspense fallback={<div>Loading...</div>}>
                <ContactForm />
              </Suspense>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-restaurant-800 mb-6">Kde nás najdete</h3>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-start mb-4">
                  <MapPin className="text-restaurant-600 h-5 w-5 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Adresa</h4>
                    <p className="text-gray-700">
                      Restaurace Gusto<br />
                      Dlouhá 123<br />
                      110 00 Praha 1
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium">Telefon</h4>
                  <p className="text-gray-700">
                    <a href="tel:+420123456789" className="hover:text-restaurant-600 transition-colors">
                      +420 123 456 789
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">E-mail</h4>
                  <p className="text-gray-700">
                    <a href="mailto:info@restauracegusto.cz" className="hover:text-restaurant-600 transition-colors">
                      info@restauracegusto.cz
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="h-[300px] bg-gray-200 rounded-lg overflow-hidden" ref={mapRef}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;