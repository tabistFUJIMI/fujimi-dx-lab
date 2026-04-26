"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
  "共創パートナーに応募したい",
  "導入を検討したい",
  "まずは話を聞きたい",
  "料金について知りたい",
  "デモを見たい",
  "その他",
];

type Variant = "dark" | "light";

const STYLES: Record<Variant, {
  label: string;
  required: string;
  optional: string;
  input: string;
  chipSelected: string;
  chipUnselected: string;
  submit: string;
  helper: string;
  helperLink: string;
  helperLinkHover: string;
  error: string;
  successCard: string;
  successText: string;
  successLink: string;
}> = {
  dark: {
    label: "text-blue-100/80",
    required: "text-blue-200",
    optional: "text-slate-400",
    input:
      "border border-white/20 bg-white/10 text-white placeholder-blue-200/50 backdrop-blur-sm focus:border-white/50 focus:ring-1 focus:ring-white/30",
    chipSelected: "border-white bg-white text-gray-900",
    chipUnselected: "border-white/30 bg-white/5 text-white hover:bg-white/10",
    submit: "glow-blue bg-white text-gray-900",
    helper: "text-blue-100/60",
    helperLink: "text-blue-100/60 underline",
    helperLinkHover: "hover:text-white",
    error: "text-red-300",
    successCard: "bg-white/10 backdrop-blur-sm",
    successText: "text-blue-100/80",
    successLink: "text-blue-200 hover:text-white",
  },
  light: {
    label: "text-[#52483F]",
    required: "text-[#F97316]",
    optional: "text-[#A89889]",
    input:
      "border border-orange-200 bg-white text-[#3E362E] placeholder-[#B8A99A] focus:border-[#F97316] focus:ring-2 focus:ring-orange-200",
    chipSelected: "border-[#F97316] bg-[#F97316] text-white",
    chipUnselected:
      "border-orange-200 bg-white text-[#52483F] hover:bg-orange-50",
    submit: "bg-[#F97316] text-white hover:bg-[#EA580C] shadow-md",
    helper: "text-[#8A7F74]",
    helperLink: "text-[#8A7F74] underline",
    helperLinkHover: "hover:text-[#F97316]",
    error: "text-red-600",
    successCard: "bg-orange-50 border border-orange-200",
    successText: "text-[#52483F]",
    successLink: "text-[#F97316] hover:text-[#EA580C]",
  },
};

export default function ContactForm({ variant = "dark" }: { variant?: Variant }) {
  const s = STYLES[variant];

  const [form, setForm] = useState({
    type: "",
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const canSubmit = form.type && form.name && form.email && form.message;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ type: "", name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`mx-auto max-w-lg rounded-2xl p-8 text-center ${s.successCard}`} role="status" aria-live="polite">
        <p className={`text-2xl font-bold ${s.successText}`}>送信完了しました！</p>
        <p className={`mt-3 ${s.successText}`}>
          お問い合わせを受け付けました。内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setTimeout(() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" }), 100);
          }}
          className={`mt-6 text-sm underline ${s.successLink}`}
        >
          別のお問い合わせをする
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
      {/* Inquiry Type */}
      <div>
        <p className={`mb-2 text-sm ${s.label}`}>お問い合わせ種別を選択してください <span className={s.required}>*</span></p>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="お問い合わせ種別">
        {INQUIRY_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={form.type === t}
            onClick={() => setForm((f) => ({ ...f, type: t }))}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              form.type === t ? s.chipSelected : s.chipUnselected
            }`}
          >
            {t}
          </button>
        ))}
        </div>
      </div>

      {/* Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={`mb-1 block text-sm ${s.label}`}>お名前 <span className={s.required}>*</span></label>
          <input
            id="contact-name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={`w-full rounded-xl px-4 py-3 text-sm outline-none ${s.input}`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={`mb-1 block text-sm ${s.label}`}>メールアドレス <span className={s.required}>*</span></label>
          <input
            id="contact-email"
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={`w-full rounded-xl px-4 py-3 text-sm outline-none ${s.input}`}
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="contact-company" className={`mb-1 block text-sm ${s.label}`}>会社名 / 店舗名 <span className={s.optional}>(任意)</span></label>
        <input
          id="contact-company"
          type="text"
          maxLength={200}
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className={`w-full rounded-xl px-4 py-3 text-sm outline-none ${s.input}`}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={`mb-1 block text-sm ${s.label}`}>お問い合わせ内容 <span className={s.required}>*</span></label>
        <textarea
          id="contact-message"
          required
          rows={4}
          maxLength={5000}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`w-full resize-none rounded-xl px-4 py-3 text-sm outline-none ${s.input}`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit || status === "sending"}
        className={`w-full rounded-xl px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${s.submit}`}
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>
      <p className={`text-center text-xs ${s.helper}`}>
        通常1〜2営業日以内にメールでご返信いたします
      </p>
      <p className={`text-center text-xs ${s.helper} mt-2`}>
        お急ぎの方は<a href="https://lin.ee/UPArZn9" target="_blank" rel="noopener noreferrer" className={`underline ${s.helperLinkHover}`}>LINEでもご相談いただけます</a>
      </p>

      {status === "error" && (
        <p className={`text-center text-base font-medium ${s.error}`} role="alert">
          送信に失敗しました。しばらくしてからお試しください。
        </p>
      )}
    </form>
  );
}
