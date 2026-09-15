"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, Product } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Boxes, Plus, Minus, AlertTriangle, CheckCircle2, Download, Search, RefreshCw } from "lucide-react";

export default function AdminInventoryPage() {
  const { showNotification } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out">("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleBatchRestockAllLow = () => {
    const lowProds = products.filter(p => p.stock <= p.lowStockThreshold);
    lowProds.forEach(p => db.updateStock(p.id, 25));
    loadProducts();
    showNotification(`Restocked ${lowProds.length} low-stock items by +25 units each!`);
  };

  const handleExportCSV = () => {
    if (products.length === 0) return;
    const headers = ["Product Name", "Brand", "Category", "Selling Price", "MRP", "Current Stock", "Low Stock Threshold", "Stock Status"];
    const rows = products.map(p => {
      const status = p.stock === 0 ? "Out of Stock" : p.stock <= p.lowStockThreshold ? "Low Stock" : "Healthy";
      return [
        `"${p.name}"`,
        p.brand,
        p.category,
        p.price,
        p.mrp,
        p.stock,
        p.lowStockThreshold,
        status
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vkm_nutrition_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Exported inventory CSV audit report!");
  };

  const filteredProducts = products.filter(p => {
    if (stockFilter === "low" && p.stock > p.lowStockThreshold) return false;
    if (stockFilter === "out" && p.stock > 0) return false;
    if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) return false;
    return true;
  });

  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  return (
    <div className="space-y-8">
      {/* Title & Batch Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">INVENTORY AUDIT & STOCK MANAGER</h1>
          <p className="text-xs text-slate-400 font-medium">
            Monitor real-time inventory counts across MuscleBlaze, Pintola & Alpino.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {lowStockCount > 0 && (
            <button
              onClick={handleBatchRestockAllLow}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4 animate-spin-once" />
              <span>BATCH RESTOCK LOW ITEMS (+25)</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>EXPORT INVENTORY CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Stock Status Filters */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search inventory by product name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Filter Stock:</span>
          <button
            onClick={() => setStockFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${stockFilter === "all" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setStockFilter("low")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${stockFilter === "low" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setStockFilter("out")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${stockFilter === "out" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
          >
            Out of Stock ({products.filter(p => p.stock === 0).length})
          </button>
        </div>
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
              {filteredProducts.map(prod => {
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
