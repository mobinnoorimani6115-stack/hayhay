import Link from "next/link";
import { ArrowUpLeft, Mail, MapPin } from "lucide-react";
import { Brand } from "./brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand inverse />
          <p>
            همراه پروژه‌های شما، از انتخاب تا تأمین.
            <br />
            فروشگاه تخصصی لوله و اتصالات پولیکا.
          </p>
          <span className="footer-market">
            <MapPin size={15} /> برای پروژه‌های سراسر ایران
          </span>
        </div>
        <div>
          <h3>دسترسی سریع</h3>
          <Link href="/products">فروشگاه محصولات</Link>
          <Link href="/guide">راهنمای انتخاب محصول</Link>
          <Link href="/cart">سبد خرید</Link>
        </div>
        <div>
          <h3>همراه شما</h3>
          <Link href="/about">درباره نی پولیکا</Link>
          <Link href="/contact">تماس با ما</Link>
          <Link href="/terms">شرایط خرید و ارسال</Link>
        </div>
        <div className="footer-contact">
          <h3>انتخاب درست، شروع یک ساخت مطمئن</h3>
          <p>
            برای آشنایی با فرایند سفارش و محاسبه هزینه حمل، راهنمای خرید را
            ببینید.
          </p>
          <Link href="/guide" className="footer-cta">
            راهنمای خرید <ArrowUpLeft size={18} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          ©{" "}
          {new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(1405)}{" "}
          نی پولیکا. تمامی حقوق محفوظ است.
        </span>
        <span>
          <Mail size={14} /> اطلاعات تماس تجاری پس از تأیید مالک اضافه می‌شود.
        </span>
        <Link href="/admin">پیش‌نمایش مدیریت</Link>
      </div>
    </footer>
  );
}
