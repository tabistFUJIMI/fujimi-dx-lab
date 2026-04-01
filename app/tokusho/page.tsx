import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 - FUJIMI DX Lab",
  description:
    "FUJIMI DX Labが提供するサービスに関する特定商取引法に基づく表記です。",
};

export default function TokushoPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 pb-12 pt-32 text-center">
        <FadeIn>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            特定商取引法に基づく表記
          </h1>
        </FadeIn>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm text-left text-slate-700">
                <tbody className="divide-y divide-slate-200">
                  <Row label="販売業者" value="ふじみ企業有限会社" />
                  <Row label="運営責任者" value="代表取締役 佐野文男" />
                  <Row label="事業部責任者" value="FUJIMI DX Lab事業部 佐野弘明" />
                  <Row label="所在地" value="〒416-0913 静岡県富士市荒田島町3-20" />
                  <Row
                    label="連絡先"
                    value={
                      <>
                        メール:{" "}
                        <a
                          href="mailto:contact@fujimi-dx-lab.com"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          contact@fujimi-dx-lab.com
                        </a>
                      </>
                    }
                  />
                  <Row label="販売URL" value="https://fujimin-pass.com" />
                  <Row
                    label="販売価格"
                    value={
                      <div className="space-y-2">
                        <p className="font-medium text-slate-900">
                          各サービスの月額料金（税込）
                        </p>
                        <div className="space-y-1.5">
                          <p className="font-medium text-slate-800">Reserve Navi（予約管理）</p>
                          <p>フリー: ¥0 / ライト: ¥980 / スタンダード: ¥2,980 / プロ: ¥5,500</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="font-medium text-slate-800">Ask Navi（AI応答）/ Rule Navi（社内規則AI）</p>
                          <p>ライト: ¥550 / スタンダード: ¥1,100 / プロ: ¥2,200 / エンタープライズ: ¥5,500</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="font-medium text-slate-800">Shift Navi（シフト管理）</p>
                          <p>無料</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          ※ 追加ポイントの購入も可能です。詳細は
                          <a href="/pricing" className="text-blue-600 underline hover:text-blue-800 mx-0.5">
                            料金ページ
                          </a>
                          をご確認ください。
                        </p>
                      </div>
                    }
                  />
                  <Row
                    label="支払方法"
                    value="クレジットカード（Visa、Mastercard、American Express、JCB）※ 決済はStripeを通じて安全に処理されます"
                  />
                  <Row
                    label="支払時期"
                    value="サブスクリプション開始時に初回決済。以降、毎月自動更新時に決済。"
                  />
                  <Row
                    label="商品の引渡時期"
                    value="決済完了後、即時にサービスをご利用いただけます。"
                  />
                  <Row
                    label="返品・キャンセル"
                    value="デジタルサービスのため返品はお受けできません。サブスクリプションはいつでも月単位で解約可能です。解約後は当月末までサービスをご利用いただけます。"
                  />
                  <Row
                    label="動作環境"
                    value="Google Chrome、Safari、Microsoft Edge 等のモダンブラウザ（最新版推奨）。インターネット接続が必要です。"
                  />
                </tbody>
              </table>
            </div>

            <p className="mt-12 text-right text-xs text-slate-500">
              制定日: 2026年4月1日
            </p>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <tr>
      <th className="bg-slate-50 px-5 py-4 font-medium text-slate-900 whitespace-nowrap align-top w-40">
        {label}
      </th>
      <td className="px-5 py-4">{value}</td>
    </tr>
  );
}
