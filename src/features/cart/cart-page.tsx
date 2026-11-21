"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { minimumQuantity, lineTotal } from "./rules";
import { findVariant } from "@/features/catalog/data";
import { PipeArt } from "@/components/pipe-art";
import { toman, number } from "@/lib/format";

export function CartPageContent() {
  const { items, update, remove } = useCart();
  const [message, setMessage] = useState("");
  const total = items.reduce(
    (sum, line) =>
      sum +
      lineTotal(findVariant(line.variantId)!.variant.priceToman, line.quantity),
    0,
  );
  if (!items.length)
    return (
      <div className="empty-state">
        <ShoppingBag size={50} />
        <h2>سبد خرید شما خالی است</h2>
        <p>محصولات مورد نیاز پروژه‌تان را انتخاب کنید.</p>
        <Link href="/products" className="button button-yellow">
          مشاهده محصولات <ArrowLeft size={18} />
        </Link>
      </div>
    );
  return (
    <div className="cart-layout">
      <div className="cart-lines">
        {items.map((line) => {
          const { product, variant } = findVariant(line.variantId)!;
          return (
            <article className="cart-line" key={line.variantId}>
              <div className="cart-art">
                <PipeArt kind={product.art} />
              </div>
              <div className="cart-line-info">
                <Link href={`/products/${product.slug}`}>
                  <h2>{product.name}</h2>
                </Link>
                <p className="muted small">
                  {variant.diameterMm
                    ? `قطر ${number(variant.diameterMm)} میلی‌متر`
                    : "بسته تک‌عددی"}{" "}
                  · {toman(variant.priceToman)}
                </p>
                <div className="cart-line-actions">
                  <label>
                    تعداد{" "}
                    <input
                      aria-label={`تعداد ${product.name}`}
                      type="number"
                      value={line.quantity}
                      min={minimumQuantity(product.kind)}
                      max={variant.stock}
                      onChange={(e) =>
                        setMessage(
                          update(variant.id, Number(e.target.value)) ?? "",
                        )
                      }
                    />
                  </label>
                  <button
                    className="icon-button"
                    onClick={() => remove(variant.id)}
                    aria-label={`حذف ${product.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <strong>
                {toman(lineTotal(variant.priceToman, line.quantity))}
              </strong>
            </article>
          );
        })}
        <p className="form-error" role="status">
          {message}
        </p>
      </div>
      <aside className="cart-summary">
        <h2>خلاصه سبد نمونه</h2>
        <div>
          <span>جمع محصولات</span>
          <strong>{toman(total)}</strong>
        </div>
        <div>
          <span>هزینه حمل</span>
          <span>نیازمند محاسبه</span>
        </div>
        <p>
          در نسخه عملیاتی، مدیر ابتدا هزینه حمل را اعلام می‌کند. پس از مشاهده
          مبلغ کل و تأیید شما، پرداخت امکان‌پذیر می‌شود.
        </p>
        <div className="notice">
          ثبت سفارش و پرداخت در فاز اول فعال نیست. سبد نمونه فقط در همین مرورگر
          نگهداری می‌شود.
        </div>
        <Link href="/products" className="button button-dark">
          ادامه انتخاب محصولات <ArrowLeft size={17} />
        </Link>
      </aside>
    </div>
  );
}
