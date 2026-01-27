import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import type { CartContextType } from '../context/CartContext';

/**
 * Custom hook to use CartContext
 * Throws error if used outside CartProvider
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
