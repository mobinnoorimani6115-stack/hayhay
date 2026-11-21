import assert from "node:assert/strict";
import test from "node:test";
import { validateQuantity, lineTotal } from "../src/features/cart/rules";
import { normalizeDigits } from "../src/lib/format";
import { loginSchema } from "../src/features/auth/validation";
import { products } from "../src/features/catalog/data";

test("pipe minimum is per variant, fittings allow a single item", () => {
  assert.ok(validateQuantity("pipe", 9, 100));
  assert.equal(validateQuantity("pipe", 10, 100), null);
  assert.equal(validateQuantity("fitting", 1, 100), null);
  assert.equal(validateQuantity("accessory", 1, 100), null);
});

test("stock and integer boundaries reject unavailable and malformed quantities", () => {
  for (const quantity of [0, -1, 1.5, NaN, Infinity, 101]) {
    assert.ok(validateQuantity("fitting", quantity, 100));
  }
  assert.ok(validateQuantity("fitting", 1, 0));
  assert.ok(validateQuantity("pipe", 10, 9));
  assert.equal(validateQuantity("pipe", 100, 100), null);
});

test("money stays integer and rejects overflow or fractional values", () => {
  assert.equal(lineTotal(485000, 10), 4850000);
  for (const [price, quantity] of [
    [1.5, 2],
    [-1, 10],
    [1, 0],
    [1, 1.5],
    [Number.MAX_SAFE_INTEGER, 2],
  ]) {
    assert.throws(() => lineTotal(price, quantity));
  }
});

test("Persian and Arabic digits normalize without changing ordinary text", () => {
  assert.equal(
    normalizeDigits("۰۱۲۳۴۵۶۷۸۹ / ٠١٢٣٤٥٦٧٨٩ PVC"),
    "0123456789 / 0123456789 PVC",
  );
});

test("login validation accepts normalized mobile and rejects invalid input", () => {
  const parsed = loginSchema.safeParse({
    mobile: "۰۹۰۰۰۰۰۰۰۰۰",
    password: "test-only-example",
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.mobile, "09000000000");
  assert.equal(
    loginSchema.safeParse({ mobile: "123", password: "short" }).success,
    false,
  );
  assert.equal(
    loginSchema.safeParse({ mobile: "09000000000", password: "x".repeat(129) })
      .success,
    false,
  );
});

test("sample catalog has unique variants and safe integer price and stock", () => {
  const variants = products.flatMap((p) => p.variants);
  assert.equal(new Set(variants.map((v) => v.id)).size, variants.length);
  for (const variant of variants) {
    assert.equal(
      Number.isSafeInteger(variant.priceToman) && variant.priceToman >= 0,
      true,
    );
    assert.equal(
      Number.isSafeInteger(variant.stock) && variant.stock >= 0,
      true,
    );
  }
  assert.ok(products.some((p) => p.variants.every((v) => v.stock === 0)));
});
