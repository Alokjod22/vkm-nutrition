"use client";

import React, { useState, useEffect } from "react";
import { db, CategoryItem, BrandItem } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Tag, Plus, CheckCircle2, Globe, Edit3 } from "lucide-react";

export default function AdminCategoriesPage() {
  const { showNotification } = useStore();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [brands, setBrands] = useState<BrandItem[]>([]);

  useEffect(() => {
    setCategories(db.getCategories());
    setBrands(db.getBrands());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">CATEGORIES & BRANDS TAXONOMY</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage storefront brand hub pages (MuscleBlaze, Pintola, Alpino) and product category listings with SEO titles.
        </p>
      </div>

      {/* Brands Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-sm uppercase">Active Brand Hubs ({brands.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {brands.map(brand => (
            <div key={brand.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-white text-sm">{brand.name}</span>
                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
                  {brand.productCount} Products
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-sm uppercase">Product Categories ({categories.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Category Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">SEO Title</th>
                <th className="p-4">Products</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white">{cat.name}</td>
                  <td className="p-4 text-slate-400 max-w-xs truncate">{cat.description}</td>
                  <td className="p-4 text-rose-400 font-mono text-[11px] truncate max-w-xs">{cat.seoTitle}</td>
                  <td className="p-4 font-bold text-white">{cat.productCount} Items</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
