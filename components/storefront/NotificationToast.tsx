"use client";

import React from "react";
import { useStore } from "@/lib/context";
import { CheckCircle2 } from "lucide-react";

export default function NotificationToast() {
  const { notification } = useStore();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-800 animate-bounce">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <span className="text-sm font-medium">{notification}</span>
    </div>
  );
}
