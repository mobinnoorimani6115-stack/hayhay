import { products } from "@/features/catalog/data";
import { PipeArt } from "@/components/pipe-art";
import { number, toman } from "@/lib/format";

export default function AdminProductsPage() {
  return (
    <>
      <div className="page-heading">
        <span className="section-kicker">کاتالوگ نمونه</span>
        <h1>محصولات و موجودی</h1>
        <p>
          ویرایش قیمت، موجودی، دسته‌بندی و ورود Excel در فاز دوم و پس از احراز
          هویت مدیر فعال می‌شود.
        </p>
      </div>
      <section className="admin-panel">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>محصول</th>
                <th>مدل</th>
                <th>قطر / ضخامت (میلی‌متر)</th>
                <th>قیمت واحد نمونه</th>
                <th>موجودی نمونه</th>
              </tr>
            </thead>
            <tbody>
              {products.flatMap((p) =>
                p.variants.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div className="admin-product-cell">
                        <PipeArt kind={p.art} />
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td dir="ltr">{v.id.toUpperCase()}</td>
                    <td>
                      {v.diameterMm ? number(v.diameterMm) : "—"} /{" "}
                      {v.thicknessMm ? number(v.thicknessMm) : "—"}
                    </td>
                    <td>{toman(v.priceToman)}</td>
                    <td>
                      <span
                        className={`status-pill ${v.stock ? "green" : "amber"}`}
                      >
                        {v.stock
                          ? `${number(v.stock)} ${p.kind === "pipe" ? "شاخه" : "عدد"}`
                          : "ناموجود"}
                      </span>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
