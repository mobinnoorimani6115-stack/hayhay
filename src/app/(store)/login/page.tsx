import type { Metadata } from "next";
import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/features/auth/login-form";
import { PipeArt } from "@/components/pipe-art";

export const metadata: Metadata = { title: "ورود به حساب کاربری" };
export default function LoginPage() {
  return (
    <div className="container login-page">
      <div className="login-card">
        <div className="login-content">
          <span className="section-kicker">به نی پولیکا خوش آمدید</span>
          <h1>یک قدم تا شروع پروژه.</h1>
          <p className="muted">پیش‌نمایش ورود به حساب کاربری</p>
          <LoginForm />
          <Link className="text-link" href="/products">
            بازگشت به فروشگاه <ArrowUpLeft size={17} />
          </Link>
        </div>
        <div className="login-art">
          <span className="eyebrow">همراه ساختن شما</span>
          <h2>
            هر پروژهٔ ماندگار،
            <br />
            از یک اتصال
            <br />
            <span>مطمئن شروع می‌شود.</span>
          </h2>
          <PipeArt hero />
          <span className="hero-coordinate">
            NAY POLIKA / BUILD WITH CONFIDENCE
          </span>
        </div>
      </div>
    </div>
  );
}
