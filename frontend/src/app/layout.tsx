import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop"; // 👈 importado

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Todesco",
  description: "3D Todesco - Loja de Impressão 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <CartProvider>
          <NavigationMenu />
          <ScrollToTop />
          {children}
          <Toaster position="bottom-center" richColors />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
