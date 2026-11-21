import { expect, test } from "@playwright/test";

test("home is RTL, fonts load locally, and desktop layout stays within viewport", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "اتصال مطمئن",
  );
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() => document.fonts.check('400 14px "Vazirmatn"')),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: "docs/preview-desktop.png", fullPage: true });
});

test("category, diameter, stock filter and empty result work", async ({
  page,
}) => {
  await page.goto("/products?category=pipe");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("فیلتر قطر").selectOption("90");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "پاک کردن فیلترها" }).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.getByLabel("لوازم جانبی", { exact: false }).check();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText("ناموجود");
  await page.getByLabel("فقط محصولات موجود").check();
  await expect(
    page.getByRole("heading", { name: "محصولی پیدا نشد" }),
  ).toBeVisible();
});

test("search accepts Persian diameter digits and sorting changes order", async ({
  page,
}) => {
  await page.goto("/products?q=۹۰");
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByLabel("مرتب‌سازی:").selectOption("price-asc");
  await expect(page.locator(".product-card").first()).toContainText(
    "بوشن رابط پولیکا",
  );
});

test("cart enforces pipe minimum, stock, persists and supports fittings by one", async ({
  page,
}) => {
  await page.goto("/products/pvc-sewage-pipe");
  const quantity = page.getByLabel("تعداد شاخه", { exact: true });
  await expect(quantity).toHaveValue("10");
  await quantity.fill("9");
  await page.getByRole("button", { name: "افزودن به سبد نمونه" }).click();
  await expect(page.getByRole("status")).toContainText(
    "حداقل خرید لوله ۱۰ شاخه",
  );
  await quantity.fill("241");
  await page.getByRole("button", { name: "افزودن به سبد نمونه" }).click();
  await expect(page.getByRole("status")).toContainText("بیشتر از موجودی");
  await quantity.fill("10");
  await page.getByRole("button", { name: "افزودن به سبد نمونه" }).click();
  await page.goto("/products/pvc-elbow-90");
  await expect(page.getByLabel("تعداد عدد", { exact: true })).toHaveValue("1");
  await page.getByRole("button", { name: "افزودن به سبد نمونه" }).click();
  await page.goto("/cart");
  await expect(page.locator(".cart-line")).toHaveCount(2);
  await expect(page.locator(".cart-summary")).toContainText("۴٬۹۲۸٬۰۰۰ تومان");
  await page.reload();
  await expect(page.locator(".cart-line")).toHaveCount(2);
  await page.getByRole("button", { name: "حذف لوله پولیکا فاضلابی" }).click();
  await expect(page.locator(".cart-line")).toHaveCount(1);
});

test("unavailable product stays visible and cannot be purchased", async ({
  page,
}) => {
  await page.goto("/products/pvc-adhesive");
  await expect(
    page.getByRole("button", { name: "ناموجود", exact: true }),
  ).toBeDisabled();
});

test("login validates without sending credentials or authenticating", async ({
  page,
}) => {
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") mutations.push(request.url());
  });
  await page.goto("/login");
  await page.getByRole("button", { name: "بررسی فرم ورود" }).click();
  await expect(page.locator("#mobile-error")).toBeVisible();
  await page.getByLabel("شماره موبایل", { exact: true }).fill("۰۹۰۰۰۰۰۰۰۰۰");
  await page.getByLabel("رمز عبور", { exact: true }).fill("test-only-example");
  await page.getByRole("button", { name: "بررسی فرم ورود" }).click();
  await expect(page.getByRole("status")).toContainText(
    "اطلاعات شما ارسال یا ذخیره نشد",
  );
  expect(mutations).toEqual([]);
});

test("admin is explicitly read-only and navigation works", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator(".admin-notice")).toContainText(
    "احراز هویت سمت سرور غیرفعال",
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "docs/preview-admin-desktop.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "محصولات و موجودی" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(12);
  await page.getByRole("link", { name: "سفارش‌ها", exact: true }).click();
  await expect(page.locator("tbody tr")).toHaveCount(4);
  await expect(page.locator("main form")).toHaveCount(0);
});

test("mobile menu and filters work without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/products",
    "/products/pvc-sewage-pipe",
    "/login",
    "/cart",
    "/admin",
    "/admin/products",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBe(true);
    if (path === "/admin") {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: "docs/preview-admin-mobile.png",
        fullPage: true,
      });
    }
  }
  await page.goto("/");
  await page.getByRole("button", { name: "باز کردن منو" }).click();
  await page
    .getByRole("navigation", { name: "منوی اصلی" })
    .getByRole("link", { name: "همه محصولات" })
    .click();
  await page.getByRole("button", { name: "فیلترها", exact: true }).click();
  await page.getByLabel("لوله‌های پولیکا", { exact: false }).check();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "docs/preview-mobile.png", fullPage: true });
});

test("unknown routes and products return 404", async ({ request }) => {
  expect((await request.get("/products/does-not-exist")).status()).toBe(404);
  expect((await request.get("/does-not-exist")).status()).toBe(404);
});
