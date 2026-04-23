import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lavi Ajmani — Product Designer",
  description:
    "Product designer tinkering on web & mobile experiences in New York City.",
  openGraph: {
    title: "Lavi Ajmani — Product Designer",
    description:
      "Product designer tinkering on web & mobile experiences in New York City.",
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
