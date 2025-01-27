export const formatLinkForPortfolio = (name: string) => {
    return name
        .replace(/,|\./g, '')        // Remove commas and periods
        .replace(/ \(/g, '-')        // Replace " (" with a single "-"
        .replace(/\(/g, '-')         // Replace any remaining "(" with "-"
        .replace(/\)/g, '')          // Remove ")"
        .replace(/ /g, '-')          // Replace spaces with hyphens
        .toLowerCase();              // Convert to lowercase
};


export const formatLinkForCaseStudy = (companyName:string) =>{
    return companyName
        .replace(/,/g, '') // Replace commas with hyphens
        .replace(/ /g, '-')
        .replace(/\./g, '')
        .replace(/’/g,'')
        .toLowerCase();
}


export const formatLinkForBlog = (heading:string) =>{
    return heading
        .replace(/,/g, '') // Replace commas with hyphens
        .replace(/ /g, '-')
        .replace(/ /g, '-')
        .replace(/\./g, '')
        .replace(/\? /g, '-')
        .replace(/\!/g, '')
        .replace(/\?/g, '')
        .replace(/’/g,'')
        .replace(/'/g,'')
        .toLowerCase();
}

export const formatLinkForCareer = (jobTitle:string) =>{
    return jobTitle
        .replace(/,/g, '') // Replace commas with hyphens
        .replace(/ /g, '-')
        .replace(/ /g, '-')
        .replace(/\./g, '')
        .replace(/--+/g, '-')
        .replace(/\? /g, '-')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/\!/g, '')
        .replace(/\?/g, '')
        .replace(/’/g,'')
        .replace(/'/g,'')
        .toLowerCase();
}