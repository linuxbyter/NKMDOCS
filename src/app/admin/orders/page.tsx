"use client";

import { useState, useEffect } from "react";
import { formatKES } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";

interface Order {
  id: string;
  document_name: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  status: string;
  payment_method: string;
  payment_reference: string;
  review_requested: boolean;
  created_at: string;
  download_url: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "bg-amber-100 text-amber-800",
  paid: "bg-blue-100 text-blue-800",
  generating: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-green-100 text-green-800",
  review_pending: "bg-purple-100 text-purple-800",
  approved: "bg-green-100 text-green-800",
  payment_failed: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Use a simple API to fetch all orders
      // For MVP, we'll query the DB directly through a server action
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-brand-muted" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Orders</h1>
          <p className="text-sm text-brand-muted">{orders.length} total orders</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-64 rounded-lg border border-brand-border pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
      </div>

      <div className="rounded-xl border border-brand-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-brand-border">
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Document</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Status</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-brand-muted">
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-brand-navy">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-brand-navy">{order.customer_name}</div>
                      <div className="text-xs text-brand-muted">{order.customer_email}</div>
                    </td>
                    <td className="px-4 py-3 text-brand-navy">{order.document_name}</td>
                    <td className="px-4 py-3 font-medium">{formatKES(order.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-800"}`}>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-brand-muted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
