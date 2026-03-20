import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_TYPES = [
  "導入を検討したい",
  "まずは話を聞きたい",
  "料金について知りたい",
  "デモを見たい",
  "その他",
];

// 簡易レート制限（IPベース: 5分間に3回まで）
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5分
  const maxRequests = 3;

  const attempts = rateLimitMap.get(ip)?.filter((t) => now - t < window) || [];
  if (attempts.length >= maxRequests) return false;
  attempts.push(now);
  rateLimitMap.set(ip, attempts);
  return true;
}

// メールアドレス簡易バリデーション
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // レート制限チェック
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "送信回数の上限に達しました。しばらくしてからお試しください。" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { type, name, email, company, message } = body;

    // 必須チェック
    if (!type || !name || !email || !message) {
      return NextResponse.json(
        { error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    // 型・長さ・形式バリデーション
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "無効なお問い合わせ種別です" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 100) {
      return NextResponse.json(
        { error: "お名前は100文字以内で入力してください" },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || email.length > 254 || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    if (company && (typeof company !== "string" || company.length > 200)) {
      return NextResponse.json(
        { error: "会社名は200文字以内で入力してください" },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json(
        { error: "お問い合わせ内容は5000文字以内で入力してください" },
        { status: 400 }
      );
    }

    await prisma.contact.create({
      data: {
        type,
        name: name.trim(),
        email: email.trim(),
        company: company?.trim() || null,
        message: message.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Contact form error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "送信に失敗しました。しばらくしてからお試しください。" },
      { status: 500 }
    );
  }
}
