import Reveal from "./Reveal";
import ShiftVisual from "./ShiftVisual";

export default function IntroSplit() {
  return (
    <section>
      <div className="mx-auto w-full max-w-[1100px] px-8">
        <div className="grid grid-cols-1 items-center gap-9 min-[841px]:grid-cols-2 min-[841px]:gap-14">
          <div>
            <Reveal as="h2" delay={1}>
              Advertising is moving into the{" "}
              <span className="text-[#E63E31]">conversation.</span>
            </Reveal>
            <Reveal
              as="p"
              delay={2}
              className="mt-4 max-w-[62ch] text-[16.5px] text-[#2b2b2f]"
            >
              <strong>Yes, this is real, and it&apos;s live now.</strong> More
              and more people start their research inside ChatGPT rather than a
              search bar. Where attention goes, advertising follows, and
              it&apos;s now genuinely possible to place your brand inside those
              conversations.
            </Reveal>
            <Reveal
              as="p"
              delay={2}
              className="mt-4 max-w-[62ch] text-[16.5px] text-[#2b2b2f]"
            >
              It&apos;s early. The businesses that understand this channel first
              will have an advantage while it&apos;s still uncrowded and
              inexpensive. But &ldquo;early&rdquo; also means unproven, which is
              exactly why it&apos;s worth understanding properly before you
              commit real budget.
            </Reveal>
          </div>
          <Reveal as="div" delay={1}>
            <ShiftVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
