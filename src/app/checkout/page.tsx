"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getDocumentBySlug } from "@/data/documents";
import { formatKES } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import {
  ArrowLeft, CreditCard, Smartphone,
  Shield, Loader2, AlertCircle, Mic,
} from "lucide-react";

const TONE_OPTIONS = [
  { value: "formal", label: "Formal (Standard legal language)" },
  { value: "simple", label: "Simple (Plain language, easy to understand)" },
  { value: "firm", label: "Firm (Strong, assertive tone)" },
  { value: "casual", label: "Casual (Friendly but professional)" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("doc") || "";
  const doc = getDocumentBySlug(slug);

  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [paymentMethod, setPaymentMethod] = useState<"mpesa">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [tone, setTone] = useState("formal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(`ldk-answers-${slug}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnswers(parsed);
      if (parsed.landlord_name || parsed.creditor_name || parsed.party_a_name) {
        setCustomerName(parsed.landlord_name || parsed.creditor_name || parsed.party_a_name || "");
      }
      if (parsed.landlord_email || parsed.creditor_email) {
        setCustomerEmail(parsed.landlord_email || parsed.creditor_email || "");
      }
    }
  }, [slug]);

  if (!doc) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-brand-muted">Document not found.</p>
      </div>
    );
  }

  const totalAmount = doc.price;

  const handleMpesaPayment = async () => {
    if (!phoneNumber || !customerName || !customerEmail) {
      setError("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          amount: totalAmount,
          documentSlug: slug,
          documentName: doc.name,
          answers,
          customerName,
          customerEmail,
          tone,
          reviewRequested: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("ldk-order", JSON.stringify({
          orderId: data.orderId,
          documentSlug: slug,
          documentName: doc.name,
          answers,
          customerName,
          customerEmail,
          phoneNumber,
          amount: totalAmount,
          tone,
          reviewRequested: false,
          paymentMethod: "mpesa",
          paymentReference: data.checkoutRequestId,
        }));
        router.push(`/checkout/status/${data.orderId}`);
      } else {
        setError(data.message || "Payment initiation failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <Link
          href={`/documents/${slug}/generate`}
          className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-navy mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to questions
        </Link>

        <h1 className="text-2xl font-bold text-brand-navy mb-6">Checkout</h1>

        {/* Order Summary */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-3">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>{doc.name}</span>
            <span className="font-medium">{formatKES(doc.price)}</span>
          </div>

          <div className="mt-4 pt-4 border-t border-brand-border">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-brand-navy text-lg">{formatKES(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Tone Selection */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4 flex items-center gap-2">
            <Mic className="h-4 w-4 text-brand-gold" />
            Document Tone
          </h2>
          <p className="text-sm text-brand-muted mb-4">
            Choose the tone and style of your document. This affects how the content reads.
          </p>
          <div className="space-y-2">
            {TONE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  tone === opt.value
                    ? "border-brand-gold bg-brand-gold/5"
                    : "border-brand-border hover:border-brand-muted"
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={opt.value}
                  checked={tone === opt.value}
                  onChange={(e) => setTone(e.target.value)}
                  className="accent-brand-gold"
                />
                <span className="text-sm text-brand-navy">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4">Your Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">
                Full Name <span className="text-brand-danger">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. John Kamau"
                className="w-full rounded-lg border border-brand-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">
                Email Address <span className="text-brand-danger">*</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full rounded-lg border border-brand-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <p className="text-xs text-brand-muted mt-1">
                Your document will be sent to this email
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method - M-Pesa Only */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4">Payment</h2>

          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-brand-navy bg-brand-navy text-white p-3 text-sm font-medium">
              <Smartphone className="h-4 w-4" />
              M-Pesa
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">
                M-Pesa Phone Number <span className="text-brand-danger">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className="w-full rounded-lg border border-brand-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <p className="text-xs text-brand-muted mt-1">
                You&apos;ll receive an STK push to complete payment
              </p>
            </div>

            <button
              onClick={handleMpesaPayment}
              disabled={isProcessing}
              className="w-full rounded-lg bg-brand-gold py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay {formatKES(totalAmount)} via M-Pesa
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-brand-danger/10 border border-brand-danger/20 p-4 mb-6">
            <p className="text-sm text-brand-danger flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-lg bg-brand-gold/10 border border-brand-gold/20 p-4">
          <p className="text-xs text-brand-navy flex items-start gap-2">
            <Shield className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
            {BRAND.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-muted" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
