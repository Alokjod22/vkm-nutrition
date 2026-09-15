"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, Product } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Boxes, Plus, Minus, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AdminInventoryPage() {
  const { showNotification } = useStore();
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    setProducts(db.getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdjustStock = (id: string, delta: number, name: string) => {
    db.updateStock(id, delta);
    loadProducts();
    showNotification(`Adjusted stock for ${name}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">INVENTORY AUDIT & STOCK MANAGER</h1>
        <p className="text-xs text-slate-400 font-medium">
          Monitor real-time inventory counts across MuscleBlaze, Pintola & Alpino.
        </p>
      </div>

      {/* Real-time Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-center">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {products.map(prod => {
                const isOut = prod.stock === 0;
                const isLow = prod.stock > 0 && prod.stock <= prod.lowStockThreshold;

                return (
                  <tr key={prod.id} className="hover:bg-slate-800/50">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-800 rounded-lg relative border border-slate-700 flex-shrink-0">
                        <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-1" />
                      </div>
                      <span className="font-bold text-white truncate max-w-xs">{prod.name}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-300">{prod.brand}</td>
                    <td className="p-4 text-slate-400">{prod.category}</td>
                    <td className="p-4 font-black text-base text-white">{prod.stock} Units</td>
                    <td className="p-4">
                      {isOut ? (
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          🔴 Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 max-w-max">
                          <AlertTriangle className="w-3 h-3" /> 🟠 Low Stock ({prod.stock})
                        </span>
                      ) : (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          🟢 Healthy Stock
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAdjustStock(prod.id, -5, prod.name)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold text-xs"
                          title="-5 Units"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, -1, prod.name)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                          title="-1 Unit"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 1, prod.name)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                          title="+1 Unit"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 10, prod.name)}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-xs"
                          title="+10 Units"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
