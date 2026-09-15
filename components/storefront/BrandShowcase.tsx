"use client";

import React from "react";
import Link from "next/link";
import { Zap, Sun, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5 fill-rose-400" />
            <span>AUTHORIZE BRAND PARTNERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            EXPLORE OUR PREMIUM BRANDS
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Sourced 100% directly from India&apos;s most trusted sports nutrition & healthy food manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* MuscleBlaze Card */}
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full mb-6 border border-rose-500/20">
                <Zap className="w-3.5 h-3.5 fill-rose-400" />
                <span>SPORTS NUTRITION</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                MUSCLEBLAZE
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                Labdoor USA Certified Biozyme Performance Whey, Raw Whey Isolate & CreAMP Creatine Monohydrate.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mb-8 font-semibold">
                <li className="flex items-center gap-2 text-emerald-400">✓ Enhanced Absorption Formula (EAF®)</li>
                <li className="flex items-center gap-2 text-emerald-400">✓ 100% Blind Testing Certified</li>
                <li className="flex items-center gap-2 text-emerald-400">✓ 17 Verified Products Available</li>
              </ul>
            </div>
            <Link
              href="/brand/muscleblaze"
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all group-hover:scale-[1.02]"
            >
              <span>EXPLORE MUSCLEBLAZE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pintola Card */}
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full mb-6 border border-amber-500/20">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>NUT BUTTERS & OATS</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                PINTOLA
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                India&apos;s Highest Rated All-Natural Peanut Butters, High-Protein Chocolate Oats & Brown Rice Cakes.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mb-8 font-semibold">
                <li className="flex items-center gap-2 text-amber-400">✓ 100% Hand-picked Roasted Peanuts</li>
                <li className="flex items-center gap-2 text-amber-400">✓ USDA Organic & Zero Palm Oil</li>
                <li className="flex items-center gap-2 text-amber-400">✓ 16 Verified Products Available</li>
              </ul>
            </div>
            <Link
              href="/brand/pintola"
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all group-hover:scale-[1.02]"
            >
              <span>EXPLORE PINTOLA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Alpino Card */}
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full mb-6 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ORGANIC HEALTH FOODS</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                ALPINO
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                Super Oats High Protein Chocolate, Organic Jaggery Peanut Butter & High Protein Super Muesli.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mb-8 font-semibold">
                <li className="flex items-center gap-2 text-emerald-400">✓ Premium Junagadh Roasted Peanuts</li>
                <li className="flex items-center gap-2 text-emerald-400">✓ 30% Protein Power & Zero Sugar</li>
                <li className="flex items-center gap-2 text-emerald-400">✓ 17 Verified Products Available</li>
              </ul>
            </div>
            <Link
              href="/brand/alpino"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all group-hover:scale-[1.02]"
            >
              <span>EXPLORE ALPINO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
