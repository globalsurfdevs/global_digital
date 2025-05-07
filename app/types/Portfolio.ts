export type Portfolio = {
    customId: string;
    section: string;
    heading: string;
    id:number;
    companyName:string;
    industry:string;
    country:string;
    channelsUsed:string;
    bannerImage:string;
    story:string;
    goals:string;
    objectives:string;
    result:string;
    resultImage1:string;
    resultImage2:string;
    section2BannerImage:string;
    section2Image1:string;
    section2Image2:string;
    solutions:string;
    challenge:string;
    categories:{name:string}[]
    tag:string;
    description:string;
    logo:string;
    coverImage:string;
    type?:string;
    index?:number;
    homeTitle:string;
    homeSubTitle:string;
    slug:string;
    bannerTitle:string;
    websiteLink:string;
}