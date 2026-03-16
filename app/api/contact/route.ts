import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { type, name, email, company, message } = await req.json();

    if (!type || !name || !email || !message) {
      return NextResponse.json(
        { error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toAddress = process.env.CONTACT_TO || "support@mail.fujimin-pass.com";

    await transporter.sendMail({
      from: `"FUJIMI DX Lab お問い合わせ" <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: `【お問い合わせ】${type} - ${name}様`,
      text: [
        `お問い合わせ種別: ${type}`,
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `会社名/店舗名: ${company || "未入力"}`,
        "",
        "お問い合わせ内容:",
        message,
      ].join("\n"),
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"FUJIMI DX Lab" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "【FUJIMI DX Lab】お問い合わせありがとうございます",
      text: [
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました。しばらくしてからお試しください。" },
      { status: 500 }
    );
  }
}
