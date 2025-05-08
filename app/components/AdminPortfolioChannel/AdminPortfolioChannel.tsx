"use client";

import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


interface Channels {
    id?: string;
    channelName: string;
    channelLink: string;
}

const AdminPortfolioChannel = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm<Channels>({
    defaultValues: {
      channelName: "",
      channelLink: "",
    },
  });

  const [channels,setChannels] = useState<Channels[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId,setEditId] = useState<string | null>(null)
  const [refetch,setRefetch] = useState(false)


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
        setChannels(data.data)
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, [refetch]);

  const handleAddChannel = async (id?: string) => {
    try {
      const response = await fetch(`/api/portfolio/channels?id=${id}`,{
        method:"POST",
        body: JSON.stringify({
          channelName:getValues("channelName"),
          channelLink:getValues("channelLink")
        })
      });
          if (response.ok) {
              const data = await response.json();
              toast.success(data.message)
              setIsModalOpen(false)
              reset()
              setEditId("")
              setRefetch(!refetch)
          } else {
              console.error("Failed to add channel data");
          }
    } catch (error) {
      console.error("Error adding channel:",error)
    }
  }

  const handleDeleteChannel = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/channels?id=${id}`,{
        method:"DELETE",
      });
          if (response.ok) {
              const data = await response.json();
              toast.success(data.message)
              setRefetch(!refetch)
          } else {
              console.error("Failed to delete channel data");
          }
    } catch (error) {
      console.error("Error deleting channel:",error)
    }
  }

  return (
    <div>
      <div className="flex justify-end mt-5">
        <button
          type="button"
          className="bg-blue-950 text-white px-5 py-2 rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          Add Channel
        </button>
      </div>
      {isModalOpen &&
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

      <div className="p-5 flex flex-col gap-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="flex flex-col gap-2">
        <Label content="Channel Name" className="" />
        <Input
          placeholder=""
          {...register(`channelName`, {
            required: "Channel Name is required",
          })}
          className="w-full"
        />
        </div>
        <div className="flex flex-col gap-2">
        <Label content="Channel Link" className="" />
        <Input
          placeholder=""
          {...register(`channelLink`, {
            required: "Channel Link is required",
          })}
          className="w-full"
        />
        </div>
        <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>handleAddChannel(editId || "")}>Save</button>
          <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
}


      

      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        <Label content="Channel Name" className="font-bold underline mb-2" />
        <Label content="" />
        <Label content="Channel Link" className="font-bold underline mb-2" />
      </div>

      {channels.map((channel, index) => (
        <div
          key={index}
          className="relative grid grid-cols-3 gap-2 w-full mt-5 border p-5 border-dashed rounded-xl"
        >
          <div className="absolute top-2 right-2 flex gap-5 items-center">
          <MdEdit
            className="text-black cursor-pointer text-xl z-10"
            onClick={()=>{setValue("channelName",channel.channelName);setValue("channelLink",channel.channelLink);setIsModalOpen(true);setEditId(channel.id || "")}}
          />
          <IoMdCloseCircle
            className="text-red-500 cursor-pointer text-xl z-10"
            onClick={()=>handleDeleteChannel(channel.id || "")}
          />
          
          </div>
          <div>
            <Input
              placeholder="Channel Name"
              value={channel.channelName}
              className="w-full"
            />
          </div>
          <div className="text-center">:</div>
          <div>
            <Input
              placeholder="Channel Link"
              value={channel.channelLink}
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPortfolioChannel;
