"use client";

import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle } from "lucide-react";
import { AdminButton, adminButtonClass } from "./AdminButton";

/**
 * Confirmation step for destructive actions. It never performs anything itself:
 * `onConfirm` (the caller's existing handler) runs only when the user clicks the
 * confirm button. Cancel, Esc, or clicking outside simply closes the dialog.
 */
const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}) => {
  const [pending, setPending] = useState(false);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Guard against double-clicks firing the action twice.
    if (pending) return;
    setPending(true);
    try {
      await onConfirm(e);
    } finally {
      setPending(false);
      onOpenChange(false);
    }
  };

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => !pending && onOpenChange(next)}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100000] bg-slate-900/50 backdrop-blur-[1px]" />
        <DialogPrimitive.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed left-1/2 top-1/2 z-[100001] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-xl focus:outline-none dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10">
              <AlertTriangle className="size-5" aria-hidden />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <DialogPrimitive.Title className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-slate-500 dark:text-slate-400">
                {description}
              </DialogPrimitive.Description>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <DialogPrimitive.Close
              disabled={pending}
              className={adminButtonClass("secondary")}
            >
              Cancel
            </DialogPrimitive.Close>
            <AdminButton
              variant="danger"
              onClick={handleConfirm}
              disabled={pending}
            >
              {pending ? "Deleting..." : confirmLabel}
            </AdminButton>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ConfirmDialog;
