"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getDocumentBySlug } from "@/data/documents";
import { formatKES } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import {
  ArrowLeft, CreditCard, Smartphone, Building2,
  CheckCircle2, Shield, Loader2, AlertCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const doc = getDocumentBySlug(slug);

  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "bank">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [reviewRequested, setReviewRequested] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(`nkm-answers-${slug}`);
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

  const totalAmount = reviewRequested ? doc.reviewPrice : doc.price;

  const handleMpesaPayment = async () => {
    if (!phoneNumber || !customerName) {
      setError("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const response = await fetch("/api/payment/mpesa", {
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
          reviewRequested,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store order details
        sessionStorage.setItem("nkm-order", JSON.stringify({
          orderId: data.orderId,
          documentSlug: slug,
          documentName: doc.name,
          answers,
          customerName,
          customerEmail,
          phoneNumber,
          amount: totalAmount,
          reviewRequested,
          paymentMethod: "mpesa",
          paymentReference: data.checkoutRequestId,
        }));
        router.push(`/documents/${slug}/checkout/success`);
      } else {
        setError(data.message || "Payment initiation failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankPayment = async () => {
    if (!customerName || !customerEmail) {
      setError("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Create order via API
      const response = await fetch("/api/payment/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: "bank_transfer",
          amount: totalAmount,
          documentSlug: slug,
          documentName: doc.name,
          answers,
          customerName,
          customerEmail,
          reviewRequested,
        }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("nkm-order", JSON.stringify({
          orderId: data.orderId,
          documentSlug: slug,
          documentName: doc.name,
          answers,
          customerName,
          customerEmail,
          amount: totalAmount,
          reviewRequested,
          paymentMethod: "bank",
          status: "pending_payment",
        }));
        router.push(`/documents/${slug}/checkout/success`);
      } else {
        setError(data.message || "Failed to create order. Please try again.");
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
        {/* Back Link */}
        <Link
          href={`/documents/${slug}/review`}
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

          {/* Review Toggle */}
          <div className="mt-4 pt-4 border-t border-brand-border">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={reviewRequested}
                onChange={(e) => setReviewRequested(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-brand-border text-brand-navy focus:ring-brand-gold"
              />
              <div>
                <span className="text-sm font-medium text-brand-navy">
                  Add Advocate Review (+{formatKES(doc.reviewPrice - doc.price)})
                </span>
                <p className="text-xs text-brand-muted mt-0.5">
                  An advocate will review your document before it&apos;s released
                </p>
              </div>
            </label>
          </div>

          <div className="mt-4 pt-4 border-t border-brand-border">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-brand-navy text-lg">{formatKES(totalAmount)}</span>
            </div>
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

        {/* Payment Method */}
        <div className="rounded-xl border border-brand-border bg-white p-6 mb-6">
          <h2 className="font-semibold text-brand-navy mb-4">Payment Method</h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setPaymentMethod("mpesa")}
              className={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                paymentMethod === "mpesa"
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-brand-border bg-white text-foreground hover:border-brand-navy/30"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              M-Pesa
            </button>
            <button
              onClick={() => setPaymentMethod("bank")}
              className={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                paymentMethod === "bank"
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-brand-border bg-white text-foreground hover:border-brand-navy/30"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Bank Transfer
            </button>
          </div>

          {paymentMethod === "mpesa" && (
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
          )}

          {paymentMethod === "bank" && (
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-50 p-4 text-sm">
                <p className="font-medium text-brand-navy mb-2">Bank Transfer Details:</p>
                <div className="space-y-1 text-brand-muted">
                  <p>Bank: KCB Bank Kenya</p>
                  <p>Account Name: NKM Advocates</p>
                  <p>Account Number: 1234567890</p>
                  <p>Branch: Westlands</p>
                  <p className="font-medium text-brand-navy mt-2">
                    Amount: {formatKES(totalAmount)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBankPayment}
                disabled={isProcessing}
                className="w-full rounded-lg bg-brand-gold py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  "Confirm Bank Transfer Order"
                )}
              </button>

              <p className="text-xs text-brand-muted text-center">
                Your document will be generated after payment confirmation
              </p>
            </div>
          )}
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
