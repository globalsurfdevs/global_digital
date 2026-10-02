"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

const ConversionTracker = () => {
  useEffect(() => {
    if (typeof window.oaiq === "function") {
      window.oaiq("measure", "registration_completed", {
        type: "customer_action",
      });
    }
  }, []);

  return null;
};

export default ConversionTracker;
