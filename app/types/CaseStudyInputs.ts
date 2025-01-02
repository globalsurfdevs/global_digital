export type CaseStudyInputs = {
    heading: string
    sHeading: string
    country: string
    channelsUsed: string
    industry:string;
    story: string
    goals: string;
    objectives: string;
    challenge: string;
    overcomingChallenges: string;
    achievements: string;
    description:string;
    tag:string;
    companyName:string;
} & {
    [key: `highlightNumber${string}`]: string;
} & {
    [key: `highlightText${string}`]: string;
}