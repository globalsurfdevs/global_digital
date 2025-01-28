import { supabase } from "@/app/lib/initSupabase"
import { NextRequest, NextResponse } from "next/server"

type Portfolio = {
    index:number
}

type CaseStudyHighlights = {
    companyId:number;
    number:string;
    text:string;
    portfolios:Portfolio | any
}[]

export async function GET(req: NextRequest) {

    try {

        let { data, error } = await supabase
            .from('portfolioHighlights')
            .select("companyId,number,text,portfolios(*)")
            .eq('showInHome', true).limit(3)

            if(data){
                let caseStudyHighlights:CaseStudyHighlights = data
                if (caseStudyHighlights) {
                    caseStudyHighlights = caseStudyHighlights.sort((a, b) => (a.portfolios.index || Infinity) - (b.portfolios.index || Infinity));
                    return NextResponse.json({ caseStudyHighlights }, { status: 200 });
            }
       
        } else {
            console.log(error)
            return NextResponse.json({ error: "Failed getting casestudy data" }, { status: 400 });
        }

    }


    catch (error) {
        console.log("error getting case study:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}