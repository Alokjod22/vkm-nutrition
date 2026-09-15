"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, BadgePercent, Award, ArrowRight } from "lucide-react";

export default function TrustSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% Genuine Direct Sourcing",
      desc: "Every product is sourced directly from brand official distributors with authentic seals.",
      iconColor: "text-emerald-500 bg-emerald-50"
    },
    {
      icon: Truck,
      title: "Fast Express Shipping",
      desc: "Priority dispatch with real-time SMS tracking across India in 24 to 48 hours.",
      iconColor: "text-rose-500 bg-rose-50"
    },
    {
      icon: BadgePercent,
      title: "Wholesale Value Pricing",
      desc: "Direct brand-to-consumer pricing model ensures maximum savings on all orders.",
      iconColor: "text-amber-500 bg-amber-50"
    },
    {
      icon: Award,
      title: "Fresh Batch Guarantee",
      desc: "Guaranteed fresh manufacturing dates with long shelf life on all 50 supplements.",
      iconColor: "text-blue-500 bg-blue-50"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            WHY FITNESS ENTHUSIASTS TRUST VKM NUTRITION
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            We eliminate middle-men to guarantee 100% authentic fitness products delivered to your door.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${item.iconColor} flex items-center justify-center mb-4 font-bold`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner linking to Shop All */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              READY TO BROWSE OUR FULL NUTRITION CATALOG?
            </h3>
            <p className="text-sm text-rose-100 mt-1 font-medium max-w-xl">
              Discover 50 verified products across Whey Protein, Creatine, Oats, Muesli & Peanut Butters.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-8 py-4 bg-white text-rose-900 hover:bg-rose-50 font-black rounded-2xl text-sm shadow-lg flex items-center gap-2 shrink-0 transition-transform hover:scale-105"
          >
            <span>GO TO SHOP ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 text-rose-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
