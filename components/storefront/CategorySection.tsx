"use client";

import React from "react";
import Link from "next/link";
import { Milk, Dumbbell, UtensilsCrossed, Wheat, Nut, Sparkles, ArrowRight } from "lucide-react";

export default function CategorySection() {
  const categories = [
    {
      name: "Protein",
      icon: Milk,
      desc: "Biozyme Whey, Raw Whey & Isolates",
      count: "15 Products",
      bg: "bg-rose-50 hover:bg-rose-100/80 text-rose-900 border-rose-200",
      iconBg: "bg-rose-600 text-white",
      href: "/shop?category=Protein"
    },
    {
      name: "Creatine",
      icon: Dumbbell,
      desc: "CreAMP & Pure Monohydrate",
      count: "1 Product",
      bg: "bg-amber-50 hover:bg-amber-100/80 text-amber-900 border-amber-200",
      iconBg: "bg-amber-600 text-white",
      href: "/shop?category=Creatine"
    },
    {
      name: "Pre-Workout & BCAA",
      icon: Sparkles,
      desc: "BCAA 6000, Pre-Workout 200 & EAA",
      count: "3 Products",
      bg: "bg-purple-50 hover:bg-purple-100/80 text-purple-900 border-purple-200",
      iconBg: "bg-purple-600 text-white",
      href: "/shop?category=Pre-Workout+%26+BCAA"
    },
    {
      name: "Vitamins & Wellness",
      icon: Milk,
      desc: "Fish Oil, Daily Multivitamin & Omega-3",
      count: "15 Products",
      bg: "bg-blue-50 hover:bg-blue-100/80 text-blue-900 border-blue-200",
      iconBg: "bg-blue-600 text-white",
      href: "/shop?category=Vitamins+%26+Wellness"
    },
    {
      name: "Peanut Butter",
      icon: Nut,
      desc: "100% All-Natural, Organic & Chocolate",
      count: "8 Products",
      bg: "bg-orange-50 hover:bg-orange-100/80 text-orange-900 border-orange-200",
      iconBg: "bg-orange-600 text-white",
      href: "/shop?category=Peanut+Butter"
    },
    {
      name: "Oats & Muesli",
      icon: Wheat,
      desc: "High Protein Chocolate Oats & Muesli",
      count: "8 Products",
      bg: "bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border-emerald-200",
      iconBg: "bg-emerald-600 text-white",
      href: "/shop?category=Oats+%26+Muesli"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Explore specialized nutrition tailored for your fitness goals.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className={`p-5 rounded-2xl border ${cat.bg} transition-all duration-300 hover:shadow-lg flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base mb-1">{cat.name}</h3>
                  <p className="text-[11px] leading-snug opacity-80">{cat.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] font-bold">
                  <span>{cat.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
