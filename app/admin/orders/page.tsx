"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db, Order } from "@/lib/db";
import { useStore } from "@/lib/context";
import { ShoppingBag, Truck, CheckCircle2, Search, Eye, X } from "lucide-react";

export default function AdminOrdersPage() {
  const { showNotification } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = () => {
    setOrders(db.getOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order["orderStatus"]) => {
    db.updateOrderStatus(orderId, newStatus);
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
    showNotification(`Updated order status to ${newStatus}`);
  };

  const filteredOrders = orders.filter(o => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">ORDER MANAGEMENT SYSTEM</h1>
        <p className="text-xs text-slate-400 font-medium">
          View customer orders, update shipping progress, and inspect invoices.
        </p>
      </div>

      {/* Search Header */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by Order # or Customer..."
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
              {filteredOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white">{ord.orderNumber}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl text-xs text-slate-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white">ORDER {selectedOrder.orderNumber}</h3>
                <p className="text-[11px] text-slate-400">Tracking: {selectedOrder.trackingNumber}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
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
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{item.productName}</div>
                      <div className="text-[10px] text-slate-500">{item.brand} • Qty: {item.quantity}</div>
                    </div>
                    <span className="font-black text-white">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-slate-800 flex justify-between text-sm font-black text-white">
              <span>Total Paid</span>
              <span className="text-rose-500">₹{selectedOrder.totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
