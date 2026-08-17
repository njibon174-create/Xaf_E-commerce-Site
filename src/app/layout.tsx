import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { CartProvider } from "@/lib/store";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import CartSheet from "@/components/checkout/CartSheet";
import FilterDrawer from "@/components/checkout/FilterDrawer";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Xaf — Premium Leather Goods",
  description: "Quiet luxury for the modern wardrobe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-cloud">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-14 pb-16">{children}</main>
          <BottomNav />
          <CartSheet />
        </CartProvider>
      </body>
    </html>
  );
}
