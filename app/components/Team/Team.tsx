"use client";

import React, { useEffect, useState } from "react";
import MediaCard from "@/app/components/Card/Card";
import Link from "next/link";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(`/api/team`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.team);
          if (data.team) {
            setTeamMembers(data.team);
          }
        } else {
          console.error("Failed to fetch team data");
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [refetch]);

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Link
          href={"/admin/team/add-member"}
          className="inline-flex items-center justify-center rounded-full bg-black px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Member
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <div className="grid w-full grid-cols-1 gap-5 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers &&
            teamMembers.map((item, index) => (
              <MediaCard key={index} data={item} setRefetch={setRefetch} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Team;
