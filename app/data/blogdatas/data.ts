import { assets } from "@/public/assets/assets";

export const BannerSection = [
  {
    id: 1,
    image: assets.blogbnr,
    navigation: [
      { label: "Blog", url: "" }, 
      { label: "5 Minutes Read",url: "" },
    ],
    title:
      "Leading Branding Agency in Dubai",
      subtitle:"Building Strong Brand Identities With Creative Design, Marketing Collateral, and Storytelling",
      heroAlt:"Creative Branding Agency in Dubai",
    sub: [
      {
        stitle: "OUR APPROACH",
        buttonTitle :"Start Your Project",
        desc: "At GS Branding, we believe that great branding is more than just a logo—it’s about building a strong, authentic connection with your audience. As a leading branding company in Dubai, we take the time to understand your vision, values, and goals to craft a brand identity that speaks to your customers. Our approach is both creative and strategic, ensuring your brand stands out and leaves a lasting impression. From comprehensive brand audits to creative solutions, we’re here to help your brand grow and make a real impact.",
      },
    ],
  },
];
// data.ts
export const contentSectionsData = [
  {
    title: "The 2026 Playbook for Small Brands & Agencies ",
    paragraphs: [
      "In the age of quick scrolling and short attention spans, video content stands out as a key way to grab attention. Social clips are essential. They cover everything from product launches to behind-the-scenes looks and short stories. Brands need them to remain relevant.",
      "Still, many businesses, marketers, and creators feel stuck. A lack of time, clarity, or confidence can make video production feel challenging. ",
      "Platforms like Instagram, TikTok, YouTube, and LinkedIn focus on video in their algorithms. The demand for engaging, high-quality videos is rising daily. But how can you master this? ",
      "This guide covers social media video production. It explains why it's important and how to create engaging content."
    ]
  },
  
];
export const videoProductionsocialData = [
  {
    title: "What is Social Media Video Production? ",
    image: assets.blogimg2,
    paragraphs: [
      "Social media video production involves planning, filming, and editing videos. These videos are made for platforms like Instagram, TikTok, LinkedIn, and YouTube. Unlike traditional ads, social videos are: "
    ],
    listItems: [
      { label: "Brief:", description: "Usually under 60 seconds" },
      { label: "Mobile-first:", description: "Often vertical" },
      { label: "Authentic:", description: "Casual, relatable tone." },
      { label: "Platform-optimized:", description: "Tailored format and engagement metrics." }
    ],
    paragraphs2: [
      "You can make videos by yourself, use different tools, or hire agencies that focus on content for each platform."
    ], 
  }
];

