"use client";

import React from "react";
import { BarChart3, TrendingUp, PieChart, Users, ShoppingBag, ArrowUpRight } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">SALES & E-COMMERCE ANALYTICS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Detailed sales breakdowns, brand revenue share, category performance, and conversion funnel metrics.
        </p>
      </div>

      {/* Revenue Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Gross Sales</div>
          <div className="text-2xl font-black text-white">₹8,144</div>
          <div className="text-xs text-emerald-400 font-bold">+18.4% growth</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Average Order Value</div>
          <div className="text-2xl font-black text-white">₹2,714</div>
          <div className="text-xs text-emerald-400 font-bold">High basket size</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Store Conversion Rate</div>
          <div className="text-2xl font-black text-rose-500">3.42%</div>
          <div className="text-xs text-slate-400">Industry leading</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Customer Retention</div>
          <div className="text-2xl font-black text-emerald-400">42%</div>
          <div className="text-xs text-slate-400">Repeat buyers</div>
        </div>
      </div>

      {/* Brand & Category Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Sales Share */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-white text-sm">REVENUE SHARE BY BRAND</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>MuscleBlaze</span>
                <span>₹5,499 (67%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-600 h-full w-[67%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Pintola</span>
                <span>₹1,698 (21%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[21%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Alpino</span>
                <span>₹947 (12%)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[12%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Product Category Share */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-white text-sm">CATEGORY PERFORMANCE</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Protein Supplements</span>
                <span>48%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[48%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Creatine Monohydrate</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>High Protein Oats & PB</span>
                <span>24%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[24%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
