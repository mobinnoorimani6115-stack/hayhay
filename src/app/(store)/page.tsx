import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Boxes,
  Headset,
  Ruler,
  Truck,
  Layers3,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import { PipeArt } from "@/components/pipe-art";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/features/catalog/data";

export default function HomePage() {
  return (
    <>
      <section className="hero-section container">
        <div className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span /> تخصص ما، زیرساختِ ساختن شماست
            </span>
            <h1>
              اتصال مطمئن،
              <br />
              ساختن <span>فردایی ماندگار.</span>
            </h1>
            <p>
              لوله و اتصالات پولیکا، یک‌جا و تخصصی.
              <br />
              برای هر بخش از پروژه‌تان، انتخابی دقیق داشته باشید.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="button button-yellow">
                مشاهده محصولات <ArrowLeft size={19} />
              </Link>
              <Link href="/guide" className="hero-secondary">
                راهنمای انتخاب <ArrowUpLeft size={18} />
              </Link>
            </div>
            <div className="hero-footnote">
              <ShieldCheck size={18} />
              <span>
                انتخاب دقیق محصول <i /> قیمت شفاف <i /> همراهی در خرید
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-visual-label">
              PVC-U <span>PIPE & FITTINGS</span>
            </div>
            <PipeArt hero />
            <div className="spec-chip">
              <span className="spec-icon">
                <Layers3 size={21} />
              </span>
              <div>
                <strong>از زیرساخت تا اطمینان</strong>
                <small>لوله و اتصالات متناسب با پروژه</small>
              </div>
            </div>
            <span className="hero-coordinate">01 / NAY POLIKA COLLECTION</span>
          </div>
        </div>
      </section>
      <section className="container benefits" aria-label="خدمات فروشگاه">
        {[
          {
            icon: BadgeCheck,
            title: "انتخاب تخصصی",
            detail: "مشخصات فنی شفاف محصولات",
          },
          {
            icon: Truck,
            title: "ارسال به سراسر ایران",
            detail: "هزینه حمل پیش از تأیید نهایی",
          },
          {
            icon: Boxes,
            title: "تأمین پروژه‌های شما",
            detail: "خرید لوله و اتصالات در یک سفارش",
          },
          {
            icon: Headset,
            title: "راهنمای خرید",
            detail: "همراه شما در انتخاب محصول",
          },
        ].map(({ icon: Icon, title, detail }) => (
          <div className="benefit" key={title}>
            <span className="benefit-icon">
              <Icon size={25} strokeWidth={1.6} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="container section category-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              یک انتخاب درست، از اینجا شروع می‌شود
            </span>
            <h2>برای هر نیاز، یک اتصال</h2>
          </div>
          <Link href="/products" className="text-link">
            همه دسته‌بندی‌ها <ArrowLeft size={18} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              href={`/products?category=${category.key}`}
              key={category.key}
              className="category-card"
            >
              <div>
                <span className="category-index">۰{index + 1}</span>
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
                <span className="category-action">
                  مشاهده محصولات <ArrowLeft size={17} />
                </span>
              </div>
              <PipeArt kind={category.art} />
            </Link>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">پیشنهادهایی برای شروع پروژه</span>
            <h2>محصولات منتخب</h2>
          </div>
          <Link href="/products" className="text-link">
            مشاهده همه محصولات <ArrowLeft size={18} />
          </Link>
        </div>
        <div className="sample-note">
          <span /> قیمت‌ها و موجودی این نسخه صرفاً برای نمایش هستند.
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="container">
        <div className="project-banner">
          <div className="project-banner-icon">
            <Ruler size={43} strokeWidth={1.3} />
          </div>
          <div>
            <span className="section-kicker">یک قدم جلوتر در تأمین پروژه</span>
            <h2>قطر درست. ضخامت مناسب. اجرای مطمئن.</h2>
            <p>
              پیش از خرید، مشخصات لوله و اتصالات مورد نیازتان را با هم بررسی
              کنید.
            </p>
          </div>
          <Link href="/guide" className="button button-dark">
            راهنمای انتخاب محصول <ArrowUpLeft size={18} />
          </Link>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">تازه‌های فروشگاه</span>
            <h2>انتخاب‌های جدید</h2>
          </div>
          <Link className="text-link" href="/products?sort=newest">
            همه محصولات جدید <ArrowLeft size={18} />
          </Link>
        </div>
        <div className="new-products-grid">
          {products
            .filter((p) => p.isNew)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          <div className="campaign-card">
            <span className="campaign-label">خرید آگاهانه</span>
            <h3>
              قبل از پرداخت،
              <br />
              از هزینهٔ حمل
              <br />
              <span>مطمئن شوید.</span>
            </h3>
            <p>هزینه حمل سفارش توسط مدیر مشخص می‌شود و تأیید نهایی با شماست.</p>
            <Link href="/terms">
              آشنایی با فرایند سفارش <ChevronLeft size={19} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container guide-strip">
        <div>
          <span className="section-kicker">دانستنی‌های پیش از خرید</span>
          <h2>برای پروژه‌تان، درست انتخاب کنید.</h2>
        </div>
        <Link href="/guide">
          مشاهده راهنمای خرید <ArrowUpLeft size={22} />
        </Link>
      </section>
    </>
  );
}
