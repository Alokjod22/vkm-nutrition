"use client";

import React, { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Dumbbell, Sparkles, Check, ShoppingBag, Plus } from "lucide-react";

export default function StackBuilder() {
  const { addToCart } = useStore();
  const products = db.getProducts();

  const stacks = [
    {
      id: "muscle-gain",
      name: "Muscle Gain Stack",
      desc: "Biozyme Performance Whey + CreAMP Creatine Monohydrate",
      tag: "Ideal for Hypertrophy & Power",
      badgeBg: "bg-rose-500",
      items: [
        products.find(p => p.id === "mb-01") || products[0],
        products.find(p => p.id === "mb-04") || products[3]
      ],
      discountPercent: 10
    },
    {
      id: "daily-fitness",
      name: "Daily Fitness Stack",
      desc: "Raw Whey Protein 1KG + MB-Vite Daily Multivitamin",
      tag: "Lean Muscle & Immunity",
      badgeBg: "bg-amber-500",
      items: [
        products.find(p => p.id === "mb-02") || products[1],
        products.find(p => p.id === "mb-09") || products[8]
      ],
      discountPercent: 10
    },
    {
      id: "healthy-breakfast",
      name: "High Protein Breakfast Stack",
      desc: "Pintola All Natural PB + Alpino Super High Protein Oats",
      tag: "All-Day Energy & Satiety",
      badgeBg: "bg-emerald-500",
      items: [
        products.find(p => p.id === "pin-01") || products[33],
        products.find(p => p.id === "alp-06") || products[22]
      ],
      discountPercent: 12
    }
  ];

  const [activeStackId, setActiveStackId] = useState(stacks[0].id);
  const activeStack = stacks.find(s => s.id === activeStackId) || stacks[0];

  const originalTotal = activeStack.items.reduce((sum, item) => sum + item.price, 0);
  const stackDiscount = Math.round((originalTotal * activeStack.discountPercent) / 100);
  const finalStackPrice = originalTotal - stackDiscount;

  const handleAddStackToCart = () => {
    activeStack.items.forEach(item => {
      addToCart(item, 1);
    });
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
            <span>CUSTOM STACK BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            BUILD YOUR GOAL STACK
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Combine synergist products and unlock an extra 10–12% Stack Discount!
          </p>
        </div>

        {/* Goal Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {stacks.map(stack => (
            <button
              key={stack.id}
              onClick={() => setActiveStackId(stack.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                activeStackId === stack.id
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>{stack.name}</span>
            </button>
          ))}
        </div>

        {/* Active Stack Container Card */}
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className={`text-[10px] font-black uppercase text-white px-3 py-1 rounded-full ${activeStack.badgeBg}`}>
                {activeStack.tag}
              </span>
              <h3 className="text-2xl font-black text-white mt-2">{activeStack.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{activeStack.desc}</p>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-bold">Bundle Price</div>
              <div className="flex items-baseline gap-2 justify-end">
                <span className="text-3xl font-black text-emerald-400">
                  ₹{finalStackPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-slate-500 line-through font-medium">
                  ₹{originalTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-400">
                Save ₹{stackDiscount} ({activeStack.discountPercent}% OFF)
              </span>
            </div>
          </div>

          {/* Items Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {activeStack.items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-4 relative"
              >
                {idx === 0 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden sm:flex z-10 w-7 h-7 bg-rose-600 text-white font-bold rounded-full items-center justify-center text-xs shadow-md">
                    +
                  </div>
                )}
                <div className="w-20 h-20 bg-slate-800 rounded-xl relative overflow-hidden flex-shrink-0">
                  <Image src={item.images[0]} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-rose-400 uppercase">{item.brand}</span>
                  <h4 className="text-xs font-bold text-white truncate mt-0.5">{item.name}</h4>
                  <p className="text-xs font-semibold text-slate-300 mt-1">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddStackToCart}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>ADD FULL STACK TO CART — ₹{finalStackPrice.toLocaleString("en-IN")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
