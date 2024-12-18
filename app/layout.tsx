import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Navbar } from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const lobster = localFont({
  src: "./fonts/Lobster.ttf",
  variable: "--font-lobster",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Postly",
  description: "Postly. For writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lobster.variable} antialiased`}>
        <Navbar />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
