import Link from "next/link";
import { FileText, ShoppingBag, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-brand-navy text-white shrink-0 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Link href="/admin/orders" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold">
              <FileText className="h-4 w-4 text-brand-navy" />
            </div>
            <div>
              <div className="text-sm font-bold">LegalDocsKE</div>
              <div className="text-[10px] text-slate-400">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href="/admin/templates"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <FileText className="h-4 w-4" />
            Templates
          </Link>
        </nav>

        <div className="p-3 border-t border-white/10">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
