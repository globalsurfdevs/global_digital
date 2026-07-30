"use client";
import React from "react";

const ECommerce: React.FC = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-black dark:text-white">
        Welcome to Global Surf Backend Console
      </h1>
      <p className="mt-3 max-w-md text-base text-body dark:text-bodydark">
        Use this dashboard to manage and update the content across the website.
      </p>
    </div>
  );
};

export default ECommerce;