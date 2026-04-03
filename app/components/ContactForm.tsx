"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
  "導入を検討したい",
  "まずは話を聞きたい",
  "料金について知りたい",
  "デモを見たい",
  "その他",
];

export default function ContactForm() {
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
      <div className="mx-auto max-w-lg rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm" role="status" aria-live="polite">
        <p className="text-2xl font-bold">送信完了しました！</p>
        <p className="mt-3 text-blue-100/80">
          お問い合わせを受け付けました。内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setTimeout(() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" }), 100);
          }}
          className="mt-6 text-sm text-blue-200 underline hover:text-white"
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
        <p className="mb-2 text-sm text-blue-100/80">お問い合わせ種別を選択してください <span className="text-blue-200">*</span></p>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="お問い合わせ種別">
        {INQUIRY_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={form.type === t}
            onClick={() => setForm((f) => ({ ...f, type: t }))}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              form.type === t
                ? "border-white bg-white text-gray-900"
                : "border-white/30 bg-white/5 text-white hover:bg-white/10"
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
          <label htmlFor="contact-name" className="mb-1 block text-sm text-blue-100/80">お名前 <span className="text-blue-200">*</span></label>
          <input
            id="contact-name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-200/50 backdrop-blur-sm outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm text-blue-100/80">メールアドレス <span className="text-blue-200">*</span></label>
          <input
            id="contact-email"
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-200/50 backdrop-blur-sm outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="contact-company" className="mb-1 block text-sm text-blue-100/80">会社名 / 店舗名 <span className="text-slate-400">(任意)</span></label>
        <input
          id="contact-company"
          type="text"
          maxLength={200}
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-200/50 backdrop-blur-sm outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm text-blue-100/80">お問い合わせ内容 <span className="text-blue-200">*</span></label>
        <textarea
          id="contact-message"
          required
          rows={4}
          maxLength={5000}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-200/50 backdrop-blur-sm outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit || status === "sending"}
        className="glow-blue w-full rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>
      <p className="text-center text-xs text-blue-100/60">
        通常1〜2営業日以内にメールでご返信いたします
      </p>

      {status === "error" && (
        <p className="text-center text-base font-medium text-red-300" role="alert">
          送信に失敗しました。しばらくしてからお試しください。
        </p>
      )}
    </form>
  );
}
