// Public portfolio queries and source resolution.
import connectDB from "@/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";
import PortfolioHighlight from "@/app/models/PortfolioHighlight";
import { unstable_cache } from "next/cache";
import mongoose from "mongoose";
import type { Portfolio as PortfolioData } from "@/app/types/Portfolio";
import {
  getNewPortfolioPageData,
  getPublishedNewPortfolioListing,
} from "@/app/lib/services/newPortfolio.service";
import "@/app/models/Category";
import "@/app/models/Channel";

export const getPortfolio = unstable_cache(
  async () => {
    await connectDB();

    const portfolio = await Portfolio.find({ isListed: { $ne: false } })
      .sort({ index: "ascending" })
      .populate("categories")
      .populate("channels")
      .lean();

    return JSON.parse(JSON.stringify(portfolio));
  },
  ["portfolio"],
  {
    tags: ["portfolio"],
    revalidate: 60, // same as your fetch
  },
);

export const getFeaturedPortfolios = unstable_cache(
  async () => {
    await connectDB();

    const portfolio = await Portfolio.find({
      featured: true,
      isListed: { $ne: false },
    })
      .sort({ index: "ascending" })
      .populate("categories")
      .lean();

    return JSON.parse(JSON.stringify(portfolio));
  },
  ["featured-portfolios"],
  {
    tags: ["portfolio"],
    revalidate: 60,
  },
);

/** Public list: published records from the new collection first, then old records. */
export async function getPublicPortfolioListing() {
  const [newPortfolios, oldPortfolios] = await Promise.all([
    getPublishedNewPortfolioListing(),
    getPortfolio(),
  ]);

  return [
    ...newPortfolios,
    ...oldPortfolios.map((portfolio: PortfolioData) => ({
      ...portfolio,
      portfolioSource: "old" as const,
    })),
  ];
}

export async function getOldPortfolioBySlug(slug: string) {
  await connectDB();
  const record = (await Portfolio.findOne({
    slug,
    isListed: { $ne: false },
  })
    .populate("categories")
    .populate("channels")
    .lean()) as Record<string, any> | null;

  if (!record) return null;

  const highlights = await PortfolioHighlight.find({
    companyId: new mongoose.Types.ObjectId(record._id),
  }).lean();

  return JSON.parse(
    JSON.stringify({
      portfolio: { ...record, portfolioSource: "old" },
      portfolioHighlights: highlights,
    }),
  );
}

/** Resolve public detail data from the new collection first, then the old collection. */
export async function resolvePortfolioBySlug(slug: string) {
  const newData = await getNewPortfolioPageData(slug);
  if (newData?.isPublished) {
    return { source: "new" as const, data: newData };
  }

  const oldData = await getOldPortfolioBySlug(slug);
  return oldData ? { source: "old" as const, data: oldData } : null;
}

export async function getOldPortfolioSuccessStories({
  companyId,
  slug,
  relatedPortfolioIds,
}: {
  companyId: string;
  slug: string;
  relatedPortfolioIds?: (string | { _id: string })[];
}): Promise<PortfolioData[]> {
  await connectDB();
  const records = await Portfolio.find({ isListed: { $ne: false } })
    .sort({ index: "ascending" })
    .populate("categories")
    .populate("channels")
    .lean();
  const serialized = (JSON.parse(JSON.stringify(records)) as PortfolioData[]).map(
    (portfolio) => ({ ...portfolio, portfolioSource: "old" as const }),
  );
  const currentId = companyId.toString();

  if (relatedPortfolioIds?.length) {
    const relatedIds = relatedPortfolioIds
      .map((portfolio) =>
        typeof portfolio === "string" ? portfolio : portfolio._id.toString(),
      )
      .filter((id) => id !== currentId);
    const byId = new Map(serialized.map((portfolio) => [portfolio._id, portfolio]));
    return relatedIds
      .map((id) => byId.get(id))
      .filter((portfolio): portfolio is PortfolioData => portfolio !== undefined);
  }

  const otherPortfolios = serialized.filter(
    (portfolio) => portfolio._id !== currentId,
  );
  if (slug === "sobha-constructions-v2") {
    return otherPortfolios.filter((portfolio) =>
      ["innovo-group", "asgc", "general-construction-co-llc"].includes(
        portfolio.slug,
      ),
    );
  }

  const allowedIds = [46, 49, 57, 85, 73, 83, 1, 43];
  return otherPortfolios
    .filter((portfolio) => allowedIds.includes(portfolio.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}
