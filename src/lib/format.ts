const faNumber = new Intl.NumberFormat("fa-IR");
export function number(value: number | bigint): string {
  return faNumber.format(value);
}
export function toman(value: number | bigint): string {
  return `${number(value)} تومان`;
}
export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (digit) =>
    String(digit.charCodeAt(0) - (digit <= "٩" ? 1632 : 1776)),
  );
}
