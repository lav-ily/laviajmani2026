import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { HERO, SITE_TAGLINE } from "@/lib/hero-content";
import { getRecaptchaSiteKey } from "@/lib/recaptcha";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const appleGaramond = localFont({
  src: "../public/fonts/AppleGaramond-LightItalic.woff2",
  weight: "300",
  style: "italic",
  variable: "--font-apple-garamond",
  display: "swap",
  preload: true,
  adjustFontFallback: "Times New Roman",
});

const sfProDisplay = localFont({
  src: [
    {
      path: "../public/fonts/sf-pro-display/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: HERO.name,
  description: SITE_TAGLINE,
  openGraph: {
    title: HERO.name,
    description: SITE_TAGLINE,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const recaptchaSiteKey = getRecaptchaSiteKey();

  return (
    <html
      lang="en"
      className={`${geist.variable} ${appleGaramond.variable} ${sfProDisplay.variable} antialiased`}
    >
      <body>
        {children}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {recaptchaSiteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