export const videoProductionData = [
    {
      'Phase': 'Pre-Production',
      'Key Actions': 'Define goals, outline scripts, plan tone/style ',
      'Tools': 'Trello, Google Docs, Notion',
    },
    {
      'Phase': 'Production',
      'Key Actions': 'Use natural lighting, stable shots, quality audio ',
      'Tools': 'Smartphone, tripod, ring light, mic ',
    },
    {
      'Phase': 'Post-Production',
      'Key Actions': 'Trim footage, add music/captions/branding, export in the correct format ',
      'Tools': 'CapCut, Canva, Adobe Premiere Rush',
    },
  ];
  
  export const platformCheatSheetData = [
    {
      'Platform': 'TikTok',
      'Length': '15-30 sec',
      'Format': '9:16',
      'Best Time': 'Tues/Thurs 7-11 PM',
      'Key Features': 'Trends, duets, hashtags',
    },
    {
      'Platform': 'Instagram Reels',
      'Length': '≤60 sec',
      'Format': '9:16',
      'Best Time': 'Wed/Fri 12-3 PM',
      'Key Features': 'Effects, tags, Stories',
    },
    {
      'Platform': 'YouTube Shorts',
      'Length': '≤60 sec',
      'Format': '9:16',
      'Best Time': 'Weekdays 12-4 PM',
      'Key Features': 'Shorts shelf, strong CTA',
    },
    {
      'Platform': 'Facebook',
      'Length': '1-2 min',
      'Format': '4:5, 1:1, 16:9',
      'Best Time': 'Thurs-Sat 12-3 PM',
      'Key Features': 'Captions, autoplay ',
    },
    {
      'Platform': 'LinkedIn',
      'Length': '≤2 min',
      'Format': '1:1, 16:9',
      'Best Time': 'Tues/Thurs 8-11 AM',
      'Key Features': 'Native content, professional tone',
    },
  ];
  export const videoGuideSteps = [
    {
      stepNumber: 1,
      title: "Pre-Production",
      image: assets.prepro1,
      tasks: [
        "a.  Set your goal: brand awareness",
        "b.  Identify your audience: Gen Z, 18–24",
        "c.  Script: “Unboxing with product explanation—20 seconds”",
      ],
    },
    {
      stepNumber: 2,
      title: "Production Setup",
      image: assets.prepro2,
      tasks: [
        "a.	Film by a window in daylight",
        "b.	Phone set vertically on a tripod",
        "c.	Use an affordable lav mic",
      ],
    },
    {
      stepNumber: 3,
      title: "Shooting",
      image: assets.prepro3,
      tasks: [
        "a. Use a strong hook: 'Ever seen a gadget that does THIS?'",
        "b.	Show the product in action",
        "c. Finish with a CTA: 'Follow for next week's hack!'",
      ],
    },
    {
      stepNumber: 4,
      title: "Post-Production",
      image: assets.prepro4,
      tasks: [
        "a. Trim to under 25 seconds",
        "b.	Auto-add captions (CapCut)",
        "c.	Overlay logo, brand colors",
        "d.	Export in 9:16",
      ],
    },
    {
      stepNumber: 5,
      title: "Post & Engage",
      image: assets.prepro5,
      tasks: [
        "a.	Upload at peak time (8 pm Tuesday)",
        "b.	Write a description with trending hashtags",
        "c.	Reply to comments within the first 15 minutes",
      ],
    },
  ];
 export const videoTips = [
    {
      no: 1,
      tip: 'Know Your Audience Before You Press Record',
      keyDetails: 'Before you film anything, define your ideal viewer. Who are they? What kind of content do they watch? What problems are they trying to solve? Tailoring your content to your audience makes it more relevant and shareable.',
    },
    {
      no: 2,
      tip: 'Start with a Strong Hook',
      keyDetails: 'The first 3–5 seconds is everything. Use bold text, attention-grabbing visuals, or a direct question to pull your viewer in. If you can’t get their attention quickly, they’ll keep scrolling.',
    },
    {
      no: 3,
      tip: 'Focus on Storytelling, Not Just Selling',
      keyDetails: 'People connect with stories more than sales pitches. Show the real-life impact of your product or service. Use storytelling frameworks: challenge → solution → transformation. Authenticity builds trust.',
    },
    {
      no: 4,
      tip: 'Keep It Short and Platform-Optimized',
      keyDetails: 'Each platform has its own ideal video length:',
      keyDetailsList2: [ 
        { platform: 'TikTok', duration: '15–30 seconds', icon: assets.tiktokicon },
        { platform: 'Instagram Reels', duration: 'Under 60 seconds', icon: assets.instagramicon }, 
        { platform: 'YouTube Shorts', duration: '60 seconds', icon: assets.youtubeicon },
        { platform: 'Facebook', duration: '1–2 minutes', icon: assets.facebbokicon },
      ],
    },
    {
      no: 5,
      tip: 'Prioritize Visual and Audio Quality',
      keyDetails: 'You don’t need expensive gear to make great content, but your visuals and sound should be clean and professional. Use natural light, a phone tripod, and a lapel mic if needed. ',
    },
    {
      no: 6,
      tip: 'Add Subtitles and Captions',
      keyDetails: 'A large portion of users scroll with the sound off. Captions make your content more accessible, understandable, and engaging, especially for viewers on the go.',
    },
    {
      no: 7,
      tip: 'Use Branding Subtly but Consistently',
      keyDetails: 'Add your logo, brand colors, or slogan tastefully. It should feel integrated, not overpowering. Consistent branding boosts recognition across platforms.',
    },
    {
      no: 8,
      tip: 'Include a Clear Call-to-Action (CTA)',
      keyDetails: 'Always tell your viewers what to do next:',
      keyDetailsList: [
        '“Follow for more tips”',
        '“Click the link in bio”',
        '“Comment below your thoughts”',
        '“Share this with a friend”',
      ],
      keyDetailsList3: [
        'CTAs drive interaction and make your content more purposeful.',
      ],
    },
    {
      no: 9,
      tip: 'Post Regularly, But Focus on Quality',
      keyDetails: 'While consistency is key, avoid posting just for the sake of it. Use a simple content calendar and batch-produce videos with the help of a social media video production tool or with the support of a production agency.',
    },
    {
      no: 10, // MODIFIED THIS ENTRY
      tip: 'Measure, Learn, and Improve',
      // keyDetails is kept empty since we are using keyDetailsList
      keyDetails: 'Track views, engagement, watch time, shares, and click-throughs. These metrics reveal what your audience wants more of. Refine your style and strategy accordingly.', 
      image: assets.measurelearn, // NOTE: Update this path to your actual image location
      

    },
  ];
  export const troubleshootingData = {
    title: "Troubleshooting Common Issues",
  
    gridCols: 3,
    issues: [
      {
        image: assets.tcom1,
        title: "Low views?",
        description: "Try different hooks, times, or hashtags.",
      },
      {
        image: assets.tcom2,
        title: "Negative comments? ",
        description: "Respond with empathy; moderate if needed.",
      },
      {
        image: assets.tcom3,
        title: "Algorithm changes?",
        description: "Stay updated and test new formats/trending sounds.",
      },
      {
        image: assets.tcom4,
        title: "Limited\nbudget?",
        description: "Smartphones and natural light can still produce great results.",
      },
      {
        image: assets.tcom5,
        title: "Repurposing older content?",
        description: "Crop horizontal clips, re-caption, and overlay branding.",
      },
      {
        image: assets.tcom6,
        title: "Accessibility concerns? ",
        description: "Use high-contrast subtitles, clean font, and avoid rapid flashing visuals.",
      },
    ],
  };
  export const listingSectionData = {
    title: "Legal & Ethical Best Practices ",
    listItems: [
      "Use licensed music/images",
      "Label sponsored posts (#ad, #sponsored)",
      "Get permissions/releases for people shown",
      "Credit creators when reposting UGC"
    ],
  };
  export const socialmediavideoproductionData = {
    title: "Overcoming Common Challenges in Social Media Video Production",
    intro: [
      "Overcoming Common Challenges in Social Media Video Production ",
      "Making effective video content for social media poses several challenges. Brands must face these to remain competitive. Some of the most common include: "
    ],
    outro: "Each of these factors can impact the success of your video campaigns. With good planning and the right resources, you can manage these challenges well.",
    gridCols: 4,
    issues: [
      {
      
        icon: assets.budget,
        title: "Low views?",
        description: "Try different hooks, times, or hashtags.",
      },
      {
        image: assets.tcom2,
        title: "Negative comments? ",
        description: "Respond with empathy; moderate if needed.",
      },
      {
        image: assets.tcom3,
        title: "Algorithm changes?",
        description: "Stay updated and test new formats/trending sounds.",
      },
      {
        image: assets.tcom4,
        title: "Limited\nbudget?",
        description: "Smartphones and natural light can still produce great results.",
      },
      {
        image: assets.tcom5,
        title: "Repurposing older content?",
        description: "Crop horizontal clips, re-caption, and overlay branding.",
      },
      {
        image: assets.tcom6,
        title: "Accessibility concerns? ",
        description: "Use high-contrast subtitles, clean font, and avoid rapid flashing visuals.",
      },
    ],
  };
  export const videocountData = [
    {
      title: "From Content to Impact – Make Your Videos Count ",
      image: assets.makevideo,
      paragraphs: [
      "Social media video is more than hitting record—it’s about connecting, inspiring, and driving action. Define goals, stay audience-focused, and refine as you go."
      ],
      
    }
  ];
  export const scrollSectionsData = [
    {
      title: "Make Every Scroll Count ",
      paragraphs: [
        "Great videos aren’t just about creativity—they need the right strategy behind them. With the right mix of storytelling and platform know-how, brands can shine, engage their audience, and grow faster. That’s exactly the approach we take at Global Surf Digital, so your content works as hard as you do. "
      ],
      image: assets.scroll,
      imageAlt: "Blog Image",
      borderColor: "#E63E31"
    },
    
  ];
  export const authors = [
    {
      name: "Ashna Ganeeva",
      role: "Social Media Strategist",
      description: "Ashna Geneva shapes brands into industry leaders—turning social platforms into engines of influence and growth.",
      profileImage: assets.ashnablog,
      linkedinIcon: assets.linkedinicon,
      linkedinUrl: "https://www.linkedin.com/in/ashna-ganeeva/",
    },
   
    // add more authors here
  ];
  export const Faq =[
    
      {
        title: "What does a social media video production company do? ",
        description:
          "A social media video production company handles everything from content planning and scripting to filming, editing, and publishing. They specialize in creating videos tailored to social platforms and often help with strategy, platform optimization, and performance tracking.  ",
      },
      {
        title: "Should I work with a social media video production agency?  ",
        description:
          "If you're scaling your content or want consistent, high-quality output, working with a social media video production company or agency can save time and improve results. Agencies often offer editing, strategy, and platform optimization as a package. ",
      },
      {
        title: "How can I measure video performance on social media?   ",
        description:
          "Track metrics like views, engagement rate (likes, comments, shares), watch time, reach, and click-through rates. On platforms like Instagram or YouTube, you can also use Insights/Analytics tools for deeper reporting. ",
      },
      {
        title: "What makes a social media video effective?   ",
        description:
          "An effective social video grabs attention within the first few seconds, tells a compelling story, is optimized for mobile viewing, includes captions, and ends with a strong call-to-action (CTA). It should also align with your brand voice and appeal to your target audience. ",
      },
  ];

