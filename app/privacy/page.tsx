import React from "react";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Legal Policy</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Last updated: September 15, 2026 • VKM Nutrition
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6 font-medium">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-600" />
                1. Information We Collect
              </h2>
              <p>
                At VKM Nutrition, we respect your privacy. We collect personal information necessary to process your supplement orders, facilitate delivery, and provide customer support. This includes your name, delivery address, phone number, email address, and order history.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-rose-600" />
                2. How We Use Your Data
              </h2>
              <p>
                Your information is used strictly for fulfilling orders, managing accounts, sending order status updates, and offering customer support. We do not sell or rent your personal information to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                3. Payment Security & Encryption
              </h2>
              <p>
                All payment transactions are processed through encrypted 256-bit SSL secure gateways (UPI, Credit/Debit Cards, NetBanking). VKM Nutrition does not store your payment credentials or sensitive card details on our servers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                4. Cookies & Analytics
              </h2>
              <p>
                We use cookies to maintain your shopping cart state, remember your account preferences, and analyze website usage to improve user experience. You can manage or disable cookie preferences through your web browser settings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. Contact Privacy Team</h2>
              <p>
                If you have any questions or concerns regarding our privacy practices or wish to update your stored account details, please email us at <span className="font-bold text-slate-900">support@vkmnutrition.in</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
