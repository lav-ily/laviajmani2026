import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { ContentProtection } from "@/components/content-protection";
import { HERO, SITE_TAGLINE } from "@/lib/hero-content";
import { getRecaptchaSiteKey } from "@/lib/recaptcha";
import "./globals.css";

/** Product UI in case study samples (Hopin desktop). Latin subset only. */
const inter = localFont({
  src: "../public/fonts/inter/Inter-Variable-Latin.woff2",
  weight: "400 600",
  variable: "--font-inter",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
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

const oggItalic = localFont({
  src: "../public/fonts/ogg/Ogg-Italic.otf",
  weight: "400",
  style: "italic",
  variable: "--font-ogg",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const matter = localFont({
  src: [
    {
      path: "../public/fonts/matter/Matter-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/matter/Matter-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/matter/Matter-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-matter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lavi.you"),
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
      className={`${matter.variable} ${GeistSans.variable} ${GeistMono.variable} ${appleGaramond.variable} ${oggItalic.variable} ${inter.variable} antialiased`}
    >
      <body>
        <ContentProtection />
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
