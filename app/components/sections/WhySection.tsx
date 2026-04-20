import FadeIn from "../FadeIn";

export default function WhySection() {
  return (
    <section id="why" className="bg-[#FFFCFA] px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#5A67D8] font-[family-name:var(--font-quicksand)]">
              Our Story
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#3E362E] md:text-4xl">
              なぜ、私たちが作るのか。
            </h2>
            <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#E8E2D9]" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 space-y-6 text-base leading-loose text-[#52483F] md:text-lg">
            <p>
              旅館は、予約が基軸の商売です。
              <br />
              これまで多くの予約システムを使ってきました。
            </p>
            <p>
              でも、痒いところに手が届かない。
              <br />
              機能が多すぎて使いこなせない。
              <br />
              オプションを足していくと、月数万円になる。
            </p>
            <p className="font-bold text-[#3E362E]">
              同じ悩みを持つお店は、たくさんあるはずです。
            </p>
            <p>
              幸い、私にはIT知識がありました。
              <br />
              AIを使えば、小さな会社でもカバーできる。
              <br />
              小さい会社だからこそ、細かい対応ができる。
              <br />
              24時間対応の宿で鍛えた現場感覚を、ツールに込められる。
            </p>
            <p>
              低価格で、ちょうどいい機能。
              <br />
              AIが仕事をサポートしてくれる。
              <br />
              そんなツールを作っています。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 rounded-3xl border border-[#E8E2D9] bg-white p-8 text-center shadow-sm md:p-10">
            <p className="text-xl font-bold leading-relaxed text-[#3E362E] md:text-2xl">
              まずは、
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F97316]">得意分野の予約</span>
                <span className="absolute bottom-1 left-0 -z-0 h-2 w-full bg-[#FFE4CC]" />
              </span>
              から。
            </p>
            <p className="mt-4 text-sm text-[#8A7F74]">
              旅館経営者が、AIと一緒に作っています。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
