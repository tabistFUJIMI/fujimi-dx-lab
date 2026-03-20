import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";

export const metadata: Metadata = {
  title: "プライバシーポリシー - FUJIMI DX Lab",
  description:
    "FUJIMI DX Labにおける個人情報の取り扱いについて定めたプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 pb-12 pt-32 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            プライバシーポリシー
          </h1>
        </FadeIn>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <p className="mb-10 text-sm leading-relaxed text-slate-700">
              ふじみ企業有限会社（以下「当社」）は、FUJIMI DX
              Lab（以下「本サービス」）において、以下のとおり個人情報の取り扱いについて定めます。
            </p>

            <div className="space-y-8 text-sm leading-relaxed text-slate-700">
              {/* 1 */}
              <div>
                <h2 className="mb-2 text-base font-bold text-slate-900">
                  1. 収集する情報
                </h2>
                <p>
                  お名前、メールアドレス、会社名/店舗名（任意）、お問い合わせ内容
                </p>
              </div>

              {/* 2 */}
              <div>
                <h2 className="mb-2 text-base font-bold text-slate-900">
                  2. 利用目的
                </h2>
                <p>お問い合わせへの対応、サービスに関するご案内</p>
              </div>

              {/* 3 */}
              <div>
                <h2 className="mb-2 text-base font-bold text-slate-900">
                  3. 第三者提供
                </h2>
                <p>
                  法令に基づく場合を除き、お客様の同意なく第三者に提供しません。
                </p>
              </div>

              {/* 4 */}
              <div>
                <h2 className="mb-2 text-base font-bold text-slate-900">
                  4. 安全管理
                </h2>
                <p>
                  適切な安全管理措置を講じ、個人情報への不正アクセス等を防止します。
                </p>
              </div>

              {/* 5 */}
              <div>
                <h2 className="mb-2 text-base font-bold text-slate-900">
                  5. 開示・訂正・削除
                </h2>
                <p>
                  ご本人からの求めに応じ、個人情報の開示・訂正・削除に対応いたします。
                </p>
              </div>

              {/* 6 */}
              <div>
                <h2 className="mb-2 text-base font-bold text-slate-900">
                  6. お問い合わせ先
                </h2>
                <p>ふじみ企業有限会社 FUJIMI DX Lab事業部</p>
                <p>
                  <a
                    href="mailto:support@mail.fujimin-pass.com"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    support@mail.fujimin-pass.com
                  </a>
                </p>
              </div>
            </div>

            <p className="mt-12 text-right text-xs text-slate-500">
              制定日: 2026年3月20日
            </p>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
