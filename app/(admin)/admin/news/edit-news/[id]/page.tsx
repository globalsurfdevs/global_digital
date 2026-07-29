import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AddNews from "@/app/components/AddNews/AddNews";




const NewsPage = () => {
  return (
    <DefaultLayout>
        <AddNews editMode/>
    </DefaultLayout>
  );
};

export default NewsPage;