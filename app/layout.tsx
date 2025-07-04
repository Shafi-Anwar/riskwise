import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RemoveRisk.ai",
  description: "AI-powered risk analysis and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Load Puter script before your app renders */}
        <Script src="https://js.puter.com/v2/" strategy="beforeInteractive" />

        {/* ✅ Clerk Provider wraps the app */}
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
