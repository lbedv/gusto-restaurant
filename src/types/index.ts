/**
 * Central type definitions for the restaurant application
 */

// Menu types
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

// Cart types
export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
  specialRequests?: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

// Contact/Order types
export type OrderFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryTime?: string;
  specialRequests?: string;
};

// UI Component types
export type PageHeaderProps = {
  title: string;
  description?: string;
  backgroundImage?: string;
};

export type LayoutProps = {
  children: React.ReactNode;
};

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type OrderResponse = {
  orderId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  estimatedTime: string;
};
