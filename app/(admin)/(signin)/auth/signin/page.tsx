"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithCredentials } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";

type Inputs = {
  username: string;
  password: string;
};

const ROLE_HOME: Record<string, string> = {
  hr: "/admin",
  admin: "/admin",
};

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await signInWithCredentials(data);

    if (response.success) {
      try {
        const meRes = await fetch("/api/me");
        const meData = await meRes.json();
        toast.success("Successfully signed in");
        router.push(ROLE_HOME[meData.role] || "/admin");
      } catch (e) {
        toast.error("Sign in failed");
        console.log("fetch /api/me failed:", e);
        router.push("/admin");
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />

      <style>{`
        @keyframes gs-drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%,8%) scale(1.15); } }
        @keyframes gs-drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-8%,-6%) scale(1.1); } }
        @keyframes gs-drift-c { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5%,-7%); } }
        @keyframes gs-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .gs-motion { animation: none !important; } }
      `}</style>

      <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] px-4 py-10">
        {/* Decorative background — layered, all pointer-events-none */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* Drifting aurora blobs */}
          <div
            className="gs-motion absolute -left-[10%] -top-[15%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(230,62,49,0.45),transparent_60%)] blur-3xl"
            style={{ animation: "gs-drift-a 22s ease-in-out infinite" }}
          />
          <div
            className="gs-motion absolute -bottom-[20%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(255,138,76,0.28),transparent_60%)] blur-3xl"
            style={{ animation: "gs-drift-b 26s ease-in-out infinite" }}
          />
          <div
            className="gs-motion absolute left-[35%] top-[45%] h-[35vmax] w-[35vmax] rounded-full bg-[radial-gradient(circle,rgba(120,80,255,0.16),transparent_60%)] blur-3xl"
            style={{ animation: "gs-drift-c 30s ease-in-out infinite" }}
          />

          {/* Spotlight from the top */}
          <div className="absolute left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_65%)]" />

          {/* Fine grid, faded toward the edges */}
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_72%)]" />

          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75))]" />
        </div>

        <div
          className="gs-motion relative w-full max-w-[420px]"
          style={{ animation: "gs-rise 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          {/* Soft glow behind the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/25 blur-3xl"
          />
          {/* Gradient hairline border */}
          <div className="rounded-[1.25rem] bg-gradient-to-b from-white/40 via-white/10 to-white/5 p-px shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="relative overflow-hidden rounded-[1.2rem] bg-white p-8 sm:p-10">
              {/* Brand accent line */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
              <div className="flex flex-col items-center text-center">
                <Image
                  src={"/gs-digital-logo.svg"}
                  alt="GS Digital"
                  width={170}
                  height={40}
                  priority
                />
                <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Backend Console
                </span>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  Sign in to manage your website content.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User
                      aria-hidden
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your username"
                      {...register("username")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      aria-hidden
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Signing in…" : "Sign In"}
                </button>
              </form>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/50">
            © {new Date().getFullYear()} Global Surf Digital. Authorized access
            only.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
