"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Gift, Tag, Trash2, CheckCircle2 } from "lucide-react";

interface BundleItem {
  id: string;
  name: string;
  products: string[];
  regularPrice: number;
  bundlePrice: number;
  discountPercent: number;
  isActive: boolean;
}

export default function AdminBundlesPage() {
  const [bundles, setBundles] = useState<BundleItem[]>([
    {
      id: "bnd-1",
      name: "Ultimate Lean Muscle Goal Stack",
      products: ["Biozyme Performance Whey (1 KG)", "Creatine Monohydrate CreAMP (250g)", "Super Oats Chocolate (1 KG)"],
      regularPrice: 4047,
      bundlePrice: 3499,
      discountPercent: 14,
      isActive: true
    },
    {
      id: "bnd-2",
      name: "Breakfast Healthy Combo",
      products: ["All Natural Peanut Butter (1 KG)", "High Protein Super Oats (1 KG)"],
      regularPrice: 698,
      bundlePrice: 599,
      discountPercent: 14,
      isActive: true
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">OFFERS & GOAL STACK BUNDLE BUILDER</h1>
          <p className="text-xs text-slate-400 font-medium">
            Create multi-product goal stacks (Whey + Creatine + Oats) with automated bundle discounts.
          </p>
        </div>

        <button className="px-5 py-3 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span>CREATE NEW STACK BUNDLE</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bundles.map(bnd => (
          <div key={bnd.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-500" />
                <h3 className="font-extrabold text-white text-sm">{bnd.name}</h3>
              </div>
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-black">
                SAVE {bnd.discountPercent}%
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bundled Items:</span>
              <ul className="space-y-1 text-xs text-slate-300 font-medium">
                {bnd.products.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Bundle Price</div>
                <div className="text-xl font-black text-white">₹{bnd.bundlePrice}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase">Regular Price</div>
                <div className="text-xs text-slate-400 line-through font-bold">₹{bnd.regularPrice}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
