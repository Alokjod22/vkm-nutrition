"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/context";
import { db, AdminNotification } from "@/lib/db";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Tag,
  LogOut,
  ExternalLink,
  Bell,
  Check,
  ChevronRight,
  Clock,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, adminLogout } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    const loadNotifs = () => setNotifications(db.getAdminNotifications());
    loadNotifs();
    const interval = setInterval(loadNotifs, 3000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    db.markAllNotificationsRead();
    setNotifications(db.getAdminNotifications());
  };

  const handleNotificationClick = (notif: AdminNotification) => {
    db.markNotificationRead(notif.id);
    setNotifications(db.getAdminNotifications());
    setIsNotifOpen(false);
    router.push(`/admin/orders?orderId=${notif.orderId}`);
  };

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
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between relative z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
              Real-Time Database Active
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Live Order Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl relative transition-colors flex items-center gap-2 font-bold"
                title="Live Order Alerts"
              >
                <Bell className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Order Alerts</span>
                {unreadCount > 0 && (
                  <span className="bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-rose-500" />
                      <span className="font-extrabold text-white text-xs uppercase tracking-wider">
                        Live Order Alerts ({notifications.length})
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-800 max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-500">
                        No notifications received yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-4 hover:bg-slate-800/80 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                            !n.isRead ? "bg-rose-950/20 border-l-2 border-rose-500" : ""
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{n.title}</span>
                              {!n.isRead && (
                                <span className="w-2 h-2 rounded-full bg-rose-500" />
                              )}
                            </div>
                            <p className="text-xs text-slate-400 leading-snug">{n.message}</p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(n.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

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
