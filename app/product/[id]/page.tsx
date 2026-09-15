import React from "react";
import { db } from "@/lib/db";
import ProductDetailClient from "@/components/storefront/ProductDetailClient";
import Link from "next/link";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";

export function generateStaticParams() {
  const products = db.getProducts();
  return products.map(p => ({
    id: p.id
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = db.getProductById(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The product you are looking for does not exist or has been removed.</p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-3 bg-rose-600 text-white font-bold rounded-xl text-sm"
          >
            Back to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
