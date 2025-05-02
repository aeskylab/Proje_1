import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CompareBanner from "@/components/CompareBanner/CompareBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KarşılaştırUrun - Ürün Karşılaştırma Platformu",
  description: "Ürünleri karşılaştırarak en uygun ve doğru kararı verin. Hızlı ve kolay karşılaştırma deneyimi.",
  icons: [
    {
      rel: 'icon',
      url: '/logo.png',
      type: 'image/png'
    },
    {
      rel: 'apple-touch-icon',
      url: '/logo.png',
      type: 'image/png'
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CompareBanner />
      </body>
    </html>
  );
}
