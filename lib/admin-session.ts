import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret";
const COOKIE_NAME = "dxlab_admin_token";
const MAX_AGE = 60 * 60 * 24 * 30; // 30日

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const payload = `admin:${Date.now()}`;
  const token = `${payload}.${sign(payload)}`;
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  return sig === sign(payload);
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
