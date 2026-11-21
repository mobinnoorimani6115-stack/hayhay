import type { Metadata } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";
import { CartProvider } from "@/features/cart/cart-provider";

export const metadata: Metadata = {
  title: {
    default: "نی پولیکا | تأمین تخصصی لوله و اتصالات",
    template: "%s | نی پولیکا",
  },
  description:
    "پیش‌نمایش فروشگاه تخصصی لوله و اتصالات پولیکا؛ انتخاب محصول برای پروژه‌های ساختمانی.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <a className="skip-link" href="#main">
            رفتن به محتوای اصلی
          </a>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
