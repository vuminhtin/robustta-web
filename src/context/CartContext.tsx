'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { Product } from '@/data/products';

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  weight: string;
  grind: string;
  price: number;
  quantity: number;
}

function getCartItemKey(item: Pick<CartItem, 'productId' | 'weight' | 'grind'>): string {
  return `${item.productId}-${item.weight}-${item.grind}`;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; weight: string; grind: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; weight: string; grind: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = getCartItemKey(action.payload);
      const existingIndex = state.items.findIndex(i => getCartItemKey(i) === key);
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        };
        return { items: newItems };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM': {
      const key = getCartItemKey(action.payload);
      return { items: state.items.filter(i => getCartItemKey(i) !== key) };
    }
    case 'UPDATE_QUANTITY': {
      const key = getCartItemKey(action.payload);
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter(i => getCartItemKey(i) !== key) };
      }
      return {
        items: state.items.map(i =>
          getCartItemKey(i) === key ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'LOAD_CART':
      return { items: action.payload };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, weight: string, grind: string, price: number, quantity?: number) => void;
  removeFromCart: (productId: string, weight: string, grind: string) => void;
  updateQuantity: (productId: string, weight: string, grind: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('robustta-cart');
      if (saved) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('robustta-cart', JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addToCart = useCallback((product: Product, weight: string, grind: string, price: number, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        weight,
        grind,
        price,
        quantity,
      },
    });
  }, []);

  const removeFromCart = useCallback((productId: string, weight: string, grind: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, weight, grind } });
  }, []);

  const updateQuantity = useCallback((productId: string, weight: string, grind: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, weight, grind, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, cartCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
