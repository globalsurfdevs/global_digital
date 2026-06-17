import { assets } from "@/public/assets/assets";

export const BannerSection = [
    {
        id: 1,
        image: assets.ai2,
        navigation: [
            { label: "Blog", url: "" },
            { label: "5 Minutes Read", url: "" },
        ],
        title:
            "Google's AI Overviews Are Here: What UAE Businesses Must Do to Protect Organic Traffic ",
        publishedon: "June 4, 2026",
        updatedon: "June 4, 2026",
        subtitle: "",
        heroAlt: "How Google AI overview affects organic traffic",
        sub: [
            {
                stitle: "",
                buttonTitle: "",
                desc: "",
            },
        ],
    },
];
export const contentSectionsData = [
    {
        title: "Table of Contents",
        isTOC: true,
        dividerAfterIndex: 10, // ← draws line before "What does 12 months..."(above line 8)
        paragraphs: [
            `<a href="#section1" class='hover:text-primary'>1. What Are Google AI Overviews? A Plain-Language Explainer for UAE Business Owners</a>`,
            `<a href="#section2" class='hover:text-primary'>2. How Google's AI Overviews Are Changing Search Behaviour and What It Means for UAE Markets</a>`,
            `<a href="#section3" class='hover:text-primary'>3. The Real Traffic Impact of Google AI Overviews: What UAE Businesses Should Know</a>`,
            `<a href="#section4" class='hover:text-primary'>4. Introducing GEO: The New SEO Discipline UAE Businesses Cannot Ignore</a>`,
            `<a href="#section5" class='hover:text-primary'>5. Why UAE Content Needs Specific GEO Adaptation</a>`,
            `<a href="#section6" class='hover:text-primary'>6. 7 Proven Strategies for UAE Businesses to Adapt to Google AI Overviews</a>`,
            `<a href="#section7" class='hover:text-primary'>7. Which UAE Industries Face the Greatest Risk from Google AI Overviews?</a>`,
            `<a href="#section8" class='hover:text-primary'>8. The Local SEO Silver Lining: Why UAE Businesses Have More Protection Than They Think</a>`,
            `<a href="#section9" class='hover:text-primary'>9. Adapting to AI Search in the UAE: The Businesses That Act Now Will Win</a>`,
            `<a href="#section10" class='hover:text-primary'>10. Frequently Asked Questions</a>`,
            "A Dubai-based legal consultancy had stable first-page rankings for their top five service keywords throughout early 2025. Their positions did not drop. But their enquiry volume from organic search fell by almost a third between January and April. The rankings were intact. The traffic was not. ",
            "The reason: Google AI Overviews had started appearing above every organic result for the informational queries that used to drive their top-of-funnel leads. Users were reading the AI-generated answer and leaving without clicking anything. This is not a future risk. It is happening to UAE businesses right now. ",
            "Google AI Overviews became available in the UAE as part of the platform's global expansion to over 100 countries by late 2024. Arabic language support for AI Overviews was officially announced at Google I/O in May 2025 (Google MENA Blog, 2025), significantly expanding the feature's reach across the bilingual UAE search landscape. With Google holding approximately 97% of the UAE search engine market, this combination of English and Arabic AI Overview capability represents a structural change to how UAE customers find information. ",
            "By the end of this article, you will understand exactly what AI Overviews are, how they are affecting UAE organic traffic right now, and the specific actions your business can take to protect and rebuild search visibility. "
        ]
    },
];
// data.ts

export const videoProductionsocialData = [
    {
        title: "What Are Google AI Overviews? A Plain-Language Explainer for UAE Business Owners ",
        subSections: [
            {
                paragraphs: ["Google AI Overviews are AI-generated summaries that appear at the top of Google search results, synthesising information from multiple web sources to answer a user's query directly, often before they click any organic result. They are powered by Google's Gemini AI model and were formerly known as Search Generative Experience (SGE). ",
                    "Google first launched AI Overviews in the US in May 2024, expanded to over 100 countries by October 2024, and officially brought the feature to the UAE and the broader MENA region in May 2025, including Arabic language support (Google MENA Blog, 2025). "
                ],
                listTitle: "AI Overviews are typically triggered by:",
                listItems: [
                    { label: "", description: "Informational queries seeking explanations or definitions " },
                    { label: "", description: "How-to questions and step-by-step guidance " },
                    { label: "", description: "Comparison queries across products, services, or providers " },
                    { label: "", description: "Complex multi-part questions that previously required several searches " },
                ],
                
                paragraphs2: ["AI Overviews appear above traditional organic results - what SEOs refer to as the zero position. Google builds them by drawing from high-authority, well-structured content with clear E-E-A-T signals: Experience, Expertise, Authoritativeness, and Trustworthiness. ",
                    "<strong>Key insight:</strong> <a class='text-primary hover:underline' href='https://www.globalsurf.ae/generative-engine-optimization'>Being cited inside an AI Overview</a> is fundamentally different from ranking in position one. According to Amsive research, branded queries with an AI Overview citation see an 18.68% increase in CTR. Across positions, results that rank organically but are not cited in an AI Overview lose an average of 34.5% of their clicks when an Overview is present. The citation is now more valuable than the ranking. "
                ],
            }
        ]
    }
];



