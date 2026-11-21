export type ProductKind = "pipe" | "fitting" | "accessory";

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  kind: ProductKind;
  category: string;
  description: string;
  art: "pipes" | "elbow" | "tee" | "coupler" | "glue";
  badge?: string;
  isNew?: boolean;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  diameterMm: number;
  thicknessMm?: number;
  priceToman: number;
  stock: number;
}
