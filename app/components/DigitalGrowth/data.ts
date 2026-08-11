import { assets } from "@/public/assets/assets";
import jadFarah from "@/public/assets/testimonials/jadfarah.jpeg";
import ecc_logo from "@/public/assets/testimonials/ecc_logo.svg";
import heshamabdeen from "@/public/assets/testimonials/heshamabdeen.png";
import logoone from "@/public/assets/logos/abt-gulfcryo.svg";
import logotwo from "@/public/assets/logos/abt-prestige.svg";
import logothree from "@/public/assets/testimonials/asgc.svg";
import karim from "@/public/assets/testimonials/karim.jpeg";
import dummy from "@/public/assets/testimonials/dummy-user.png";
import educap from "@/public/assets/testimonials/educap.svg";
import alissar from "@/public/assets/testimonials/alissar.jpeg";

export const firstSection = {
  image: "images/end-to-end-digitalmarketing/banner.jpg",
  imageAlt: "Engineering and Infrastructure",
  title: "End-to-end digital marketing built specifically for the built industry",
  description:
    "A complete digital growth package designed for built environment teams to drive your growth and convert quality prospects.",
  items: [
    {
      _id: "1",
      title: "Book a 30-Minute Call",
      link: "/contact",
    },
  ],
};

export const featureStrip = {
  items: [
    {
      _id: "1",
      icon: assets.futureproofwebsites,
      text: "Fast, secure, and future-proof websites ",
    },
    {
      _id: "2",
      icon: assets.googleaisearch,
      text: "Secure top presence on Google & AI search.",
    },
    {
      _id: "3",
      icon: assets.stricttracking,
      text: "Strict tracking & senior-led reviews.",
    },
    {
      _id: "4",
      icon: assets.benchmark,
      text: "Build executive authority & benchmark rivals",
    },
  ],
};


export const trustedBy = {
  label: "Trusted by Built Environment leaders",
  logos: [
    { _id: "1", name: "Innovo", image: assets.innovodg, alt: "Innovo" },
    { _id: "2", name: "Sobha Constructions", image: assets.sobha, alt: "Sobha Constructions" },
    { _id: "3", name: "Shapoorji Pallonji", image: assets.sp, alt: "Shapoorji Pallonji" },
    { _id: "4", name: "Imtiaz Developments", image: assets.imtiaz, alt: "Imtiaz Developments" },
    { _id: "5", name: "u", image: assets.ulogo, alt: "Emblem" },
    { _id: "6", name: "Sobha", image: assets.sobha, alt: "Sobha" },
  ],
};

export const whatWeHearData = {
  title: "What we usually hear in the first meeting.",
  description: "From Google rankings and AI search visibility to high-performing websites, social media & paid campaigns, content, and brand strategy, we help built environment businesses attract the right audience and turn digital attention into real business.",
  data: [
    {
      id: 1,
      title: "“Why aren't we getting shortlisted for tenders we're clearly qualified for?”",
      desc: "Main contractor",
    },
    {
      id: 2,
      title: "“A smaller competitor looks more credible online than we do.”",
      desc: "Engineering consultancy ",
    },
    {
      id: 3,
      title: "“I don't know what a bank or JV partner sees when they check us out.”",
      desc: "Developer",
    },
    {
      id: 4,
      title: "“We're invisible when someone asks ChatGPT who to call in our industry.” ",
      desc: "Manufacturer",
    },
    {
      id: 5,
      title: "“Our website doesn't reflect the scale of what we actually build.” ",
      desc: "Industrial group",
    },
    {
      id: 6,
      title: "“We were burned by an agency before and have nothing to show for it.”",
      desc: "Heard in every sector ",
    },
  ],
};

export const industriesData = {
  title: "industries",
  subTitle: "Built for the sectors we know the best. ",
  items: [
    {
      _id: "1",
      title: "Construction",
      icon: assets.construction,
      iconAlt: "Construction",
      slug: "",
    },
    {
      _id: "2",
      title: "Engineering & infrastructure",
      icon: assets.enginma,
      iconAlt: "Engineering & infrastructure",
      slug: "",
    },
    {
      _id: "3",
      title: "Real estate & property dev",
      icon: assets.realestate2,
      iconAlt: "Real estate & property dev",
      slug: "",
    },
    {
      _id: "4",
      title: "Industrial",
      icon: assets.industrial,
      iconAlt: "Industrial",
      slug: " ",
    },
    {
      _id: "5",
      title: "Manufacturing",
      icon: assets.manufact,
      iconAlt: "Manufacturing",
      slug: "",
    },
    
  ],
};


