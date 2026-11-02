import React from "react";

export default function AboutSection({ data }: { data: string }) {
  return (
    <section className="py-[70px] xl:py-[140px]">
      <div className="container flex w-full flex-col gap-[20px]">
        <h2 className="text-[65px] leading-[70px] text-black">About</h2>

        <div className="flex max-w-3xl flex-col gap-4">
          {data.split("\n").map((text, i) => (
            <p key={i} className="text-[19px] leading-[28.1px] text-[#77787B]">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
