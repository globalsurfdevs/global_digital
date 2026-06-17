import React from "react";
import { buildFaqSchema } from "./faqSchema";

interface Props {
    faq: {
        title: string;
        description: string;
    }[];
}

const FaqSchema = ({ faq }: Props) => {
    const schema = buildFaqSchema(faq);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />
    );
};

export default FaqSchema;