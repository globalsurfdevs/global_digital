import { supabase } from "@/app/lib/initSupabase"
import { uploadToDropbox } from "@/app/lib/uploadToDropbox"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {

    try {
        console.log("This worlds")
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        console.log(id)

        if (id) {

            let { data: portfolio, error } = await supabase
                .from('portfolios')
                .select("*")
                .eq('id', id)


            let { data: portfolioHighlights } = await supabase
                .from('portfolioHighlights')
                .select("*")
                .eq('companyId', id)

            return NextResponse.json({ portfolio, portfolioHighlights });
        }

        let { data: portfolio, error } = await supabase
            .from('portfolios')
            .select('*')

        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        return NextResponse.json({ portfolio });

    } catch (error) {
        console.log("error getting portfolio:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    console.log("Here")
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const formData = await req.formData()
    // const title = formData.get("title") as string
    const industry = formData.get("industry") as string
    const country = formData.get("country") as string
    const channelsUsed = formData.get("channelsUsed") as string
    const story = formData.get("story") as string
    const goals = formData.get("goals") as string
    const objectives = formData.get("objectives") as string
    const challenge = formData.get("challenge") as string
    const solutions = formData.get("solutions") as string
    const result = formData.get("result") as string
    const companyName = formData.get("companyName") as string

    // const metadataDesc = formData.get("metadataDesc") as string
    const image = formData.get("image") as string
    const section2Image1 = formData.get("section2Image1") as string;
    const section2Image2 = formData.get("section2Image2") as string;
    const section2BannerImage = formData.get("section2BannerImage") as File | null;
    const resultImage1 = formData.get("resultImage1") as File | null
    const resultImage2 = formData.get("resultImage2") as File | null

    const description = formData.get("description") as string;
    const tag = formData.get("tag") as string;
    const addedCategories = formData.get("addedCategories") as string

    console.log("description",description)
    console.log("tag",tag)
    console.log("added",addedCategories)

    let addedCategoriesRaw;
    if(addedCategories){
        addedCategoriesRaw = JSON.parse(addedCategories)
    }

    let imagePath;
    let section2Image1Path;
    let section2Image2Path;
    let section2BannerImagePath;
    let resultImage1PAth;
    let resultImage2Path;

    if (section2BannerImage) {
        try {
            const filename = `${Date.now()}-${section2BannerImage.name || "image"}`;
            const dropboxPath = `/portfolio/${companyName}/${filename}`;

            section2BannerImagePath = await uploadToDropbox(section2BannerImage, dropboxPath);
            console.log("New image uploaded to Dropbox:", section2BannerImagePath);

        } catch (error) {
            console.error("Error uploading new image to Dropbox:", error);
            return NextResponse.json({ error: "Error uploading new image" }, { status: 500 });
        }
    }

    if (resultImage1) {
        try {
            const filename = `${Date.now()}-${resultImage1.name || "image"}`;
            const dropboxPath = `/portfolio/${companyName}/${filename}`;

            resultImage1PAth = await uploadToDropbox(resultImage1, dropboxPath);
            console.log("New image uploaded to Dropbox:", resultImage1PAth);

        } catch (error) {
            console.error("Error uploading new image to Dropbox:", error);
            return NextResponse.json({ error: "Error uploading new image" }, { status: 500 });
        }
    }

    if (resultImage2) {
        try {
            const filename = `${Date.now()}-${resultImage2.name || "image"}`;
            const dropboxPath = `/portfolio/${companyName}/${filename}`;

            resultImage2Path = await uploadToDropbox(resultImage2, dropboxPath);
            console.log("New image uploaded to Dropbox:", resultImage2Path);

        } catch (error) {
            console.error("Error uploading new image to Dropbox:", error);
            return NextResponse.json({ error: "Error uploading new image" }, { status: 500 });
        }
    }

    const highlightIdsRaw = formData.get("highlightIds")
    let hightLightIds = []
    if (highlightIdsRaw) {
        hightLightIds = JSON.parse(highlightIdsRaw.toString())
    }

    console.log("highlightids raw", highlightIdsRaw)


    if(image==null){
        imagePath = undefined
    }else{
        imagePath = image
    }

    if(section2Image1==null){
        section2Image1Path = undefined
    }else{
        section2Image1Path = section2Image1
    }

    if(section2Image2==null){
        section2Image2Path = undefined
        
    }else{
        section2Image2Path = section2Image2
    }

    console.log("imagePAth",imagePath)
    console.log("section2Image1Path",section2Image1Path)
    console.log("section2Image2Path",section2Image2Path)

    

    try {

        if (id) {
            const { data: portfolio, error } = await supabase
                .from('portfolios')
                .select('*')
                .eq('id', id)

            if (portfolio) {
                const { data, error } = await supabase
                    .from('portfolios')
                    .update({
                        companyName,
                        industry,
                        country,
                        channelsUsed,
                        bannerImage: image == null ? imagePath : image,
                        story,
                        section2Image1: section2Image1 == null ? section2Image1Path : section2Image1,
                        section2Image2: section2Image2 == null ? section2Image2Path : section2Image2,
                        goals,
                        objectives,
                        challenge,
                        solutions,
                        result,
                        section2BannerImage: section2BannerImagePath,
                        resultImage1: resultImage1PAth,
                        resultImage2: resultImage2Path,
                        tag,
                        description,
                        categories:addedCategoriesRaw
                    })
                    .eq('id', id)
                    .select()

                    console.log("Data",data,"Error",error)

                const highlights: { customId: string, number: string, text: string }[] = [];

                hightLightIds.forEach((item: number) => {
                    const customId = formData.get(`highlightId${item}`) as string;
                    const number = formData.get(`highlightNumber${item}`) as string;
                    const text = formData.get(`highlightText${item}`) as string;
                    highlights.push({ customId, number, text });

                    console.log("Item", item)
                })



                for (let i = 0; i < highlights.length; i++) {

                    if (highlights[i].customId == "") {

                        const { error } = await supabase
                            .from('portfolioHighlights')
                            .delete()
                            .eq('some_column', 'someValue')

                    }

                    let { data: portfolioHighlight, error } = await supabase
                        .from('portfolioHighlights')
                        .select("*")
                        .eq('customId', highlights[i].customId)

                    if (portfolioHighlight && portfolioHighlight.length > 0) {
                        const { data, error } = await supabase
                            .from('portfolioHighlights')
                            .update({ number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId })
                            .eq('customId', highlights[i].customId)
                            .select()

                    } else {
                        console.log("in else yooooo")
                        const { data, error } = await supabase
                            .from('portfolioHighlights')
                            .insert([
                                { number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId, companyId: id },
                            ])
                            .select()
                    }

                }

                return NextResponse.json({ message: "Portfolio updated successfully" }, { status: 200 })

            } else if (error) {
                return NextResponse.json({ error: "Updating portfolio failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        }

        else {


            const { data, error } = await supabase
                .from('portfolios')
                .insert([
                    {
                        companyName,
                        industry,
                        country,
                        channelsUsed,
                        bannerImage:imagePath,
                        story,
                        section2Image1:section2Image1Path,
                        section2Image2:section2Image2Path,
                        goals,
                        objectives,
                        challenge,
                        solutions,
                        result,
                        section2BannerImage: section2BannerImagePath,
                        resultImage1: resultImage1PAth,
                        resultImage2: resultImage2Path,
                        tag,
                        description,
                        categories:addedCategoriesRaw
                    },
                ])
                .select('id')

            let newId: number;
            if (data) {
                newId = data[0].id
            }

            const highlights: { customId: string, number: string, text: string, companyId: number }[] = [];

            hightLightIds.forEach((item: number) => {
                const customId = formData.get(`highlightId${item}`) as string;
                const number = formData.get(`highlightNumber${item}`) as string;
                const text = formData.get(`highlightText${item}`) as string;
                const companyId = newId
                highlights.push({ customId, number, text, companyId });

                console.log("Item", item)
            })

            for (let i = 0; i < highlights.length; i++) {
                console.log(highlights)

                let { data: portfolioHighlight, error } = await supabase
                    .from('portfolioHighlights')
                    .select("*")
                    .eq('customId', highlights[i].customId)

                if (portfolioHighlight && portfolioHighlight.length > 0) {
                    console.log("data", portfolioHighlight)
                    const { data, error } = await supabase
                        .from('portfolioHighlights')
                        .update({ number: highlights[i].number, text: highlights[i].text })
                        .eq('customId', highlights[i].customId)
                        .select()
                    console.log("in if")

                } else {

                    console.log("Inserting")
                    const { data, error } = await supabase
                        .from('portfolioHighlights')
                        .insert([
                            { number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId, companyId: highlights[i].companyId },
                        ])
                        .select()

                }

            }

            if (data) {
                return NextResponse.json({ message: "Portfolio added successfully" }, { status: 200 })

            } else if (error) {
                return NextResponse.json({ error: "Adding portfolio failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        }

    }


    catch (error) {
        console.log("Adding/Updating news failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }

}



export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    try {


        const { error } = await supabase
            .from('portfolios')
            .delete()
            .eq('id', id)



        if (!error) {

            return NextResponse.json({ message: "Removed portfolio successfully" }, { status: 200 })

        } else if (error) {
            return NextResponse.json({ error: "Removing portfolio failed" }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
        }


    } catch (error) {
        console.log("Removing portfolio failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }

}