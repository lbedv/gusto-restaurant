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

export type GalleryImage = {
  id: number;
  thumb: string;
  full: string;
  alt: string;
  category: 'interior' | 'staff' | 'food';
};

export const galleryImages: GalleryImage[] = [
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
