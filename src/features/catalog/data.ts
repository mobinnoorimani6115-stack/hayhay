import type { CatalogProduct } from "./types";

// Deliberately fictional catalog. No real inventory or commercial prices.
export const products: CatalogProduct[] = [
  {
    id: "p1",
    slug: "pvc-sewage-pipe",
    name: "لوله پولیکا فاضلابی",
    kind: "pipe",
    category: "لوله‌های پولیکا",
    art: "pipes",
    badge: "پرفروش",
    description:
      "لوله PVC-U برای اجرای شبکه فاضلاب ساختمان. عرضه به صورت شاخه‌های ۶ متری با انتخاب قطر و ضخامت.",
    variants: [
      {
        id: "v1",
        diameterMm: 110,
        thicknessMm: 3.2,
        priceToman: 485000,
        stock: 240,
      },
      {
        id: "v2",
        diameterMm: 90,
        thicknessMm: 3,
        priceToman: 375000,
        stock: 180,
      },
      {
        id: "v3",
        diameterMm: 160,
        thicknessMm: 4,
        priceToman: 845000,
        stock: 60,
      },
    ],
  },
  {
    id: "p2",
    slug: "pvc-elbow-90",
    name: "زانو ۹۰ درجه پولیکا",
    kind: "fitting",
    category: "اتصالات پولیکا",
    art: "elbow",
    description:
      "اتصال زانویی برای تغییر مسیر لوله‌کشی. قطر اتصال را متناسب با قطر لوله انتخاب کنید.",
    variants: [
      { id: "v4", diameterMm: 110, priceToman: 78000, stock: 350 },
      { id: "v5", diameterMm: 90, priceToman: 62000, stock: 125 },
    ],
  },
  {
    id: "p3",
    slug: "pvc-tee-45",
    name: "سه‌راهی ۴۵ درجه پولیکا",
    kind: "fitting",
    category: "اتصالات پولیکا",
    art: "tee",
    badge: "جدید",
    isNew: true,
    description:
      "سه‌راهی PVC-U برای انشعاب‌گیری از مسیر اصلی شبکه فاضلاب ساختمان.",
    variants: [
      { id: "v6", diameterMm: 110, priceToman: 125000, stock: 180 },
      { id: "v7", diameterMm: 160, priceToman: 245000, stock: 45 },
    ],
  },
  {
    id: "p4",
    slug: "pvc-coupler",
    name: "بوشن رابط پولیکا",
    kind: "fitting",
    category: "اتصالات پولیکا",
    art: "coupler",
    description: "رابط مستقیم برای اتصال دو شاخه هم‌قطر در اجرای لوله‌کشی.",
    variants: [
      { id: "v8", diameterMm: 110, priceToman: 42000, stock: 440 },
      { id: "v9", diameterMm: 90, priceToman: 35000, stock: 200 },
    ],
  },
  {
    id: "p5",
    slug: "pvc-heavy-pipe",
    name: "لوله پولیکا ضخیم",
    kind: "pipe",
    category: "لوله‌های پولیکا",
    art: "pipes",
    isNew: true,
    badge: "جدید",
    description:
      "لوله با ضخامت بیشتر؛ مشخصات فنی مورد نیاز پروژه باید پیش از خرید توسط مجری تأیید شود.",
    variants: [
      {
        id: "v10",
        diameterMm: 160,
        thicknessMm: 4.7,
        priceToman: 965000,
        stock: 80,
      },
      {
        id: "v11",
        diameterMm: 110,
        thicknessMm: 4,
        priceToman: 625000,
        stock: 100,
      },
    ],
  },
  {
    id: "p6",
    slug: "pvc-adhesive",
    name: "چسب مخصوص PVC",
    kind: "accessory",
    category: "لوازم جانبی",
    art: "glue",
    description:
      "چسب مخصوص اتصال لوله و اتصالات PVC. پیش از مصرف، دستورالعمل سازنده بررسی شود.",
    variants: [{ id: "v12", diameterMm: 0, priceToman: 185000, stock: 0 }],
  },
];

export const categories = [
  {
    key: "pipe",
    title: "لوله‌های پولیکا",
    subtitle: "قطرها و ضخامت‌های متنوع",
    art: "pipes",
  },
  {
    key: "fitting",
    title: "اتصالات پولیکا",
    subtitle: "اتصال مطمئن، اجرای دقیق",
    art: "elbow",
  },
  {
    key: "accessory",
    title: "لوازم جانبی",
    subtitle: "تکمیل تجهیزات پروژه",
    art: "glue",
  },
] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function findVariant(id: string) {
  for (const product of products) {
    const variant = product.variants.find((item) => item.id === id);
    if (variant) return { product, variant };
  }
  return undefined;
}
