import Label from "@/app/components/Label/Label";
import SectionCard from "@/app/components/AdminUI/SectionCard";
import type { PortfolioFormValues } from "../formTypes";
import type { UseFormRegister } from "react-hook-form";

export default function PortfolioUrlVisibilitySection({
  register,
  onSlugChange,
}: {
  register: UseFormRegister<PortfolioFormValues>;
  onSlugChange: () => void;
}) {
  return (
    <SectionCard
      title="URL & visibility"
      description="The slug sets the live page address. Featured controls highlighting on the site."
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <Label content="slug" />
          <input
            type="text"
            {...register("slug", { onChange: onSlugChange })}
            className="w-full rounded-md border border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label content="Featured Project" />
          <select
            {...register("featured")}
            className="w-full rounded-md border border-gray-300 bg-transparent py-1 pl-3 text-black focus:outline-none"
          >
            <option value="">Select Featured</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </SectionCard>
  );
}
