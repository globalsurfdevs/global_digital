import connectDB from "@/lib/mongodb";
import NewPortfolio from "@/app/models/NewPortfolio";
import type { NewPortfolio as NewPortfolioData } from "@/app/types/NewPortfolio";
import type { Portfolio } from "@/app/types/Portfolio";

function toRendererPortfolio(record: Record<string, any>): Portfolio {
  const delivered = record.whatWeDelivered?.items || [];
  return {
    ...record,
    _id: String(record._id),
    companyName: record.company?.name || "",
    industry: record.company?.industry || "",
    country: record.company?.country || "",
    slug: record.slug || "",
    newBannerImage: record.brand?.banner?.image || "",
    newBannerTitle: record.brand?.banner?.title || "",
    oneLineBrandContext: record.brand?.oneLineContext || "",
    logo: record.brand?.logo || "",
    websiteLink: record.brand?.websiteLink || "",
    newPortfolioHighlights: record.highlights || [],
    previewImage: { images: record.previewImages || [] },
    whatWeDeliveredSec: {
      title: record.whatWeDelivered?.title || "",
      data: delivered.map((item: Record<string, unknown>) => ({
        _id: item._id,
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
    channelsUsed: [],
    categories: [],
    story: record.brand?.oneLineContext || "",
    bannerImage: record.brand?.banner?.image || "",
  } as unknown as Portfolio;
}

export async function getNewPortfolioPageData(slug: string) {
  await connectDB();
  const record = (await NewPortfolio.findOne({ slug, isListed: { $ne: false } })
    .populate("relatedPortfolios.items")
    .lean()) as unknown as NewPortfolioData & Record<string, any>;
  if (!record) return null;

  const related = (record.relatedPortfolios?.items || []) as Record<string, any>[];
  const portfolio = toRendererPortfolio(record);
  const successStories = related
    .filter((item) => item && item.isListed !== false)
    .map(toRendererPortfolio);
  const portfolioHighlights = (record.highlights || []).map((item, index) => ({
    customId: `new-highlight-${index}`,
    number: item.number || "",
    text: item.text || "",
    companyId: 0,
  }));

  return {
    portfolio,
    portfolioHighlights,
    successStories,
    seo: record.seo,
    isPublished: record.isPublished === true,
  };
}
