import React, { createContext, useState, useCallback, ReactNode, useMemo, useEffect } from 'react';
import { Cart, CartItem, MenuItem } from '../types';

/**
 * Cart Context for managing shopping cart globally
 */

export type CartContextType = {
  cart: Cart;
  addItem: (menuItem: MenuItem, quantity: number, specialRequests?: string) => void;
  removeItem: (menuItemId: number) => void;
  updateQuantity: (menuItemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

const CART_STORAGE_KEY = 'restaurant_cart';

type CartProviderProps = {
  children: ReactNode;
};

/**
 * Manages cart state and provides it to all children
 */
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
    } catch {
      return { items: [], total: 0 };
    }
  });

  // Synchronize cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  const calculateTotal = useCallback((items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  }, []);

  const addItem = useCallback(
    (menuItem: MenuItem, quantity: number = 1, specialRequests?: string) => {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.items.findIndex(
          (item) => item.menuItem.id === menuItem.id
        );

        let newItems: CartItem[];

        if (existingItemIndex !== -1) {
          // Update existing item
          newItems = [...prevCart.items];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
            ...(specialRequests && { specialRequests }),
          };
        } else {
          // Add new item
          newItems = [
            ...prevCart.items,
            { menuItem, quantity, specialRequests },
          ];
        }

        return {
          items: newItems,
          total: calculateTotal(newItems),
        };
      });
    },
    [calculateTotal]
  );

  const removeItem = useCallback(
    (menuItemId: number) => {
      setCart((prevCart) => {
        const newItems = prevCart.items.filter(
          (item) => item.menuItem.id !== menuItemId
        );
        return {
          items: newItems,
          total: calculateTotal(newItems),
        };
      });
    },
    [calculateTotal]
  );

  const updateQuantity = useCallback(
    (menuItemId: number, quantity: number) => {
      setCart((prevCart) => {
        let newItems: CartItem[];

        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          newItems = prevCart.items.filter(
            (item) => item.menuItem.id !== menuItemId
          );
        } else {
          // Update quantity
          newItems = prevCart.items.map((item) =>
            item.menuItem.id === menuItemId ? { ...item, quantity } : item
          );
        }

        return {
          items: newItems,
          total: calculateTotal(newItems),
        };
      });
    },
    [calculateTotal]
  );

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  const getTotal = useCallback(() => {
    return cart.total;
  }, [cart.total]);

  const getItemCount = useCallback(() => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }, [cart.items]);

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
    }),
    [cart, addItem, removeItem, updateQuantity, clearCart, getTotal, getItemCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


