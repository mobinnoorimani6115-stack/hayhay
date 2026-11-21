"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="empty-state">
      <h1>نمایش صفحه با مشکل روبه‌رو شد</h1>
      <p>می‌توانید دوباره تلاش کنید.</p>
      <button className="button button-yellow" onClick={reset}>
        تلاش دوباره
      </button>
    </div>
  );
}
