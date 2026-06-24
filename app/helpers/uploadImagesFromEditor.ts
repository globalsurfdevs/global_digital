import { uploadToDropbox } from "../lib/uploadToDropbox";

const convertToWebp = (blob: Blob): Promise<Blob> =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => resolve(b!), "image/webp", 0.85);
    };
    img.src = url;
  });

export const uploadImagesFromEditor = async (content: string) => {
  const doc = new DOMParser().parseFromString(content, "text/html");
  console.log(content);
  const imageElements: NodeListOf<HTMLImageElement> =
    doc.querySelectorAll("img[src^='data:']");
  console.log(imageElements);
  const uploadedUrls: Record<string, string> = {};

  const uploadImages = Array.from(imageElements).map(async (img) => {
    const blobUrl = img.src;
    // const blob = await fetch(blobUrl).then(res => res.blob());
    // const file = new File([blob], `image_${Date.now()}.png`, { type: blob.type });
    // const filename = `${Date.now()}-${file.name || "image"}`;
    // AFTER
const blob = await fetch(blobUrl).then((res) => res.blob());
const webpBlob = await convertToWebp(blob);
const filename = `${Date.now()}-image.webp`;
    const file = new File([webpBlob], filename, { type: "image/webp" });
    const dropboxPath = `/blog-content/${filename}`;
    // await new Promise(resolve => setTimeout(resolve, 500));
    const imagepath = await uploadToDropbox(file, dropboxPath);
    uploadedUrls[blobUrl] = imagepath;
  });

  const uploadedAll = await Promise.all(uploadImages);
  if (uploadedAll) {
    Array.from(imageElements).forEach((img) => {
      if (uploadedUrls[img.src]) {
        img.src = uploadedUrls[img.src]; // Swap the URL in the DOM
      }
    });
  }

  return doc.body.innerHTML;
};
