import Label from "@/app/components/Label/Label";
import { assets } from "@/public/assets/assets"; 
import { url } from "inspector";
export const BannerSection = [
  {
    id: 1,
    image: assets.geobanner,
    navigation: [
      { label: "Home", url: "/" },
      { label: "Digital marketing", url: "" },
      { label: "SEO", url: "" },
      { label: "geo", url: "" },
    ],
    title: "Generative Engine Optimization (GEO) Services",
    subtitle:
      "Helping brands stay visible across AI search engines, generative platforms, and AI-driven browsers.",
    sub: [
      {
        stitle: "Our Thoughts",
        desc: "When someone asks ChatGPT, Perplexity, or Gemini about services like yours, does your brand appear in the answer, or do competitors get mentioned instead? Unlike traditional search, AI tools provide a single, direct response, making visibility dependent on how clearly your content is structured for AI to understand and trust. At Global Surf Digital, we help brands become part of that answer through structured content, entity optimisation, and machine-readable data that AI systems can reliably interpret and reference.",
        buttonTitle: "Request Your GEO Assessment",
      },
    ],
  },
];
export const logosdata = [
  { src: assets.geolg1, alt: "ChatGPT" }, //	ChatGPT
  { src: assets.geolg5, alt: "Perplexity " }, // perplexity
  { src: assets.geolg4, alt: "Gemini " }, //gemini
  { src: assets.geolg3, alt: "Copilot" }, // copilot
  { src: assets.geolg8, alt: "Claude" }, //claude ai
  { src: assets.geolg7, alt: "Grok" }, // Grok ai
  { src: assets.geolg6, alt: "DeepSeek" }, //bing ai
];
export const logosdatas = [
  { src: assets.geolg2, alt: "Meta" }, // Meta
  { src: assets.geolg11, alt: "Google Assistant" }, // Google Assistant
  { src: assets.geolg15, alt: "Brave" }, // Brave Search
  { src: assets.geolg10, alt: "Cohere " }, // Cohere
  { src: assets.geolg14, alt: "Mistral AI" }, // Mistral AI
  { src: assets.geolg12, alt: "Qwen" }, // Qwen
  { src: assets.geolg13, alt: "Z.ai" }, // Z.ai
  // { src: assets.geolg9, alt: "Z.ai " }, // Z.ai
];
export const Wecanhelp = {
  title: "What shapes an AI-generated answer ",
  data: [
    {
      id: 1,
      icon: assets.mschelp1,
      title: "Trusted Brand Signals",
      dec: "Brand recognition, authority, and credible mentions that help AI identify your business with confidence.",
    },
    {
      id: 2,
      icon: assets.mschelp2,
      title: "Clear, Well-Structured Information",
      dec: "Content organised in a logical format that AI systems can easily interpret and summarise.",
    },
    {
      id: 3,
      icon: assets.mschelp3,
      title: "Strong Machine-Readable Data",
      dec: "Structured data and schema that clearly define your content for accurate AI processing.",
    },
    {
      id: 4,
      icon: assets.mschelp4,
      title: "Verified Sources",
      dec: "Fact-based information supported by consistent and traceable references.",
    }, 
  ],
};
export const boostEngage = {
  title: "We Can Help You",
  data: [
    {
      id: 1,
      icon: assets.whelp1,
      title: "Increase brand awareness and online visibility ",
    },
    {
      id: 2,
      icon: assets.whelp2,
      title: "Drive website traffic and engagement",
    },
    {
      id: 3,
      icon: assets.whelp3,
      title: "Generate high-quality leads and conversions",
    },
    {
      id: 4,
      icon: assets.whelp4,
      title: "Lower advertising costs while maximizing ROI",
    },
  ],
};
export const Frameworkdata = {
  title: "The Benefits ",
  data: [
    {
      id: 1,
      title: " Appear in AI Answers",
      dec: "Your brand shows up inside the single response AI tools generate.  ",
      icn: assets.bnf1,
      urllink: '',
    },
    {
      id: 2,
      title: "Stay Visible as Search Changes ",
      dec: "You remain relevant even as traditional search declines. ",
      icn: assets.bnf2,
      urllink: '',
    },
    {
      id: 3,
      title: "Correct Brand Interpretation",
      dec: "AI understands what you do - and describes it correctly. ",
      icn: assets.bnf3,
      urllink: '',
    },
    {
      id: 4,
      title: "Stronger Trust",
      dec: "Good structure and verification make your brand more credible.",
      icn: assets.bnf4,
      urllink: '',
    },
    {
      id: 5,
      title: "Better Voice Search Results ",
      dec: "Siri, Google Assistant, and other tools respond more accurately. ",
      icn: assets.bnf5,
      urllink: '',
    },
    {
      id: 6,
      title: "Long-Term Advantage",
      dec: "Early adopters gain authority before the space gets crowded. ",
      icn: assets.bnf6,
      urllink: '',
    },
  ],
};
export const OurServices = {
  title: "Our GEO Process  ",

  data: [
    {
      id: 1,
      title: "GEO Audit",
      desc: " Entity strength, trust signals, structured data, and LLM visibility.",
    },
    {
      id: 2,
      title: "Content & Information Restructuring",
      desc: " Content reorganized for AI comprehension and answer extraction.",
    },
    {
      id: 3,
      title: "Content Enhancement",
      desc: "Depth-driven, factual, structured content built for high trust. ",
    },

    {
      id: 4,
      title: "Schema+ & Data Structuring",
      desc: "Enhanced metadata for entity recognition and information accuracy. ",
    },
    {
      id: 5,
      title: "Authority Building",
      desc: "Publishing verifiable first-party insights and expert commentary. ",
    }, 
    {
      id: 6,
      title: "Continuous LLM Monitoring",
      desc: "Real-time optimization based on generative search behavior. ",
    }, 
  ],
};
export const Wehelp = {
  title: "How We Help ",
  data: [
    {
      id: 1,
      title: "Restructuring your content for AI interpretation ",
      
      icn: assets.wecanhelp1,
      urllink: '',
    },
    {
      id: 2,
      title: "Strengthening entity clarity and brand definitions  ",
     
      icn: assets.wecanhelp2,
      urllink: '',
    },
    {
      id: 3,
      title: "Applying advanced structured data (Schema+) ",
     
      icn: assets.wecanhelp3,
      urllink: '',
    },
    {
      id: 4,
      title: "Publishing verified first-party assets ",
     
      icn: assets.wecanhelp4,
      urllink: '',
    },
    {
      id: 5,
      title: "Improving trust, authority, and factual alignment  ",
     
      icn: assets.wecanhelp5,
      urllink: '',
    },
    {
      id: 6,
      title: "Monitoring how AI engines reference your brand ",
      
      icn: assets.wecanhelp6,
      urllink: '',
    },
  ],
};
export const AreaExpertise = {
  title: "Why These Requirements Demand <br>Specialized GEO Expertise ",
  subttle:"Meeting AI engine standards requires more than publishing content. Generative engines rely on entities, structured data, semantic clarity, and verified sources - areas most brands are not equipped to optimize internally.",
  data: [
    {
      id: 1,
      icon: assets.expg1,
      title: "Semantic information design",
      desc: "Making your content clearer for AI to understand what you really mean.",
      url: "",
    },
    {
      id: 2,
      icon: assets.expg2,
      title: "Schema and metadata systems",
      desc: "Adding machine-readable signals that explain your brand, services, and relationships. ",
      url: "",
    },
    {
      id: 3,
      icon: assets.expg3,
      title: "Entity mapping & knowledge-graph alignment",
      desc: "Making sure AI recognizes your brand as a distinct, credible entity.",
      url: "",
    },
    {
      id: 4,
      icon: assets.expg4,
      title: "Consistency across first-party sources",
      desc: "Ensuring your website, listings, profiles, and published data tell the same story. ",
      url: "",
    },
    {
      id: 5,
      icon: assets.expg5,
      title: "AI browser & LLM appearance monitoring",
      desc: "Tracking how generative engines reference or summarize your brand. ",
      url: "",
    },
    {
      id: 6,
      icon: assets.expg6,
      title: "Technical signals for factual verification ",
      desc: "Providing the evidence AI models rely on when generating confident responses.",
      url: "",
    },
  ],
};

