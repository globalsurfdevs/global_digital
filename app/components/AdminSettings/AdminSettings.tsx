"use client";

import {
  changePass,
  checkCurrentPass,
  checkOtp,
} from "@/app/actions/otpActions";
import { updateHrPassword } from "@/app/actions/otpActions";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { signOutAdmin } from "@/app/actions/authActions";

const items = ["Change password", "Trash", "Settings"];
type OtpState = { [key: number]: string };

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
      } else {
        const data = await response.json();
        alert(data.message);
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
    try {
      const response = await fetch("/api/emails", {
        method: "PATCH",
        body: JSON.stringify({ toEmailCareer, toEmailContact }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error saving details", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">Admin Settings</h1>
      <div className="mt-10 grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2">
          <div className="relative flex flex-col rounded-xl bg-transparent">
            <h4 className="block text-xl font-medium text-slate-800">
              Change Password
            </h4>
            <p className="font-light text-slate-500">
              Change your password here. After saving, you'll be logged out.
            </p>
            <p className="text-red-600">{error}</p>
            {!newPassSection ? (
              <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <div className="w-full min-w-[200px] max-w-sm">
                    <label className="mb-2 block text-sm text-slate-600">
                      Type in the current password
                    </label>
                    <input
                      type="text"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                    />
                    <p className="text-red-600">{currentPassError}</p>
                  </div>
                  {otpSection && (
                    <div className="w-full min-w-[200px] max-w-sm">
                      <label className="mb-2 block text-sm text-slate-600">
                        Enter the OTP send to the mail address
                      </label>
                      <div className="flex items-center justify-between gap-3 bg-slate-200 p-2 px-8">
                        {Array.from({ length: 5 }).map((item, index) => (
                          <input
                            key={index}
                            type="text"
                            value={otp[index]}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            className="h-10 w-full appearance-none rounded border border-transparent bg-slate-100 p-4 text-center text-sm font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            pattern="\d*"
                            maxLength={1}
                          />
                        ))}
                      </div>
                      <p>{otpError}</p>
                    </div>
                  )}
                </div>
                <button
                  className="mt-4 w-full rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={
                    otpSection ? handleOptCheckAndPass : handleCurrentPassCheck
                  }
                >
                  Enter new password -&gt;
                </button>
              </form>
            ) : (
              <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <div className="w-full min-w-[200px] max-w-sm">
                    <label className="mb-2 block text-sm text-slate-600">
                      Type in the new password
                    </label>
                    <input
                      type="text"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                    />
                  </div>
                  <div className="w-full min-w-[200px] max-w-sm">
                    <label className="mb-2 block text-sm text-slate-600">
                      Retype the password again
                    </label>
                    <input
                      type="text"
                      value={cPass}
                      onChange={(e) => setCPass(e.target.value)}
                      className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  className="mt-4 w-full rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={handlePasswordChange}
                >
                  Save -&gt;
                </button>
              </form>
            )}
          </div>

          <div className="relative flex flex-col rounded-xl bg-transparent">
            <h4 className="block text-xl font-medium text-slate-800">
              Email Section
            </h4>
            <p className="font-light text-slate-500">
              Edit the emails to connect to the forms present in the website
            </p>
            <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <div className="w-full min-w-[200px] max-w-sm">
                  <label className="mb-2 block text-sm text-slate-600">
                    To Email Career
                  </label>
                  <input
                    type="text"
                    value={toEmailCareer}
                    onChange={(e) => setToEmailCareer(e.target.value)}
                    className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                  />
                </div>
                <div className="w-full min-w-[200px] max-w-sm">
                  <label className="mb-2 block text-sm text-slate-600">
                    To Email Contact
                  </label>
                  <input
                    type="text"
                    value={toEmailContact}
                    onChange={(e) => setToEmailContact(e.target.value)}
                    className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                  />
                </div>
              </div>
              <button
                className="mt-4 w-full rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={EmailSectionSubmit}
              >
                Save -&gt;
              </button>
            </form>
          </div>

          {/* HR password reset — admin only */}
          {role === "admin" && (
            <div className="relative flex flex-col rounded-xl bg-transparent">
              <h4 className="block text-xl font-medium text-slate-800">
                Update HR Password
              </h4>
              <p className="font-light text-slate-500">
                Reset the HR account's password. This does not require the
                current password.
              </p>
              <p className="text-red-600">{hrError}</p>
              <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <div className="w-full min-w-[200px] max-w-sm">
                    <label className="mb-2 block text-sm text-slate-600">
                      New password for HR
                    </label>
                    <input
                      type="text"
                      value={hrNewPass}
                      onChange={(e) => setHrNewPass(e.target.value)}
                      className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                    />
                  </div>
                  <div className="w-full min-w-[200px] max-w-sm">
                    <label className="mb-2 block text-sm text-slate-600">
                      Retype the password
                    </label>
                    <input
                      type="text"
                      value={hrCPass}
                      onChange={(e) => setHrCPass(e.target.value)}
                      className="ease w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  className="mt-4 w-full rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  disabled={hrUpdating}
                  onClick={handleHrPasswordChange}
                >
                  {hrUpdating ? "Updating..." : "Save ->"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
