"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { CatalogProduct } from "./types";
import { useCart } from "@/features/cart/cart-provider";
import { minimumQuantity, lineTotal } from "@/features/cart/rules";
import { number, toman } from "@/lib/format";

export function ProductPurchase({ product }: { product: CatalogProduct }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = product.variants.find((v) => v.id === variantId)!;
  const minimum = minimumQuantity(product.kind);
  const [quantity, setQuantity] = useState(minimum);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { add } = useCart();
  const available = variant.stock >= minimum;
  function addItem() {
    const error = add(variant.id, quantity);
    setSuccess(!error);
    setMessage(error ?? "به سبد نمونه اضافه شد.");
  }
  return (
    <div className="purchase-panel">
      <fieldset>
        <legend>انتخاب مدل</legend>
        <div className="variant-options">
          {product.variants.map((item) => (
            <button
              key={item.id}
              aria-pressed={item.id === variantId}
              onClick={() => {
                setVariantId(item.id);
                setQuantity(minimum);
                setMessage("");
              }}
              className={item.id === variantId ? "selected" : ""}
            >
              {item.diameterMm
                ? `${number(item.diameterMm)} میلی‌متر`
                : "یک عدد"}
              {item.thicknessMm && (
                <small>ضخامت {number(item.thicknessMm)}</small>
              )}
            </button>
          ))}
        </div>
      </fieldset>
      <p className={available ? "stock" : "out-of-stock"}>
        <i />
        {available
          ? `${number(variant.stock)} ${product.kind === "pipe" ? "شاخه" : "عدد"} موجود در کاتالوگ نمونه`
          : "این مدل در حال حاضر ناموجود است"}
      </p>
      <div className="purchase-price">
        <span>قیمت نمونه هر {product.kind === "pipe" ? "شاخه" : "عدد"}</span>
        <strong>{toman(variant.priceToman)}</strong>
      </div>
      <label className="quantity-label" htmlFor="quantity">
        تعداد {product.kind === "pipe" ? "شاخه" : "عدد"}
      </label>
      <div className="purchase-actions">
        <div className="quantity-control">
          <button
            aria-label="افزایش تعداد"
            disabled={!available || quantity >= variant.stock}
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={17} />
          </button>
          <input
            id="quantity"
            type="number"
            min={minimum}
            max={variant.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            aria-label="کاهش تعداد"
            disabled={quantity <= minimum}
            onClick={() => setQuantity(quantity - 1)}
          >
            <Minus size={17} />
          </button>
        </div>
        <button
          disabled={!available}
          onClick={addItem}
          className="button button-yellow"
        >
          <ShoppingBag size={19} />
          {available ? "افزودن به سبد نمونه" : "ناموجود"}
        </button>
      </div>
      <p className="muted small">
        {product.kind === "pipe"
          ? "حداقل خرید: ۱۰ شاخه · طول هر شاخه: ۶ متر"
          : "حداقل خرید اتصالات و لوازم جانبی: ۱ عدد"}
      </p>
      {Number.isSafeInteger(quantity) &&
        quantity >= minimum &&
        quantity <= variant.stock && (
          <p className="line-total">
            جمع این مدل:{" "}
            <strong>{toman(lineTotal(variant.priceToman, quantity))}</strong>
          </p>
        )}
      <div role="status" className={success ? "form-success" : "form-error"}>
        {message}
        {message && success && (
          <Link href="/cart">
            <Check size={16} /> مشاهده سبد خرید
          </Link>
        )}
      </div>
    </div>
  );
}
