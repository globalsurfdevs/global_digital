import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Team from "@/app/components/Team/Team";
import News from "@/app/components/News/News";




const NewsPage = () => {
  return (
    <DefaultLayout>
        <News/>
    </DefaultLayout>
  );
};

export default NewsPage;