// types/Service.ts

import { SeoFormValues } from "@/app/types/seo";

export interface IndustryItem {
    _id: string;
    name: string;
    slug: string;
    seo: SeoFormValues;

    firstSection: {
        image: string;
        imageAlt: string;
        logo: string;
        logoAlt: string;
        title: string;
        description: string;
        items: {
            _id: string;
            title: string;
            link: string;
        }[];
    };

    secondSection: {
        title: string;
        subTitle: string;
        description: string;
    };

    thirdSection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            image: string;
            imageAlt: string;
            description: string;
            link:string;
        }[];
    };

    fourthSection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            description: string;
        }[];
    };

    fifthSection: {
        title: string;
        subTitle: string;
        description: string;
        items: {
            _id: string;
            number: string;
            value: string;
        }[];
    };

    sixthSection: {
        title: string;
        items: {
            _id: string;
            company: string;
            number: string;
            value: string;
            title: string;
            description: string;
            isPrimary:boolean;
        }[];
    };

    seventhSection:{
        title:string;
        subTitle:string;
        logo:string;
        logoAlt:string;
    }

    ctaSection: {
        titleRed: string;
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };

    faqSection: {
        title: string;
        items: {
            _id: string;
            question: string;
            answer: string;
        }[];
    };

    createdAt: string;
    updatedAt: string;
}

export interface Industry {
    _id: string;
    items: IndustryItem[];
}