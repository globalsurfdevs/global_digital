"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { BlogData } from "../../data/BlogData";




const BlogDetails = () => {
    // const router = useRouter();
    // const { id } = router.query; // Fetch the ID from the URL
    // const [blogData, setBlogData] = useState<any>(null);



    // useEffect(() => {
    //   if (id) {
    //     // Fetch the blog data based on the ID
    //     const blog = BlogData.find((b) => b.id === Number(id));
    //     setBlogData(blog);
    //   }
    // }, [id]);

    // if (!blogData) {
    //   return <p>Loading...</p>;
    // }


    return (
        <>
            {/* <h1>{blogData.title}</h1> */}
        </>
    )
}

export default BlogDetails