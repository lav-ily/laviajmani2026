import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { SITE_TAGLINE } from "@/lib/hero-content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lavi Ajmani — Product Designer",
  description: SITE_TAGLINE,
  openGraph: {
    title: "Lavi Ajmani — Product Designer",
    description: SITE_TAGLINE,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
