import Link from "next/link";
import { ArrowUpLeft, Plus } from "lucide-react";
import { PipeArt } from "./pipe-art";
import type { CatalogProduct } from "@/features/catalog/types";
import { number } from "@/lib/format";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const variant = product.variants[0];
  const available = product.variants.some(
    (item) => item.stock >= (product.kind === "pipe" ? 10 : 1),
  );
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-image"
        aria-label={`مشاهده ${product.name}`}
      >
        {product.badge && (
          <span className={`product-badge ${product.isNew ? "badge-new" : ""}`}>
            {product.badge}
          </span>
        )}
        <span className="image-arrow">
          <ArrowUpLeft size={17} />
        </span>
        <PipeArt kind={product.art} />
      </Link>
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className={available ? "stock" : "out-of-stock"}>
            <i />
            {available ? "موجود" : "ناموجود"}
          </span>
        </div>
        <Link className="product-title" href={`/products/${product.slug}`}>
          {product.name}
        </Link>
        <p className="product-spec">
          {variant.diameterMm
            ? `قطر ${number(variant.diameterMm)} میلی‌متر`
            : "بسته‌بندی تک‌عددی"}
          {product.kind === "pipe" ? " · شاخه ۶ متری" : " · فروش عددی"}
        </p>
        <div className="product-price-row">
          <div>
            <small>قیمت نمونه از</small>
            <strong>
              {number(Math.min(...product.variants.map((v) => v.priceToman)))}{" "}
              <span>تومان</span>
            </strong>
          </div>
          <Link
            className="product-add"
            href={`/products/${product.slug}`}
            aria-label={`انتخاب مدل ${product.name}`}
          >
            <Plus size={21} />
          </Link>
        </div>
      </div>
    </article>
  );
}
