"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { findVariant } from "@/features/catalog/data";
import { validateQuantity } from "./rules";

interface CartLine {
  variantId: string;
  quantity: number;
}
interface CartState {
  items: CartLine[];
  add: (id: string, quantity: number) => string | null;
  update: (id: string, quantity: number) => string | null;
  remove: (id: string) => void;
}
const CartContext = createContext<CartState | null>(null);
const key = "naypolika:sample-cart:v1";
const event = "naypolika:cart";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(event, callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}
function decode(value: string): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((line): line is CartLine => {
      if (
        !line ||
        typeof line.variantId !== "string" ||
        seen.has(line.variantId)
      )
        return false;
      const found = findVariant(line.variantId);
      if (
        !found ||
        validateQuantity(found.product.kind, line.quantity, found.variant.stock)
      )
        return false;
      seen.add(line.variantId);
      return true;
    });
  } catch {
    return [];
  }
}
function persist(items: CartLine[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new Event(event));
  } catch {
    return "ذخیره‌سازی مرورگر در دسترس نیست.";
  }
  return null;
}
export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const items = useMemo(() => decode(raw), [raw]);
  const change = useCallback(
    (variantId: string, quantity: number, additive: boolean) => {
      const found = findVariant(variantId);
      if (!found) return "محصول پیدا نشد.";
      const current = decode(snapshot());
      const previous = current.find((line) => line.variantId === variantId);
      const nextQuantity =
        quantity + (additive ? (previous?.quantity ?? 0) : 0);
      const error = validateQuantity(
        found.product.kind,
        nextQuantity,
        found.variant.stock,
      );
      if (error) return error;
      return persist([
        ...current.filter((line) => line.variantId !== variantId),
        { variantId, quantity: nextQuantity },
      ]);
    },
    [],
  );
  return (
    <CartContext.Provider
      value={{
        items,
        add: (id, q) => change(id, q, true),
        update: (id, q) => change(id, q, false),
        remove: (id) => {
          persist(decode(snapshot()).filter((line) => line.variantId !== id));
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("CartProvider is required.");
  return cart;
}
