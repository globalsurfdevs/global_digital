"use client";

interface BlogContentItem {
  _id: string;
  title: string;
  content: string;
}

interface BlogContentSectionProps {
  items: BlogContentItem[];
  articleHtml?: string;
}

const createId = (id: string) => id.toLowerCase().replace(/\s+/g, "-");

const BlogContentSection = ({ items, articleHtml }: BlogContentSectionProps) => {
  if (articleHtml) {
    return (
      <section className="blog-article-body container mx-auto pb-[50px] lg:pb-[100px]">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: articleHtml }} />
      </section>
    );
  }
  return (
    <section className="container mx-auto py-[50px] lg:py-[100px]">
      <div className="flex flex-col gap-[50px] lg:gap-[80px]">
        {items.map((item) => (
          <div
            key={item._id}
            id={createId(item._id)}
            className="blog-content-section"
          >
            <h2 className="title-65 mb-[40px]">{item.title}</h2>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogContentSection;
