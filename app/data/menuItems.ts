import { assets } from "@/public/assets/assets";


export const menuItems = [
    {
        item: "ABOUT",
        url:"/about-us"
    },
    {
        item:"SERVICES",
        children: [
            {
                item:"Performance Marketing",
                svg: assets.sem,
                url:"/performance-marketing"
            },
            {
                item:"Search Engine Optimization",
                svg: assets.seo,
                url:"/seo"
            },
            {
                item:"Social Media Marketing",
                svg: assets.socialMedia,
                url:"/social-media"
            },
            {
                item:"Website Design And Development",
                svg: assets.websiteD,
                url:"/web-design-development"
            },
            {
                item:"Branding And Creatives",
                svg: assets.branding,
                url:"/branding-creative"
            },
            {
                item:"Marketing Intelligence",
                svg: assets.strategy,
                url:"/marketing-intelligence"
            }
        ]
    },
    {
        item:"PORTFOLIO",
        url:"/portfolio"
    },
    {
        item:"CAREERS",
        url:"#"
    },
    {
        item:"BLOGS",
        url:"#"
    }
]