"use client";

import { Input } from "@mui/material";
import React, { useEffect } from "react";
import Label from "../Label/Label";
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";

interface Channels {
  channels: {
    channelName: string;
    channelLink: string;
  }[];
}

const AdminPortfolioChannel = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Channels>({
    defaultValues: {
      channels: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "channels",
  });

  const onSubmit = async(data: Channels) => {

        try {
            const response = await fetch(`/api/portfolio/channels`,{
                method:"POST",
                body: JSON.stringify(data)
            });
                if (response.ok) {
                    const data = await response.json();
                    toast.success(data.message)
                } else {
                    console.error("Failed to add channel data");
                }
        } catch (error) {
            console.error("Error adding channel:",error)
        }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/portfolio/channels`);
        const data = await response.json();
        reset({ channels: data.data[0].channels });
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-950 text-white p-2 rounded-xl"
          onClick={() => append({ channelName: "", channelLink: "" })}
        >
          Add a new channel
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        <Label content="Channel Name" className="font-bold underline mb-2" />
        <Label content="" />
        <Label content="Channel Link" className="font-bold underline mb-2" />
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative grid grid-cols-3 gap-2 w-full mt-5 border p-5 border-dashed rounded-xl"
        >
          <IoMdCloseCircle
            className="text-red-500 cursor-pointer absolute top-2 right-2 text-xl z-10"
            onClick={() => remove(index)}
          />
          <div>
            <Input
              placeholder="Channel Name"
              {...register(`channels.${index}.channelName`, {
                required: "Channel Name is required",
              })}
              className="w-full"
            />
            {errors.channels?.[index]?.channelName && (
              <p className="text-red-500">
                {errors.channels[index]?.channelName?.message}
              </p>
            )}
          </div>
          <div className="text-center">:</div>
          <div>
            <Input
              placeholder="Channel Link"
              {...register(`channels.${index}.channelLink`, {
                required: "Channel Link is required",
              })}
              className="w-full"
            />
            {errors.channels?.[index]?.channelLink && (
              <p className="text-red-500">
                {errors.channels[index]?.channelLink?.message}
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-5">
        <button
          type="button"
          className="bg-blue-950 text-white px-5 py-2 rounded-xl"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminPortfolioChannel;
