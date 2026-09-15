"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, db } from "./db";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavour?: string;
  selectedSize?: string;
  selectedPrice: number;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, flavour?: string, size?: string, price?: number) => void;
  removeFromCart: (productId: string, flavour?: string, size?: string) => void;
  updateQuantity: (productId: string, delta: number, flavour?: string, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  appliedCoupon: { code: string; discountAmount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;

  adminUser: { name: string; email: string } | null;
  adminLogin: (email: string) => void;
  adminLogout: () => void;

  notification: string | null;
  showNotification: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Load state from localStorage on client side
  useEffect(() => {
    try {
      const c = localStorage.getItem("nb_cart_items");
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem("nb_wishlist");
      if (w) setWishlist(JSON.parse(w));
      const a = localStorage.getItem("nb_admin_session");
      if (a) setAdminUser(JSON.parse(a));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("nb_cart_items", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("nb_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: Product, quantity = 1, flavour?: string, size?: string, price?: number) => {
    const itemPrice = price || product.price;
    const itemFlavour = flavour || (product.flavours && product.flavours[0]) || "";
    const itemSize = size || (product.sizes && product.sizes[0]) || "";

    setCart(prev => {
      const existingIdx = prev.findIndex(
        x => x.product.id === product.id && x.selectedFlavour === itemFlavour && x.selectedSize === itemSize
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedFlavour: itemFlavour, selectedSize: itemSize, selectedPrice: itemPrice }];
    });

    showNotification(`Added ${product.name} to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, flavour?: string, size?: string) => {
    setCart(prev => prev.filter(x => !(x.product.id === productId && x.selectedFlavour === flavour && x.selectedSize === size)));
  };

  const updateQuantity = (productId: string, delta: number, flavour?: string, size?: string) => {
    setCart(prev =>
      prev
        .map(x => {
          if (x.product.id === productId && x.selectedFlavour === flavour && x.selectedSize === size) {
            const newQty = x.quantity + delta;
            return newQty > 0 ? { ...x, quantity: newQty } : null;
          }
          return x;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showNotification("Removed item from wishlist");
        return prev.filter(id => id !== productId);
      }
      showNotification("Saved item to wishlist!");
      return [...prev, productId];
    });
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);
  
  const applyCoupon = (code: string) => {
    const res = db.validateCoupon(code, cartSubtotal);
    if (!res.valid || !res.coupon) {
      return { success: false, message: res.message || "Invalid coupon code." };
    }
    const coupon = res.coupon;
    let disc = 0;
    if (coupon.discountPercent > 0) {
      disc = (cartSubtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount) disc = Math.min(disc, coupon.maxDiscount);
    } else if (coupon.discountFixed) {
      disc = coupon.discountFixed;
    }
    setAppliedCoupon({ code: coupon.code, discountAmount: disc });
    showNotification(`Coupon ${coupon.code} applied successfully!`);
    return { success: true, message: `Saved ₹${disc} with coupon ${coupon.code}!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const cartDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const cartDeliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 79;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);

  const adminLogin = (email: string) => {
    const user = { name: "NutriBulk Admin", email };
    setAdminUser(user);
    localStorage.setItem("nb_admin_session", JSON.stringify(user));
    showNotification("Welcome back, Admin!");
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem("nb_admin_session");
    showNotification("Logged out from Admin portal");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        adminUser,
        adminLogin,
        adminLogout,
        notification,
        showNotification
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
