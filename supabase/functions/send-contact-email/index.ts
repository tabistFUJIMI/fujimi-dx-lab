import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

serve(async (req) => {
  // Database Webhook から呼ばれる
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response("No record", { status: 400 });
    }

    const { type, name, email, company, message } = record;

    const smtpHost = Deno.env.get("SMTP_HOST")!;
    const smtpPort = Number(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER")!;
    const smtpPass = Deno.env.get("SMTP_PASS")!;

    const client = new SmtpClient();

    await client.connectTLS({
      hostname: smtpHost,
      port: smtpPort,
      username: smtpUser,
      password: smtpPass,
    });

    // 管理者への通知メール
    await client.send({
      from: smtpUser,
      to: smtpUser,
      subject: `【お問い合わせ】${type} - ${name}様`,
      content: [
        `お問い合わせ種別: ${type}`,
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `会社名/店舗名: ${company || "未入力"}`,
        "",
        "お問い合わせ内容:",
        message,
      ].join("\n"),
    });

    // 送信者への自動返信
    await client.send({
      from: smtpUser,
      to: email,
      subject: "【FUJIMI DX Lab】お問い合わせありがとうございます",
      content: [
        `${name} 様`,
        "",
        "お問い合わせいただきありがとうございます。",
        "以下の内容で承りました。担当者より折り返しご連絡いたします。",
        "",
        "─────────────────────────",
        `お問い合わせ種別: ${type}`,
        `お名前: ${name}`,
        `会社名/店舗名: ${company || "未入力"}`,
        "",
        "お問い合わせ内容:",
        message,
        "─────────────────────────",
        "",
        "FUJIMI DX Lab",
        "ふじみ企業有限会社",
        "support@mail.fujimin-pass.com",
      ].join("\n"),
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
