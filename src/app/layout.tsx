import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DM_Sans, Space_Grotesk, Spectral } from 'next/font/google';
import { Suspense } from "react";
import Loading from "./loading";

const spaceGroteskMedium = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "700"],
  subsets: ['latin'],
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "600"],
  subsets: ['latin'],
})

const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["200", "400"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "KnowledgePool",
  description: "A social platform for critical thought",
  icons: {
    icon: [
      { url: '/logo-white-border-blue.svg'}
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGroteskMedium.variable} ${spectral.variable}`}>
        <Navbar />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        <Footer />
      </body>
    </html>
  );
}
