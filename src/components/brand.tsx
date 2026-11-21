import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${inverse ? "brand-inverse" : ""}`}
      aria-label="نی پولیکا، صفحه اصلی"
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>
          نی پولیکا<span className="brand-dot">.</span>
        </strong>
        <small>NAY POLIKA</small>
      </span>
    </Link>
  );
}
