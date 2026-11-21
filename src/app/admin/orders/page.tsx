import { OrderTable } from "@/features/admin/order-table";

export default function AdminOrdersPage() {
  return (
    <>
      <div className="page-heading">
        <span className="section-kicker">جریان سفارش دومرحله‌ای</span>
        <h1>سفارش‌ها</h1>
        <p>ثبت هزینه حمل، مشاهده رسید و تغییر وضعیت در این فاز فعال نیست.</p>
      </div>
      <section className="admin-panel">
        <OrderTable />
      </section>
      <div className="notice">
        اطلاعات جدول ساختگی‌اند. در فاز دوم، دسترسی به سفارش‌ها، فایل رسید خصوصی
        و تمام تغییرات فقط با مجوز مدیر در سمت سرور انجام می‌شود.
      </div>
    </>
  );
}
