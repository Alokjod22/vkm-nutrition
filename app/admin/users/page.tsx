"use client";

import React, { useState, useEffect } from "react";
import { db, AdminTeamUser } from "@/lib/db";
import { useStore } from "@/lib/context";
import { Shield, Plus, UserCheck, Lock, Edit3, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const { showNotification } = useStore();
  const [team, setTeam] = useState<AdminTeamUser[]>([]);

  useEffect(() => {
    setTeam(db.getAdminUsers());
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">ADMIN USERS & ROLE-BASED ACCESS (RBAC)</h1>
          <p className="text-xs text-slate-400 font-medium">
            Manage admin team members, enforce granular permission scopes, and monitor active sessions.
          </p>
        </div>

        <button className="px-5 py-3 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span>INVITE ADMIN MEMBER</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Admin User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {team.map(usr => (
                <tr key={usr.id} className="hover:bg-slate-800/50">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                      {usr.name.charAt(0)}
                    </div>
                    <span>{usr.name}</span>
                  </td>
                  <td className="p-4 text-slate-300">{usr.email}</td>
                  <td className="p-4">
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-[10px] font-bold">
                      {usr.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{usr.lastActive}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {usr.status}
                    </span>
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
