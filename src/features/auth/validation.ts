import { z } from "zod";
import { normalizeDigits } from "@/lib/format";

export const loginSchema = z.object({
  mobile: z
    .string()
    .transform(normalizeDigits)
    .pipe(
      z
        .string()
        .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود."),
    ),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ نویسه داشته باشد.")
    .max(128, "رمز عبور بیش از حد طولانی است."),
});
export type LoginInput = z.input<typeof loginSchema>;
