"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { loginSchema, type LoginInput } from "./validation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  return (
    <form
      onSubmit={handleSubmit(() =>
        setMessage(
          "اعتبارسنجی انجام شد. ورود واقعی و ثبت‌نام پیامکی در فاز دوم فعال می‌شوند. اطلاعات شما ارسال یا ذخیره نشد.",
        ),
      )}
      noValidate
      className="login-form"
    >
      <label htmlFor="mobile">شماره موبایل</label>
      <input
        id="mobile"
        inputMode="tel"
        autoComplete="tel"
        dir="ltr"
        placeholder="09xxxxxxxxx"
        aria-invalid={!!errors.mobile}
        aria-describedby={errors.mobile ? "mobile-error" : undefined}
        {...register("mobile")}
      />
      {errors.mobile && (
        <p id="mobile-error" className="form-error">
          {errors.mobile.message}
        </p>
      )}
      <label htmlFor="password">رمز عبور</label>
      <div className="password-field">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="حداقل ۸ نویسه"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
        <button
          type="button"
          className="icon-button"
          aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
      {errors.password && (
        <p id="password-error" className="form-error">
          {errors.password.message}
        </p>
      )}
      <button className="button button-yellow login-submit" type="submit">
        بررسی فرم ورود <ArrowLeft size={19} />
      </button>
      <p role="status" className="form-success">
        {message}
      </p>
      <div className="login-notice">
        <LockKeyhole size={19} />
        <span>
          این فرم نمایشی است. از اطلاعات و رمز عبور واقعی استفاده نکنید. ثبت‌نام
          و بازیابی رمز هنوز فعال نیست.
        </span>
      </div>
    </form>
  );
}
