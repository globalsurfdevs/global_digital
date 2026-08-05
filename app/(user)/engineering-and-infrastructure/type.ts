// types/Service.ts

import { SeoFormValues } from "@/app/types/seo";

export interface ServiceItem {
    _id: string;
    name: string;
    slug: string;
    seo: SeoFormValues;

    firstSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        items: {
            _id: string;
            title: string;
            link: string;
        }[];
    };

    secondSection: {
        badge: string;
        title: string;
        description: string;
    };

    thirdSection: {
        title: string;
        subTitle: string;
        description: string;
        image: string;
        imageAlt: string;
    };

    fourthSection: {
        title: string;
        subTitle: string;
        description: string;
    };

    fifthSection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[];
    };

    sixthSection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            description: string;
        }[];
    };

    seventhSection: {
        title: string;
        items: {
            _id: string;
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[];
    };

    eighthSection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            description: string;
        }[];
    };

    ninethSection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            description: string;
            image: string;
            imageAlt: string;
        }[];
    };

    tenthSection: {
        title: string;
        serviceIndustries: {
            _id: string;
            image: string;
            imageAlt: string;
            title: string;
        }[];
    };

    eleventhSection: {
        title: string;
        subTitle: string;
        description: string;
        items: {
            _id: string;
            number: string;
            value: string;
        }[];
    };

    industryExperienceResults: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            topTitle: string;
            stat: string;
            statLabel: string;
            title: string;
            description: string;
            logo: string;
            image: string;
            slug: string;
            accent: string;
        }[];
    };

    industries: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            icon: string;
            iconAlt: string;
            slug: string;
            active: boolean;
        }[];
    };

    ctaSection: {
        titleRed: string;
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };

    caseStudySection: {
        title: string;
        subTitle: string;
        items: {
            _id: string;
            title: string;
            // Unpopulated: string (ObjectId). Populated: full Portfolio object.
            project: {
                companyName:string;
                logo:string;
                slug:string;
            };
            description: string;
        }[];
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

export interface Service {
    _id: string;
    items: ServiceItem[];
}