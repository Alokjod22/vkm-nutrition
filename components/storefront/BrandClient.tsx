"use client";

import React from "react";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import ProductCard from "@/components/storefront/ProductCard";
import { Product } from "@/lib/db";

interface BrandClientProps {
  brandName: string;
  products: Product[];
}

export default function BrandClient({ brandName, products }: BrandClientProps) {
  const getBrandTheme = () => {
    switch (brandName.toLowerCase()) {
      case "muscleblaze":
        return {
          bg: "bg-slate-950 text-white",
          badge: "bg-rose-600 text-white",
          tagline: "India's #1 Sports Nutrition & Biozyme Whey Brand",
          bannerGrad: "from-rose-950 via-slate-950 to-slate-900"
        };
      case "pintola":
        return {
          bg: "bg-amber-950 text-white",
          badge: "bg-amber-600 text-white",
          tagline: "India's Highest Rated 100% Natural Peanut Butters & High Protein Oats",
          bannerGrad: "from-amber-900 via-amber-950 to-slate-950"
        };
      case "alpino":
        return {
          bg: "bg-emerald-950 text-white",
          badge: "bg-emerald-600 text-white",
          tagline: "Super Oats, Organic Peanut Butters & Whole Grain Muesli",
          bannerGrad: "from-emerald-900 via-slate-950 to-emerald-950"
        };
      default:
        return {
          bg: "bg-slate-900 text-white",
          badge: "bg-rose-600 text-white",
          tagline: "Authentic Nutrition Products",
          bannerGrad: "from-slate-900 to-slate-950"
        };
    }
  };

  const theme = getBrandTheme();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Brand Hero Banner */}
      <section className={`py-16 bg-gradient-to-r ${theme.bannerGrad} text-white border-b border-slate-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className={`inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${theme.badge}`}>
            OFFICIAL BRAND STORE
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">{brandName}</h1>
          <p className="text-base text-slate-300 font-medium mt-2 max-w-2xl">{theme.tagline}</p>
        </div>
      </section>

      {/* Brand Products Catalog */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-slate-900">
            {brandName} Catalog ({products.length} Products)
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
