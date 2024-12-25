import { assets } from "@/public/assets/assets";


export const menuItems = [
    {
        item: "ABOUT",
        url:"about-us"
    },
    {
        item:"SERVICES",
        children: [
            {
                item:"Performance Marketing",
                svg: assets.sem,
                url:"performance-marketing"
            },
            {
                item:"Search Engine Optimization",
                svg: assets.seo,
                url:"#"
            },
            {
                item:"Social Media Marketing",
                svg: assets.socialMedia,
                url:"#"
            },
            {
                item:"Website Design And Development",
                svg: assets.websiteD,
                url:"#"
            },
            {
                item:"Branding And Creatives",
                svg: assets.branding,
                url:"#"
            },
            {
                item:"Marketing Intelligence",
                svg: assets.strategy,
                url:"#"
            }
        ]
    },
    {
        item:"PORTFOLIO",
        url:"portfolio"
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