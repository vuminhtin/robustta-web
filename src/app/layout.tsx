import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { AffiliateProvider } from "@/context/AffiliateContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Suspense } from "react";
import RefCapture from "@/components/RefCapture";

export const metadata: Metadata = {
  title: "RobustTA — Cà Phê Hạt Rang Nguyên Chất | Đậm Đà · Cân Bằng · Tin Cậy",
  description: "RobustTA — 100% cà phê hạt rang mộc nguyên chất từ vùng trồng gia đình tại Lâm Đồng. Không tẩm ướp, không pha trộn. Đánh thức bản lĩnh Việt, nâng tầm vị thế Robusta Việt Nam.",
  keywords: ["cà phê", "robusta", "hạt rang", "nguyên chất", "lâm đồng", "robustta", "cà phê sạch"],
  openGraph: {
    title: "RobustTA — Cà Phê Hạt Rang Nguyên Chất",
    description: "100% cà phê hạt rang mộc nguyên chất từ Lâm Đồng. Đậm Đà · Cân Bằng · Tin Cậy.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body text-text-primary bg-bg-light">
        <AuthProvider>
        <AffiliateProvider>
        <CartProvider>
          {/* Capture ?ref= param on every page load */}
          <Suspense fallback={null}>
            <RefCapture />
          </Suspense>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </CartProvider>
        </AffiliateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
