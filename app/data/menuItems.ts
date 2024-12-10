import { assets } from "@/public/assets/assets";


export const menuItems = [
    {
        item:"ABOUT"
    },
    {
        item:"Services",
        children:[
            {
                item:"Social Media Marketing",
                svg:assets.socialMedia
            },
            {
                item:"Website Design And Development",
                svg:assets.websiteD
            },
            {
                item:"Search Engine Optimization",
                svg:assets.seo
            },
            {
                item:"Mobile Applications Development",
                svg:assets.mobile
            },
            {
                item:"Branding And Creatives",
                svg:assets.branding
            },
            {
                item:"Reputation Management",
                svg:assets.reputation
            },
            {
                item:"Video Production",
                svg:assets.video
            },
            {
                item:"Strategy Consulting",
                svg:assets.strategy
            },
            {
                item:"Search Engine Marketing",
                svg:assets.sem
            }
        ]
    },
    {
        item:"PORTFOLIO"
    },
    {
        item:"CAREERS"
    },
    {
        item:"BLOGS"
    }
]