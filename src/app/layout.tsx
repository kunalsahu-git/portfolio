import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const fontBody = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
});

const fontHeadline = Josefin_Sans({
  subsets: ["latin"],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: "Anurag - Front-End Developer",
  description: "A modern, interactive portfolio for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth dark">
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable)}>
        <Header />
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
