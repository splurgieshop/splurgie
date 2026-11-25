import { Nunito } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import ThemeShell from "@/components/ThemeShell";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Splurgie — Shop products that don't exist",
  description:
    "A fun social commerce platform where you browse and buy fictional products. All the dopamine, none of the spending.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-navy">
        <AuthProvider>
          <CartProvider>
            <ThemeShell>{children}</ThemeShell>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
