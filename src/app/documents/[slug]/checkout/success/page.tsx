"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, Mail, Download, FileText, ArrowRight,
  Clock, Shield,
} from "lucide-react";

interface OrderDetails {
  orderId: string;
  documentName: string;
  amount: number;
  paymentMethod: string;
  customerEmail: string;
  reviewRequested: boolean;
}

export default function SuccessPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("ldk-order");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-success/10 mb-6">
            <CheckCircle2 className="h-10 w-10 text-brand-success" />
          </div>
          <h1 className="text-3xl font-bold text-brand-navy">
            Payment Received!
          </h1>
          <p className="text-brand-muted mt-2 max-w-md mx-auto">
            Your document is being generated and will be emailed to you shortly.
          </p>
        </div>

        {/* Order Details */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4">Order Details</h2>
          <div className="space-y-3 text-sm">
            {order && (
              <>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Order ID</span>
                  <span className="font-mono font-medium text-brand-navy">{order.orderId}</span>
                </div>
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
                  <span className="text-brand-muted">Payment Method</span>
                  <span className="font-medium text-brand-navy capitalize">
                    M-Pesa
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

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
                <p className="text-xs text-brand-muted">
                  Your customized document has been created
                </p>
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
          <Link
            href={`/documents/${slug}`}
            className="flex-1 rounded-lg bg-brand-navy py-3 text-sm font-semibold text-white hover:bg-brand-navy-light text-center transition-colors"
          >
            View Document Details
          </Link>
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