export const UAEBuiltEnvironmentData = [
    {
        title: "The Real Traffic Impact of Google AI Overviews: What UAE Businesses Should Know ",
        paragraphs1: [
            "The data on AI Overview traffic impact is now substantial, drawn from multiple independent studies covering hundreds of thousands of keywords. The picture is clear and consistent. "
        ],
        image: assets.ai5,
        imagealt: "Organic CTR drop due to AI overview",
        paragraphs3: [
            "<strong>Key data points:</strong> Ahrefs analysed 300,000 keywords and found that position-one organic CTR dropped from 7.3% to 2.6% — a relative decline of approximately 64% — when an AI Overview was present (Ahrefs, 2025). Amsive's separate analysis of 700,000 keywords found an average CTR drop of 15.49% across all positions, rising to 37% when AI Overviews and featured snippets appeared together on the same results page (Amsive, 2025). Seer Interactive's longitudinal study of 25.1 million impressions across 42 organisations found organic CTR fell from 1.76% to 0.61% (Seer Interactive, 2025). ",
            "<strong>The citation advantage:</strong> Brands cited directly inside an AI Overview see 35% more organic clicks and 91% more paid clicks than brands that rank organically but are not cited (Seer Interactive, 2025). Being in the AI answer, not just below it, is the new competitive position. ",
            "In the UAE context, where Google commands approximately 97% of the search engine market, these figures apply directly. Businesses in sectors that rely heavily on informational content, including legal, finance, real estate, healthcare, and education, face the sharpest exposure. What has not changed: branded queries, transactional contact-intent searches, and local near-me results remain largely unaffected by AI Overview displacement. ",
            "Positions 1 to 5 are most vulnerable. Amsive data shows that keywords ranking outside the top three positions saw a CTR decline of 27%. The traffic loss is not concentrated at the very top. It cascades down through all competitive positions for informational queries. "
        ],
    }
];
export const GeoData = [
    {
        title: "Introducing GEO: The New SEO Discipline UAE Businesses Cannot Ignore",

        paragraphs1: [
            "<a class='text-primary hover:underline' href='https://www.globalsurf.ae/generative-engine-optimization'>Generative Engine Optimisation (GEO)</a> is the practice of structuring and positioning website content so that AI systems, including Google's AI Overviews, ChatGPT, and Perplexity, cite, reference, or surface your content in AI-generated answers.</a>",
            "If <a class='text-primary hover:underline' href='https://www.globalsurf.ae/seo-agency-dubai'>traditional SEO</a> was about getting your business into the directory listing at the right position, GEO is about being the source the AI reads out loud when someone asks a question. The goal shifts from ranking to being cited. The mechanics of how you achieve that citation are fundamentally different from how you achieved a ranking."
        ],

        imageTitle: "How GEO Differs from Traditional SEO",
        imagealt: "Difference between traditional SEO and GEO",
        image: assets.ai3,

        paragraphs3: [
            "Traditional SEO focuses on keyword relevance, backlink authority, and technical site performance to rank in the blue link results. GEO focuses on content structure, answer-first formatting, entity clarity, and trust signals that make AI systems confident enough to cite your content in a generated summary. According to the GEO (Generative Engine Optimization) research published in KDD 2024 by Princeton University and Georgia Tech, content optimized with statistics, citations, and quotable statements achieved 41% higher AI visibility compared to non-optimized content. Among 3,000+ queries across 10 domains, statistics proved the most effective GEO strategy."
        ],

        listTitle: "The 5 Core Principles of GEO for UAE Businesses",

        listItems: [
            {
                label: "<strong>Authoritative sourcing:</strong> cite data, regulations, and UAE-specific references. Content that references FTA guidelines, RERA regulations, or UAE Central Bank frameworks carries entity authority signals that AI systems trust."
            },
            {
                label: "<strong>Structured content formats:</strong> use clear H2 and H3 headings formatted as questions, numbered steps, and definition-style opening sentences that AI models can extract and cite directly."
            },
            {
                label: "<strong>Entity clarity:</strong> name your business, location, specialisation, and sector explicitly and consistently across all pages."
            },
            {
                label: "<strong>Answer-first writing:</strong> open every key page or article with a direct 40 to 60-word answer to the primary question. AI systems prioritise extractable, standalone answers."
            },
            {
                label: "<strong>Trust signals:</strong> author credentials, case studies, client testimonials, professional body memberships, and UAE regulatory compliance markers all strengthen the E-E-A-T profile that AI systems evaluate."
            }
        ]
    }
];
export const GeoAppData = [
    {
        title: "Why UAE Content Needs Specific GEO Adaptation ",
        paragraphs1: [
            "With AI Overviews now supporting Arabic and the UAE's population being bilingual across English and Arabic search behaviour, UAE businesses have a specific GEO opportunity. A bilingual content strategy - with dedicated Arabic-language content targeting Arabic search queries - positions a business to be cited in both English and Arabic AI Overviews. This is an underexploited advantage that most UAE businesses have not yet addressed. ",
            "<strong>Global Surf Perspective:</strong> GEO optimisation is now a core part of the SEO work we deliver for UAE clients at Global Surf Digital. Being visible in traditional rankings is no longer sufficient on its own. The question we ask for every client is: are you cited in the AI answers your target customers are reading? If not, you are invisible at the moment of highest research intent. "
        ],
        
    }
];

