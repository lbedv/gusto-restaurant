import React, { useEffect, useRef } from 'react';
import PageHeader from '../components/layout/PageHeader';
import ContactForm from '../components/ui/ContactForm';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ContactPage = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Restaurant coordinates (Dlouhá 123, Praha 1)
  const restaurantLocation = [50.0874654, 14.4214764];

  useEffect(() => {
    // Initialize Leaflet map
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(restaurantLocation, 15);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add marker for restaurant
      L.marker(restaurantLocation)
        .addTo(mapInstanceRef.current)
        .bindPopup('Restaurace Gusto<br>Dlouhá 123, Praha 1')
        .openPopup();

      // Request user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            // Add marker for user's location
            L.marker(userLocation)
              .addTo(mapInstanceRef.current)
              .bindPopup('Vaše poloha')
              .openPopup();

            // Draw a line between user and restaurant (optional)
            L.polyline([userLocation, restaurantLocation], { color: 'blue' }).addTo(mapInstanceRef.current);

            // Adjust map to show both locations
            const bounds = L.latLngBounds([userLocation, restaurantLocation]);
            mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
          },
          (error) => {
            console.warn('Geolocation error:', error.message);
            // Fallback to just showing restaurant location
            mapInstanceRef.current.setView(restaurantLocation, 15);
          },
          { timeout: 10000, enableHighAccuracy: true }
        );
      } else {
        console.warn('Geolocation is not supported by this browser.');
      }
    }

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
      <PageHeader
        title="Kontakt"
        description="Kontaktujte nás nebo nás navštivte"
        backgroundImage="/images/contact-header.jpg"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-restaurant-900 mb-6">Kde nás najdete</h2>

              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                {/* Map */}
                <div className="h-[400px] bg-gray-200" ref={mapRef}></div>

                {/* Contact Details */}
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-restaurant-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Adresa</h3>
                      <address className="not-italic text-gray-700">
                        Restaurace Gusto<br />
                        Dlouhá 123<br />
                        110 00 Praha 1
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <Phone className="h-5 w-5 text-restaurant-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p className="text-gray-700">
                        <a href="tel:+420123456789" className="hover:text-restaurant-600 transition-colors">
                          +420 123 456 789
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <Mail className="h-5 w-5 text-restaurant-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">E-mail</h3>
                      <p className="text-gray-700">
                        <a
                          href="mailto:info@restauracegusto.cz"
                          className="hover:text-restaurant-600 transition-colors"
                        >
                          info@restauracegusto.cz
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-restaurant-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Otevírací doba</h3>
                      <table className="text-gray-700 border-collapse">
                        <tbody>
                          <tr>
                            <td className="pr-4 py-1">Pondělí - Čtvrtek</td>
                            <td>11:00 - 22:00</td>
                          </tr>
                          <tr>
                            <td className="pr-4 py-1">Pátek</td>
                            <td>11:00 - 23:00</td>
                          </tr>
                          <tr>
                            <td className="pr-4 py-1">Sobota</td>
                            <td>12:00 - 23:00</td>
                          </tr>
                          <tr>
                            <td className="pr-4 py-1">Neděle</td>
                            <td>12:00 - 22:00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-restaurant-900 mb-4">Doprava</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Metro</h4>
                    <p className="text-gray-700">
                      Linka A (zelená) - stanice Staroměstská, 5 minut chůze
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Tramvaj</h4>
                    <p className="text-gray-700">
                      Linky 17, 18 - zastávka Právnická fakulta, 3 minuty chůze
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Parkování</h4>
                    <p className="text-gray-700">
                      Placené parkování je možné v přilehlých ulicích nebo v garážích OC Palladium (10
                      minut chůze)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-restaurant-900 mb-6">Napište nám</h2>

              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-6">
                  Máte-li jakékoli dotazy, připomínky nebo žádost o rezervaci, neváhejte nás
                  kontaktovat prostřednictvím tohoto formuláře a my se vám co nejdříve ozveme.
                </p>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;