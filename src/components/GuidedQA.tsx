"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDocumentBySlug } from "@/data/documents";
import { formatKES, cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import type { Question } from "@/lib/types";
import {
  ArrowLeft, ArrowRight, CheckCircle2, FileText, Clock,
  ChevronDown, AlertCircle, Shield, Info,
} from "lucide-react";

function buildSchema(questions: Question[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const q of questions) {
    if (q.type === "checkbox") {
      shape[q.id] = z.array(z.string()).default([]);
    } else if (q.type === "toggle") {
      shape[q.id] = z.boolean().default(false);
    } else if (q.type === "number") {
      shape[q.id] = z.coerce.number().optional();
    } else if (q.required) {
      shape[q.id] = z.string().min(1, "This field is required");
    } else {
      shape[q.id] = z.string().optional();
    }
  }
  return z.object(shape);
}

function QuestionField({
  question,
  register,
  watch: watchFn,
  setValue,
  errors,
}: {
  question: Question;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  watch: (name: string) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
}) {
  const value = watchFn(question.id) as string | boolean | number | string[] | undefined;
  const error = errors[question.id];

  // Handle conditional visibility
  if (question.conditionalOn) {
    const depValue = watchFn(question.conditionalOn.questionId);
    if (depValue !== question.conditionalOn.value) return null;
  }

  const baseInputClass =
    "w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors";

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-brand-navy">
        {question.label}
        {question.required && <span className="text-brand-danger ml-0.5">*</span>}
      </label>

      {question.description && (
        <p className="text-xs text-brand-muted flex items-start gap-1">
          <Info className="h-3 w-3 mt-0.5 shrink-0" />
          {question.description}
        </p>
      )}

      {question.type === "text" && (
        <input
          type="text"
          {...register(question.id)}
          placeholder={question.placeholder}
          className={baseInputClass}
        />
      )}

      {question.type === "email" && (
        <input
          type="email"
          {...register(question.id)}
          placeholder={question.placeholder}
          className={baseInputClass}
        />
      )}

      {question.type === "phone" && (
        <input
          type="tel"
          {...register(question.id)}
          placeholder={question.placeholder}
          className={baseInputClass}
        />
      )}

      {question.type === "number" && (
        <input
          type="number"
          {...register(question.id)}
          placeholder={question.placeholder}
          min={question.validation?.min}
          max={question.validation?.max}
          className={baseInputClass}
        />
      )}

      {question.type === "date" && (
        <input
          type="date"
          {...register(question.id)}
          className={baseInputClass}
        />
      )}

      {question.type === "textarea" && (
        <textarea
          {...register(question.id)}
          placeholder={question.placeholder}
          rows={3}
          className={cn(baseInputClass, "resize-none")}
        />
      )}

      {question.type === "select" && (
        <div className="relative">
          <select
            {...register(question.id)}
            className={cn(baseInputClass, "appearance-none pr-10")}
          >
            <option value="">Select...</option>
            {question.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted pointer-events-none" />
        </div>
      )}

      {question.type === "radio" && (
        <div className="flex flex-wrap gap-2">
          {question.options?.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm cursor-pointer transition-colors",
                value === opt.value
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-brand-border bg-white text-foreground hover:border-brand-navy/30"
              )}
            >
              <input
                type="radio"
                {...register(question.id)}
                value={opt.value}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      {question.type === "checkbox" && (
        <div className="flex flex-wrap gap-2">
          {question.options?.map((opt) => {
            const isChecked = Array.isArray(value) && value.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm cursor-pointer transition-colors",
                  isChecked
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-border bg-white text-foreground hover:border-brand-navy/30"
                )}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={isChecked}
                  onChange={(e) => {
                    const current = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      setValue(question.id, [...current, opt.value], { shouldValidate: true });
                    } else {
                      setValue(question.id, current.filter((v: string) => v !== opt.value), { shouldValidate: true });
                    }
                  }}
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      )}

      {question.type === "toggle" && (
        <button
          type="button"
          onClick={() => setValue(question.id, !value, { shouldValidate: true })}
          className="flex items-center gap-3"
        >
          <div className={cn("toggle-switch", value && "active")} />
          <span className="text-sm text-brand-muted">
            {value ? "Yes" : "No"}
          </span>
        </button>
      )}

      {error && (
        <p className="text-xs text-brand-danger flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {String(error.message || "This field is required")}
        </p>
      )}
    </div>
  );
}

export default function ReviewPage({ slug }: { slug: string }) {
  const router = useRouter();
  const doc = getDocumentBySlug(slug);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const groups = useMemo(() => {
    if (!doc) return [];
    const groupMap = new Map<string, Question[]>();
    for (const q of doc.questions) {
      const group = q.group || "General";
      if (!groupMap.has(group)) groupMap.set(group, []);
      groupMap.get(group)!.push(q);
    }
    return Array.from(groupMap.entries());
  }, [doc]);

  const currentGroup = groups[currentGroupIndex];
  const isLastGroup = currentGroupIndex === groups.length - 1;
  const isFirstGroup = currentGroupIndex === 0;

  const schema = useMemo(() => {
    if (!doc) return z.object({});
    return buildSchema(doc.questions);
  }, [doc]);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // Cast watch to allow dynamic field access
  const watchTyped = watch as (name: string) => unknown;

  if (!doc) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-brand-muted">Document not found.</p>
      </div>
    );
  }

  const onSubmit = async () => {
    const allFields = watch();

    if (isLastGroup) {
      const visibleFieldIds = doc.questions
        .filter((q) => {
          if (!q.conditionalOn) return true;
          const depValue = allFields[q.conditionalOn.questionId];
          return depValue === q.conditionalOn.value;
        })
        .map((q) => q.id);
      const isValid = await trigger(visibleFieldIds as any);
      if (!isValid) return;
      setShowSummary(true);
    } else {
      const currentFieldIds = currentGroup?.[1].map((q) => q.id) || [];
      const isValid = await trigger(currentFieldIds as any);
      if (!isValid) return;
      setCurrentGroupIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToCheckout = () => {
    const answers = watch();
    sessionStorage.setItem(`ldk-answers-${slug}`, JSON.stringify(answers));
    router.push(`/documents/${slug}/checkout`);
  };

  const progress = ((currentGroupIndex + 1) / groups.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-brand-border sticky top-16 z-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link
              href={`/documents/${slug}`}
              className="text-sm text-brand-muted hover:text-brand-navy flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {doc.name}
            </Link>
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <Clock className="h-3.5 w-3.5" />
              {doc.estimatedTime}
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-navy rounded-full animate-progress transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-brand-navy">
              {currentGroupIndex + 1}/{groups.length}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {showSummary ? (
          /* Summary View */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-success/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-brand-success" />
              </div>
              <h1 className="text-2xl font-bold text-brand-navy">Review Your Answers</h1>
              <p className="text-sm text-brand-muted mt-2">
                Please review your responses before proceeding to checkout
              </p>
            </div>

            {groups.map(([groupName, questions]) => (
              <div key={groupName} className="rounded-xl border border-brand-border bg-white overflow-hidden">
                <div className="px-6 py-3 bg-brand-navy/5 border-b border-brand-border">
                  <h3 className="font-semibold text-brand-navy text-sm">{groupName}</h3>
                </div>
                <div className="px-6 py-4 space-y-3">
                  {questions.map((q) => {
                    const val = watchTyped(q.id);
                    if (val === undefined || val === "" || val === false) return null;
                    return (
                      <div key={q.id} className="flex justify-between text-sm">
                        <span className="text-brand-muted">{q.label}</span>
                        <span className="font-medium text-brand-navy text-right max-w-[60%]">
                          {Array.isArray(val) ? val.join(", ") : String(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Price Summary */}
            <div className="rounded-xl border border-brand-border bg-white p-6">
              <h3 className="font-semibold text-brand-navy mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{doc.name}</span>
                  <span className="font-medium">{formatKES(doc.price)}</span>
                </div>
                <div className="border-t border-brand-border pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-brand-navy">{formatKES(doc.price)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-brand-gold/10 border border-brand-gold/20">
                <p className="text-xs text-brand-navy flex items-start gap-2">
                  <Shield className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  {BRAND.disclaimer}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSummary(false);
                  setCurrentGroupIndex(groups.length - 1);
                }}
                className="flex-1 rounded-lg border-2 border-brand-border py-3 text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-colors"
              >
                Edit Answers
              </button>
              <button
                onClick={goToCheckout}
                className="flex-1 rounded-lg bg-brand-gold py-3 text-sm font-semibold text-brand-navy hover:bg-brand-gold-light transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="inline ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Question Form */
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-brand-navy">{currentGroup?.[0]}</h2>
              <p className="text-sm text-brand-muted mt-1">
                Step {currentGroupIndex + 1} of {groups.length}
              </p>
            </div>

            <div className="space-y-6">
              {currentGroup?.[1].map((question) => (
                <QuestionField
                  key={question.id}
                  question={question}
                  register={register}
                  watch={watchTyped}
                  setValue={setValue}
                  errors={errors}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              {!isFirstGroup && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentGroupIndex((i) => i - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex-1 rounded-lg border-2 border-brand-border py-3 text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="inline mr-2 h-4 w-4" />
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="flex-1 rounded-lg bg-brand-navy py-3 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors"
              >
                {isLastGroup ? (
                  <>
                    Review Answers
                    <CheckCircle2 className="inline ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="inline ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
