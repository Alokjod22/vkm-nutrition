"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import { db, Order, Product } from "@/lib/db";
import { useStore } from "@/lib/context";
import {
  Package,
  Heart,
  MapPin,
  CheckCircle2,
  Truck,
  User,
  ShoppingBag,
  Search
} from "lucide-react";
import Image from "next/image";

function AccountContent() {
  const searchParams = useSearchParams();
  const highlightedOrderId = searchParams?.get("orderId") || "";

  const { wishlist } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses">("orders");
  const [orderSearchId, setOrderSearchId] = useState<string>("");

  useEffect(() => {
    setOrders(db.getOrders());
    const allProds = db.getProducts();
    setWishlistProducts(allProds.filter(p => wishlist.includes(p.id)));
  }, [wishlist]);

  const displayedOrders = orders.filter(o => {
    if (!orderSearchId.trim()) return true;
    const q = orderSearchId.toLowerCase().trim();
    return o.orderNumber.toLowerCase().includes(q) || o.id.toLowerCase().includes(q);
  });

  const getStatusStep = (status: Order["orderStatus"]) => {
    switch (status) {
      case "Order Confirmed": return 1;
      case "Packed": return 2;
      case "Shipped": return 3;
      case "Out for Delivery": return 4;
      case "Delivered": return 5;
      default: return 1;
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">MY ACCOUNT</h1>
            <p className="text-xs text-slate-500 font-medium">Manage your orders, live shipment tracking, and saved wishlist.</p>
          </div>
        </div>

        {/* Quick Order Lookup Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search Order # or ID..."
            value={orderSearchId}
            onChange={e => setOrderSearchId(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Tab Selection Navigation */}
      <div className="flex border-b border-slate-200 mb-8 gap-8">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "orders" ? "border-rose-600 text-rose-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("wishlist")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "wishlist" ? "border-rose-600 text-rose-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlistProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("addresses")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "addresses" ? "border-rose-600 text-rose-600" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* TAB 1: ORDERS LIST & TRACKING TIMELINE */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {displayedOrders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                {orderSearchId ? "No matching orders found" : "No orders placed yet"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {orderSearchId ? "Check your order number and search again." : "Start shopping authentic supplements to see order tracking here."}
              </p>
              <Link href="/shop" className="inline-block mt-4 px-5 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs">
                Explore Catalog
              </Link>
            </div>
          ) : (
            displayedOrders.map(order => {
              const currentStep = getStatusStep(order.orderStatus);
              const isHighlighted = order.id === highlightedOrderId;

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm transition-all space-y-6 ${
                    isHighlighted ? "border-rose-500 ring-2 ring-rose-500/20 shadow-md" : "border-slate-200"
                  }`}
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-slate-900">{order.orderNumber}</span>
                        <span className="text-xs font-bold text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Tracking ID: {order.trackingNumber}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                      <div className="text-xs font-bold text-emerald-600">{order.paymentMethod} • {order.paymentStatus}</div>
                    </div>
                  </div>

                  {/* LIVE TRACKING TIMELINE */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-rose-600" />
                      <span>Live Shipping Timeline Status: <span className="text-rose-600">{order.orderStatus}</span></span>
                    </div>

                    <div className="grid grid-cols-5 text-center relative">
                      {/* Connecting Line */}
                      <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0" />
                      <div
                        className="absolute top-4 left-6 h-1 bg-rose-600 transition-all duration-500 -z-0"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                      />

                      {[
                        { title: "Confirmed", step: 1 },
                        { title: "Packed", step: 2 },
                        { title: "Shipped", step: 3 },
                        { title: "Out for Delivery", step: 4 },
                        { title: "Delivered", step: 5 }
                      ].map(st => (
                        <div key={st.step} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                              currentStep >= st.step ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            {currentStep > st.step ? <CheckCircle2 className="w-5 h-5" /> : st.step}
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-2">{st.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Itemized Products */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Ordered Items</h4>
                    <div className="divide-y divide-slate-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl relative border overflow-hidden flex-shrink-0">
                              <Image src={item.image} alt={item.productName} fill className="object-contain p-1" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">{item.productName}</div>
                              <div className="text-[11px] text-slate-500">
                                {item.brand} {item.size ? `• ${item.size}` : ""} {item.flavour ? `• ${item.flavour}` : ""} • Qty: {item.quantity}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === "wishlist" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistProducts.length === 0 ? (
            <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-200">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500 mt-1">Heart items while browsing to save them for later.</p>
            </div>
          ) : (
            wishlistProducts.map(prod => (
              <div key={prod.id} className="bg-white p-4 rounded-2xl border border-slate-200">
                <div className="w-full h-40 relative bg-slate-50 rounded-xl mb-3">
                  <Image src={prod.images[0]} alt={prod.name} fill className="object-contain p-2" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h4>
                <div className="text-sm font-black text-rose-600 mt-1">₹{prod.price}</div>
                <Link href={`/product/${prod.id}`} className="block mt-3 py-2 text-center bg-slate-900 text-white font-bold text-xs rounded-xl">
                  View Product
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: ADDRESSES */}
      {activeTab === "addresses" && (
        <div className="max-w-md bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>Default Delivery Address</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Rahul Verma<br />
            42 Connaught Place, Block B<br />
            New Delhi, Delhi - 110001<br />
            Mobile: +91 98765 43210
          </p>
        </div>
      )}
    </main>
  );
}

export default function CustomerAccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center p-12 text-xs font-bold text-slate-400">Loading Account Details...</div>}>
        <AccountContent />
      </Suspense>
      <Footer />
    </div>
  );
}
