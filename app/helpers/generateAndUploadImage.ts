import { uploadToDropbox } from "../lib/uploadToDropbox";

export const generateAndUploadImage = async(image: File, companyName: string) => {
    try {
        const filename = `${Date.now()}-${image.name || "image"}`;
        const dropboxPath = `/portfolio/${companyName}/${filename}`;

        let imagePath = await uploadToDropbox(image, dropboxPath);
        console.log("New image uploaded to Dropbox:", imagePath);
        if(imagePath){
            return imagePath
        }else{
            return false
        }

    } catch (error) {
        console.error("Error uploading new image to Dropbox:", error);
        return false
    }
}