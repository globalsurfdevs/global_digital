import { Dropbox } from "dropbox";

const APP_KEY = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY;
const APP_SECRET = process.env.NEXT_PUBLIC_DROPBOX_APP_SECRET;
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_DROPBOX_REFRESH_TOKEN;

if (!APP_KEY) {
  throw new Error("DROPBOX_APP_KEY not in env");
}

if(!REFRESH_TOKEN){
  throw new Error("DROPBOX_REFRESH_TOKEN not in env")
}

if(!APP_SECRET){
  throw new Error("DROPBOX_APP_SECRET not in env")
}




interface TokenInfo {
  accessToken: string;
  expiresAt: number;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

let tokenInfo: TokenInfo | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenInfo && tokenInfo.expiresAt > Date.now()) {
    return tokenInfo.accessToken;
  }

  
  try {
    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
        client_id: APP_KEY,
        client_secret: APP_SECRET,
      } as Record<string, string>),
    });
    const responseText = await response.text();

    const data = JSON.parse(responseText) as TokenResponse;

    if (!data.access_token) {
      throw new Error("Access token not found in response");
    }

    tokenInfo = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
    };

    
    return tokenInfo.accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token");
  }
}

let dropboxInstance: Dropbox | null = null;
let currentAccessToken: string | null = null;

async function getDropboxInstance(): Promise<Dropbox> {
  const accessToken = await getAccessToken();
  // console.log("Access Token:", accessToken);
  
  if (!dropboxInstance || currentAccessToken !== accessToken) {
    dropboxInstance = new Dropbox({
      accessToken,
      fetch: (url: RequestInfo, init?: RequestInit) => {
        console.log("Dropbox API Request:", url, init); // Log each Dropbox API request
        return fetch(url, init) as Promise<Response>;
      },
    });
    currentAccessToken = accessToken;
  }

  return dropboxInstance;
}


export async function uploadToDropbox(file: File, filePath: string,retries=5,delay=2000): Promise<string> {
  try {
    
    const dropbox = await getDropboxInstance();
    
    const fileContent = await file.arrayBuffer();
    
    const response = await dropbox.filesUpload({
      path: filePath,
      contents: fileContent,
    });

    console.log("File uploaded successfully:", response);
    if (!response.result.path_display) {
      throw new Error("Failed to retrieve uploaded file path");
    }
    const sharedLinkResponse = await dropbox.sharingCreateSharedLinkWithSettings({
      path: response.result.path_display,
      settings: {
        requested_visibility: { ".tag": "public" },
      },
    });
    console.log("Uploaded file path:", sharedLinkResponse);
    if (!sharedLinkResponse.result.url) {
      throw new Error("Failed to create shared link");
    }

    // Convert the shared link to a direct download link
    const directLink = sharedLinkResponse.result.url.replace("www.dropbox.com", "dl.dropboxusercontent.com");

    console.log("Direct download link:", directLink);
    return directLink;
  } catch (error:any) {
    if(error.status==429 && retries > 0){
      const retryAfter = error.response?.headers.get("Retry-After") || delay / 1000;
      console.warn(`Rate limit hit, retrying in ${retryAfter} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return uploadToDropbox(file, filePath, retries - 1, delay * 2);
    }
    console.error("Error uploading file to Dropbox:", error);
    throw error;
  }
}

export async function removeFromDropbox(filePath: string): Promise<boolean> {
  try {
    console.log("path",filePath)
    const dropbox = await getDropboxInstance();
    const response = await dropbox.filesDeleteV2({ path: filePath });
    console.log(response)
    console.log("File deleted successfully:", response);
    return true;
  } catch (error) {
    console.error("Error deleting file from Dropbox:", error);
    return false;
  }
}