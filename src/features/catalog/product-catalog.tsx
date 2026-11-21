"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  Search,
  SlidersHorizontal,
  X,
  PackageSearch,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "./data";
import { normalizeDigits, number } from "@/lib/format";

export function ProductCatalog() {
  const params = useSearchParams();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = params.get("category") ?? "all";
  const query = params.get("q") ?? "";
  const diameter = params.get("diameter") ?? "all";
  const sort = params.get("sort") ?? "popular";
  const inStock = params.get("stock") === "1";
  function filter(key: string, value: string) {
    const next = new URLSearchParams(window.location.search);
    if (value === "all" || value === "" || (key === "stock" && value === "0"))
      next.delete(key);
    else next.set(key, value);
    window.history.replaceState(null, "", `${pathname}?${next.toString()}`);
  }
  const filtered = useMemo(() => {
    const normalized = normalizeDigits(query.trim()).toLowerCase();
    return products
      .filter((product) => {
        const matchingVariants = product.variants.filter(
          (variant) =>
            (diameter === "all" || variant.diameterMm === Number(diameter)) &&
            (!inStock || variant.stock >= (product.kind === "pipe" ? 10 : 1)),
        );
        return (
          (category === "all" || product.kind === category) &&
          matchingVariants.length > 0 &&
          (!normalized ||
            normalizeDigits(
              `${product.name} ${product.category} ${product.variants.map((v) => v.diameterMm).join(" ")}`,
            )
              .toLowerCase()
              .includes(normalized))
        );
      })
      .sort((a, b) => {
        const aPrice = Math.min(...a.variants.map((v) => v.priceToman));
        const bPrice = Math.min(...b.variants.map((v) => v.priceToman));
        return sort === "price-asc"
          ? aPrice - bPrice
          : sort === "price-desc"
            ? bPrice - aPrice
            : sort === "newest"
              ? Number(!!b.isNew) - Number(!!a.isNew)
              : 0;
      });
  }, [category, query, diameter, sort, inStock]);
  return (
    <div className="catalog-layout">
      <aside className={`catalog-sidebar ${filtersOpen ? "filters-open" : ""}`}>
        <div className="filter-title">
          <h2>
            <SlidersHorizontal size={18} /> فیلتر محصولات
          </h2>
          <button
            className="icon-button filter-close"
            aria-label="بستن فیلترها"
            onClick={() => setFiltersOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <fieldset>
          <legend>دسته‌بندی</legend>
          {[{ key: "all", title: "همه محصولات" }, ...categories].map((item) => (
            <label className="radio-row" key={item.key}>
              <input
                name="category"
                type="radio"
                checked={category === item.key}
                onChange={() => filter("category", item.key)}
              />
              {item.title}
              <span>
                {number(
                  products.filter(
                    (p) => item.key === "all" || p.kind === item.key,
                  ).length,
                )}
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>قطر لوله و اتصالات</legend>
          <select
            aria-label="فیلتر قطر"
            value={diameter}
            onChange={(e) => filter("diameter", e.target.value)}
          >
            <option value="all">همه قطرها</option>
            {[90, 110, 160].map((size) => (
              <option key={size} value={size}>
                {number(size)} میلی‌متر
              </option>
            ))}
          </select>
        </fieldset>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => filter("stock", e.target.checked ? "1" : "0")}
          />
          فقط محصولات موجود
        </label>
        <button
          className="text-link reset-filters"
          onClick={() => window.history.replaceState(null, "", "/products")}
        >
          پاک کردن فیلترها <X size={14} />
        </button>
        <div className="filter-help">
          <h3>برای انتخاب مطمئن‌تر</h3>
          <p>قطر اتصال باید با لولهٔ انتخابی یکسان باشد.</p>
          <Link href="/guide">مطالعه راهنمای خرید ←</Link>
        </div>
      </aside>
      <div className="catalog-results">
        <form action="/products" className="catalog-search">
          <Search size={20} />
          <input
            aria-label="جستجو در محصولات"
            name="q"
            defaultValue={query}
            key={query}
            placeholder="جستجو در محصولات..."
          />
          {category !== "all" && (
            <input type="hidden" name="category" value={category} />
          )}
          <button className="button button-dark" type="submit">
            جستجو
          </button>
        </form>
        <div className="catalog-toolbar">
          <span>
            <LayoutGrid size={17} /> {number(filtered.length)} محصول
          </span>
          <button
            className="mobile-filter-button"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={17} /> فیلترها
          </button>
          <label>
            مرتب‌سازی:{" "}
            <select
              value={sort}
              onChange={(e) => filter("sort", e.target.value)}
            >
              <option value="popular">پیشنهاد فروشگاه</option>
              <option value="newest">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </label>
        </div>
        {filtered.length ? (
          <div className="product-grid catalog-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <PackageSearch size={48} />
            <h2>محصولی پیدا نشد</h2>
            <p>عبارت جستجو یا فیلترها را تغییر دهید.</p>
            <button
              onClick={() => window.history.replaceState(null, "", "/products")}
              className="button button-dark"
            >
              نمایش همه محصولات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
