import one from "@/public/assets/testimonials/Alissar.avif";
import heshamabdeen from "@/public/assets/testimonials/heshamabdeen.png";
import logoone from "@/public/assets/logos/abt-gulfcryo.svg";
import logotwo from "@/public/assets/logos/abt-prestige.svg";
import logothree from "@/public/assets/testimonials/asgc.svg";
import karim from "@/public/assets/testimonials/karim.jpeg";
import dummy from "@/public/assets/testimonials/dummy-user.png";
import educap from "@/public/assets/testimonials/educap.svg";

export const testimonials = [
  {
    image: karim,
    name: "Karim El Shennawy",
    position: "Business Development Director",
    message:
      "“Global Surf proved to be talented group that delivered their project in excellent manner. They are responsive, and we trusted them day by day with more tasks and they continue to prove their capabilities.”",
    company: "ASGC",
    logo: logothree,
    alt: "ASGC Group Logo",
  },
  {
    image: one,
    name: "Alissar Nasrallah",
    position: "Regional Marcomms Manager",
    message:
      "“Caring team, looks out for what you want and makes sure to give you the outcome you want, quick, you'll find them next to you in critical moments.”",
    company: "Gulf Cryo",
    logo: logoone,
    alt: "Gulf Cryo Logo",
  },
  {
    image: heshamabdeen,
    name: "Hesham Abdeen",
    position: "Head of Accreditation and Evaluations",
    message:
      "“Because of the way that Global Surf encourages collaboration, working with the team has been a pleasure. Their staff welcomes our input and fosters open communication, which has led to a website that reflects our brand and serves our particular demands. Global Surf offers a plethora of knowledge and creativity.”",
    company: "Educap",
    logo: educap,
    alt: "Educap Logo",
  },
  {
    image: dummy,
    name: "Omar M. Bin Dhaher Almheiri",
    position: "President",
    message:
      "“We have vary good relation and experience with your professional company Not to mention the extra care we get from your team We like this relationship to continue for the success of both of us”",
    company: "Prestige",
    logo: logotwo,
    alt: "Prestige Logo",
  },
];
