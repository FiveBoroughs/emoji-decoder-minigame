import "./globals.css";
import type { Metadata } from "next";
import Script from 'next/script'
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emoji Decoder Game",
  description: "A fun game to decode messages using emojis",
};

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />;
      </body>
      <Script defer src={umamiSrc} data-website-id={umamiWebsiteId} />
    </html>
  );
}
