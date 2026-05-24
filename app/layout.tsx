import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import Footer from "@/components/ui/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "TECH AIM ARMS | Precision Measurement & Performance Analytics",
    template: "%s | TECH AIM ARMS",
  },
  description:
    "Precision measurement and performance analytics platform for shooting sports. Competition-grade shot detection, advanced analytics and instant feedback.",
  keywords: [
    "electronic targets",
    "ISSF electronic scoring",
    "shooting analytics",
    "precision measurement",
    "performance analytics",
    "electronic shooting targets",
    "shot detection",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "TECH AIM ARMS",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-bg text-brand-text">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TECH AIM ARMS",
              url: "https://techaim.co.za",
              description:
                "Precision measurement and performance analytics platform for shooting sports.",
              areaServed: ["Africa", "Worldwide"],
            }),
          }}
        />
        <header>
          <Navbar />
        </header>
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
