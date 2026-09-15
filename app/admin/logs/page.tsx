"use client";

import React, { useState, useEffect } from "react";
import { db, AuditLog } from "@/lib/db";
import { Clock, Search, Shield, Filter } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLogs(db.getAuditLogs());
  }, []);

  const filteredLogs = logs.filter(l => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.actor.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">SYSTEM AUDIT TRAIL LOGS</h1>
        <p className="text-xs text-slate-400 font-medium">
          Immutable event log tracking all administrative inventory adjustments, price edits, order status updates, and user modifications.
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search audit logs by admin or action..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Admin Actor</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/50">
                  <td className="p-4 text-slate-400 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="p-4 font-bold text-white">{log.actor}</td>
                  <td className="p-4 font-bold text-rose-400">{log.action}</td>
                  <td className="p-4 font-semibold text-slate-200">{log.target}</td>
                  <td className="p-4 text-slate-400">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
