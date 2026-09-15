"use client";

import React, { useState } from "react";
import { CreditCard, ArrowUpRight, CheckCircle2, XCircle, Search, DollarSign } from "lucide-react";

export default function AdminPaymentsPage() {
  const transactions = [
    { id: "tx-1001", orderNumber: "#NB10294", customer: "Rahul Verma", method: "UPI (GooglePay)", amount: 3698, status: "Success", date: "2026-03-01 10:30 AM", gateway: "Razorpay" },
    { id: "tx-1002", orderNumber: "#NB10293", customer: "Asha Sharma", method: "HDFC Visa Card", amount: 947, status: "Success", date: "2026-03-02 02:15 PM", gateway: "Paytm PG" },
    { id: "tx-1003", orderNumber: "#NB10292", customer: "Vikram Malhotra", method: "Cash on Delivery", amount: 3499, status: "Success", date: "2026-02-28 09:00 AM", gateway: "COD Manual" },
    { id: "tx-1004", orderNumber: "#NB10291", customer: "Siddharth Rao", method: "NetBanking (ICICI)", amount: 1899, status: "Failed", date: "2026-02-27 11:45 AM", gateway: "Razorpay" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">PAYMENT DASHBOARD & TRANSACTIONS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Monitor payment gateway transactions, UPI/Card success rates, refunds, and failed checkout attempts.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Successful Payments</div>
          <div className="text-2xl font-black text-emerald-400">₹8,144</div>
          <div className="text-[11px] text-emerald-400 font-bold">98.2% Gateway Success Rate</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Failed / Pending</div>
          <div className="text-2xl font-black text-rose-500">₹1,899</div>
          <div className="text-[11px] text-slate-500">1 Transaction Dropped</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Refunds Processed</div>
          <div className="text-2xl font-black text-white">₹0</div>
          <div className="text-[11px] text-slate-500">Zero Pending Refund Claims</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Tx ID</th>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-mono font-bold text-slate-400">{tx.id}</td>
                  <td className="p-4 font-bold text-white">{tx.orderNumber}</td>
                  <td className="p-4">{tx.customer}</td>
                  <td className="p-4 font-bold text-slate-200">{tx.method}</td>
                  <td className="p-4 text-slate-400">{tx.gateway}</td>
                  <td className="p-4 font-black text-white">₹{tx.amount.toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    {tx.status === "Success" ? (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        🟢 Success
                      </span>
                    ) : (
                      <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        🔴 Failed
                      </span>
                    )}
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
