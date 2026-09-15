"use client";

import React, { useState } from "react";
import { Truck, MapPin, CheckCircle2, Search, Plus } from "lucide-react";

export default function AdminShippingPage() {
  const [pincodeQuery, setPincodeQuery] = useState("");
  const [pincodes, setPincodes] = useState([
    { pincode: "110001", city: "New Delhi", state: "Delhi", cod: true, eta: "1-2 Days", partner: "Delhivery" },
    { pincode: "411001", city: "Pune", state: "Maharashtra", cod: true, eta: "2-3 Days", partner: "Shiprocket" },
    { pincode: "560038", city: "Bengaluru", state: "Karnataka", cod: true, eta: "2-3 Days", partner: "BlueDart" },
    { pincode: "400001", city: "Mumbai", state: "Maharashtra", cod: true, eta: "2-3 Days", partner: "Delhivery" },
    { pincode: "700001", city: "Kolkata", state: "West Bengal", cod: false, eta: "3-4 Days", partner: "Shiprocket" }
  ]);

  const filteredPincodes = pincodes.filter(p => p.pincode.includes(pincodeQuery) || p.city.toLowerCase().includes(pincodeQuery.toLowerCase()));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">SHIPPING ZONES & PINCODE MANAGEMENT</h1>
        <p className="text-xs text-slate-400 font-medium">
          Manage Indian serviceable pincodes, courier partners (Delhivery/Shiprocket/BlueDart), COD availability, and ETAs.
        </p>
      </div>

      {/* Free Shipping Rule Banner */}
      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-extrabold uppercase text-emerald-400">Active Shipping Rule</div>
          <h3 className="text-lg font-black text-white mt-0.5">FREE EXPRESS SHIPPING ON ORDERS OVER ₹999</h3>
          <p className="text-xs text-slate-400 mt-1">Standard flat fee of ₹79 applies for orders below ₹999 threshold.</p>
        </div>

        <button className="px-4 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md">
          EDIT SHIPPING THRESHOLD
        </button>
      </div>

      {/* Pincode Search Header */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search Pincode or City..."
            value={pincodeQuery}
            onChange={e => setPincodeQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Serviceable Pincodes Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Pincode</th>
                <th className="p-4">City / State</th>
                <th className="p-4">COD Available</th>
                <th className="p-4">Estimated ETA</th>
                <th className="p-4">Courier Partner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredPincodes.map((pin, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="p-4 font-black text-white">{pin.pincode}</td>
                  <td className="p-4">{pin.city}, {pin.state}</td>
                  <td className="p-4">
                    {pin.cod ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Allowed
                      </span>
                    ) : (
                      <span className="text-slate-500">Prepaid Only</span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-white">{pin.eta}</td>
                  <td className="p-4 font-bold text-rose-400">{pin.partner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
