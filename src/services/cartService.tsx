/**
 * @deprecated Use CartContext from context/CartContext.tsx instead
 * This file is kept for backward compatibility
 * 
 * The CartContext provides better state management without prop drilling
 */

import { MenuItem, CartItem, Cart } from '../types';

// Local storage key for cart
const CART_STORAGE_KEY = 'restaurant_cart';

// Get cart from local storage
export const getCart = (): Cart => {
  try {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    if (cartJson) {
      return JSON.parse(cartJson);
    }
  } catch (error) {
    console.error('Error loading cart from local storage:', error);
  }
  
  // Return empty cart if nothing in storage or error
  return { items: [], total: 0 };
};

// Save cart to local storage
export const saveCart = (cart: Cart): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to local storage:', error);
  }
};

// Add item to cart
export const addItemToCart = (menuItem: MenuItem, quantity: number = 1, specialRequests?: string): Cart => {
  const cart = getCart();
  const existingItemIndex = cart.items.findIndex(item => item.menuItem.id === menuItem.id);
  
  if (existingItemIndex !== -1) {
    // Update existing item
    cart.items[existingItemIndex].quantity += quantity;
    if (specialRequests) {
      cart.items[existingItemIndex].specialRequests = specialRequests;
    }
  } else {
    // Add new item
    cart.items.push({
      menuItem,
      quantity,
      specialRequests
    });
  }
  
  // Recalculate total
  cart.total = calculateTotal(cart.items);
  
  // Save to localStorage
  saveCart(cart);
  
  return cart;
};

// Remove item from cart
export const removeItemFromCart = (menuItemId: number): Cart => {
  const cart = getCart();
  
  cart.items = cart.items.filter(item => item.menuItem.id !== menuItemId);
  cart.total = calculateTotal(cart.items);
  
  // Save to localStorage
  saveCart(cart);
  
  return cart;
};

// Update item quantity
export const updateCartItemQuantity = (menuItemId: number, quantity: number): Cart => {
  const cart = getCart();
  
  const itemIndex = cart.items.findIndex(item => item.menuItem.id === menuItemId);
  if (itemIndex !== -1) {
    if (quantity > 0) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    }
    
    cart.total = calculateTotal(cart.items);
    saveCart(cart);
  }
  
  return cart;
};

// Clear the cart
export const clearCart = (): Cart => {
  const emptyCart = { items: [], total: 0 };
  saveCart(emptyCart);
  return emptyCart;
};

// Calculate total
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
};
