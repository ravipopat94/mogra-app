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
  },
  twitter: {
    card: "summary",
    title: "Mogra",
    description: "Boutique custom apparel for everyday life. Made-to-order shirts crafted from handpicked fabrics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cormorant.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