export const IndustriesWeServe = {
  title: "Our GEO Services ",
  data: [
    {
      id: 1,
      
      title: "Entity & Brand Optimization ",
      hoverImg: assets.hvrimg1,
      desc: "Clarifying your brand as a distinct, authoritative entity across AI systems. ",
      url: "",
    },
    {
      id: 2,
      
      title: "AI-Ready Content Structure",
      hoverImg: assets.hvrimg2,
      desc: "Reorganizing your information for accurate AI interpretation and contextual reuse.  ",
      url: "",
    },
    {
      id: 3,
      
      title: "Schema+ (Advanced Structured Data)",
      hoverImg: assets.hvrimg3,
      desc: "Advanced schema covering organization details, services, products, authorship, FAQs, and more. ",
      url: "",
    },
    {
      id: 4,
     
      title: "First-Party Data Publishing",
      hoverImg: assets.hvrimg4,
      desc: "Transforming internal insights, results, and project data into verifiable content.  ",
      url: "",
    },
    {
      id: 5,
      
      title: "AI & LLM Monitoring",
      hoverImg: assets.hvrimg5,
      desc: "Tracking brand mentions and answer placements across AI engines. ",
      url: "",
    },
  
  ],
};
export const WhyBrands = {
  title: "Why Brands Choose Us",
  data: [
    {
      id: 1,
      title: "Regional GEO Expertise",
      dec: "Deep understanding of AI search behaviour across Dubai, the UAE and wider GCC markets.",
      icn: assets.omst1,
      urllink: "",
    },
    {
      id: 2,
      title: "Proven Experience",
      dec: "Backed by decades of expertise in SEO, content strategy and AI-led optimisation across industries.",
      icn: assets.omst2,
      urllink: "",
    },
    {
      id: 3,
      title: "Measurable Impact",
      dec: "Our approach focuses on improving how often and how accurately your brand appears in AI-generated answers.",
      icn: assets.omst3,
      urllink: "",
    },
    {
      id: 4,
      title: "Specialised Team",
      dec: "A team combining technical SEO, structured data expertise and evolving AI and LLM knowledge.",
      icn: assets.omst4,
      urllink: "",
    },
    {
      id: 5,
      title: "Multi-Platform Focus",
      dec: "Coverage across ChatGPT, Perplexity, Gemini, Copilot and voice-enabled search environments.",
      icn: assets.omst5,
      urllink: "",
    },
    {
      id: 6,
      title: "Structured GEO Methodology",
      dec: "A defined, repeatable approach designed to align your brand with how AI systems interpret and reference information",
      icn: assets.omst6,
      urllink: "",
    },
  ],
};
export const Cta = [
  {
    textred: " GEO Readiness Assessment  ",
    text: "Request Your <br>",
  },
];
export const Faq = [
  {
    title: "What does GEO cost? ",
    description:
      "The investment depends on your current website structure, competitive landscape, and scope of work. We offer both project-based and ongoing engagement models based on your requirements.",
  },
  {
    title: "Do I need to redesign my website for GEO?",
    description:
      "In most cases, no. GEO focuses on improving existing content, adding structured data, and refining how information is presented for AI systems.",
  },
  {
    title: "Which AI platforms do you optimise for?",
    description:
      "We work across ChatGPT, Perplexity, Google Gemini, Bing Copilot, and voice assistants such as Siri and Google Assistant to ensure broad visibility.",
  },
  {
    title: "How long does it take to see results?",
    description:
      "Most brands begin to see improved visibility in AI-generated answers within a few months, depending on competition and current content quality.",
  },
  {
    title: "Can you guarantee my brand will appear in AI answers?",
    description:
      "AI platforms are constantly evolving, so specific placements cannot be guaranteed. However, our approach significantly improves the likelihood of being referenced.",
  },
];



