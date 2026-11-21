import type { ProductKind } from "../catalog/types";

export function minimumQuantity(kind: ProductKind): number {
  return kind === "pipe" ? 10 : 1;
}

export function validateQuantity(
  kind: ProductKind,
  quantity: number,
  available: number,
): string | null {
  if (!Number.isSafeInteger(quantity) || quantity < minimumQuantity(kind)) {
    return kind === "pipe"
      ? "حداقل خرید لوله ۱۰ شاخه است."
      : "تعداد باید یک عدد صحیح مثبت باشد.";
  }
  if (!Number.isSafeInteger(available) || quantity > available)
    return "تعداد انتخابی بیشتر از موجودی است.";
  return null;
}

export function lineTotal(price: number, quantity: number): number {
  const total = price * quantity;
  if (
    !Number.isSafeInteger(price) ||
    price < 0 ||
    !Number.isSafeInteger(quantity) ||
    quantity < 1 ||
    !Number.isSafeInteger(total)
  ) {
    throw new Error("Invalid integer monetary amount or quantity.");
  }
  return total;
}
