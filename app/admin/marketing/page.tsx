"use client";

import React, { useState, useEffect } from "react";
import { db, Coupon, Banner } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Tag, Plus, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function AdminMarketingPage() {
  const { showNotification } = useStore();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  // Form State
  const [code, setCode] = useState("NUTRI15");
  const [discountPercent, setDiscountPercent] = useState(15);
  const [minOrder, setMinOrder] = useState(999);

  const loadData = () => {
    setCoupons(db.getCoupons());
    setBanners(db.getBanners());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      id: "c-" + Date.now(),
      code: code.toUpperCase(),
      discountPercent,
      minOrderValue: minOrder,
      maxDiscount: 500,
      validUntil: "2026-12-31",
      usageCount: 0,
      usageLimit: 1000,
      isActive: true
    };

    db.saveCoupon(newCoupon);
    loadData();
    showNotification(`Created coupon: ${newCoupon.code}`);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">MARKETING, COUPONS & BANNERS</h1>
        <p className="text-xs text-slate-400 font-medium">Create promo discount codes and manage homepage hero banners.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Coupon Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-rose-500" />
            <span>CREATE PROMO COUPON</span>
          </h3>

          <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">Coupon Code</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-black uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold uppercase text-slate-300 block mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={e => setDiscountPercent(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-slate-300 block mb-1">Min Order Value (₹)</label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={e => setMinOrder(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs"
            >
              CREATE COUPON CODE
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-black text-white">ACTIVE COUPONS</h3>

          <div className="space-y-3">
            {coupons.map(c => (
              <div key={c.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-black text-rose-400 text-sm">{c.code}</div>
                  <div className="text-slate-400">
                    {c.discountPercent}% OFF • Min Order ₹{c.minOrderValue}
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                    Active ({c.usageCount} used)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banners List */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-amber-500" />
          <span>HOMEPAGE HERO BANNERS</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map(b => (
            <div key={b.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">{b.title}</div>
              <p className="text-[11px] text-slate-400">{b.subtitle}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-rose-400 font-bold">CTA: {b.ctaText}</span>
                <span className="text-[10px] text-emerald-400 font-bold">🟢 Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
