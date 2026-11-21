"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  ArrowUpLeft,
  X,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { useCart } from "@/features/cart/cart-provider";
import { number } from "@/lib/format";

const links = [
  { href: "/", text: "صفحه اصلی" },
  { href: "/products", text: "همه محصولات" },
  { href: "/products?category=pipe", text: "لوله پولیکا" },
  { href: "/products?category=fitting", text: "اتصالات" },
  { href: "/guide", text: "راهنمای خرید" },
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <Truck size={15} /> تأمین لوله و اتصالات، برای ساختن فردا
          </span>
          <span className="topbar-note">
            نسخهٔ نمایشی · قیمت‌ها و موجودی نمونه‌اند
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-main">
          <Brand />
          <form action="/products" className="header-search" role="search">
            <Search size={20} />
            <input
              aria-label="جستجوی محصولات"
              name="q"
              placeholder="نام محصول، قطر یا نوع اتصال را جستجو کنید..."
            />
            <kbd>جستجو</kbd>
          </form>
          <div className="header-actions">
            <Link href="/login" className="account-link">
              <UserRound size={21} />
              <span>
                ورود <span className="muted">/</span> ثبت‌نام
              </span>
            </Link>
            <span className="action-divider" />
            <Link
              href="/cart"
              className="cart-link"
              aria-label={`سبد خرید، ${number(items.length)} مدل`}
            >
              <ShoppingBag size={22} />
              <span className="cart-count">{number(items.length)}</span>
            </Link>
            <button
              className="mobile-menu icon-button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className="header-nav">
          <div className="container nav-inner">
            <nav
              aria-label="منوی اصلی"
              className={open ? "main-nav is-open" : "main-nav"}
            >
              {links.map((link) => (
                <Link
                  onClick={() => setOpen(false)}
                  className={pathname === link.href ? "active" : ""}
                  key={link.href}
                  href={link.href}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
            <Link className="project-link" href="/guide">
              خرید برای پروژه‌تان؟ <ArrowUpLeft size={17} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
