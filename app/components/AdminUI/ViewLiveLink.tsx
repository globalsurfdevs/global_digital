import React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Opens the public (frontend) page for a CMS item in a new tab.
 * Renders nothing when no URL can be built, so it never produces a broken link.
 */
const ViewLiveLink = ({
  href,
  label = "View live page",
  showLabel = false,
  className,
}: {
  href?: string | null;
  label?: string;
  showLabel?: boolean;
  className?: string;
}) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400",
        showLabel ? "h-8 px-2.5 text-xs font-medium" : "size-8",
        className,
      )}
    >
      <ExternalLink className="size-4" aria-hidden />
      {showLabel && <span>{label}</span>}
    </a>
  );
};

export default ViewLiveLink;
