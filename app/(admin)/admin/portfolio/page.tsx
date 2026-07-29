import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AdminPortfolio from "@/app/components/AdminPortfolio/AdminPortfolio";



const PortfolioPage = () => {
  return (
    <DefaultLayout>
        <AdminPortfolio/>
    </DefaultLayout>
  );
};

export default PortfolioPage;
