"use client";

import { changeOwnPassword, updateHrPassword } from "@/app/actions/otpActions";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Mail, ShieldCheck } from "lucide-react";
import {
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const hintClass = "mt-1.5 text-xs text-slate-500";

/** Password input with a show/hide toggle. Passwords are masked by default. */
const PasswordField = ({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-slate-400 hover:text-slate-700"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
};

const Message = ({
  text,
  tone = "error",
}: {
  text: string;
  tone?: "error" | "info";
}) =>
  text ? (
    <p
      className={`rounded-lg px-3 py-2 text-sm ${
        tone === "error"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-700"
      }`}
    >
      {text}
    </p>
  ) : null;

const AdminSettings = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  const [toEmailCareer, setToEmailCareer] = useState("");
  const [toEmailContact, setToEmailContact] = useState("");
  const [toEmailBooking, setToEmailBooking] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);

  // HR password reset state
  const [hrNewPass, setHrNewPass] = useState("");
  const [hrCPass, setHrCPass] = useState("");
  const [adminCurrentPass, setAdminCurrentPass] = useState("");
  const [hrError, setHrError] = useState("");
  const [hrUpdating, setHrUpdating] = useState(false);

  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/emails");
      if (response.ok) {
        const data = await response.json();
        setToEmailCareer(data.data.toEmailCareer);
        setToEmailContact(data.data.toEmailContact);
        setToEmailBooking(data.data.toEmailBooking);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching details", error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPass !== cPass) {
      setError("Passwords does not match, try again");
      return;
    }

    if (!oldPass || !newPass || !cPass) {
      return;
    }

    const result = await changeOwnPassword(oldPass, newPass);
    if (result.success) {
      toast.success(result.message);
      await signOut({ redirectTo: "/auth/signin" });
    } else {
      setError(result.message);
    }
  };

  const handleHrPasswordChange = async () => {
    setHrError("");

    if (hrNewPass !== hrCPass) {
      setHrError("Passwords do not match, try again");
      return;
    }

    if (hrNewPass === "" || hrCPass === "") {
      return;
    }

    setHrUpdating(true);
    try {
      const result = await updateHrPassword(adminCurrentPass, hrNewPass);
      if (result.success) {
        toast.success(result.message);
        setAdminCurrentPass("");
        setHrNewPass("");
        setHrCPass("");
      } else {
        toast.error(result.message);
      }
    } finally {
      setHrUpdating(false);
    }
  };

  const EmailSectionSubmit = async () => {
    setEmailSaving(true);
    try {
      const response = await fetch("/api/emails", {
        method: "PATCH",
        body: JSON.stringify({ toEmailCareer, toEmailContact, toEmailBooking }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error saving details", error);
    } finally {
      setEmailSaving(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const submitStep = (e: React.FormEvent) => {
    e.preventDefault();
    handlePasswordChange();
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Account Settings"
        description={
          session?.user?.email
            ? `Signed in as ${session.user.email}${role ? ` · ${role}` : ""}`
            : "Account security and the inboxes that receive website form submissions."
        }
      />

      {/* SECURITY */}
      <SectionCard
        title={
          <span className="flex items-center gap-2">
            <KeyRound className="size-4 text-slate-500" /> Change password
          </span>
        }
        description="Confirm your current password and choose a new one. You will be signed out after saving. Use at least 12 characters; bcrypt accepts up to 72 UTF-8 bytes."
      >
        <form onSubmit={submitStep} className="flex max-w-md flex-col gap-5">
          <Message text={error} />
          <PasswordField
            label="Current password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            autoComplete="current-password"
          />
          <PasswordField
            label="New password (12+ characters)"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            autoComplete="new-password"
          />
          <PasswordField
            label="Confirm new password"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            autoComplete="new-password"
          />
          <div>
            <button
              className={adminButtonClass("dark", "md", "min-w-40")}
              type="submit"
            >
              Save new password
            </button>
          </div>
        </form>
      </SectionCard>

      {/* FORM EMAIL ROUTING */}
      <SectionCard
        title={
          <span className="flex items-center gap-2">
            <Mail className="size-4 text-slate-500" /> Form notification emails
          </span>
        }
        description="Where submissions from the website forms are delivered."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            EmailSectionSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className={labelClass}>Careers</label>
              <input
                type="text"
                inputMode="email"
                value={toEmailCareer}
                onChange={(e) => setToEmailCareer(e.target.value)}
                className={inputClass}
              />
              <p className={hintClass}>Receives job applications.</p>
            </div>
            <div>
              <label className={labelClass}>Contact</label>
              <input
                type="text"
                inputMode="email"
                value={toEmailContact}
                onChange={(e) => setToEmailContact(e.target.value)}
                className={inputClass}
              />
              <p className={hintClass}>Receives contact form enquiries.</p>
            </div>
            <div>
              <label className={labelClass}>Booking</label>
              <input
                type="text"
                inputMode="email"
                value={toEmailBooking}
                onChange={(e) => setToEmailBooking(e.target.value)}
                className={inputClass}
              />
              <p className={hintClass}>Receives booking requests.</p>
            </div>
          </div>
          <div className="flex justify-end border-t border-slate-200 pt-4">
            <button
              className={adminButtonClass("dark", "md", "min-w-32")}
              type="submit"
              disabled={emailSaving}
            >
              {emailSaving ? "Saving..." : "Save emails"}
            </button>
          </div>
        </form>
      </SectionCard>

      {/* HR password reset — admin only */}
      {role === "admin" && (
        <SectionCard
          title={
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-slate-500" /> HR account
              password
            </span>
          }
          description="Confirm your own password before resetting the HR account password."
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleHrPasswordChange();
            }}
            className="flex max-w-md flex-col gap-5"
          >
            <Message text={hrError} />
            <PasswordField
              label="Your current admin password"
              value={adminCurrentPass}
              onChange={(e) => setAdminCurrentPass(e.target.value)}
              autoComplete="current-password"
            />
            <PasswordField
              label="New HR password"
              value={hrNewPass}
              onChange={(e) => setHrNewPass(e.target.value)}
              autoComplete="new-password"
            />
            <PasswordField
              label="Confirm new HR password"
              value={hrCPass}
              onChange={(e) => setHrCPass(e.target.value)}
              autoComplete="new-password"
            />
            <div>
              <button
                className={adminButtonClass("dark", "md", "min-w-40")}
                type="submit"
                disabled={hrUpdating}
              >
                {hrUpdating ? "Updating..." : "Update HR password"}
              </button>
            </div>
          </form>
        </SectionCard>
      )}
    </div>
  );
};

export default AdminSettings;
