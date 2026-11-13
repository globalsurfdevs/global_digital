import connectDB from "@/lib/mongodb";
import NewPortfolio from "@/app/models/NewPortfolio";
import "@/app/models/Category";
import type { NewPortfolio as NewPortfolioData } from "@/app/types/NewPortfolio";
import type { Portfolio } from "@/app/types/Portfolio";

function toRendererPortfolio(record: Record<string, any>): Portfolio {
  const delivered = record.whatWeDelivered?.items || [];
  return {
    ...record,
    _id: String(record._id),
    companyName: record.company?.name || "",
    industry:
      typeof record.company?.industry === "object"
        ? record.company.industry?.name || ""
        : record.company?.industry || "",
    country: record.company?.country || "",
    slug: record.slug || "",
    newBannerImage: record.brand?.banner?.image || "",
    newBannerTitle: record.brand?.banner?.title || "",
    oneLineBrandContext: record.brand?.oneLineContext || "",
    logo: record.brand?.logo || "",
    websiteLink: record.brand?.websiteLink || "",
    newPortfolioHighlights: record.highlights || [],
    previewImage: { images: record.previewImages || [] },
    standalonePreviewImage: record.standalonePreviewImage || "",
    whatWeDeliveredSec: {
      title: record.whatWeDelivered?.title || "",
      data: delivered.map((item: Record<string, unknown>) => ({
        _id: item._id ? String(item._id) : undefined,
        title: item.title || "",
        icn: item.icon || "",
        urllink: [],
      })),
    },
    detailsCtaOne: record.callsToAction?.primary
      ? {
          title: record.callsToAction.primary.title || "",
          ctaText: record.callsToAction.primary.buttonText || "",
          ctaLink: record.callsToAction.primary.link || "",
        }
      : undefined,
    detailsCtaTwo: record.callsToAction?.secondary
      ? {
          title: record.callsToAction.secondary.title || "",
          ctaText: record.callsToAction.secondary.buttonText || "",
          ctaLink: record.callsToAction.secondary.link || "",
        }
      : undefined,
    relatedPortfolios: {
      title: record.relatedPortfolios?.title || "",
      portfolio: record.relatedPortfolios?.items || [],
    },
    portfolioType: "new",
    isNewPortfolioPublished: record.isPublished === true,
    sectionVisibility: record.sectionVisibility || {},
    channelsUsed: [],
    categories: record.categories || [],
    story: record.brand?.oneLineContext || "",
    bannerImage: record.brand?.banner?.image || "",
  } as unknown as Portfolio;
}

export async function getNewPortfolioPageData(slug: string) {
  await connectDB();

  // console.log("slug:", slug);
  // , isListed: { $ne: false }
  const record = (await NewPortfolio.findOne({ slug })
    .populate({
      path: "relatedPortfolios.items",
      populate: { path: "categories" },
    })
    .populate("categories")
    .lean()) as unknown as NewPortfolioData & Record<string, any>;

    // console.log("record:", record);
  if (!record) return null;

  const relatedItems: unknown = record.relatedPortfolios?.items;
  const related = Array.isArray(relatedItems)
    ? relatedItems.filter(
        (item): item is Record<string, any> =>
          typeof item === "object" && item !== null && !Array.isArray(item),
      )
    : [];
  const portfolio = toRendererPortfolio(record);
  const successStories = related
    .filter((item) => item && item.isListed !== false)
    .map(toRendererPortfolio);

    // console.log("successStories:", successStories);
  const portfolioHighlights = (record.highlights || []).map((item, index) => ({
    customId: `new-highlight-${index}`,
    number: item.number || "",
    text: item.text || "",
    companyId: 0,
  }));

  const pageData = {
    portfolio,
    portfolioHighlights,
    successStories,
    seo: record.seo,
    isPublished: record.isPublished === true,
  };

  // Mongoose ObjectIds and subdocuments are not serializable across the
  // Server Component boundary. Convert the complete renderer payload to JSON.
  return JSON.parse(JSON.stringify(pageData));
}
