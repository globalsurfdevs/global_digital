"use client";

import { LoadingState } from "@/app/components/AdminUI";
import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import Label from "../Label/Label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MdEdit, MdDelete } from "react-icons/md";
import { Plus } from "lucide-react";
import {
  EmptyState,
  SearchInput,
  matchesQuery,
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

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
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);

  // True until the first load finishes, so the empty message never shows while data is loading.
  const [listLoading, setListLoading] = useState(true);
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
    fetchChannels().finally(() => setListLoading(false));
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

  const visibleChannels = channels.filter((channel) =>
    matchesQuery(query, channel.channelName, channel.channelLink),
  );
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Portfolio Channels"
        count={channels.length}
        description="Marketing channels that can be linked from portfolio items."
        actions={
          <button
            type="button"
            className={adminButtonClass("dark")}
            onClick={openAddModal}
          >
            <Plus className="size-4" />
            Add Channel
          </button>
        }
      />

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
                <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className={adminButtonClass("dark", "md", "sm:order-last")}
                    onClick={() => handleAddChannel(editId || "")}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className={adminButtonClass("secondary")}
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

      <SectionCard
        title="List of channels"
        actions={
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search channels"
          />
        }
        bodyClassName={visibleChannels.length > 0 ? "p-0" : undefined}
      >
        {visibleChannels.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
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
                {visibleChannels.map((channel) => (
                  <tr
                    key={channel._id}
                    className="border-b border-slate-100 bg-white last:border-b-0 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700/50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {channel.channelName}
                    </td>
                    <td className="break-all px-4 py-3">
                      {channel.channelLink}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <MdEdit
                          title="Edit"
                          className="size-8 cursor-pointer rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700"
                          onClick={() => openEditModal(channel)}
                        />
                        <MdDelete
                          title="Delete"
                          className="size-8 cursor-pointer rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10"
                          onClick={() => handleDeleteChannel(channel._id || "")}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : listLoading ? (
          <LoadingState />
        ) : channels.length > 0 ? (
          <EmptyState
            title={`No results for "${query}"`}
            description="Try a different name, or clear the search."
          />
        ) : (
          <EmptyState title="No channels added yet." />
        )}
      </SectionCard>
    </div>
  );
};

export default AdminPortfolioChannel;
