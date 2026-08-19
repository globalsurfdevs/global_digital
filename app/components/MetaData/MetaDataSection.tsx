import React, { Dispatch, SetStateAction } from "react";
import Label from "../Label/Label";
import { UseFormRegister } from "react-hook-form";

const MetaDataSection = ({
  editMode,
  metaTitle,
  metaDescription,
  setMetaTitle,
  setMetaDescription,
}: {
  editMode?: boolean;
  metaTitle: string;
  metaDescription: string;
  setMetaTitle: Dispatch<SetStateAction<string>>;
  setMetaDescription: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="text-xl font-extrabold">Seo Section</div>
      <hr></hr>
      <div className="flex w-full flex-col gap-2">
        <Label content="MetaData:Title" />
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className={
            "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-3 pl-4 text-black focus:outline-none"
          }
          readOnly={!editMode}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label content="MetaData:Description" />
        <input
          type="text"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className={
            "w-full rounded-md border-[1px] border-gray-300 bg-transparent py-3 pl-4 text-black focus:outline-none"
          }
          readOnly={!editMode}
        />
      </div>
    </div>
  );
};

export default MetaDataSection;
