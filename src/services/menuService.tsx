// Menu Types
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  allergens?: number[];
  category: string;
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

// Menu data
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Hovězí Wellington',
    description: 'Hovězí svíčková s houbovou směsí zabalená v listovém těstě, servírovaná s glazírovanou zeleninou a demi-glace omáčkou',
    price: 345,
    image: '/gusto-restaurant/images/beef-wellington.jpg',
    category: 'main',
    allergens: [1, 3, 7],
    featured: true
  },
  {
    id: 2,
    name: 'Středomořský salát',
    description: 'Čerstvý salát s grilovanou zeleninou, feta sýrem, olivami a bylinkovým dresinkem',
    price: 195,
    image: '/gusto-restaurant/images/mediterranean-salad.jpg',
    category: 'starter',
    allergens: [7],
    featured: true
  },
  {
    id: 3,
    name: 'Čokoládový fondant',
    description: 'Teplý čokoládový dezert s tekutým středem, podávaný s vanilkovou zmrzlinou a lesním ovocem',
    price: 145,
    image: '/gusto-restaurant/images/chocolate-fondant.jpg',
    category: 'dessert',
    allergens: [1, 3, 7],
    featured: true
  },
  {
    id: 4,
    name: 'Caesar salát s kuřecím masem',
    description: 'Římský salát s grilovaným kuřecím masem, parmazánem, krutony a klasickým caesar dresinkem',
    price: 215,
    image: '/gusto-restaurant/images/caesar-salad.jpg',
    category: 'starter',
    allergens: [1, 3, 4, 7]
  },
  {
    id: 5,
    name: 'Kachní prsa',
    description: 'Pomalu pečená kachní prsa s pomerančovou omáčkou, servírovaná s bramborovým pyré a karamelizovanou červenou řepou',
    price: 325,
    image: '/gusto-restaurant/images/duck-breast.jpg',
    category: 'main',
    allergens: [7]
  },
  {
    id: 6,
    name: 'Tiramisu',
    description: 'Klasický italský dezert s mascarpone, kávou, likérem a kakaem',
    price: 135,
    image: '/gusto-restaurant/images/tiramisu.jpg',
    category: 'dessert',
    allergens: [1, 3, 7]
  },
  {
    id: 7,
    name: 'Krevetový koktejl',
    description: 'Šťavnaté krevety v koktejlové omáčce podávané na ledovém salátě',
    price: 185,
    image: '/gusto-restaurant/images/shrimp-cocktail.jpg',
    category: 'starter',
    allergens: [2, 3, 10]
  },
  {
    id: 8,
    name: 'Risotto s hříbky',
    description: 'Krémové risotto s lesními hříbky, tymiánem a hoblinkami parmazánu',
    price: 235,
    image: '/gusto-restaurant/images/mushroom-risotto.jpg',
    category: 'main',
    allergens: [7]
  },
  {
    id: 9,
    name: 'Jehněčí kotletky',
    description: 'Grilované jehněčí kotletky s bylinkovým máslem a rozmarýnovými bramborami',
    price: 375,
    image: '/gusto-restaurant/images/lamb-chops.jpg',
    category: 'main',
    allergens: [7]
  },
  {
    id: 10,
    name: 'Panna Cotta',
    description: 'Jemná vanilková panna cotta s malinovou omáčkou a čerstvým ovocem',
    price: 125,
    image: '/gusto-restaurant/images/panna-cotta.jpg',
    category: 'dessert',
    allergens: [7]
  },
  {
    id: 11,
    name: 'Caprese salát',
    description: 'Plátky mozzarelly a rajčat s bazalkou, olivovým olejem a balsamikovým krémem',
    price: 165,
    image: '/gusto-restaurant/images/caprese-salad.jpg',
    category: 'starter',
    allergens: [7]
  },
  {
    id: 12,
    name: 'Losos s citronovou omáčkou',
    description: 'Filet z lososa s citronovou omáčkou podávaný s hráškovou rýží a grilovaným chřestem',
    price: 295,
    image: '/gusto-restaurant/images/salmon-lemon.jpg',
    category: 'main',
    allergens: [4, 7]
  }
];

// Drinks
const drinks: MenuItem[] = [
  {
    id: 101,
    name: 'Espresso',
    description: 'Silná, koncentrovaná káva',
    price: 55,
    image: '/gusto-restaurant/images/espresso.jpg',
    category: 'drinks'
  },
  {
    id: 102,
    name: 'Cappuccino',
    description: 'Espresso s napěněným mlékem',
    price: 65,
    image: '/gusto-restaurant/images/cappuccino.jpg',
    category: 'drinks',
    allergens: [7]
  },
  {
    id: 103,
    name: 'Rozlévaná vína',
    description: 'Výběr kvalitních českých a zahraničních vín (0,15l)',
    price: 85,
    image: '/gusto-restaurant/images/wine.jpg',
    category: 'drinks',
    allergens: [12]
  },
  {
    id: 104,
    name: 'Domácí limonáda',
    description: 'Osvěžující limonáda z čerstvého ovoce (0,4l)',
    price: 75,
    image: '/gusto-restaurant/images/lemonade.jpg',
    category: 'drinks'
  },
  {
    id: 105,
    name: 'Točené pivo',
    description: 'Místní ležák (0,5l)',
    price: 55,
    image: '/gusto-restaurant/images/beer.jpg',
    category: 'drinks',
    allergens: [1]
  }
];

// Add all items together
export const allMenuItems = [...menuItems, ...drinks];

// Get allergen information
export const allergens: Record<number, string> = {
  1: 'Lepek',
  2: 'Korýši',
  3: 'Vejce',
  4: 'Ryby',
  5: 'Arašídy',
  6: 'Sója',
  7: 'Mléko',
  8: 'Skořápkové plody',
  9: 'Celer',
  10: 'Hořčice',
  11: 'Sezam',
  12: 'Oxid siřičitý a siřičitany',
  13: 'Vlčí bob',
  14: 'Měkkýši'
};

// Get all menu items
export const getMenuItems = () => {
  return allMenuItems;
};

// Get menu items by category
export const getMenuItemsByCategory = () => {
  const categories: Record<string, MenuCategory> = {
    starter: {
      id: 'starter',
      name: 'Předkrmy',
      items: []
    },
    main: {
      id: 'main',
      name: 'Hlavní chody',
      items: []
    },
    dessert: {
      id: 'dessert',
      name: 'Dezerty',
      items: []
    },
    drinks: {
      id: 'drinks',
      name: 'Nápoje',
      items: []
    }
  };
  
  allMenuItems.forEach(item => {
    if (categories[item.category]) {
      categories[item.category].items.push(item);
    }
  });
  
  return Object.values(categories);
};