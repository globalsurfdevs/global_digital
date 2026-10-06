import { Label } from "@/components/ui/label";
import AdminItemContainer from "@/app/components/common/AdminItemContainer";

const SitemapPage = () => (
  <div className="flex flex-col gap-5 pb-5">
    <AdminItemContainer>
      <Label main>Sitemap</Label>
      <div className="flex flex-col gap-3 p-5">
        <p className="text-sm text-gray-600">
          The sitemap is generated from public pages and published content.
          Updates are reflected within one hour.
        </p>
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-blue-600 underline"
        >
          View generated sitemap
        </a>
      </div>
    </AdminItemContainer>
  </div>
);

export default SitemapPage;
