"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/context";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponCode("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-rose-500" />
              <div>
                <h2 className="text-lg font-bold">Your Cart</h2>
                <p className="text-xs text-slate-400">
                  {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-rose-50 border-b border-rose-100">
            <div className="flex items-center justify-between text-xs font-semibold text-rose-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-rose-600" />
                {amountForFreeShipping > 0
                  ? `Add ₹${amountForFreeShipping} more for FREE Delivery`
                  : "🎉 You qualify for FREE Delivery!"}
              </span>
              <span>{Math.round(freeShippingPercent)}%</span>
            </div>
            <div className="w-full bg-rose-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                <ShoppingBag className="w-16 h-16 text-slate-300 mb-4 stroke-1" />
                <p className="font-semibold text-slate-800 text-base mb-1">Your cart is empty</p>
                <p className="text-xs text-slate-500 mb-6">Looks like you haven't added any products yet.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                          {item.product.brand}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 truncate mt-1">
                          {item.product.name}
                        </h4>
                        {(item.selectedFlavour || item.selectedSize) && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.selectedFlavour} • {item.selectedSize}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedFlavour, item.selectedSize)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1, item.selectedFlavour, item.selectedSize)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1, item.selectedFlavour, item.selectedSize)}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-r-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        ₹{(item.selectedPrice * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>CODE: {appliedCoupon.code} (-₹{appliedCoupon.discountAmount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Coupon (Try NUTRI10)"
                      value={couponCode}
                      onChange={e => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-500 mt-1 font-medium">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {cartDeliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${cartDeliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-rose-600">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Genuine Guaranteed • Fast Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
