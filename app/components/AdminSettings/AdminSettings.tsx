"use client";

import {
  changePass,
  checkCurrentPass,
  checkOtp,
} from "@/app/actions/otpActions";
import { updateHrPassword } from "@/app/actions/otpActions";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { signOutAdmin } from "@/app/actions/authActions";
import { Check, Eye, EyeOff, KeyRound, Mail, ShieldCheck } from "lucide-react";
import {
  PageHeader,
  SectionCard,
  adminButtonClass,
} from "@/app/components/AdminUI";

type OtpState = { [key: number]: string };

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
  const [otpSection, setOtpSection] = useState(false);
  const [newPassSection, setNewPassSection] = useState(false);
  const [otp, setOtp] = useState<OtpState>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [otpError, setOtpError] = useState("");
  const [currentPassError, setCurrentPassError] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  const [toEmailCareer, setToEmailCareer] = useState("");
  const [toEmailContact, setToEmailContact] = useState("");
  const [toEmailBooking, setToEmailBooking] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // HR password reset state
  const [hrNewPass, setHrNewPass] = useState("");
  const [hrCPass, setHrCPass] = useState("");
  const [hrError, setHrError] = useState("");
  const [hrUpdating, setHrUpdating] = useState(false);

  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role;

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp((prev) => ({
        ...prev,
        [index]: value,
      }));
    }
  };

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

  const handleCurrentPassCheck = async () => {
    const result = await checkCurrentPass(oldPass);
    if (result?.success) {
      setCurrentPassError("");
      setOtpSection(true);
    } else {
      if (result) {
        setCurrentPassError(result?.message);
      }
    }
  };

  const handleOptCheckAndPass = async () => {
    const enteredOtp = Object.values(otp).join("");
    const result = await checkOtp(enteredOtp);
    if (result?.success) {
      setOtpError(result.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOldPass("");
      setNewPassSection(true);
    } else {
      if (result) {
        setOtpError(result?.message);
      }
    }
  };

  const handlePasswordChange = async () => {
    if (newPass !== cPass) {
      setError("Passwords does not match, try again");
      return;
    }

    if (newPass == "" || cPass == "") {
      return;
    }

    if (!session?.user?.id) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const result = await changePass(newPass, session.user.id);
    if (result.success) {
      toast.success(result.message);
      await signOutAdmin();
    } else {
      toast.error(result.message);
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
      const result = await updateHrPassword(hrNewPass);
      if (result.success) {
        toast.success(result.message);
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

  // Password change is a three-step flow: current password → emailed code → new password.
  const step = newPassSection ? 3 : otpSection ? 2 : 1;
  const steps = ["Current password", "Verification code", "New password"];

  const submitStep = (e: React.FormEvent) => {
    // Enter key runs the current step instead of reloading the page.
    e.preventDefault();
    if (step === 1) handleCurrentPassCheck();
    else if (step === 2) handleOptCheckAndPass();
    else handlePasswordChange();
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
        description="For security, we confirm your current password and send a code to your email. You will be signed out after saving."
      >
        <ol className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const current = n === step;
            return (
              <li key={label} className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span
                    className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${
                      done
                        ? "bg-emerald-600 text-white"
                        : current
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {done ? <Check className="size-3.5" /> : n}
                  </span>
                  <span
                    className={`text-sm ${
                      current
                        ? "font-semibold text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>
                </span>
                {n < steps.length && (
                  <span className="h-px w-8 bg-slate-200" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>

        <form onSubmit={submitStep} className="flex max-w-md flex-col gap-5">
          <Message text={error} />
          {!newPassSection ? (
            <>
              <div>
                <PasswordField
                  label="Current password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  autoComplete="current-password"
                />
                {currentPassError && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {currentPassError}
                  </p>
                )}
              </div>
              {otpSection && (
                <div>
                  <label className={labelClass}>
                    Verification code sent to your email
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((item, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        value={otp[index]}
                        onChange={(e) => {
                          handleChange(index, e.target.value);
                          // Move to the next box once a digit is entered.
                          if (/^\d$/.test(e.target.value))
                            otpRefs.current[index + 1]?.focus();
                        }}
                        className="size-12 rounded-lg border border-slate-300 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        pattern="\d*"
                        maxLength={1}
                        aria-label={`Digit ${index + 1}`}
                      />
                    ))}
                  </div>
                  {otpError && (
                    <div className="mt-3">
                      <Message text={otpError} tone="info" />
                    </div>
                  )}
                </div>
              )}
              <div>
                <button
                  className={adminButtonClass("dark", "md", "min-w-40")}
                  type="submit"
                >
                  {otpSection ? "Verify code" : "Continue"}
                </button>
              </div>
            </>
          ) : (
            <>
              <PasswordField
                label="New password"
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
            </>
          )}
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
          description="Reset the HR account's password. The current HR password is not required."
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
