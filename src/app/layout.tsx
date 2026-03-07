import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mogra",
  description: "Boutique custom apparel for everyday life. Made-to-order shirts crafted from handpicked fabrics.",
  openGraph: {
    title: "Mogra",
    description: "Boutique custom apparel for everyday life. Made-to-order shirts crafted from handpicked fabrics.",
    url: "https://mogra-app.vercel.app",
    siteName: "Mogra",
    type: "website",
    images: [{ url: "https://mogra-app.vercel.app/logo.png", width: 1316, height: 960, alt: "Mogra" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mogra",
    description: "Boutique custom apparel for everyday life. Made-to-order shirts crafted from handpicked fabrics.",
    images: ["https://mogra-app.vercel.app/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cormorant.variable} antialiased flex flex-col h-[100dvh] overflow-hidden`}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
