import { Dispatch } from "react";

export const handleImageChange = ({e,setImageError,setImageFile,setPreviewImage}: {
    e:React.ChangeEvent<HTMLInputElement>
    setImageError:Dispatch<React.SetStateAction<string|null>>
    setImageFile:Dispatch<React.SetStateAction<File|null>>
    setPreviewImage:Dispatch<React.SetStateAction<string|null>>
}) => {
        const file = e.target.files?.[0];
        console.log("This works")
        if (file) {
            // Validate the image file type
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (!validImageTypes.includes(file.type)) {
                setImageError("Please select an image file (JPEG, PNG, or GIF)");
                return;
            }

            // Validate the image file size
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                setImageError("Image file size must not exceed 10MB");
                return;
            }

            setImageFile(file);

            setImageError(null); // Reset error message if there was one

            // Generate the preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
            setImageFile(null);
        }
    };