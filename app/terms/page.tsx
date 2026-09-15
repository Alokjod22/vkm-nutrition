import React from "react";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import { FileText, ShieldAlert, CheckCircle, Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Last updated: September 15, 2026 • VKM Nutrition
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6 font-medium">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                1. Marketplace Platform Terms
              </h2>
              <p>
                By accessing or placing an order on VKM Nutrition, you agree to comply with and be bound by these Terms of Service. VKM Nutrition acts as an independent retail marketplace for authentic sports nutrition, nut butter, and healthy food products.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                2. Product Pricing & Availability
              </h2>
              <p>
                All prices listed on VKM Nutrition are in Indian Rupees (₹) and include applicable taxes. We reserve the right to modify prices, discounts, and inventory availability at any time. In the event of a pricing error or stock unavailability, VKM Nutrition reserves the right to cancel affected orders and issue full refunds.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                3. Product Authenticity & Disclaimer
              </h2>
              <p>
                All products offered on VKM Nutrition are sourced directly from authorized brand distributors or manufacturers. Nutritional supplements are intended to support general wellness and fitness goals and are not designed to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before starting any dietary regimen.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. User Conduct & Accounts</h2>
              <p>
                Users are responsible for providing accurate contact and shipping information. Fraudulent orders, unauthorized price tampering, or misuse of customer accounts will result in immediate termination of account privileges and referral to legal authorities.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
