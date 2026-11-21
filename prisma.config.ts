import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Generation and the sample UI do not require an active database.
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/naypolika",
  },
});
