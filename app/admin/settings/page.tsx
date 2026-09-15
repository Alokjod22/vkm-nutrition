"use client";

import React, { useState } from "react";
import { Settings, Save, ShieldCheck, Mail, PhoneCall } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("VKM Nutrition");
  const [email, setEmail] = useState("support@vkmnutrition.in");
  const [phone, setPhone] = useState("+91 800 102 856");
  const [currency, setCurrency] = useState("INR (₹)");
  const [codEnabled, setCodEnabled] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">STORE CONFIGURATION & SETTINGS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage identity, contact details, default currency, COD policies, and operational status.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold uppercase text-slate-300 block mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">Support Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">Support Helpline</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">Store Currency</label>
              <input
                type="text"
                value={currency}
                disabled
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-bold"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">Cash On Delivery (COD)</label>
              <select
                value={codEnabled ? "enabled" : "disabled"}
                onChange={e => setCodEnabled(e.target.value === "enabled")}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
