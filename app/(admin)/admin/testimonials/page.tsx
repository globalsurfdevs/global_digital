import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Home from "@/app/components/AdminHome/AdminHome";
import TestimonialsPage from "@/app/components/AdminTestimonials/AdminTestimonials";

const HomePage = () => {
  return <TestimonialsPage />;
};

export default HomePage;
