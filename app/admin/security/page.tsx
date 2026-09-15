"use client";

import React from "react";
import { ShieldAlert, Key, Smartphone, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function AdminSecurityPage() {
  const loginHistory = [
    { ip: "103.21.124.8", device: "Chrome / Windows 11", location: "New Delhi, IN", status: "Successful Login", date: "2026-03-15 10:42 PM" },
    { ip: "103.21.124.8", device: "Chrome / Windows 11", location: "New Delhi, IN", status: "Successful Login", date: "2026-03-14 04:15 PM" },
    { ip: "185.220.101.4", device: "Unknown Client", location: "Frankfurt, DE", status: "Failed Attempt (Blocked)", date: "2026-03-13 02:10 AM" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">SECURITY CENTER & SESSION LOGS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Monitor active admin sessions, failed login attempts, IP rate limiting, and password policy settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">2FA Status</div>
          <div className="text-lg font-black text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Enabled (TOTP Authenticator)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Active Sessions</div>
          <div className="text-lg font-black text-white">1 Active Web Session</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Rate Limiting</div>
          <div className="text-lg font-black text-emerald-400">Strict (5 Max Attempts / Min)</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 font-bold text-white text-xs uppercase">
          Recent Admin Login Audit Log
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">IP Address</th>
                <th className="p-4">Device / OS</th>
                <th className="p-4">Location</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {loginHistory.map((h, i) => (
                <tr key={i} className="hover:bg-slate-800/50">
                  <td className="p-4 font-mono font-bold text-white">{h.ip}</td>
                  <td className="p-4">{h.device}</td>
                  <td className="p-4 text-slate-400">{h.location}</td>
                  <td className="p-4 text-slate-400">{h.date}</td>
                  <td className="p-4">
                    {h.status.includes("Successful") ? (
                      <span className="text-emerald-400 font-bold">🟢 {h.status}</span>
                    ) : (
                      <span className="text-rose-500 font-bold">🔴 {h.status}</span>
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
