import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  Package,
  ShoppingBag,
  Truck,
  WalletCards,
  Check,
} from "lucide-react";
import { OrderTable } from "@/features/admin/order-table";
import { products } from "@/features/catalog/data";
import { number } from "@/lib/format";

export default function AdminPage() {
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="section-kicker">به پیش‌نمایش مدیریت خوش آمدید</span>
          <h1>یک نگاه به فروشگاه</h1>
          <p>نمای کلی محصولات و نمونهٔ جریان سفارش‌ها</p>
        </div>
        <Link href="/" className="button button-white">
          مشاهده فروشگاه <ArrowUpLeft size={17} />
        </Link>
      </div>
      <div className="stat-grid">
        {[
          {
            label: "محصولات نمونه",
            value: number(products.length),
            icon: Package,
            detail: "در کاتالوگ نمایشی",
          },
          {
            label: "سفارش‌های نمونه",
            value: "۴",
            icon: ShoppingBag,
            detail: "بدون ثبت سفارش واقعی",
          },
          {
            label: "نیازمند محاسبه حمل",
            value: "۱",
            icon: Truck,
            detail: "نمونه جریان دومرحله‌ای",
          },
          {
            label: "رسید در انتظار بررسی",
            value: "۱",
            icon: WalletCards,
            detail: "بدون فایل پرداخت واقعی",
          },
        ].map(({ label, value, icon: Icon, detail }) => (
          <div className="stat-card" key={label}>
            <div>
              <span>{label}</span>
              <Icon size={21} />
            </div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>آخرین سفارش‌های نمونه</h2>
            <p>این جدول صرفاً برای نمایش وضعیت‌های سفارش است.</p>
          </div>
          <Link className="text-link" href="/admin/orders">
            همه سفارش‌ها <ArrowLeft size={16} />
          </Link>
        </div>
        <OrderTable />
      </section>
      <div className="admin-bottom-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h2>مسیر آماده‌سازی فروشگاه</h2>
          </div>
          <div className="readiness-list">
            <p>
              <Check size={19} /> ساختار پروژه و رابط فارسی <span>آماده</span>
            </p>
            <p>
              <Check size={19} /> طراحی مدل‌های دیتابیس <span>آماده اتصال</span>
            </p>
            <p>
              <span className="pending-dot" /> احراز هویت و مجوزهای سرور{" "}
              <span>فاز دوم</span>
            </p>
            <p>
              <span className="pending-dot" /> ثبت سفارش و بررسی پرداخت{" "}
              <span>فاز دوم</span>
            </p>
          </div>
        </section>
        <section className="admin-tip">
          <Truck size={35} strokeWidth={1.5} />
          <h2>هزینهٔ حمل، قبل از پرداخت</h2>
          <p>
            سفارش ابتدا برای محاسبهٔ حمل ارسال می‌شود. مشتری پس از مشاهدهٔ هزینه
            حمل و مبلغ نهایی، سفارش را تأیید می‌کند.
          </p>
          <Link href="/terms">
            مشاهده مراحل سفارش <ArrowLeft size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}
