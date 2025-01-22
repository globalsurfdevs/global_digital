
import { uploadToDropbox } from "../lib/uploadToDropbox";

export const uploadImagesFromEditor = async(content:string) =>{
    const doc = new DOMParser().parseFromString(content, "text/html");
    console.log(content)
    const imageElements:NodeListOf<HTMLImageElement> = doc.querySelectorAll("img[src^='data:']");
    console.log(imageElements)
    const uploadedUrls: Record<string, string> = {};

    const uploadImages = Array.from(imageElements).map(async(img)=>{
        const blobUrl = img.src;
        const blob = await fetch(blobUrl).then(res => res.blob());
        const file = new File([blob], `image_${Date.now()}.png`, { type: blob.type });
        const filename = `${Date.now()}-${file.name || "image"}`;
        const dropboxPath = `/blog-content/${filename}`;
        await new Promise(resolve => setTimeout(resolve, 500));
        const imagepath = await uploadToDropbox(file, dropboxPath);
        uploadedUrls[blobUrl] = imagepath
    })

    const uploadedAll = await Promise.all(uploadImages);
    if(uploadedAll){
        Array.from(imageElements).forEach((img) => {
            if (uploadedUrls[img.src]) {
                img.src = uploadedUrls[img.src]; // Swap the URL in the DOM
            }
        });
    }

    return doc.body.innerHTML
}