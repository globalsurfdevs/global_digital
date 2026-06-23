import React from "react";
import HeroSection from "./HeroSection";
import BlogList from "./BlogList";

import { BlogData } from "../../data/BlogData";

const Blogs = async ({dbBlogs}: {dbBlogs: any[]}) => {
  return (
    <>
      <HeroSection />
      <BlogList BlogData={BlogData} dbBlogs={dbBlogs} />
    </>
  );
};

export default Blogs;