export const credibilityStats = {
  title: "The Numbers Behind Our Credibility",
  description: "Get a Complete Audit of Your Online Visibility ",
  buttonText: "Request a Free Audit",
  buttonLink: "/contact",
  stats: [
    { _id: "1", value: "14", label: "Services, One Senior Team" },
    { _id: "2", value: "2", label: "Weeks to Baseline" },
    { _id: "3", value: "50+", label: "Experts" },
    { _id: "4", value: "12+", label: "years of experience " },
  ],
};

export const packageChecklist = {
  title: "Everything in the package.",
  description:
    "Fourteen end-to-end capabilities led by a dedicated senior strategist. One invoice, zero fragmented communication, and absolute clarity on performance.",
  columns: [
    {
      _id: "1",
      heading: "Foundations",
      items: [
        { _id: "1", title: "A written plan", subText: "Reviewed every 3 months" },
        { _id: "2", title: "Website upkeep", subText: "Safe, fast, online" },
      ],
    },
    {
      _id: "2",
      heading: "Getting found",
      items: [
        { _id: "1", title: "Google ranking", subText: "4 new pages a month" },
        { _id: "2", title: "Showing up in AI answers", subText: "Ongoing" },
        { _id: "3", title: "AI visibility checks", subText: "Every month" },
        { _id: "4", title: "LinkedIn posts", subText: "12 a month" },
        { _id: "5", title: "Photo and video", subText: "1 site visit a month" },
      ],
    },
    {
      _id: "3",
      heading: "Proof it works",
      items: [
        { _id: "1", title: "Monthly report", subText: "One page, five minutes" },
        { _id: "2", title: "Tracking set up properly", subText: "Named sources" },
        { _id: "3", title: "Monthly call", subText: "With a senior person" },
        { _id: "4", title: "Website improvements", subText: "Every 3 months" },
        { _id: "5", title: "Technical checks", subText: "Problems caught early" },
      ],
    },
    {
      _id: "4",
      heading: "Extra edge",
      items: [
        { _id: "1", title: "Competitor comparison", subText: "3 rivals, every 3 months" },
        { _id: "2", title: "Posts for your boss", subText: "4 a month, in their voice" },
      ],
    },
  ],
};

export const Testimonials = {
  title: "12 Years. 140 Clients. Zero unverified claims.",
  topTitle: "Testimonials",
  starText: "We hold our reporting to the same engineering standards as your projects, 100% documented, tested, and client-verified.",
  bottomText: "",
  description: "Don't just take our word for it. Here's what some of our clients have to say about working with us.",
  items: [
    {
      image: karim,
      imageAlt: "Karim El Shennawy",
      name: "Karim El Shennawy",
      designation: "Business Development Director",
      message:
        "“Global Surf proved to be talented group that delivered their project in excellent manner. They are responsive, and we trusted them day by day with more tasks and they continue to prove their capabilities.”",
      companyName: "ASGC",
      companyLogo: logothree,
      companyLogoAlt: "ASGC Group Logo",
    },
    {
      image: alissar,
      imageAlt: "Alissar Nasrallah",
      name: "Alissar Nasrallah",
      designation: "Regional Marcomms Manager",
      message:
        "“Caring team, looks out for what you want and makes sure to give you the outcome you want, quick, you'll find them next to you in critical moments.”",
      companyName: "Gulf Cryo",
      companyLogo: logoone,
      companyLogoAlt: "Gulf Cryo Logo",
    },
    {
      image: jadFarah,
      imageAlt: "Jad Farah",
      name: "Jad Farah",
      designation: "Group Marketing Manager",
      message:
        "“Working with Global Surf was an exceptional experience. Their customer support was outstanding, making the entire process smooth and efficient. I highly recommend Global Surf for their expertise, dedication, and ability to bring a brand's digital presence to life.”",
      companyName: "ECC LLC",
      companyLogo: ecc_logo,
      companyLogoAlt: "Engineering Contracting Company Logo",
    },
    {
      image: heshamabdeen,
      imageAlt: "Hesham Abdeen",
      name: "Hesham Abdeen",
      designation: "Head of Accreditation and Evaluations",
      message:
        "“Because of the way that Global Surf encourages collaboration, working with the team has been a pleasure. Their staff welcomes our input and fosters open communication, which has led to a website that reflects our brand and serves our particular demands. Global Surf offers a plethora of knowledge and creativity.”",
      companyName: "Educap",
      companyLogo: educap,
      companyLogoAlt: "Educap Logo",
    },
    {
      image: dummy,
      imageAlt: "Omar M. Bin Dhaher Almheiri",
      name: "Omar M. Bin Dhaher Almheiri",
      designation: "President",
      message:
        "“We have very good relation and experience with your professional company Not to mention the extra care we get from your team We like this relationship to continue for the success of both of us”",
      companyName: "Prestige",
      companyLogo: logotwo,
      companyLogoAlt: "Prestige Logo",
    },
  ],
};

