import React from "react";

export default function AboutSection({data}:{data:string}) {
  return (
    <section className="xl:py-[140px] py-[70px]">
    <div className="w-full container flex flex-col gap-[20px]">
      <h2 className="text-[65px] text-black leading-[70px]">
        About
      </h2>

      <div className="flex flex-col gap-4 max-w-3xl">
        {data.split("\n").map((text, i) => (
          <p key={i} className="text-[#77787B] text-[19px] leading-[28.1px]">
            {text}
          </p>
        ))}
      </div>
    </div>
    </section>
  );
}