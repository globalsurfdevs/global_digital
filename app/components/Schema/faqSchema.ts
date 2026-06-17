export const buildFaqSchema = (
    faq: { title: string; description: string }[]
) => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",

        mainEntity: faq.map((item) => ({
            "@type": "Question",

            name: item.title,

            acceptedAnswer: {
                "@type": "Answer",

                text: item.description
            }
        }))
    };
};