import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AddMember from "@/app/components/AddMember/AddMember";


export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const AddMemberPage = () => {
  return (
    <DefaultLayout>
        <AddMember editMode/>
    </DefaultLayout>
  );
};

export default AddMemberPage;