
import React from 'react'
import HeroSection from './HeroSection'
import BlogList from './BlogList'

import { BlogData } from "../../data/BlogData";

const Blogs = () => {
  return (
    <>
        <HeroSection/>
        <BlogList   BlogData={BlogData}/>
    </>
  )
}

export default Blogs