import { sampleOrders } from "./sample-data";
import { number, toman } from "@/lib/format";

export function OrderTable() {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th>عنوان نمایشی</th>
            <th>اقلام</th>
            <th>جمع محصولات</th>
            <th>وضعیت نمونه</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map((order) => (
            <tr key={order.number}>
              <td className="order-number" dir="ltr">
                {order.number}
              </td>
              <td>{order.project}</td>
              <td>{number(order.items)} مدل</td>
              <td>{toman(order.total)}</td>
              <td>
                <span className={`status-pill ${order.tone}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
