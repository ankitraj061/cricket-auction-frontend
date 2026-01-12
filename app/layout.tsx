import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from '@/app/contexts/AuthContext';
import Link from "next/link";

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
  title: "Yello Premier League Auction",
  description: "Join the Ultimate Cricket Auction Experience - Build Your Dream Team!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {/* Mobile Responsive Registration Banner */}
          <div className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-center py-2.5 sm:py-3 px-3 sm:px-4 border-b-2 border-emerald-400 shadow-lg">
            <Link 
              href="https://docs.google.com/forms/d/e/1FAIpQLScrDvI-4BKaGXs-TX-nzev1ezipe26815-V2mYih5gvAmU3GQ/viewform?usp=publish-editor" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-base sm:text-lg hover:text-emerald-100 transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-left sm:text-center"
            >
              <span className="text-sm sm:text-base leading-tight">
                🚀 Register Now for Live Auctions!
              </span>
              <span className="text-xs sm:text-sm font-normal bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                Click Here
              </span>
            </Link>
          </div>
          
          {children}
          <Toaster richColors closeButton position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
