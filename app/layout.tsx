import "./globals.css";
import React from "react";
import { StoreProvider } from "@/lib/context";
import CartDrawer from "@/components/storefront/CartDrawer";
import NotificationToast from "@/components/storefront/NotificationToast";

export const metadata = {
  title: "VKM Nutrition — Premium Authentic Nutrition Marketplace",
  description: "Shop genuine MuscleBlaze, Pintola & Alpino products at wholesale prices. Whey protein, creatine, high protein oats, muesli & peanut butter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <StoreProvider>
          <NotificationToast />
          <CartDrawer />
          <main className="flex-1">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
