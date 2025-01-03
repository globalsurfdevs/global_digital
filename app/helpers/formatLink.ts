export const formatLinkForPortfolio = (name: string) => {
    return name
        .replace(/,|\./g, '')        // Remove commas and periods
        .replace(/ \(/g, '-')        // Replace " (" with a single "-"
        .replace(/\(/g, '-')         // Replace any remaining "(" with "-"
        .replace(/\)/g, '')          // Remove ")"
        .replace(/ /g, '-')          // Replace spaces with hyphens
        .toLowerCase();              // Convert to lowercase
};


export const formatLinkForCaseStudy = (news:string) =>{
    return news
        .replace(/,/g, '') // Replace commas with hyphens
        .replace(/ /g, '-')
        .replace(/\./g, '')
        .replace(/’/g,'')
        .toLowerCase();
}