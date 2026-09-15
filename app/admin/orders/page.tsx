"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { db, Order } from "@/lib/db";
import { useStore } from "@/lib/context";
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Search,
  Eye,
  X,
  Download,
  Printer,
  FileText,
  Clock
} from "lucide-react";

function AdminOrdersContent() {
  const searchParams = useSearchParams();
  const highlightedOrderId = searchParams?.get("orderId") || "";

  const { showNotification } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = () => {
    const list = db.getOrders();
    setOrders(list);
    if (highlightedOrderId) {
      const match = list.find(o => o.id === highlightedOrderId);
      if (match) setSelectedOrder(match);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [highlightedOrderId]);

  const handleStatusChange = (orderId: string, newStatus: Order["orderStatus"]) => {
    db.updateOrderStatus(orderId, newStatus);
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
    showNotification(`Updated order status to ${newStatus}`);
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ["Order Number", "Date", "Customer Name", "Email", "Phone", "Total Amount", "Payment Method", "Payment Status", "Order Status"];
    const rows = orders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      o.email,
      o.phone,
      o.totalAmount,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vkm_nutrition_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Exported orders CSV report!");
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const filteredOrders = orders.filter(o => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header & CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">ORDER MANAGEMENT SYSTEM</h1>
          <p className="text-xs text-slate-400 font-medium">
            View customer orders, update shipping progress, and inspect invoices.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>EXPORT ORDERS CSV</span>
        </button>
      </div>

      {/* Search Header */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by Order #, Customer, Email, Phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Shipping Status</th>
                <th className="p-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredOrders.map(ord => {
                const isTargeted = ord.id === highlightedOrderId;
                return (
                  <tr key={ord.id} className={`hover:bg-slate-800/50 ${isTargeted ? "bg-rose-950/20 font-bold" : ""}`}>
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      {ord.orderNumber}
                      {isTargeted && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-500">{ord.email}</div>
                    </td>
                    <td className="p-4 font-black text-white">₹{ord.totalAmount.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-emerald-400 font-bold">{ord.paymentMethod}</td>
                    <td className="p-4">
                      <select
                        value={ord.orderStatus}
                        onChange={e => handleStatusChange(ord.id, e.target.value as Order["orderStatus"])}
                        className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 text-rose-400 rounded-xl font-bold text-xs focus:outline-none"
                      >
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                        title="Inspect Order"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Printable Tax Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl text-xs text-slate-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white">TAX INVOICE {selectedOrder.orderNumber}</h3>
                <p className="text-[11px] text-slate-400">Tracking: {selectedOrder.trackingNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintInvoice}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl flex items-center gap-1 font-bold text-[11px]"
                  title="Print Packing Slip / Tax Invoice"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Address */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="font-bold text-white text-xs">Customer Shipping Info</div>
              <div>{selectedOrder.customerName} ({selectedOrder.phone})</div>
              <div>{selectedOrder.email}</div>
              <div className="text-slate-400">
                {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <div className="font-bold text-white text-xs">Itemized Invoice Products</div>
              <div className="divide-y divide-slate-800">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{item.productName}</div>
                      <div className="text-[10px] text-slate-500">
                        {item.brand} {item.size ? `• ${item.size}` : ""} {item.flavour ? `• ${item.flavour}` : ""} • Qty: {item.quantity}
                      </div>
                    </div>
                    <span className="font-black text-white">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-rose-400 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{selectedOrder.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Shipping Fee</span>
                <span>{selectedOrder.deliveryFee === 0 ? "FREE" : `₹${selectedOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Total Amount Paid</span>
                <span className="text-rose-500">₹{selectedOrder.totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 text-xs font-bold">Loading Order Management...</div>}>
      <AdminOrdersContent />
    </Suspense>
  );
}
