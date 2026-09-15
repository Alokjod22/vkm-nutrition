"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Star, ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;

  const getBrandBadge = (brand: string) => {
    switch (brand) {
      case "MuscleBlaze":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Pintola":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Alpino":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative">
      {/* Top Discount Badge & Wishlist Button */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        {product.discount > 0 ? (
          <span className="bg-rose-600 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
            {product.discount}% OFF
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={e => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-transform hover:scale-110 shadow-sm ${
            isWishlisted
              ? "bg-rose-50 text-rose-600"
              : "bg-white/80 text-slate-400 hover:text-rose-500"
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600" : ""}`} />
        </button>
      </div>

      <Link href={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="w-full h-52 bg-slate-50 relative p-4 flex items-center justify-center overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBrandBadge(
                  product.brand
                )}`}
              >
                {product.brand}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 text-[10px] font-normal">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 min-h-[2.5rem] group-hover:text-rose-600 transition-colors">
              {product.name}
            </h3>

            {/* Flavours / Variant tags preview */}
            {product.flavours && product.flavours.length > 0 && (
              <p className="text-[11px] text-slate-500 mt-1 truncate">
                Flavours: {product.flavours.join(", ")}
              </p>
            )}
          </div>

          {/* Pricing & Stock Status */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-black text-slate-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            {isOutOfStock ? (
              <span className="text-[11px] font-bold text-red-600 block mb-2">
                🔴 Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-[11px] font-bold text-amber-600 block mb-2">
                🟠 Low Stock (Only {product.stock} left!)
              </span>
            ) : (
              <span className="text-[11px] font-bold text-emerald-600 block mb-2">
                🟢 In Stock
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Footer Button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            isOutOfStock
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-slate-900 hover:bg-rose-600 text-white shadow-md shadow-slate-900/10 hover:shadow-rose-600/30"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isOutOfStock ? "Out of Stock" : "ADD TO CART"}</span>
        </button>
      </div>
    </div>
  );
}
