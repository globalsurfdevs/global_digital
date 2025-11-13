import { supabase } from "@/app/lib/initSupabase"
import redisClient from "@/app/lib/redisClient"
import { uploadToDropbox } from "@/app/lib/uploadToDropbox"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';


export async function GET(req: NextRequest) {

    try {
        console.log("This worlds hehehehhe")
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const slug = searchParams.get("slug")
        const userType = req.headers.get('x-auth-type')

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
        } else if (slug) {

            let { data: portfolio, error } = await supabase
                .from('portfolios')
                .select("*")
                .eq('slug', slug)

            if (portfolio && portfolio.length > 0) {
                let { data: portfolioHighlights } = await supabase
                    .from('portfolioHighlights')
                    .select("*")
                    .eq('companyId', portfolio[0].id)
                    
                    console.log(portfolio,"PortfolioH",portfolioHighlights)


                    return NextResponse.json({ portfolio, portfolioHighlights });
            }


        } else {
            if (userType !== "admin") {

                const cashedData:[] = await redisClient.get('portfolios') || []
                
                if(cashedData.length > 0){
                    const portfolio = [...cashedData]
                    console.log("From cache")
                    return NextResponse.json({portfolio})
                }
                
                let { data: portfolio, } = await supabase
                    .from('portfolios')
                    .select('*').order('index',{ascending:true})


                // let { data: caseStudy } = await supabase
                //     .from('caseStudy')
                //     .select('*')


                // const combinedData = [...(portfolio || []), ...(caseStudy?.map((item) => ({ ...item, type: "case-study" })) || [])]

                await redisClient.set('portfolios',portfolio,{
                    ex:300
                })

                console.log("From fresh")

                return NextResponse.json({ portfolio });
                
            } else {

                console.log("Here")
                let { data: portfolio, } = await supabase
                    .from('portfolios')
                    .select('*')
                    .order('index',{ascending:true})
                

                   

                if (portfolio && portfolio.length>0) {
                    return NextResponse.json({ portfolio });
                } else {
                    return NextResponse.json({ error: "Fetching portfolio failed" })
                }
            }
        }


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
    const channels = JSON.parse(formData.get("channels") as string);
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
    const section2BannerImage = formData.get("section2BannerImage") as string;
    const resultImage1 = formData.get("resultImage1") as File | null
    const resultImage2 = formData.get("resultImage2") as File | null
    const video = formData.get("video") as string
    const videoTitle = formData.get("videoTitle") as string

    const description = formData.get("description") as string;
    const tag = formData.get("tag") as string;
    const addedCategories = formData.get("addedCategories") as string
    const logo = formData.get("logo") as string
    const slug = formData.get("slug") as string
    const metaTitle = formData.get("metaTitle") as string
    const metaDescription = formData.get("metaDescription") as string
    const section = formData.get("section") as string

    const heading = formData.get("heading") as string
    const sHeading = formData.get("sHeading") as string
    // const metadataDesc = formData.get("metadataDesc") as string
    const overcomingChallenges = formData.get("overcomingChallenges") as string
    const achievements = formData.get("achievements") as string;
    const image1 = formData.get("image1") as string;
    const image2 = formData.get("image2") as string;
    const coverImage = formData.get("coverImage") as string
    const selectedHighlightForHome = formData.get("selectedHighlightForHome") as string;
    const homeTitle = formData.get("homeTitle") as string;
    const homeSubTitle = formData.get("homeSubTitle") as string;
    const homeImage = formData.get("homeImage") as string;
    const websiteLink = formData.get("websiteLink") as string;
    const bannerTitle = formData.get("bannerTitle") as string;
    const videoThumbnail = formData.get("videoThumbnail") as File | null

   
    console.log("description", description)
    console.log("tag", tag)
    console.log("added", addedCategories)

    console.log("section",section)

    let addedCategoriesRaw;
    if (addedCategories) {
        addedCategoriesRaw = JSON.parse(addedCategories)
    }

    let imagePath;
    let section2Image1Path;
    let section2Image2Path;
    let section2BannerImagePath;
    let resultImage1PAth;
    let resultImage2Path;
    let logoPath;
    let coverImagePath;
    let image1Path;
    let image2Path;
    let homeImagePath;
    let videoThumbnailPath;


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

    if (videoThumbnail) {
        try {
            const filename = `${Date.now()}-${videoThumbnail.name || "image"}`;
            const dropboxPath = `/portfolio/${companyName}/${filename}`;

            videoThumbnailPath = await uploadToDropbox(videoThumbnail, dropboxPath);
            console.log("New image uploaded to Dropbox:", videoThumbnailPath);

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


    if (image == null) {
        imagePath = undefined
    } else {
        imagePath = image
    }

    if (section2Image1 == null) {
        section2Image1Path = undefined
    } else {
        section2Image1Path = section2Image1
    }

    if (section2Image2 == null) {
        section2Image2Path = undefined
    } else {
        section2Image2Path = section2Image2
    }

    if (logo == null) {
        logoPath = undefined
    } else {
        logoPath = logo
    }

    if (section2BannerImage == null) {
        section2BannerImagePath = undefined
    } else {
        section2BannerImagePath = section2BannerImage
    }


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

    if (homeImage == null) {
        homeImagePath = undefined
    } else {
        homeImagePath = homeImage
    }


    // console.log("imagePAth", imagePath)
    // console.log("section2Image1Path", section2Image1Path)
    // console.log("section2Image2Path", section2Image2Path)



    try {
        console.log("channelsUsed",channels)

        if(section=='portfolio'){
            if (id) {
                const { data: portfolio, error } = await supabase
                    .from('portfolios')
                    .select('*')
                    .eq('id', id)
    
                if (portfolio) {
                    console.log("FIRSTTTTTTTTTTTTTTTT")
                    const { data, error } = await supabase
                        .from('portfolios')
                        .update({
                            companyName,
                            industry,
                            country,
                            channels,
                            bannerImage: image == null ? imagePath : image,
                            story,
                            section2Image1: section2Image1 == null ? section2Image1Path : section2Image1,
                            section2Image2: section2Image2 == null ? section2Image2Path : section2Image2,
                            goals,
                            objectives,
                            challenge,
                            solutions,
                            result,
                            section2BannerImage: section2BannerImage == null ? section2BannerImagePath : section2BannerImage,
                            resultImage1: resultImage1PAth,
                            resultImage2: resultImage2Path,
                            video,
                            tag,
                            description,
                            categories: addedCategoriesRaw,
                            logo: logo == null ? logoPath : logo,
                            slug,
                            metaTitle,
                            metaDescription,
                            websiteLink,
                            bannerTitle,
                            videoThumbnail: videoThumbnailPath,
                            videoTitle,
                        })
                        .eq('id', id)
                        .select()
    
                    
    
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
                            console.log("deleteData", highlights[i].customId)
                            const deleteId = highlights[i].customId.slice(0, 36)
                            const { error: deleteError } = await supabase
                                .from('portfolioHighlights')
                                .delete()
                                .eq('customId', deleteId)
    
                            continue;
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
                            channels,
                            bannerImage: imagePath,
                            story,
                            section2Image1: section2Image1Path,
                            section2Image2: section2Image2Path,
                            goals,
                            objectives,
                            challenge,
                            solutions,
                            result,
                            section2BannerImage: section2BannerImagePath,
                            resultImage1: resultImage1PAth,
                            resultImage2: resultImage2Path,
                            video,
                            tag,
                            description,
                            categories: addedCategoriesRaw,
                            logo: logoPath,
                            slug,
                            metaTitle,
                            metaDescription,
                            customId:uuidv4(),
                            websiteLink,
                            bannerTitle,
                            videoThumbnail: videoThumbnailPath,
                            videoTitle,
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

        else{
            if (id) {
                const { data: portfolio, error } = await supabase
                    .from('portfolios')
                    .select('*')
                    .eq('id', id)
    
                if (portfolio) {
                    const { data, error } = await supabase
                        .from('portfolios')
                        .update({
                            heading,
                            sHeading,
                            industry,
                            country,
                            channels,
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
                            homeImage: homeImage == null ? homeImagePath : homeImage,
                            logo: logo == null ? logoPath : logo,
                            companyName,
                            slug,
                            metaTitle,
                            metaDescription,
                            customId:uuidv4(),
                            section,
                            homeTitle,
                            homeSubTitle
                        })
                        .eq('id', id)
                        .select()
    
                    
    
                    const highlights: { customId: string, number: string, text: string , showInHome:boolean }[] = [];
    
                    hightLightIds.forEach((item: number) => {
                        const customId = formData.get(`highlightId${item}`) as string;
                        const number = formData.get(`highlightNumber${item}`) as string;
                        const text = formData.get(`highlightText${item}`) as string;
    
                        highlights.push({ customId, number, text, showInHome:selectedHighlightForHome==customId });
    
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
                                .from('portfolioHighlights')
                                .delete()
                                .eq('customId', deleteId)
    
                            continue;
                        }
    
                        console.log("no delete")
    
                        let { data: portfolioHighlights, error } = await supabase
                            .from('portfolioHighlights')
                            .select("*")
                            .eq('customId', highlights[i].customId)
    
                        if (portfolioHighlights && portfolioHighlights.length > 0) {
                            const { data, error } = await supabase
                                .from('portfolioHighlights')
                                .update({ number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId,showInHome:highlights[i].showInHome })
                                .eq('customId', highlights[i].customId)
                                .select()
    
                        } else {
                            console.log("in else yooooo")
                            const { data, error } = await supabase
                                .from('portfolioHighlights')
                                .insert([
                                    { number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId, companyId: id, showInHome:highlights[i].showInHome },
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
    
                console.log("here in add")
                const { data, error } = await supabase
                    .from('portfolios')
                    .insert([
                        {
                            heading,
                            sHeading,
                            industry,
                            country,
                            channels,
                            coverImage: coverImagePath,
                            story,
                            image1: image1Path,
                            image2: image2Path,
                            homeImage: homeImagePath,
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
                            metaDescription,
                            section,
                            homeTitle,
                            homeSubTitle
                        },
                    ])
                    .select('id')
    
                let newId: number;
                if (data) {
                    newId = data[0].id
                }
    
                const highlights: { customId: string, number: string, text: string, companyId: number,showInHome:boolean }[] = [];
    
                hightLightIds.forEach((item: number) => {
                    const customId = formData.get(`highlightId${item}`) as string;
                    const number = formData.get(`highlightNumber${item}`) as string;
                    const text = formData.get(`highlightText${item}`) as string;
                    const companyId = newId
                    highlights.push({ customId, number, text, companyId,showInHome:selectedHighlightForHome==customId });
    
                    console.log("Item", item)
                })
    
                for (let i = 0; i < highlights.length; i++) {
                    console.log(highlights)
    
                    let { data: portfolioHighlights, error } = await supabase
                        .from('portfolioHighlights')
                        .select("*")
                        .eq('customId', highlights[i].customId)
    
                    if (portfolioHighlights && portfolioHighlights.length > 0) {
                        console.log("data", portfolioHighlights)
                        const { data, error } = await supabase
                            .from('portfolioHighlights')
                            .update({ number: highlights[i].number, text: highlights[i].text,showInHome:highlights[i].showInHome })
                            .eq('customId', highlights[i].customId)
                            .select()
                        console.log("in if")
    
                    } else {
    
                        console.log("Inserting")
                        const { data, error } = await supabase
                            .from('portfolioHighlights')
                            .insert([
                                { number: highlights[i].number, text: highlights[i].text, customId: highlights[i].customId, companyId: highlights[i].companyId,showInHome:highlights[i].showInHome },
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