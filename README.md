# نی پولیکا — فاز اول

زیرساخت فروشگاه فارسی لوله و اتصالات، با Next.js App Router، TypeScript، Tailwind CSS و Prisma/PostgreSQL.

**این نسخه محلی و نمایشی است.** سفارش، پرداخت، پیامک، ثبت‌نام، نشست کاربری و عملیات واقعی مدیریت فعال نیستند. تمام قیمت‌ها، موجودی‌ها و سفارش‌های پنل ساختگی‌اند. اطلاعات مشتری واقعی در پروژه وجود ندارد. فایل اولیهٔ `1` بدون تغییر حفظ شده است.

## اجرای سریع در Windows / VS Code

Node.js نسخهٔ 22.12 یا بالاتر نیاز است. در محیط توسعهٔ اولیه، Node.js 26.13.0 و npm 11.20.0 موجود بودند. PostgreSQL، Docker و Git در PATH یافت نشدند؛ وجود نسخه‌ای خارج از PATH بررسی کامل نشده است.

پوشهٔ `E:\codex` را در VS Code باز کنید و در ترمینال PowerShell اجرا کنید:

```powershell
npm.cmd ci
npm.cmd run db:generate
npm.cmd run dev
```

سپس [localhost:3000](http://localhost:3000) را باز کنید. استفاده از `npm.cmd` از مشکل Execution Policy برای فایل `npm.ps1` جلوگیری می‌کند. در ترمینال‌های دیگر می‌توانید `npm` را به کار ببرید.

**برای اجرای رابط نمونه نیازی به `.env`، اینترنت، فونت خارجی یا دیتابیس نیست.** نصب اولیهٔ بسته‌ها به اینترنت نیاز دارد؛ فونت Vazirmatn از بستهٔ محلی بارگذاری می‌شود. `package-lock.json` نسخه‌های نصب‌شده را ثبت می‌کند. Prisma Client تولیدی در Git نگهداری نمی‌شود و باید پیش از typecheck تولید شود؛ دستور build این کار را خودکار انجام می‌دهد.

برای اجرای خروجی production به صورت محلی:

```powershell
npm.cmd run build
npm.cmd run start
```

## صفحات قابل مشاهده

| مسیر                           | کاربرد                                                        |
| ------------------------------ | ------------------------------------------------------------- |
| `/`                            | صفحه اصلی، دسته‌بندی‌ها، محصولات منتخب، محصولات جدید و راهنما |
| `/products`                    | کاتالوگ؛ جستجو، فیلتر دسته/قطر/موجودی و مرتب‌سازی             |
| `/products?category=pipe`      | لوله‌های پولیکا                                               |
| `/products?category=fitting`   | اتصالات                                                       |
| `/products/[slug]`             | مدل‌های قطر/ضخامت، انتخاب تعداد و محصولات مرتبط               |
| `/cart`                        | سبد نمونه در localStorage همان مرورگر؛ ویرایش تعداد و حذف     |
| `/login`                       | فرم اعتبارسنجی نمایشی؛ بدون ارسال یا ذخیرهٔ اطلاعات            |
| `/guide`                       | راهنمای انتخاب محصول                                          |
| `/about`، `/contact`، `/terms` | معرفی، وضعیت اطلاعات تماس و فرایند سفارش                      |
| `/admin`                       | داشبورد صرفاً نمایشی با دادهٔ ساختگی                            |
| `/admin/products`              | جدول مدل‌ها، قیمت و موجودی نمونه                              |
| `/admin/orders`                | وضعیت‌های نمونهٔ سفارش                                         |

شناسه‌های جزئیات محصول: `pvc-sewage-pipe`، `pvc-elbow-90`، `pvc-tee-45`، `pvc-coupler`، `pvc-heavy-pipe` و `pvc-adhesive`.

صفحهٔ مدیریت عمومی است چون فقط دادهٔ ساختگی می‌خواند و هیچ عملیات یا API حساسی ندارد. **این صفحه به معنای پیاده‌سازی امنیت مدیر نیست.** پیش از اتصال دادهٔ واقعی، احراز هویت و کنترل مجوز در سرور باید پیاده‌سازی شوند.

## ساختار پروژه

```text
src/
  app/
    (store)/           پوسته فروشگاه و صفحات مشتری
    admin/             پوسته و صفحات مدیریت نمایشی
    layout.tsx         زبان، RTL، فونت محلی و CartProvider
    globals.css        Tailwind و طراحی واکنش‌گرا
    error.tsx          وضعیت خطای رابط
    not-found.tsx      صفحه ۴۰۴
  components/          Header، Footer، Brand، ProductCard، PipeArt و AdminShell
  features/
    catalog/           مدل رابط، کاتالوگ نمونه، جستجو و انتخاب مدل
    cart/              سبد نمونه و قواعد تعداد و محاسبهٔ عدد صحیح
    auth/              فرم ورود و اعتبارسنجی Zod + React Hook Form
    admin/             سفارش‌های ساختگی و جدول مشترک
  server/db.ts         Prisma Client تنبل و server-only
  lib/format.ts        اعداد فارسی، تومان و تبدیل ارقام
  generated/prisma/    خروجی تولیدشده، خارج از کنترل نسخه
prisma/
  schema.prisma        مدل‌ها و enumها
  migrations/          SQL اولیه و محدودیت‌های دیتابیس
tests/
  domain.test.ts       قواعد تعداد، مبلغ، ورودی و یکپارچگی نمونه‌ها
  e2e/store.spec.ts    آزمون رفتاری مرورگر
docs/
  architecture.md      تصمیم‌ها، فرضیات و مسیر فاز دوم
  verification.md      نتیجهٔ بررسی‌های این محیط
compose.yaml           PostgreSQL اختیاری روی loopback
.env.example           کلیدهای تنظیمات بدون رمز یا کلید واقعی
```

صفحات عمدتاً Server Component هستند. کاتالوگ تعاملی، انتخاب مدل، سبد و فرم ورود Client Component هستند. کد دیتابیس در مرز `server-only` نگه داشته شده و تا زمان درخواست صریح داده ساخته نمی‌شود. در این فاز، کاتالوگ مستقیماً از fixtureها خوانده می‌شود؛ fallback مخفی از دیتابیس به داده نمونه وجود ندارد.

طرح‌های محصول SVG شماتیک و تولیدشده در کد هستند؛ عکس یا گواهی مشخصات فنی محصول واقعی محسوب نمی‌شوند. فروشگاه تخفیف یا جشنوارهٔ فعال ساختگی نمایش نمی‌دهد؛ مدل جشنواره برای فاز بعد آماده است.

## PostgreSQL و Prisma

### روش پیشنهادی: Docker Desktop

Docker Desktop را با Linux containers نصب و اجرا کنید. فایل محیطی را کپی کرده و یک رمز محلی قوی انتخاب کنید:

```powershell
Copy-Item .env.example .env
```

در `.env` مقدار `POSTGRES_PASSWORD` را تغییر دهید و همان رمز را به صورت URL-encoded در `DATABASE_URL` قرار دهید. مقادیر `POSTGRES_USER` و `POSTGRES_DB` باید با URL یکسان باشند. رشتهٔ `REPLACE_WITH_LOCAL_PASSWORD` صرفاً جای‌نگهدار است.

```powershell
docker compose up -d
docker compose ps
npm.cmd run db:validate
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:studio
```

پورت PostgreSQL فقط روی `127.0.0.1:5432` منتشر می‌شود. داده‌ها در volume ذخیره می‌شوند. `docker compose down` سرویس را متوقف می‌کند و داده‌ها را نگه می‌دارد. پیش از حذف volume یا reset دیتابیس، پشتیبان و اجازهٔ مالک لازم است.

### روش جایگزین: نصب مستقیم

PostgreSQL نسخهٔ 17 را محلی نصب کنید، یک نقش محدود و دیتابیس خالی `naypolika` بسازید، URL را تنظیم کنید و دستورات Prisma بالا را اجرا کنید. این پروژه هیچ رمز پیش‌فرض یا کاربر مدیر خودکاری ایجاد نمی‌کند.

### وضعیت فعلی دیتابیس

مدل‌ها اعتبارسنجی و Prisma Client تولید شده‌اند. migration اولیه بدون اتصال به دیتابیس، با `prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script` تولید شده است. migration دوم، CHECK constraintها و indexهای جزئی را اضافه می‌کند. **اجرای migration، اتصال واقعی و تست تراکنش‌های PostgreSQL به فراهم‌شدن دیتابیس نیاز دارند و در این محیط انجام نشده‌اند.**

مدل‌ها: User، Session، OtpChallenge، Address، Category، Product، ProductVariant، Inventory، InventoryReservation، Cart، CartItem، Order، OrderItem، Payment، Shipment، DiscountCampaign، Review، SupportTicket، TicketMessage، Banner و AuditLog.

مبالغ دیتابیس از نوع `BigInt` و بر حسب تومان هستند؛ از اعشار پولی استفاده نمی‌شود. هنگام ساخت API در فاز دوم، BigInt باید با DTO صریح به رشته تبدیل شود؛ تبدیل بدون بررسی به JavaScript number مجاز نیست. قیمت‌های نمونهٔ رابط همگی در محدودهٔ safe integer هستند.

فقط یک نقش ADMIN در دیتابیس مجاز است؛ index جزئی آن در migration دوم تعریف شده است. این index و محدودیت‌های CHECK در Prisma schema قابل نمایش کامل نیستند؛ migrationها باید حفظ و با `migrate deploy` اجرا شوند. `db push` جایگزین آن‌ها نیست.

## بررسی‌ها و تست‌ها

```powershell
npm.cmd run db:generate
npm.cmd run db:validate
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run test:e2e
```

آزمون مرورگر از Chrome نصب‌شده (`channel: chrome`) و سرور production موقت روی پورت `3100` استفاده می‌کند. ابتدا build بگیرید و مطمئن شوید پورت 3100 آزاد است. اگر Chrome نصب نیست، آن را نصب کنید یا `channel` را از تنظیمات حذف کرده و Chromium مربوط به Playwright را نصب کنید:

```powershell
npm.cmd exec playwright install chromium
```

آزمون‌ها شامل حداقل خرید لوله و فروش تکی اتصال، جلوگیری از عبور از موجودی، مبالغ صحیح، ارقام فارسی، جستجو/فیلتر/مرتب‌سازی، سبد ماندگار، نمایش ناموجود، اعتبارسنجی ورود بدون درخواست POST، پنل صرفاً خواندنی، صفحه ۴۰۴ و کنترل overflow موبایل هستند. این تست‌ها جایگزین تست دیتابیس، تست امنیت احراز هویت یا آزمایش پرداخت نیستند.

تصاویر `docs/preview-desktop.png` و `docs/preview-mobile.png` با اجرای تست مرورگر ساخته می‌شوند.

## فرضیات و فاز دوم

تصمیم‌ها و ترتیب اجرا در [سند معماری](docs/architecture.md) آمده‌اند. مدت رزرو موجودی، سیاست مهلت پرداخت، مشخصات رسمی تماس، اطلاعات بانکی و سرویس‌دهنده پیامک هنوز مشخص نیستند و باید قبل از اجرای آن قابلیت‌ها توسط مالک تعیین شوند. در فاز اول برای آن‌ها مقدار محرمانه یا اطلاعات تجاری فرضی ساخته نشده است.

هیچ deployment یا اتصال به دامنهٔ `naypolika.ir` انجام نشده است. برای فاز دوم ابتدا دیتابیس و migrationها را بررسی کنید؛ سپس احراز هویت امن، APIهای مجوزدار، رزرو تراکنشی، سفارش دومرحله‌ای، رسید خصوصی و قابلیت‌های حساب/مدیریت را پیاده‌سازی کنید.

مراجع فنی پیکربندی: [نصب Next.js](https://nextjs.org/docs/app/getting-started/installation)، [تنظیمات Prisma](https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference) و [آداپتور دیتابیس Prisma](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers).
