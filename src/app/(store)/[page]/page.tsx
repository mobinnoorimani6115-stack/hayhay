import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronLeft } from "lucide-react";

const content: Record<
  string,
  { title: string; intro: string; sections: { title: string; text: string }[] }
> = {
  guide: {
    title: "راهنمای انتخاب لوله و اتصالات",
    intro:
      "برای انتخاب محصول، مشخصات مورد نیاز پروژه را از نقشه و مجری فنی دریافت کنید.",
    sections: [
      {
        title: "۱. کاربرد محصول را مشخص کنید",
        text: "ابتدا کاربرد، نوع اجرا و الزامات فنی پروژه را مشخص کنید. این راهنما جایگزین نظر طراح یا مجری تأسیسات نیست.",
      },
      {
        title: "۲. قطر و ضخامت را بررسی کنید",
        text: "مدل هر لوله بر اساس قطر و ضخامت انتخاب می‌شود. قطر اتصالات باید با لوله سازگار باشد. همه اندازه‌ها در کاتالوگ بر حسب میلی‌متر هستند.",
      },
      {
        title: "۳. تعداد شاخه‌ها را محاسبه کنید",
        text: "طول هر شاخه لوله ۶ متر و حداقل خرید هر مدل لوله ۱۰ شاخه است. برای اتصالات حداقل خرید یک عدد است. مقدار پرت و جزئیات اجرا را با مجری بررسی کنید.",
      },
      {
        title: "۴. پیش از پرداخت، هزینه حمل را ببینید",
        text: "در نسخه عملیاتی، پس از ثبت سبد و آدرس، مدیر هزینه حمل را مشخص می‌کند. شما پیش از پرداخت مبلغ کل را مشاهده و تأیید خواهید کرد.",
      },
    ],
  },
  about: {
    title: "درباره نی پولیکا",
    intro:
      "فروشگاه تخصصی لوله و اتصالات برای پروژه‌های ساختمانی در سراسر ایران.",
    sections: [
      {
        title: "انتخاب روشن، خرید آگاهانه",
        text: "نی پولیکا با هدف ارائه مشخصات شفاف مدل‌ها، مقایسه اندازه‌ها و ساده کردن تأمین لوله و اتصالات طراحی شده است.",
      },
      {
        title: "وضعیت فعلی فروشگاه",
        text: "این نسخه، فاز نخست توسعه است. محصولات، قیمت‌ها و موجودی‌ها نمونه‌اند و امکان ثبت سفارش، پرداخت و ورود واقعی هنوز فعال نشده است.",
      },
    ],
  },
  contact: {
    title: "تماس با نی پولیکا",
    intro:
      "اطلاعات رسمی تماس پس از تأیید مالک فروشگاه در این صفحه قرار می‌گیرد.",
    sections: [
      {
        title: "پشتیبانی و مشاوره خرید",
        text: "شماره تماس، نشانی و ساعات پاسخ‌گویی هنوز اعلام نشده‌اند. در این نسخه فرم ارسال پیام یا تیکت فعال نیست.",
      },
      {
        title: "پیش از انتخاب محصول",
        text: "قطر، ضخامت، تعداد و مقصد ارسال را مشخص کنید. برای آشنایی با مدل‌ها می‌توانید کاتالوگ نمونه و راهنمای خرید را ببینید.",
      },
    ],
  },
  terms: {
    title: "شرایط خرید و ارسال",
    intro:
      "شرح فرایند پیش‌بینی‌شده برای سفارش؛ فروش واقعی در فاز اول فعال نیست.",
    sections: [
      {
        title: "ثبت درخواست و محاسبه حمل",
        text: "مشتری محصولات و آدرس را ارسال می‌کند. موجودی و قیمت در سرور بررسی و سپس هزینه حمل توسط مدیر تعیین می‌شود.",
      },
      {
        title: "تأیید مبلغ نهایی",
        text: "مشتری جمع قیمت محصولات، هزینه حمل و مبلغ کل را می‌بیند و تأیید می‌کند. اطلاعات کارت‌به‌کارت فقط پس از این مرحله نمایش داده خواهد شد.",
      },
      {
        title: "ارسال رسید و بررسی پرداخت",
        text: "مشتری رسید را به صورت خصوصی بارگذاری می‌کند. مدیر پرداخت را بررسی می‌کند و پس از تأیید، سفارش وارد مرحله آماده‌سازی و ارسال می‌شود.",
      },
      {
        title: "موجودی، مهلت تأیید و لغو",
        text: "برای جلوگیری از فروش بیش از موجودی، رزرو زمان‌دار پیش‌بینی شده است. مدت رزرو پیش از فعال‌سازی فروش تعیین می‌شود. لغو سفارش فقط توسط مدیر انجام خواهد شد.",
      },
    ],
  },
};
export function generateStaticParams() {
  return Object.keys(content).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  return { title: content[(await params).page]?.title ?? "صفحه پیدا نشد" };
}
export default async function InformationPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const item = content[(await params).page];
  if (!item) notFound();
  return (
    <div className="container page-space info-page">
      <div className="breadcrumb">
        <Link href="/">خانه</Link>
        <ChevronLeft size={14} />
        <span>{item.title}</span>
      </div>
      <div className="info-hero">
        <BookOpen size={33} />
        <h1>{item.title}</h1>
        <p>{item.intro}</p>
      </div>
      <div className="info-sections">
        {item.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
      <Link href="/products" className="button button-yellow">
        مشاهده محصولات <ArrowLeft size={17} />
      </Link>
    </div>
  );
}
