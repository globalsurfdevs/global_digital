"use client";

import { submitBooking } from "@/app/actions/submitBooking";
import { useState, useTransition, type FormEvent } from "react";
import styles from "../css/campaign.module.css";

export default function BookCallPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<"name" | "biz" | "email" | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const business = (
      form.elements.namedItem("biz") as HTMLInputElement
    ).value.trim();

    if (!name) {
      setError("name");
      setMessage("Please enter your name.");
      return;
    }
    if (!business) {
      setError("biz");
      setMessage("Please enter your business name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("email");
      setMessage("Please enter a valid email address.");
      return;
    }

    setError(null);
    setMessage(null);

    const formData = new FormData(form);
    formData.set("company", business);
    formData.set("sector", "Growth Partnership Campaign");
    formData.set("date", "To be scheduled");
    formData.set("timeSlot", "To be scheduled");

    startTransition(async () => {
      const result = await submitBooking(formData);

      if (result.success) {
        setSubmitted(true);
        return;
      }

      setMessage(result.message ?? "Something went wrong. Please try again.");
    });
  }

  return (
    <div className={styles.bookRight}>
      {submitted ? (
        <div className={styles.success}>
          <div className={styles.sc}>
            <svg viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className={styles.big}>Thanks, you&apos;re on your way.</div>
          <p>
            We&apos;ll be in touch within one business day to confirm your call.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.frow}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={error === "name" ? styles.fieldError : undefined}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="biz">Business name</label>
              <input
                id="biz"
                name="biz"
                type="text"
                autoComplete="organization"
                placeholder="Your company"
                className={error === "biz" ? styles.fieldError : undefined}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className={error === "email" ? styles.fieldError : undefined}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="msg">
              What you&apos;d like to discuss{" "}
              <span className={styles.opt}>(optional)</span>
            </label>
            <textarea
              id="msg"
              name="msg"
              placeholder="A line or two helps us prepare."
            />
          </div>
          <input type="hidden" name="phone" value="" />
          <button className={styles.btn} type="submit" disabled={isPending}>
            Book my call
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          {message && <p role="alert">{message}</p>}
        </form>
      )}
    </div>
  );
}
