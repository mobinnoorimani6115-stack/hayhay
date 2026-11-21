-- Database invariants not expressible directly in the Prisma schema.
CREATE UNIQUE INDEX "User_single_admin" ON "User" ("role") WHERE "role" = 'ADMIN';
CREATE UNIQUE INDEX "Address_one_default_per_user" ON "Address" ("userId") WHERE "isDefault" = true;

ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_valid_counts"
  CHECK ("onHand" >= 0 AND "reserved" >= 0 AND "reserved" <= "onHand");
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_valid_values"
  CHECK ("priceToman" >= 0 AND "diameterMm" >= 0 AND ("thicknessMm" IS NULL OR "thicknessMm" > 0) AND ("lengthMm" IS NULL OR "lengthMm" > 0));
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_positive_quantity" CHECK ("quantity" > 0);
ALTER TABLE "InventoryReservation" ADD CONSTRAINT "InventoryReservation_positive_quantity" CHECK ("quantity" > 0);
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_valid_amounts"
  CHECK ("quantity" > 0 AND "unitPriceToman" >= 0 AND "discountToman" >= 0 AND "totalToman" >= 0
    AND "totalToman" = "unitPriceToman" * "quantity" - "discountToman");
ALTER TABLE "Order" ADD CONSTRAINT "Order_valid_amounts"
  CHECK ("subtotalToman" >= 0 AND "discountToman" >= 0 AND "discountToman" <= "subtotalToman"
    AND ("shippingToman" IS NULL OR "shippingToman" >= 0)
    AND (("shippingToman" IS NULL AND "totalToman" IS NULL)
      OR ("shippingToman" IS NOT NULL AND "totalToman" IS NOT NULL
        AND "totalToman" = "subtotalToman" - "discountToman" + "shippingToman")));
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_valid_receipt"
  CHECK ("amountToman" > 0 AND "receiptSizeBytes" > 0 AND "receiptSizeBytes" <= 5242880
    AND "receiptMimeType" IN ('image/jpeg', 'image/png', 'image/webp'));
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_review_required"
  CHECK ("status" = 'PENDING' OR ("reviewedById" IS NOT NULL AND "reviewedAt" IS NOT NULL));
ALTER TABLE "Review" ADD CONSTRAINT "Review_valid_rating" CHECK ("rating" BETWEEN 1 AND 5);
ALTER TABLE "DiscountCampaign" ADD CONSTRAINT "DiscountCampaign_valid_window"
  CHECK ("percent" BETWEEN 1 AND 100 AND "endsAt" > "startsAt");
ALTER TABLE "OtpChallenge" ADD CONSTRAINT "OtpChallenge_valid_limits"
  CHECK ("attempts" BETWEEN 0 AND 5 AND "expiresAt" > "createdAt");
