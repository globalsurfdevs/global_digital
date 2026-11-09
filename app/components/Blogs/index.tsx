import React from "react";
import HeroSection from "./HeroSection";
import BlogList from "./BlogList";



const Blogs = async ({ dbBlogs }: { dbBlogs: any[] }) => {
  return (
    <>
      <HeroSection />
      <BlogList dbBlogs={dbBlogs} />
    </>
  );
};

export default Blogs;
