import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Commons/Header";
import Footer from "@/components/Commons/Footer";
import { Providers } from "./provides";
import { ToastProvider } from "@/lib/providers/toast-provider";
import { AppInitializer } from "@/lib/providers/app-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Rental App",
  description: "Louez facilement une voiture en ligne 🚗",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-[#FFF5E5]`}
      >
        <Header />
        <ToastProvider />
        <AppInitializer />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
