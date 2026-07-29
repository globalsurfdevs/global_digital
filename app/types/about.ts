export type About = {
    firstSection: {
        title: string;
        description: string;
        video: string;
    },
    teamSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
        }[]
    },
    secondSection: {
        title: string;
        description: string;
    }
    thirdSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[]
    },
    fourthSection: {
        title: string;
        items: {
            title: string;
            description:string;
        }[]
    },
    lastSection:{
        title:string;
        description:string;
        buttonText:string;
        buttonLink:string;
    }
}