"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import ProductCard from "@/components/storefront/ProductCard";
import { db, Product } from "@/lib/db";
import { Filter, SlidersHorizontal, RotateCcw, Search } from "lucide-react";

export default function ShopPage() {
  const allProducts = db.getProducts();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleBrand = (b: string) => {
    setSelectedBrands(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const toggleCategory = (c: string) => {
    setSelectedCategories(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMaxPrice(5000);
    setOnlyInStock(false);
    setSearchTerm("");
    setSortBy("featured");
  };

  // Filtered & Sorted Products calculation
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (onlyInStock && p.stock === 0) return false;
      if (searchTerm.trim() && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0;
    });
  }, [allProducts, selectedBrands, selectedCategories, maxPrice, onlyInStock, searchTerm, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            NUTRITION CATALOG
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Browse {filteredProducts.length} authentic products across MuscleBlaze, Pintola & Alpino.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Filter className="w-4 h-4 text-rose-600" />
                  <span>FILTERS</span>
                </div>
                {(selectedBrands.length > 0 || selectedCategories.length > 0 || maxPrice < 5000 || onlyInStock || searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Search Inside Catalog */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase block mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  Brand
                </h4>
                <div className="space-y-2">
                  {["MuscleBlaze", "Pintola", "Alpino"].map(brand => (
                    <label key={brand} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  {["Protein", "Creatine", "Oats", "Muesli", "Peanut Butter", "Vitamins & Wellness"].map(cat => (
                    <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="text-xs font-black text-rose-600">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              {/* In Stock Only */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 text-xs font-bold text-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={e => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Catalog Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-bold text-slate-600">
                Showing <span className="text-slate-900 font-black">{filteredProducts.length}</span> Products
              </div>

              {/* Sorting Selection */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="featured">Featured</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-4">
                <p className="text-base font-bold text-slate-800">No products found matching your filters</p>
                <p className="text-xs text-slate-500">Try loosening your brand or category selection.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-rose-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
