import type { Portfolio } from "@/app/types/Portfolio";
import type { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import type { InstagramPost } from "@/app/lib/integrations/instagram/instagram";

export type PortfolioDetailsProps = {
  data: {
    portfolio: Portfolio;
    portfolioHighlights: PortfolioHighlight[];
    companyName?: string | number | null;
  };
  endpoint?: string;
  isV2Preview?: boolean;
  successStories?: Portfolio[];
  instagramPosts?: InstagramPost[];
  instagramFlush?: boolean;
};
