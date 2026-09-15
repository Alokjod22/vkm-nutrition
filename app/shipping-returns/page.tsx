import React from "react";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import { Truck, RotateCcw, ShieldCheck, Clock } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Truck className="w-4 h-4" />
              <span>Fulfilment & Policy</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shipping & Returns</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Last updated: September 15, 2026 • VKM Nutrition
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6 font-medium">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-600" />
                1. Order Dispatch & Delivery Timelines
              </h2>
              <p>
                Orders placed before 2:00 PM IST are dispatched on the same business day. Standard delivery timelines across Metro cities in India range from 2 to 4 business days. Regional and rural locations typically receive delivery within 4 to 7 business days.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                <li><span className="font-bold text-slate-900">Free Express Shipping:</span> Applicable on all orders exceeding ₹999.</li>
                <li><span className="font-bold text-slate-900">Standard Delivery Fee:</span> Flat ₹79 for orders under ₹999.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                2. 7-Day Easy Returns & Replacements
              </h2>
              <p>
                We offer a hassle-free 7-day return policy for unopened, unsealed, and undamaged products in their original manufacturer packaging.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-bold text-slate-900">Eligible Return Reasons:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Damaged product container upon arrival</li>
                  <li>Mismatched item, weight, or flavour delivered</li>
                  <li>Missing security seal prior to unboxing</li>
                </ul>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                3. Damaged / Tampered Shipments
              </h2>
              <p>
                Please inspect your parcel upon delivery. If you notice any outer box damage or tampered tape, record an unboxing video before opening. Contact our customer support team at <span className="font-bold text-slate-900">support@vkmnutrition.in</span> within 48 hours for immediate replacement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Refund Process</h2>
              <p>
                Once returned products are received and verified by our warehouse quality team, refunds are processed within 3-5 business days back to your original payment method (UPI, Bank Account, or Card).
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
