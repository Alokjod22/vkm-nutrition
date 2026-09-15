"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap, Truck, Lock, BadgePercent, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16 lg:py-24">
      {/* Background Subtle Mesh Gradient */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-600 via-amber-600 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3.5 py-1.5 rounded-full text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-rose-400" />
              <span>Official Wholesale Nutrition Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              FUEL YOUR GOALS. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400">
                POWER YOUR DAY.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed">
              100% Genuine MuscleBlaze, Pintola & Alpino products. Premium Whey Protein, CreAMP Creatine, High-Protein Oats & Organic Peanut Butters delivered directly to your door.
            </p>

            {/* Combined CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/shop?category=Protein"
                className="px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black rounded-2xl text-sm shadow-xl shadow-rose-600/30 flex items-center gap-2.5 transition-all hover:scale-105"
              >
                <span>SHOP PROTEIN & CREATINE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Floating Product Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-3xl p-6 border border-slate-700/50 shadow-2xl flex flex-col justify-between group hover:border-rose-500/50 transition-all">
              <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1">
                🔥 #1 Best Seller
              </div>

              <div className="relative w-full h-56">
                <Image
                  src="/products/muscleblaze_01_MuscleBlaze_Biozyme_Perfo.jpg"
                  alt="MuscleBlaze Biozyme Whey"
                  fill
                  className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                  MuscleBlaze
                </div>
                <div className="text-sm font-bold text-white truncate">
                  Biozyme Performance Whey 1 KG
                </div>
                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className="font-extrabold text-amber-400 text-base">₹2,999</span>
                  <span className="text-slate-500 line-through">₹3,499</span>
                  <span className="text-emerald-400 font-bold">14% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BAR STRIP */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-slate-300">
          <div className="flex items-center justify-center gap-2 font-semibold text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>✓ Genuine Products</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold text-xs">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>✓ Fresh Stock Guaranteed</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold text-xs">
            <Truck className="w-5 h-5 text-rose-400" />
            <span>🚚 Fast Express Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold text-xs">
            <Lock className="w-5 h-5 text-blue-400" />
            <span>🔒 Secure UPI & Card Payments</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold text-xs col-span-2 md:col-span-1">
            <BadgePercent className="w-5 h-5 text-purple-400" />
            <span>💰 Wholesale Prices</span>
          </div>
        </div>
      </div>
    </section>
  );
}
