import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Ruler, Truck } from "lucide-react";
import { getProduct, products } from "@/features/catalog/data";
import { ProductPurchase } from "@/features/catalog/product-purchase";
import { ProductCard } from "@/components/product-card";
import { PipeArt } from "@/components/pipe-art";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return { title: product?.name ?? "محصول پیدا نشد" };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const diameters = product.variants.map((v) => v.diameterMm);
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.kind !== "accessory" &&
        p.variants.some((v) => diameters.includes(v.diameterMm)),
    )
    .slice(0, 4);
  return (
    <div className="container page-space">
      <div className="breadcrumb">
        <Link href="/">خانه</Link>
        <ChevronLeft size={14} />
        <Link href="/products">محصولات</Link>
        <ChevronLeft size={14} />
        <span>{product.name}</span>
      </div>
      <div className="detail-grid">
        <div className="detail-art">
          <span className="section-kicker">NAY POLIKA / PVC-U</span>
          <PipeArt kind={product.art} />
          <span className="muted small">تصویر شماتیک محصول</span>
        </div>
        <div className="detail-info">
          <span className="section-kicker">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <ProductPurchase product={product} />
          <div className="detail-notes">
            <span>
              <Truck size={18} /> هزینه حمل پیش از تأیید نهایی اعلام می‌شود.
            </span>
            <span>
              <Ruler size={18} /> مشخصات فنی را با نیاز پروژه تطبیق دهید.
            </span>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">متناسب با قطر و نوع محصول</span>
            <h2>محصولات مرتبط</h2>
          </div>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {!related.length && (
          <p className="muted">
            محصول مرتبطی برای این مورد در کاتالوگ نمونه نیست.
          </p>
        )}
      </section>
    </div>
  );
}
