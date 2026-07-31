const TitleDesc = ({data}:any) => {
  return (
    <section className="">
      <div className="container py-120 border-b border-[#00000033]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="title-65" dangerouslySetInnerHTML={{__html:data.title}}></h2>
          </div>
          <div>
            <p className="text-19 text-muted leading-[1.444444444444444] fnt-lexend">{data.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TitleDesc;