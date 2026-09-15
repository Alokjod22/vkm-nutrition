"use client";

import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import ProductCard from "./ProductCard";
import { Flame, ArrowRight } from "lucide-react";

export default function BestSellers() {
  const products = db.getProducts();
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                🔥 BEST SELLERS
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Most popular supplements and nutrition foods bought by thousands.
              </p>
            </div>
          </div>
          <Link
            href="/shop?filter=bestseller"
            className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
