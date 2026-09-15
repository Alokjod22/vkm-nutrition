"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, Banner } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Layout, Image as ImageIcon, Edit3, Eye, CheckCircle2 } from "lucide-react";

export default function AdminCMSPage() {
  const { showNotification } = useStore();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    setBanners(db.getBanners());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">HOMEPAGE CMS & BANNER MANAGER</h1>
        <p className="text-xs text-slate-400 font-medium">
          Control active Hero banners, CTA titles, target links, and promotional featured sections.
        </p>
      </div>

      <div className="space-y-6">
        {banners.map(banner => (
          <div key={banner.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-extrabold text-white text-sm">HERO BANNER: {banner.id}</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
                {banner.isActive ? "Active on Homepage" : "Inactive"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Banner Title</label>
                  <input
                    type="text"
                    defaultValue={banner.title}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Subtitle</label>
                  <input
                    type="text"
                    defaultValue={banner.subtitle}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      defaultValue={banner.ctaText}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-rose-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Target Link</label>
                    <input
                      type="text"
                      defaultValue={banner.ctaLink}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="w-full h-36 bg-slate-950 rounded-2xl relative border border-slate-800 overflow-hidden flex items-center justify-center">
                  <Image src={banner.imageUrl} alt={banner.title} fill className="object-contain p-2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
