

interface WhyChooseData {
  tag: string;
  title: string;
  description: string;
  items: {
    id: number;
    value: string;
    label: string;
  }[];
}

const WhyChoose = ({data}: {data: WhyChooseData}) => {
  return (
    <section className="bg-[#f6f6f6] py-120">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] 3xl:grid-cols-[931px_520px] gap-4 3xl:gap-[169px]">
          <div>
            <div className="mb-4 xl:mb-8 xxl:mb-12">
              <div className="flex items-center gap-2 mb-4 md:mb-6 xl:mb-8 xxl:mb-12">
                <h3 className="text-28 leading-[1] uppercase tracking-[-0.025em] text-muted">
                  {data.tag}
                </h3>
                <div className="h-5 w-5 bg-primary"></div>
              </div> 
              <h2 className="title-60 tracking-[-0.025em]"> {data.title} </h2>
            </div>
            <p className="text-muted text-18 max-w-[58ch]">{data.description}</p>
          </div>
          <div>
            {
              data.items.map((item) => (
                <div key={item.id} className="mb-4 lg:mb-6 xl:mb-8 xxl:mb-10 3xl:mb-[46px] border-b border-black/20 pb-4 lg:pb-6 xl:pb-10 2xl:pb-[46px]">
                  <h3 className="text-60 font-normal leading-none mb-3 text-primary tracking-[-0.025em]">{item.value}</h3>
                  <p className="text-18 leading-[1.444444444444444] uppercase font-lexend font-semibold">{item.label}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;