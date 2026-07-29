import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AddMember from "@/app/components/AddMember/AddMember";




const AddMemberPage = () => {
  return (
    <DefaultLayout>
        <AddMember editMode/>
    </DefaultLayout>
  );
};

export default AddMemberPage;