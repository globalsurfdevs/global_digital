import { Metadata } from "next";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Contact from "@/app/components/Contact/Contact";



const ContactUs = () => {
  return (
    <DefaultLayout>
        <Contact/>
    </DefaultLayout>
  );
};

export default ContactUs;