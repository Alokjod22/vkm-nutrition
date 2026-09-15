"use client";

import React from "react";
import { Key, Server, Webhook, ShieldCheck } from "lucide-react";

export default function AdminIntegrationsPage() {
  const integrations = [
    { name: "Razorpay / UPI Gateway API", status: "Connected", key: "rzp_live_••••••••9482", category: "Payment Gateway" },
    { name: "Delhivery Courier Logistics API", status: "Connected", key: "dlh_live_••••••••1029", category: "Shipping & Fulfillment" },
    { name: "Shiprocket Logistics API", status: "Connected", key: "shp_live_••••••••5519", category: "Shipping & Fulfillment" },
    { name: "Resend Email Dispatcher API", status: "Connected", key: "re_••••••••8821", category: "Transactional Emails" },
    { name: "WhatsApp Business API", status: "Connected", key: "wa_live_••••••••4120", category: "SMS & Mobile Alerts" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">API & THIRD-PARTY INTEGRATIONS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage production API credentials for payment gateways, courier fulfillment APIs, email dispatchers, and SMS webhooks.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Integration Service</th>
                <th className="p-4">Category</th>
                <th className="p-4">API Key Token</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {integrations.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4 text-slate-400">{item.category}</td>
                  <td className="p-4 font-mono text-rose-400">{item.key}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      🟢 {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
