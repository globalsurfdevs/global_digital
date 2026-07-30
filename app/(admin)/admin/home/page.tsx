import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Home from "@/app/components/AdminHome/AdminHome";



const HomePage = () => {
  return (
    <DefaultLayout>
        <Home/>
    </DefaultLayout>
  );
};

export default HomePage;