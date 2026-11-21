"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpLeft,
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";

const links = [
  { href: "/admin", text: "نمای کلی", icon: LayoutDashboard },
  { href: "/admin/products", text: "محصولات و موجودی", icon: Package },
  { href: "/admin/orders", text: "سفارش‌ها", icon: ShoppingBag },
];
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <Brand inverse />
        <div className="admin-sidebar-label">پنل مدیریت فروشگاه</div>
        <nav aria-label="منوی مدیریت">
          {links.map(({ href, text, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <Icon size={20} />
              {text}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <ShieldCheck size={27} />
          <strong>محیط پیش‌نمایش</strong>
          <p>هیچ سفارش یا اطلاعات شخصی واقعی در این پنل وجود ندارد.</p>
          <Link href="/">
            بازگشت به فروشگاه <ArrowUpLeft size={17} />
          </Link>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <button
              className="icon-button admin-menu-toggle"
              aria-label={open ? "بستن منوی مدیریت" : "نمایش منوی مدیریت"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
            <span>
              نی پولیکا <span className="muted">/ مدیریت</span>
            </span>
          </div>
          <span className="admin-demo-badge">
            <span /> نسخه نمایشی
          </span>
        </header>
        <main id="main" className="admin-content">
          <div className="notice admin-notice">
            <ShieldCheck size={20} />
            <span>
              این پنل فقط دادهٔ نمونه را نمایش می‌دهد. ورود مدیر و تمام عملیات
              مدیریتی تا پیاده‌سازی احراز هویت سمت سرور غیرفعال هستند.
            </span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
