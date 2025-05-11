import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/Header";
import ParticlesBackground from "../components/ParticlesBackground";
import { LanguageProvider } from "../context/LanguageContext";
import Footer from "../components/Footer"; // ✅ ترويسة منفصلة كمكون عميل

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightHub",
  description: "ISquad Stats platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* 🎨 خلفية بتدرجات ألوان فضائية */}
          <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: `linear-gradient(160deg, #0f0c29, #302b63, #24243e, #ff5f6d, #ffc371)`,
              backgroundSize: "200% 200%",
              animation: "gradientMove 20s ease infinite",
            }}
          />

          {/* ✨ نجوم متحركة */}
          <ParticlesBackground />

          {/* 🔝 رأس الموقع */}
          <Header />

          {/* 📄 المحتوى */}
          {children}

          {/* ✅ ترويسة متزامنة مع اللغة */}
          <Footer />
        </body>
      </LanguageProvider>
    </html>
  );
}
