import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
  description: "FUJIMI DX Lab 管理画面",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
