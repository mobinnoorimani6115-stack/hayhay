import type { Metadata } from "next";
import { CartPageContent } from "@/features/cart/cart-page";

export const metadata: Metadata = { title: "سبد خرید نمونه" };
export default function CartPage() {
  return (
    <div className="container page-space">
      <div className="page-heading">
        <span className="section-kicker">انتخاب‌های پروژه شما</span>
        <h1>سبد خرید</h1>
        <p>مدل و تعداد محصولات را پیش از ثبت سفارش بررسی کنید.</p>
      </div>
      <CartPageContent />
    </div>
  );
}
