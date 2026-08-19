"use client";

import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MdEdit, MdDelete } from "react-icons/md";

interface Channels {
  _id: string;
  id?: string;
  channelName: string;
  channelLink: string;
}

const AdminPortfolioChannel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<Channels>({
    defaultValues: {
      channelName: "",
      channelLink: "",
    },
  });

  const [channels, setChannels] = useState<Channels[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/portfolio/channels`);
        const data = await response.json();
        setChannels(data.data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };
    fetchChannels();
  }, [refetch]);

  const handleAddChannel = async (id?: string) => {
    try {
      const response = await fetch(`/api/portfolio/channels?id=${id}`, {
        method: "POST",
        body: JSON.stringify({
          channelName: getValues("channelName"),
          channelLink: getValues("channelLink"),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setIsModalOpen(false);
        reset();
        setEditId("");
        setRefetch(!refetch);
      } else {
        toast.error("Failed to add channel data");
      }
    } catch (error) {
      console.error("Error adding channel:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteChannel = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/channels?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setRefetch(!refetch);
      } else {
        toast.error("Failed to delete channel data");
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
      toast.error("Something went wrong");
    }
  };

  const openAddModal = () => {
    reset({ channelName: "", channelLink: "" });
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (channel: Channels) => {
    setValue("channelName", channel.channelName);
    setValue("channelLink", channel.channelLink);
    setEditId(channel._id || "");
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="rounded-xl bg-blue-950 px-5 py-2 text-white"
          onClick={openAddModal}
        >
          Add Channel
        </button>
      </div>

      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative flex transform flex-col gap-5 overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editId ? "Edit Channel" : "Add Channel"}
                </h3>
                <div className="flex flex-col gap-2">
                  <Label content="Channel Name" className="" />
                  <Input
                    placeholder=""
                    {...register(`channelName`, {
                      required: "Channel Name is required",
                    })}
                    className="w-full"
                  />
                  {errors.channelName && (
                    <span className="text-sm text-red-600">
                      {errors.channelName.message}
                    </span>
                  )}
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
                  {errors.channelLink && (
                    <span className="text-sm text-red-600">
                      {errors.channelLink.message}
                    </span>
                  )}
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="shadow-xs inline-flex w-full justify-center rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-900 sm:ml-3 sm:w-auto"
                    onClick={() => handleAddChannel(editId || "")}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="shadow-xs mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {channels.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 shadow dark:border-gray-700">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Channel Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Channel Link
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {channels.map((channel) => (
                <tr
                  key={channel._id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {channel.channelName}
                  </td>
                  <td className="break-all px-4 py-3">{channel.channelLink}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <MdEdit
                        className="cursor-pointer text-lg text-gray-600 hover:text-black"
                        onClick={() => openEditModal(channel)}
                      />
                      <MdDelete
                        className="cursor-pointer text-lg text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteChannel(channel._id || "")}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 py-12 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          No channels added yet.
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioChannel;