export const faqSection = {
  title: "FAQ",
  items: [
    {
      _id: "1",
      question:
        "Why is this package a strong fit for the construction and built environment sector?",
      answer:
        "Because your audience is not looking for generic marketing — they are looking for trust, technical clarity, and proof. The package is built around the realities of tenders, JV structures, procurement cycles, and senior stakeholder review, which makes the output more relevant to this market.",
    },
    {
      _id: "2",
      question: "What if we miss the targets?",
      answer:
        "At the six-month KPI checkpoint, if we have not reached the targets we agreed together, we keep working at no extra cost for up to two months. Then we review the position and agree what happens next. No token discount. No excuses. Just real accountability.",
    },
    {
      _id: "3",
      question: "We get most of our work through referrals. Why do we need this?",
      answer:
        "Referrals may open the door, but your digital presence helps you win the opportunity. When prospects or procurement teams research your company, your website should reinforce their confidence. This package ensures your online presence supports the reputation you have already built.",
    },
    {
      _id: "4",
      question: "Our last agency did not work out. Why is this different?",
      answer:
        "A senior strategist reviews your account every month and keeps the work aligned with your business goals. Our approach is built around your sector, buyers and commercial priorities rather than generic marketing activity. If agreed targets are missed, we continue working at no extra cost for up to two months.",
    },
    {
      _id: "5",
      question: "Who actually works on our account?",
      answer:
        "A senior specialist owns your strategy and reviews the account every month. Our wider team supports SEO, content, social media, website and technical delivery. Senior staff remain responsible for the direction, quality and progress of the work.",
    },
    {
      _id: "6",
      question: "Is this package really worth it?",
      answer:
        "The package gives you fourteen coordinated services, including SEO, social media, content production and website maintenance, without building a full in-house team. Every activity works together to help your business get found, look credible and stay visible. It is designed for companies that want consistent, accountable digital marketing rather than occasional content or disconnected services.",
    },
    {
      _id: "7",
      question: "What is not included?",
      answer:
        "Your advertising budget, a brand-new website, a new logo and PR work are not included in the monthly package. These are separate projects with separate pricing, depending on your requirements. We will explain any additional costs during the first call, not in month four.",
    },
    {
      _id: "8",
      question: "Why should we choose this package?",
      answer:
        "Because your digital marketing activities work better when they are connected. SEO, LinkedIn content, executive visibility, website improvements, analytics, and content production are managed together under one coordinated plan. You get one senior team, one monthly fee, and one clear direction instead of managing several disconnected agencies or freelancers.",
    },
  ],
};


export const serviceData = {
  _id: "",
  name: "",
  slug: "",
  // seo,
  firstSection,
  featureStrip,
  trustedBy,
  whatWeHearData,
  industriesData,
  credibilityStats,
  packageChecklist,
  Testimonials,
  faqSection,
  createdAt: "",
  updatedAt: "",
};
