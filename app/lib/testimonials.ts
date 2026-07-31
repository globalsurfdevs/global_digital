import connectDB from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import Testimonials from "../models/Testimonials";

export const getTestimonials = unstable_cache(
  async () => {
    await connectDB();

    const testimonials = await Testimonials.findOne({})
      .lean();

    return JSON.parse(JSON.stringify(testimonials));
  },
  ["testimonials"],
  {
    tags: ["testimonials"],
    revalidate: 60, // same as your fetch
  }
);