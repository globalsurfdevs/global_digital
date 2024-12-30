import { SetStateAction } from "react";

export const checkLogoAndBanner = (imageFile:File|null,setImageError: { (value: SetStateAction<string | null>): void; (arg0: string): void; },logoFile:File|null,setLogoError: { (value: SetStateAction<string | null>): void; (arg0: string): void; }) =>{
    
    if(!imageFile){
        setImageError("Banner Image is required")   
        return false;
    }
    if(!logoFile){
        setLogoError("Logo is required")
        return false;
    }
    return true;
}