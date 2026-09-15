"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import ProductCard from "./ProductCard";
import { Zap, Sun, ArrowRight } from "lucide-react";

export default function BrandSection() {
  const products = db.getProducts();

  const mbProducts = products.filter(p => p.brand === "MuscleBlaze").slice(0, 4);
  const breakfastProducts = products
    .filter(p => (p.brand === "Pintola" || p.brand === "Alpino") && (p.category === "Oats" || p.category === "Peanut Butter" || p.category === "Muesli"))
    .slice(0, 4);

  return (
    <div className="space-y-16 py-8">
      {/* 1. MUSCLEBLAZE DARK PERFORMANCE ZONE */}
      <section className="bg-slate-950 text-white py-16 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-rose-500/30">
                <Zap className="w-3.5 h-3.5 fill-rose-400" />
                <span>MUSCLEBLAZE PERFORMANCE ZONE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                POWER YOUR PERFORMANCE
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Labdoor USA Certified Biozyme Whey, Raw Whey & CreAMP Creatine Monohydrate.
              </p>
            </div>

            <Link
              href="/brand/muscleblaze"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 self-start md:self-auto transition-all"
            >
              <span>EXPLORE MUSCLEBLAZE STORE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {mbProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. PINTOLA + ALPINO BREAKFAST HUB */}
      <section className="py-16 bg-gradient-to-b from-amber-50/60 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-amber-300">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>PINTOLA & ALPINO BREAKFAST HUB</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                START YOUR DAY STRONG
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                High-Protein Rolled Oats, Organic Peanut Butters & Whole Grain Super Muesli.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/brand/pintola"
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Pintola Store →
              </Link>
              <Link
                href="/brand/alpino"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Alpino Store →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {breakfastProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
