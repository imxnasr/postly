import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Lobster } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/Sonner";

const lobster = Lobster({
  variable: "--font-lobster",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Postly",
  description:
    "Postly is a modern blogging platform built with Next.js, TypeScript, and Drizzle ORM. It features a sleek design, user authentication, and a rich text editor for creating and managing blog posts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lobster.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster position="top-right" richColors />
          <Navbar />
          <div className="container">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
