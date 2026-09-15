"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db, Product, Order } from "@/lib/db";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setProducts(db.getProducts());
    setOrders(db.getOrders());
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const activeProductsCount = products.filter(p => p.status === "Active").length;
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">ADMIN DASHBOARD</h1>
        <p className="text-xs text-slate-400 font-medium">
          Real-time metrics, revenue analytics, and order fulfillment status.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>TOTAL REVENUE</span>
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>TOTAL ORDERS</span>
            <span className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-white">{totalOrders}</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.2% vs last week</span>
          </div>
        </div>

        {/* Card 3: Active Products */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>ACTIVE PRODUCTS</span>
            <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-white">{activeProductsCount}</div>
          <div className="text-xs text-slate-500 font-medium">Seeded across MB, Pintola & Alpino</div>
        </div>

        {/* Card 4: Low Stock Warnings */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>LOW STOCK ALERTS</span>
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-400">{lowStockCount} Items</div>
          <div className="text-xs text-amber-400 font-bold">Requires restocking soon</div>
        </div>
      </div>

      {/* Revenue Sales Trend Chart (SVG) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white">REVENUE TREND (LAST 7 DAYS)</h3>
            <p className="text-xs text-slate-400">Daily sales performance & checkout volume</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            +₹32,400 Today
          </span>
        </div>

        {/* Interactive SVG Line Graph */}
        <div className="h-44 w-full relative flex items-end pt-8">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="#334155" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="500" y2="60" stroke="#334155" strokeDasharray="3 3" />
            
            {/* Line Path */}
            <path
              d="M0,80 Q75,30 150,50 T300,20 T450,40 T500,10"
              fill="none"
              stroke="#E11D48"
              strokeWidth="4"
            />
            {/* Gradient Area below line */}
            <path
              d="M0,80 Q75,30 150,50 T300,20 T450,40 T500,10 V100 H0 Z"
              fill="url(#grad)"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 pt-2 border-t border-slate-800">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white">RECENT CUSTOMER ORDERS</h3>
          <Link href="/admin/orders" className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1">
            <span>View All Orders</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {orders.slice(0, 5).map(ord => (
                <tr key={ord.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-white">{ord.orderNumber}</td>
                  <td className="p-3">{ord.customerName}</td>
                  <td className="p-3 text-slate-400">{ord.items.length} Products</td>
                  <td className="p-3 font-bold text-white">₹{ord.totalAmount.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-emerald-400 font-bold">{ord.paymentMethod}</td>
                  <td className="p-3">
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      {ord.orderStatus}
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
