import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import { ProductCatalog } from "@/features/catalog/product-catalog";

export const metadata: Metadata = { title: "محصولات" };
export default function ProductsPage() {
  return (
    <div className="container page-space">
      <div className="breadcrumb">
        <Link href="/">خانه</Link>
        <ChevronLeft size={14} />
        <span>محصولات</span>
      </div>
      <div className="page-heading">
        <span className="section-kicker">تجهیزات متناسب با نیاز پروژه</span>
        <h1>فروشگاه لوله و اتصالات</h1>
        <p>قطر، نوع محصول و موجودی را بررسی کنید و مدل مناسب را انتخاب کنید.</p>
      </div>
      <div className="notice">
        کاتالوگ نمایشی است؛ قیمت‌ها و موجودی‌ها واقعی نیستند و خرید نهایی فعال
        نشده است.
      </div>
      <Suspense
        fallback={<p className="loading-state">در حال آماده‌سازی محصولات…</p>}
      >
        <ProductCatalog />
      </Suspense>
    </div>
  );
}
