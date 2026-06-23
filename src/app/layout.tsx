import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NKM Documents | Advocate-Drafted Legal Documents",
  description:
    "Customize advocate-drafted legal documents in minutes. Answer simple questions, get a professionally formatted document ready to sign. Tenancy agreements, NDAs, demand letters & more.",
  keywords: [
    "legal documents Kenya",
    "tenancy agreement Kenya",
    "NDA Kenya",
    "demand letter Kenya",
    "legal templates",
    "advocate drafted",
    "NKM advocates",
  ],
  openGraph: {
    title: "NKM Documents | Advocate-Drafted Legal Documents",
    description:
      "Customize advocate-drafted legal documents in minutes. Answer simple questions, get a professionally formatted document ready to sign.",
    url: "https://documents.nkm-advocates.co.ke",
    siteName: "NKM Documents",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
