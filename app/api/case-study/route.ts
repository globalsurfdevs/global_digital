import { categories } from "@/app/data/categories"
import { supabase } from "@/app/lib/initSupabase"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {

    try {
        console.log("This worlds")
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const slug = searchParams.get("slug")

        console.log(id)

        if (id) {

            let { data: caseStudy, error } = await supabase
                .from('portfolios')
                .select("*")
                .eq('id', id)


            let { data: caseStudyHighlights } = await supabase
                .from('portfolioHighlights')
                .select("*")
                .eq('companyId', id)

            return NextResponse.json({ caseStudy, caseStudyHighlights });
        } else if (slug) {

            let { data: caseStudy, error } = await supabase
                .from('portfolios')
                .select("*")
                .eq('slug', slug)

                console.log("case study",caseStudy)

            if (caseStudy && caseStudy.length > 0) {
                let { data: caseStudyHighlights } = await supabase
                    .from('portfolioHighlights')
                    .select("*")
                    .eq('companyId', caseStudy[0].id)

                return NextResponse.json({ caseStudy, caseStudyHighlights });
            }
        } else {
            let { data: caseStudy, error } = await supabase
                .from('portfolios')
                .select('*')
                .eq('section','case study')


            if (!caseStudy) {
                return NextResponse.json({ error: "Case study not found" }, { status: 404 });
            }

            return NextResponse.json({ caseStudy });
        }


    } catch (error) {
        console.log("error getting case study:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    console.log("Here")
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const formData = await req.formData()
    // const title = formData.get("title") as string
    const heading = formData.get("heading") as string
    const sHeading = formData.get("sHeading") as string
    const logo = formData.get("logo") as string
    const story = formData.get("story") as string
    const industry = formData.get("industry") as string
    const country = formData.get("country") as string
    const channelsUsed = formData.get("channelsUsed") as string
    const coverImage = formData.get("coverImage") as string
    const objectives = formData.get("objectives") as string
    const challenge = formData.get("challenge") as string
    const goals = formData.get("goals") as string
    const addedCategories = formData.get("addedCategories") as string
    const companyName = formData.get("companyName") as string

    // const metadataDesc = formData.get("metadataDesc") as string
    const description = formData.get("description") as string;
    const tag = formData.get("tag") as string;
    const overcomingChallenges = formData.get("overcomingChallenges") as string
    const achievements = formData.get("achievements") as string;
    const image1 = formData.get("image1") as string;
    const image2 = formData.get("image2") as string;

    const slug = formData.get("slug") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;

    // const resultImage1 = formData.get("resultImage1") as File | null
    // const resultImage2 = formData.get("resultImage2") as File | null

    // const description = formData.get("description") as string;
    // const tag = formData.get("tag") as string;
    // const addedCategories = formData.get("addedCategories") as string


    // console.log("description", description)
    // console.log("tag", tag)
    // console.log("added", addedCategories)

    // let addedCategoriesRaw;
    // if (addedCategories) {
    //     addedCategoriesRaw = JSON.parse(addedCategories)
    // }

    let addedCategoriesRaw;
    if (addedCategories) {
        addedCategoriesRaw = JSON.parse(addedCategories)
    }

    let coverImagePath;
    let image1Path;
    let image2Path;
    let logoPath;



    // if (resultImage1) {
    //     try {
    //         const filename = `${Date.now()}-${resultImage1.name || "image"}`;
    //         const dropboxPath = `/portfolio/${companyName}/${filename}`;

    //         resultImage1PAth = await uploadToDropbox(resultImage1, dropboxPath);
    //         console.log("New image uploaded to Dropbox:", resultImage1PAth);

    //     } catch (error) {
    //         console.error("Error uploading new image to Dropbox:", error);
    //         return NextResponse.json({ error: "Error uploading new image" }, { status: 500 });
    //     }
    // }

    // if (resultImage2) {
    //     try {
    //         const filename = `${Date.now()}-${resultImage2.name || "image"}`;
    //         const dropboxPath = `/portfolio/${companyName}/${filename}`;

    //         resultImage2Path = await uploadToDropbox(resultImage2, dropboxPath);
    //         console.log("New image uploaded to Dropbox:", resultImage2Path);

    //     } catch (error) {
    //         console.error("Error uploading new image to Dropbox:", error);
    //         return NextResponse.json({ error: "Error uploading new image" }, { status: 500 });
    //     }
    // }

    const highlightIdsRaw = formData.get("highlightIds")
    let hightLightIds = []
    if (highlightIdsRaw) {
        hightLightIds = JSON.parse(highlightIdsRaw.toString())
    }

    console.log("highlightids raw", highlightIdsRaw)


    if (coverImage == null) {
        coverImagePath = undefined
    } else {
        coverImagePath = coverImage
    }

    if (image1 == null) {
        image1Path = undefined
    } else {
        image1Path = image1
    }

    if (image2 == null) {
        image2Path = undefined
    } else {
        image2Path = image2
    }

    if (logo == null) {
        logoPath = undefined
    } else {
        logoPath = logo
    }



    try {

        if (id) {
            const { data: caseStudy, error } = await supabase
                .from('caseStudy')
                .select('*')
                .eq('id', id)

            if (caseStudy) {
                const { data, error } = await supabase
                    .from('caseStudy')
                    .update({
                        heading,
                        sHeading,
                        industry,
                        country,
                        channelsUsed,
                        coverImage: coverImage == null ? coverImagePath : coverImage,
                        story,
                        goals,
                        objectives,
                        challenge,
                        overcomingChallenges,
                        achievements,
                        description,
                        tag,
                        categories: addedCategoriesRaw,
                        image1: image1 == null ? image1Path : image1,
                        image2: image2 == null ? image2Path : image2,
                        logo: logo == null ? logoPath : logo,
                        companyName,
                        slug,
                        metaTitle,
                        metaDescription,
                        customId:uuidv4()
                    })
                    .eq('id', id)
                    .select()

                console.log("Data", data, "Error", error)

                const highlights: { customId: string, number: string, text: string }[] = [];

                hightLightIds.forEach((item: number) => {
                    const customId = formData.get(`highlightId${item}`) as string;
                    const number = formData.get(`highlightNumber${item}`) as string;
                    const text = formData.get(`highlightText${item}`) as string;

                    highlights.push({ customId, number, text });

                    console.log("Item", item)
                })

                console.log("highlights", highlights)



                for (let i = 0; i < highlights.length; i++) {

                    if (highlights[i].customId.length > 36) {
                        console.log("delete pls")
                        console.log("deleteData", highlights[i].customId)
                        const deleteId = highlights[i].customId.slice(0, 36)
                        console.log(deleteId)
                        const { error: deleteError } = await supabase
                            .from('caseStudyHighlights')
                            .delete()
                            .eq('customId', deleteId)

                        continue;
                    }

                    console.log("no delete")

                    let { data: caseStudyHighlight, error } = await supabase
                        .from('caseStudyHighlights')
                        .select("*")
                        .eq('customId', highlights[i].customId)

                    if (caseStudyHighlight && caseStudyHighlight.length > 0) {
                        const { data, error } = await supabase
                            .from('caseStudyHighlights')
                            .update({ number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId })
                            .eq('customId', highlights[i].customId)
                            .select()

                    } else {
                        console.log("in else yooooo")
                        const { data, error } = await supabase
                            .from('caseStudyHighlights')
                            .insert([
                                { number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId, companyId: id },
                            ])
                            .select()
                    }

                }


                return NextResponse.json({ message: "Case study updated successfully" }, { status: 200 })




            } else if (error) {
                return NextResponse.json({ error: "Updating case study failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        }

        else {


            const { data, error } = await supabase
                .from('caseStudy')
                .insert([
                    {
                        heading,
                        sHeading,
                        industry,
                        country,
                        channelsUsed,
                        coverImage: coverImagePath,
                        story,
                        image1: image1Path,
                        image2: image2Path,
                        goals,
                        objectives,
                        challenge,
                        overcomingChallenges,
                        achievements,
                        logo: logoPath,
                        description,
                        tag,
                        categories: addedCategoriesRaw,
                        companyName,
                        slug,
                        metaTitle,
                        metaDescription
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

                let { data: caseStudyHighlight, error } = await supabase
                    .from('caseStudyHighlights')
                    .select("*")
                    .eq('customId', highlights[i].customId)

                if (caseStudyHighlight && caseStudyHighlight.length > 0) {
                    console.log("data", caseStudyHighlight)
                    const { data, error } = await supabase
                        .from('caseStudyHighlights')
                        .update({ number: highlights[i].number, text: highlights[i].text })
                        .eq('customId', highlights[i].customId)
                        .select()
                    console.log("in if")

                } else {

                    console.log("Inserting")
                    const { data, error } = await supabase
                        .from('caseStudyHighlights')
                        .insert([
                            { number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId, companyId: highlights[i].companyId },
                        ])
                        .select()

                }

            }

            if (data) {
                return NextResponse.json({ message: "Case study added successfully" }, { status: 200 })

            } else if (error) {
                return NextResponse.json({ error: "Adding case study failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        }

    }


    catch (error) {
        console.log("Adding/Updating case study failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }

}


export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    try {


        const { error } = await supabase
            .from('caseStudy')
            .delete()
            .eq('id', id)



        if (!error) {

            return NextResponse.json({ message: "Removed case study successfully" }, { status: 200 })

        } else if (error) {
            return NextResponse.json({ error: "Removing case study failed" }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
        }


    } catch (error) {
        console.log("Removing case study failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }

}