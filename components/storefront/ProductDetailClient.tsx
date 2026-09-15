"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import { Product } from "@/lib/db";
import { useStore } from "@/lib/context";
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Heart,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2
} from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useStore();

  const [selectedFlavour, setSelectedFlavour] = useState(
    product.flavours && product.flavours.length > 0 ? product.flavours[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "nutrition" | "ingredients" | "how">("nutrition");

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.stock === 0;

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedFlavour, selectedSize);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-rose-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-rose-600">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold truncate">{product.name}</span>
        </div>

        {/* Product Details Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm mb-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full h-80 sm:h-[420px] bg-slate-50 rounded-2xl border border-slate-100 relative p-6 flex items-center justify-center overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-md text-slate-400 hover:text-rose-600 transition-colors z-10"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {product.brand}
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-amber-500 font-black text-sm bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  based on {product.reviewCount} verified ratings & reviews
                </span>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-sm text-slate-400 line-through font-medium">
                      MRP ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-600 font-bold mt-1 block">
                  Inclusive of all taxes • Free Shipping Eligible
                </span>
              </div>

              {product.discount > 0 && (
                <div className="bg-rose-600 text-white font-black text-xs uppercase px-3 py-1.5 rounded-xl shadow-md">
                  SAVE {product.discount}%
                </div>
              )}
            </div>

            {/* Flavours Picker */}
            {product.flavours && product.flavours.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase block mb-2">
                  Select Flavour: <span className="text-rose-600 font-extrabold">{selectedFlavour}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.flavours.map(flav => (
                    <button
                      key={flav}
                      onClick={() => setSelectedFlavour(flav)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedFlavour === flav
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {flav}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Weight Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase block mb-2">
                  Select Size / Weight: <span className="text-rose-600 font-extrabold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Modifier */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-slate-800 uppercase">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-200 rounded-l-xl"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-slate-600 hover:bg-slate-200 rounded-r-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => addToCart(product, quantity, selectedFlavour, selectedSize)}
                disabled={isOutOfStock}
                className={`py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/30"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Genuine Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-500" />
                <span>Express 24-Hour Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs & Specifications */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-slate-100 gap-4 mb-8">
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "nutrition"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              NUTRITION FACTS
            </button>
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "desc"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "ingredients"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              INGREDIENTS
            </button>
            <button
              onClick={() => setActiveTab("how")}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 ${
                activeTab === "how"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              HOW TO USE
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "nutrition" && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-base font-bold text-slate-900">
                Nutritional Profile (Per Serving: {product.nutrition.servingSize})
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-rose-600">{product.nutrition.protein}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase mt-1">Protein</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-amber-600">{product.nutrition.calories}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase mt-1">Calories</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-blue-600">{product.nutrition.carbs}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase mt-1">Carbs</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="text-2xl font-black text-emerald-600">{product.nutrition.fat}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase mt-1">Fat</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "desc" && (
            <div className="text-sm text-slate-700 leading-relaxed max-w-3xl space-y-4">
              <p>{product.description}</p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3 text-emerald-900 text-xs font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Labdoor USA Certified & Direct Manufacturer Batch Authenticity Guaranteed.</span>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              <p className="font-medium">{product.ingredients}</p>
            </div>
          )}

          {activeTab === "how" && (
            <div className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              <p className="font-medium">{product.howToUse}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
