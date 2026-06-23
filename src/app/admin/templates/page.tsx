"use client";

import { documents } from "@/data/documents";
import { formatKES } from "@/lib/utils";
import { FileText } from "lucide-react";

export default function AdminTemplatesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Templates</h1>
        <p className="text-sm text-brand-muted">{documents.length} templates in catalogue</p>
      </div>

      <div className="rounded-xl border border-brand-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-brand-border">
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Template</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Category</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Price</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Questions</th>
                <th className="text-left px-4 py-3 font-medium text-brand-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {documents.map((doc) => (
                <tr key={doc.slug} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-brand-muted" />
                      <span className="font-medium text-brand-navy">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-brand-muted">{doc.slug}</td>
                  <td className="px-4 py-3 capitalize text-brand-navy">{doc.category}</td>
                  <td className="px-4 py-3 font-medium">{formatKES(doc.price)}</td>
                  <td className="px-4 py-3 text-brand-navy">{doc.questions.length}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium">
                      Published
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
