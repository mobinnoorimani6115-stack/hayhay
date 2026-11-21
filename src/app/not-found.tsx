import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="empty-state not-found">
      <span className="error-code">۴۰۴</span>
      <h1>این صفحه پیدا نشد</h1>
      <p>از صفحه اصلی به محصولات و راهنمای خرید دسترسی دارید.</p>
      <Link href="/" className="button button-yellow">
        بازگشت به خانه
      </Link>
    </main>
  );
}
