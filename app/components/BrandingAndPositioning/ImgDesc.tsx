import Image from "next/image";

const ImgDesc = () => {
  return ( 
    <section className="py-8 xl:py-20 3xl:py-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-[auto_745px] gap-8 xxl:gap-20 items-center">
          <div>
            <Image src="assets/images/branding-positioning/main.jpg" alt="Branding and Positioning" width={1500} height={1500}
             className="w-full h-full object-contain max-h-[600px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6 xl:mb-8 xxl:mb-[81px]">
              <h2 className="text-28 uppercase tracking-[-0.025em] leading-[1] text-muted">
                Our approach
              </h2>
              <div className="h-5 w-5 bg-primary"></div>
            </div>
            <h2 className="title-60 mb-4 md:mb-5 xl:mb-10 tracking-[-0.025em]">A strategic reason behind every element</h2>
            <p className="text-18 text-77787B fnt-lexend leading-[1.444444444444444]">GS Digital works with UAE businesses to define who they are, how they're positioned in their market, and how that positioning is expressed consistently across every touchpoint. Our work starts with brand strategy — competitive positioning, audience definition, and messaging framework — before a single design decision is made. The result is a brand identity that has a strategic reason behind every element, not just an aesthetic one.</p>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default ImgDesc;