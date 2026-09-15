"use client";

import React, { useState, useEffect } from "react";
import { db, Customer } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Users, Search, UserCheck, Shield, ShoppingBag, MapPin, X } from "lucide-react";

export default function AdminCustomersPage() {
  const { showNotification } = useStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    setCustomers(db.getCustomers());
  }, []);

  const filteredCustomers = customers.filter(c => {
    if (selectedSegment !== "All" && c.segment !== selectedSegment) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">CUSTOMER CRM & USER DIRECTORY</h1>
        <p className="text-xs text-slate-400 font-medium">
          Inspect customer accounts, order history, lifetime value, and customer segmentation.
        </p>
      </div>

      {/* Filters & Search Header */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by Customer Name, Email, Phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Segment:</span>
          {["All", "VIP", "High Value", "Returning", "New"].map(seg => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedSegment === seg ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Segment</th>
                <th className="p-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                      {cust.name.charAt(0)}
                    </div>
                    <span>{cust.name}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-semibold">{cust.email}</div>
                    <div className="text-[10px] text-slate-500">{cust.phone}</div>
                  </td>
                  <td className="p-4 text-slate-400">{cust.registeredDate}</td>
                  <td className="p-4 font-bold text-white">{cust.totalOrders} Orders</td>
                  <td className="p-4 font-black text-rose-500">₹{cust.totalSpent.toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      cust.segment === "VIP"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : cust.segment === "High Value"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {cust.segment}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs"
                    >
                      View CRM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-6 text-xs text-slate-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-sm">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedCustomer.name}</h3>
                  <span className="text-[10px] text-slate-500">ID: {selectedCustomer.id}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">Contact & Address</div>
                <div>{selectedCustomer.email}</div>
                <div>{selectedCustomer.phone}</div>
                <div className="text-slate-500">
                  {selectedCustomer.address.street}, {selectedCustomer.address.city}, {selectedCustomer.address.state} - {selectedCustomer.address.pincode}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-lg font-black text-rose-500">₹{selectedCustomer.totalSpent.toLocaleString("en-IN")}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Total Spent</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-lg font-black text-white">{selectedCustomer.totalOrders}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Orders Placed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
