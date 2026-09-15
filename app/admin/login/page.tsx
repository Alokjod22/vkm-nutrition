"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/context";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useStore();

  const [email, setEmail] = useState("admin@vkmnutrition.in");
  const [password, setPassword] = useState("admin123");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(email);
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-rose-600 to-amber-500 rounded-2xl mx-auto flex items-center justify-center text-white font-black text-2xl shadow-lg">
            V
          </div>
          <h1 className="text-2xl font-black tracking-tight">VKM NUTRITION ADMIN</h1>
          <p className="text-xs text-slate-400 font-medium">Enter your credentials to access the management portal.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <span>LOGIN TO ADMIN PORTAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500 font-semibold flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Shared Database & Inventory Realtime Sync</span>
        </div>
      </div>
    </div>
  );
}