export const Faq = [

    {
        title: "What are Google AI Overviews?",
        description:
            "Google AI Overviews are AI-generated summaries that appear at the top of Google search results, synthesising information from multiple web sources to answer a user's query directly, often before they click any organic result. They are powered by Google's Gemini AI model and were formerly known as Search Generative Experience (SGE). AI Overviews launched in the UAE and MENA region in May 2025 with Arabic language support.",
    },
    {
        title: "How do Google AI Overviews affect organic traffic for UAE businesses?",
        description:
            "AI Overviews reduce click-through rates for informational queries by displaying answers directly on the search results page. Ahrefs found a 34.5% CTR drop for position-one results when an AI Overview is present, while Seer Interactive measured a 61% organic CTR decline across 25.1 million impressions. UAE businesses in high-information sectors including legal, finance, and real estate are most exposed. Branded, transactional, and local queries are significantly less affected.",
    },
    {
        title: "Which UAE industries are most at risk from AI Overviews?",
        description:
            "Sectors that traditionally attract traffic through informational content face the highest risk. These include real estate, legal services, healthcare, financial services, and education. Businesses in these verticals should prioritise GEO optimisation, structured data markup, and strong E-E-A-T signals as a matter of urgency. E-commerce and retail businesses face lower risk as transactional queries are less likely to trigger AI Overviews.",
    },
    {
        title: "What is Generative Engine Optimisation (GEO) and how does it apply to UAE businesses?",
        description:
            "GEO is the practice of structuring website content so that AI systems - including Google's AI Overviews, ChatGPT, and Perplexity - cite and reference your content in their generated answers. For UAE businesses, this involves answer-first content formatting, schema markup, clear entity signals, strong E-E-A-T credentials, and bilingual Arabic and English content strategies to capture citations across both language query patterns.",
    },
    {
        title: "Can I get my UAE business content cited inside Google AI Overviews?",
        description:
            "Ahrefs' mid-2025 study found that 76% of URLs cited in AI Overviews ranked in the top ten organic positions — though updated research from early 2026 shows this overlap has since shifted, with AI Overview citations increasingly drawing from pages outside the top ten. Strong organic rankings remain the most reliable foundation for AI citation eligibility.",
    },
    {
        title: "Are all UAE business types equally affected by AI Overviews?",
        description:
            "No. Transactional and navigational queries - branded searches, buy-now queries, and location-based near-me searches - are largely unaffected. Businesses with strong local SEO and brand recognition retain more protection. Informational content targeting awareness-stage queries is the most vulnerable. The key strategic distinction is between informational intent (high AI exposure) and transactional or navigational intent (low AI exposure).",
    },
    {
        title: "How quickly can UAE businesses adapt their SEO strategy to account for AI Overviews?",
        description:
            "Initial adaptations - restructuring key content in answer-first format, implementing FAQ and HowTo schema, and updating meta data - can be completed within four to eight weeks. More comprehensive GEO strategies, including topical authority building and E-E-A-T enhancement, typically show measurable results within three to six months. Starting with a content audit identifying which pages are being displaced by AI Overviews is the fastest way to prioritise effort.",
    },
    {
        title: "Should UAE businesses invest more in paid search as a result of AI Overviews?",
        description:
            "For many UAE businesses, a recalibrated channel mix that includes stronger paid search investment alongside a refined organic strategy makes sense in the AI Overview era. Paid search ads continue to appear prominently and are unaffected by AI Overview displacement. However, paid search should complement, not replace, a strong long-term SEO and GEO foundation. The most resilient strategy combines both channels with a clear understanding of where each delivers strongest return on investment.",
    },

];
