"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, Product, ProductVariant } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Layers, Search, Edit3, CheckCircle2, AlertTriangle, Package } from "lucide-react";

export default function AdminVariantsPage() {
  const { showNotification } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadProducts = () => {
    setProducts(db.getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleUpdateVariant = (productId: string, variantId: string, newPrice: number, newStock: number) => {
    const prod = products.find(p => p.id === productId);
    if (!prod || !prod.variants) return;

    const updatedVariants = prod.variants.map(v =>
      v.id === variantId ? { ...v, price: newPrice, stock: newStock } : v
    );

    const updatedProd: Product = { ...prod, variants: updatedVariants };
    db.saveProduct(updatedProd);
    loadProducts();
    showNotification(`Updated variant ${variantId} price to ₹${newPrice} & stock to ${newStock}`);
  };

  const filteredProducts = products.filter(p => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">STANDALONE VARIANT MANAGEMENT</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage prices, MRPs, SKUs, and stock availability for product sizes (1 KG, 2 KG, 100g, 250g).
        </p>
      </div>

      {/* Search Header */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search variants by product or brand..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Product Variants Table */}
      <div className="space-y-6">
        {filteredProducts.map(prod => (
          <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-xl relative border border-slate-700 flex-shrink-0">
                  <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-1" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">{prod.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{prod.brand} • {prod.category}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                {prod.variants?.length || 0} Size Variants Active
              </span>
            </div>

            {/* Variants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prod.variants?.map(varItem => (
                <div key={varItem.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{varItem.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">SKU: {varItem.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Price (₹)</label>
                      <input
                        type="number"
                        defaultValue={varItem.price}
                        onBlur={e => handleUpdateVariant(prod.id, varItem.id, Number(e.target.value), varItem.stock)}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Stock</label>
                      <input
                        type="number"
                        defaultValue={varItem.stock}
                        onBlur={e => handleUpdateVariant(prod.id, varItem.id, varItem.price, Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
