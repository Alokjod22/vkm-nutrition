"use client";

import React from "react";
import { Search, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

export default function AdminSearchAnalyticsPage() {
  const popularSearches = [
    { query: "Biozyme Whey", count: 1420, trend: "+24%", zeroResult: false },
    { query: "Creatine Monohydrate", count: 980, trend: "+18%", zeroResult: false },
    { query: "Pintola Dark Chocolate Peanut Butter", count: 750, trend: "+12%", zeroResult: false },
    { query: "Alpino High Protein Oats", count: 620, trend: "+8%", zeroResult: false },
    { query: "Plant Protein Isolate", count: 310, trend: "New Opportunity", zeroResult: true },
    { query: "Mass Gainer 5KG", count: 240, trend: "High Demand", zeroResult: true }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">SEARCH ANALYTICS & DEMAND INSIGHTS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Track customer search behavior, trending keywords, and zero-result search opportunities.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Search Keyword</th>
                <th className="p-4">Search Volume</th>
                <th className="p-4">Trend</th>
                <th className="p-4">Catalog Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {popularSearches.map((s, i) => (
                <tr key={i} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white">{s.query}</td>
                  <td className="p-4 text-slate-300">{s.count} searches</td>
                  <td className="p-4 font-bold text-emerald-400">{s.trend}</td>
                  <td className="p-4">
                    {s.zeroResult ? (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 max-w-max">
                        <AlertCircle className="w-3 h-3" /> Zero Results (New Opportunity)
                      </span>
                    ) : (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        Available in Catalog
                      </span>
                    )}
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
