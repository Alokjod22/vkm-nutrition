"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Lock, PhoneCall, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-rose-600 to-amber-500 rounded-lg flex items-center justify-center text-white font-black text-lg">
                V
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                VKM <span className="text-rose-500">NUTRITION</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's premier authentic marketplace for genuine MuscleBlaze, Pintola & Alpino products. Premium sports nutrition & healthy food products at bulk tier prices.
            </p>
            <div className="flex items-center gap-3 text-slate-300 font-semibold">
              <PhoneCall className="w-4 h-4 text-rose-500" />
              <span>+91 (800) 102-VKM</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-semibold">
              <Mail className="w-4 h-4 text-rose-500" />
              <span>support@vkmnutrition.in</span>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/shop?category=Protein" className="hover:text-white transition-colors">
                  Whey Protein & Isolates
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Creatine" className="hover:text-white transition-colors">
                  CreAMP & Monohydrate
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Oats+%26+Muesli" className="hover:text-white transition-colors">
                  High Protein Oats & Muesli
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Vitamins+%26+Wellness" className="hover:text-white transition-colors">
                  Vitamins & Wellness
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Peanut+Butter" className="hover:text-white transition-colors">
                  Organic & Dark Chocolate PB
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand Hubs */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4">
              Brand Hubs
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/brand/muscleblaze" className="hover:text-rose-400 transition-colors">
                  MuscleBlaze Supplements
                </Link>
              </li>
              <li>
                <Link href="/brand/pintola" className="hover:text-amber-400 transition-colors">
                  Pintola Nut Butters
                </Link>
              </li>
              <li>
                <Link href="/brand/alpino" className="hover:text-emerald-400 transition-colors">
                  Alpino Superfoods
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Orders & Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust Guarantee */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-4">
              VKM Nutrition Guarantee
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">100% Authentic</div>
                  <div className="text-[10px] text-slate-400">Direct distributor sourcing</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
                <Truck className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Fast Shipping</div>
                  <div className="text-[10px] text-slate-400">Dispatched within 24 hours</div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Secure Payments</div>
                  <div className="text-[10px] text-slate-400">256-bit Encrypted UPI & Cards</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© 2026 VKM Nutrition. All rights reserved.</p>
          <div className="flex gap-4 font-medium">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/shipping-returns" className="hover:text-white">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
