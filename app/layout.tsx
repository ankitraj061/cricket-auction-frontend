import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from '@/app/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  weight: ["100","200","300","400","500","600","700","800","900"],
});
  
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "Auction App",
  description: "A complete auction app for cricket teams",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
        {children}
        <Toaster richColors closeButton position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
