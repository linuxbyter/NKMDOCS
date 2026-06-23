"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, Mail, Download, FileText, ArrowRight,
  Clock, Shield, Loader2,
} from "lucide-react";

interface OrderData {
  orderId: string;
  documentSlug?: string;
  documentName: string;
  amount: number;
  customerEmail: string;
}

export default function StatusPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<OrderData | null>(null);
  const [status, setStatus] = useState<string>("pending_payment");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("ldk-order");
    if (stored) {
      setOrder(JSON.parse(stored));
    }

    const poll = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setStatus(data.order.status);
          if (data.order.downloadUrl) {
            setDownloadUrl(data.order.downloadUrl);
            setPolling(false);
            clearInterval(poll);
          }
          if (data.order.status === "paid" || data.order.status === "ready" || data.order.status === "delivered") {
            setPolling(false);
            clearInterval(poll);
          }
        }
      } catch {
        // silent — retry on next interval
      }
    }, 3000);

    return () => clearInterval(poll);
  }, [orderId]);

  const docSlug = order?.documentSlug || "";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-success/10 mb-6">
            {status === "paid" || status === "ready" || status === "delivered" ? (
              <CheckCircle2 className="h-10 w-10 text-brand-success" />
            ) : (
              <Loader2 className="h-10 w-10 text-brand-gold animate-spin" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-brand-navy">
            {status === "paid" || status === "ready" || status === "delivered"
              ? "Payment Received!"
              : "Processing Your Payment..."}
          </h1>
          <p className="text-brand-muted mt-2 max-w-md mx-auto">
            {status === "paid" || status === "ready" || status === "delivered"
              ? "Your document is being generated and will be emailed to you shortly."
              : polling
              ? "Waiting for payment confirmation from M-Pesa..."
              : "Your document is ready."}
          </p>
        </div>

        {/* Order Details */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4">Order Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-muted">Order ID</span>
              <span className="font-mono font-medium text-brand-navy">{orderId}</span>
            </div>
            {order && (
              <>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Document</span>
                  <span className="font-medium text-brand-navy">{order.documentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Amount Paid</span>
                  <span className="font-medium text-brand-navy">
                    KES {order.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Status</span>
                  <span className="font-medium capitalize text-brand-navy">{status.replace("_", " ")}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Download */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="block w-full rounded-lg bg-brand-gold text-center py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors mb-6"
          >
            <Download className="inline mr-2 h-4 w-4" />
            Download Document
          </a>
        )}

        {/* What Happens Next */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4">What Happens Next</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-success text-white shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-navy">Document Generated</p>
                <p className="text-xs text-brand-muted">Your customized document has been created</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-navy">Email Sent</p>
                <p className="text-xs text-brand-muted">
                  Check your email at {order?.customerEmail || "your inbox"} for the download link
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white shrink-0">
                <Download className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-navy">Download & Sign</p>
                <p className="text-xs text-brand-muted">
                  Download, print, and sign your document. The link expires in 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 rounded-lg border-2 border-brand-border py-3 text-sm font-semibold text-brand-navy hover:bg-white text-center transition-colors"
          >
            Browse More Documents
          </Link>
          {docSlug && (
            <Link
              href={`/documents/${docSlug}`}
              className="flex-1 rounded-lg bg-brand-navy py-3 text-sm font-semibold text-white hover:bg-brand-navy-light text-center transition-colors"
            >
              View Document Details
            </Link>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 p-4">
          <p className="text-xs text-brand-navy flex items-start gap-2">
            <Shield className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
            This is a template document, not legal advice. For complex matters, please consult a qualified legal professional.
          </p>
        </div>
      </div>
    </div>
  );
}
