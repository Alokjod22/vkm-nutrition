"use client";

import React from "react";
import { FileText, Percent, ShieldCheck, Printer } from "lucide-react";

export default function AdminTaxInvoicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">TAX & GST INVOICE CONFIGURATION</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage Indian GST tax rates (18%), HSN codes (21069099 / 1517), and printable Tax Invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-white text-sm uppercase">Active Indian GST Tax Rules</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-white">Whey Protein & Creatine</div>
                <div className="text-[10px] text-slate-500">HSN Code: 21069099</div>
              </div>
              <span className="text-rose-400 font-black">18% GST</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-white">Peanut Butter & Oats</div>
                <div className="text-[10px] text-slate-500">HSN Code: 15179090 / 19041020</div>
              </div>
              <span className="text-rose-400 font-black">12% GST</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-white text-sm uppercase">Store GST Registration</h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="font-bold text-white">VKM Nutrition Pvt Ltd</div>
            <div>GSTIN: <span className="font-mono text-rose-400">07AAAAA0000A1Z5</span></div>
            <div>State Tax Jurisdiction: Delhi (Delhi - 07)</div>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              Tax invoices automatically break down CGST (9%) + SGST (9%) for intra-state or IGST (18%) for inter-state deliveries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
