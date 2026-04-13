import { NextResponse } from "next/server";
import { destroyAdminSession } from "../../../lib/admin-session";

export async function POST() {
  await destroyAdminSession();
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "https://fujimi-dx-lab.com"));
}
