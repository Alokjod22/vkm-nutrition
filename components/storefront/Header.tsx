"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/lib/context";
import { db, Product } from "@/lib/db";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  Flame
} from "lucide-react";

export default function Header() {
  const { cart, wishlist, setIsCartOpen } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const products = db.getProducts();
      const filtered = products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 6));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine MuscleBlaze, Pintola & Alpino
            </span>
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-rose-400" /> Free Express Delivery Over ₹999
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <Link href="/account" className="hover:text-white transition-colors">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-rose-600 to-amber-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              V
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                VKM <span className="text-rose-600">NUTRITION</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                Authentic Supplements
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <Link href="/" className="hover:text-rose-600 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="hover:text-rose-600 transition-colors">
              Shop All
            </Link>

            {/* Brands Dropdown */}
            <div className="relative group py-5">
              <span className="cursor-pointer hover:text-rose-600 transition-colors flex items-center gap-1">
                Brands
              </span>
              <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <Link
                  href="/brand/muscleblaze"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="font-semibold text-slate-900 text-xs">MuscleBlaze</div>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    Supplements
                  </span>
                </Link>
                <Link
                  href="/brand/pintola"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="font-semibold text-slate-900 text-xs">Pintola</div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Nut Butters
                  </span>
                </Link>
                <Link
                  href="/brand/alpino"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="font-semibold text-slate-900 text-xs">Alpino</div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Super Oats
                  </span>
                </Link>
              </div>
            </div>

            <Link href="/shop?filter=bestseller" className="hover:text-rose-600 transition-colors flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              Best Sellers
            </Link>

            <Link href="/shop?category=Oats" className="hover:text-rose-600 transition-colors">
              Oats & Muesli
            </Link>
          </nav>

          {/* Search Bar Container */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Whey, Creatine, Oats, Peanut Butter..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Results Modal */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Search Results ({searchResults.length})
                </div>
                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {searchResults.map(prod => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2.5 flex items-center gap-3 hover:bg-slate-50 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg relative overflow-hidden flex-shrink-0">
                        <Image
                          src={prod.images[0]}
                          alt={prod.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{prod.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {prod.brand} • <span className="text-rose-600 font-semibold">₹{prod.price}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/account"
              className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative hidden sm:flex"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-rose-600 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-md transition-all group"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-rose-600 group-hover:bg-slate-900 text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 lg:hidden rounded-lg hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-100 rounded-xl text-xs"
          />

          <div className="flex flex-col space-y-2 text-sm font-bold text-slate-800 pt-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg"
            >
              Shop Catalog
            </Link>
            <Link
              href="/brand/muscleblaze"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg text-rose-600"
            >
              MuscleBlaze Store
            </Link>
            <Link
              href="/brand/pintola"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg text-amber-700"
            >
              Pintola Store
            </Link>
            <Link
              href="/brand/alpino"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg text-emerald-700"
            >
              Alpino Store
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg"
            >
              My Account & Orders
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 font-normal"
            >
              Admin Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
