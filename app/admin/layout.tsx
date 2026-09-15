"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/context";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Tag,
  BarChart3,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { adminUser, adminLogout } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If on login page, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Inventory", href: "/admin/inventory", icon: Boxes },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Coupons & Banners", href: "/admin/marketing", icon: Tag },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden lg:flex">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center font-black text-white text-lg">
              V
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-white leading-none">
                VKM <span className="text-rose-500">NUTRITION</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Admin Control Panel
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            {navLinks.map(link => {
              const IconComp = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-colors"
          >
            <span>View Live Customer Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs">
                A
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Admin</div>
                <div className="text-[10px] text-slate-500 truncate max-w-[100px]">
                  {adminUser?.email || "admin@vkmnutrition.in"}
                </div>
              </div>
            </div>

            <button
              onClick={adminLogout}
              className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
              Real-Time Shared Database Connection Active
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 hidden sm:inline">Storefront Status:</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live & Syncing
            </span>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
