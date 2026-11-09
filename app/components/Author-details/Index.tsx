import React from "react";
import AuthorBanner from "./sections/Banner";
import AboutSection from "./sections/About";
import BlogList from "./sections/BlogList";

const Index = ({ dbBlogs, author }: { dbBlogs: any[]; author: any }) => {
  return (
    <>
      <AuthorBanner
        name={author.name}
        designation={author.designation}
        linkedin={author.linkedin}
        image={author.imageBig}
      />
      <AboutSection data={author.about} />
      <BlogList dbBlogs={dbBlogs} authorName={author.name} />
    </>
  );
};

export default Index;
