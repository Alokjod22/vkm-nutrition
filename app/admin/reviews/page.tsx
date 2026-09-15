"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle, ShieldCheck, Search, Filter } from "lucide-react";

interface ReviewItem {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchaser: boolean;
  status: "Approved" | "Pending" | "Rejected";
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "rev-1",
      productName: "Biozyme Performance Whey",
      customerName: "Rahul Verma",
      rating: 5,
      comment: "Best whey protein for Indian digestion! Taste is great and no bloating at all.",
      date: "2026-03-10",
      isVerifiedPurchaser: true,
      status: "Approved"
    },
    {
      id: "rev-2",
      productName: "Creatine Monohydrate CreAMP",
      customerName: "Asha Sharma",
      rating: 5,
      comment: "100% pure micronized creatine. Great pump and strength boost.",
      date: "2026-03-12",
      isVerifiedPurchaser: true,
      status: "Approved"
    },
    {
      id: "rev-3",
      productName: "High Protein Super Oats Chocolate",
      customerName: "Vikram Malhotra",
      rating: 4,
      comment: "Very filling breakfast, loaded with nuts and dark chocolate chips.",
      date: "2026-03-14",
      isVerifiedPurchaser: false,
      status: "Pending"
    }
  ]);

  const handleStatus = (id: string, status: ReviewItem["status"]) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">REVIEWS & RATINGS MODERATION</h1>
        <p className="text-xs text-slate-400 font-medium">
          Moderate customer reviews, verify authentic purchasers, and manage rating displays.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Reviewer</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Verified</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {reviews.map(rev => (
                <tr key={rev.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white max-w-xs truncate">{rev.productName}</td>
                  <td className="p-4 text-slate-300">{rev.customerName}</td>
                  <td className="p-4 font-black text-amber-400 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{rev.rating}.0</span>
                  </td>
                  <td className="p-4 text-slate-400 max-w-sm truncate">{rev.comment}</td>
                  <td className="p-4">
                    {rev.isVerifiedPurchaser ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-slate-500">Unverified</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      rev.status === "Approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : rev.status === "Pending"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleStatus(rev.id, "Approved")}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatus(rev.id, "Rejected")}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-bold rounded-lg text-xs"
                    >
                      Reject
                    </button>
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
