"use client";

import { submitBooking } from "@/app/actions/submitBooking";
import {
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import "react-day-picker/style.css";
import {
  addCampaignToFormData,
  CAMPAIGN_IDS,
  CAMPAIGN_TIME_SLOTS,
  validateBookingField,
  validateBookingForm,
  type BookingErrors,
} from "../campaign/booking";

const TIME_SLOT_OPTIONS = CAMPAIGN_TIME_SLOTS;
const INPUT_CLASSES =
  "w-full rounded-[11px] border border-black/10 bg-[#f6f3ec] px-[15px] py-[13px] text-[15px] text-[#0a0a0a] outline-none transition-colors duration-150 placeholder:text-[#77787B] focus:border-[#E63E31] focus:bg-white";

/* Obsolete copied validator; the active form uses ../campaign/booking.
const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// function validateField(name: string, value: string): string | undefined {
  const v = value.trim();

  switch (name) {
    case "name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name looks too short.";
      if (!NAME_REGEX.test(v)) return "Name can only contain letters.";
      return undefined;

    case "company":
      if (!v) return "Please enter your company name.";
      if (v.length < 2) return "Company name looks too short.";
      return undefined;

    case "email":
      if (!v) return "Please enter your work email.";
      if (!EMAIL_REGEX.test(v)) return "Enter a valid email address.";
      return undefined;

    case "phone": {
      if (!v) {
        return "Please enter your phone number.";
      }

      // Keep only digits for validation.
      // This allows:
      // +971 50 123 4567
      // +1 (202) 555-0123
      // +44 20 7946 0958
      // etc.
      const digitsOnly = v.replace(/\D/g, "");

      // International phone numbers generally won't need fewer than 7
      // digits or more than 15 digits.
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return "Enter a valid phone number.";
      }

      // Reject numbers made entirely of zeros.
      if (/^0+$/.test(digitsOnly)) {
        return "Enter a valid phone number.";
      }

      // Reject obvious fake numbers such as:
      // 1111111111
      // 2222222222
      // 9999999999
      if (/^(\d)\1+$/.test(digitsOnly)) {
        return "Enter a valid phone number.";
      }

      // Validate the characters the user is allowed to enter.
      // Allows digits, spaces, +, -, (, and ).
      if (!/^[+\d\s().-]+$/.test(v)) {
        return "Enter a valid phone number.";
      }

      return undefined;
    }

    case "sector":
      if (!v) return "Please select a sector.";
      return undefined;

    case "date": {
      if (!v) return "Please pick a date.";

      const picked = new Date(`${v}T00:00:00`);

      if (isNaN(picked.getTime())) {
        return "Enter a valid date.";
      }

      // Cannot book today or any past date
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (picked < tomorrow) {
        return "Please select a date from tomorrow onward.";
      }

      // Saturday = 6, Sunday = 0
      const day = picked.getDay();

      if (day === 0 || day === 6) {
        return "Bookings are not available on Saturdays and Sundays.";
      }

      return undefined;
    }

    case "timeSlot":
      if (!v) return "Please pick a time slot.";
      return undefined;

    default:
      return undefined;
  }
}
*/
export default function BookCallPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nextErrors = validateBookingForm(new FormData(form));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setMessage(null);
    const formData = addCampaignToFormData(new FormData(form), "chatGptAds");

    startTransition(async () => {
      const result = await submitBooking(formData, CAMPAIGN_IDS.chatGptAds);

      if (result.success) {
        setSubmitted(true);
        return;
      }

      setMessage(result.message ?? "Something went wrong. Please try again.");
    });
  }

  function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  function formatDate(value: Date) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  }

  function handleFieldBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const field = event.target.name as keyof BookingErrors;
    const error = validateBookingField(field, event.target.value);
    setErrors((previous) => ({ ...previous, [field]: error }));
  }

  function handleFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const field = event.target.name as keyof BookingErrors;
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  useLayoutEffect(() => {
    if (!datePickerOpen || !triggerRef.current) return;

    const updatePlacement = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      // Calendar is roughly 340-360px tall with padding - adjust if yours differs
      const estimatedHeight = popoverRef.current?.offsetHeight ?? 360;

      setCoords({
        top:
          spaceBelow < estimatedHeight && spaceAbove > spaceBelow
            ? Math.max(8, triggerRect.top - estimatedHeight - 8)
            : triggerRect.bottom + 8,
        left: Math.max(
          8,
          Math.min(triggerRect.left, window.innerWidth - 360 - 8),
        ),
      });
    };

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [datePickerOpen]);

  return (
    <div className="bg-white p-[40px_40px_36px] max-[520px]:p-[32px_26px]">
      {submitted ? (
        <div className="px-2.5 py-[30px] text-center">
          <div className="mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-full bg-[#E63E31]/[0.12]">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-none stroke-[#E63E31]"
              strokeWidth={2.2}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="mb-2 text-[21px] font-semibold">
            Thanks, you&apos;re on your way.
          </div>
          <p className="text-[15px] text-[#77787B]">
            We&apos;ll be in touch within one business day to confirm your call.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-0 min-[521px]:grid-cols-2 min-[521px]:gap-x-4">
            <div className="mb-[18px]">
              <label
                className="mb-2 block text-[13.5px] font-medium text-[#0a0a0a]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                className={`${INPUT_CLASSES} ${errors.name ? "!border-[#E63E31]" : ""}`}
              />
              {errors.name && (
                <p className="mt-1.5 text-[11px] text-[#E63E31]">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="mb-[18px]">
              <label
                className="mb-2 block text-[13.5px] font-medium text-[#0a0a0a]"
                htmlFor="company"
              >
                Company name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Your company"
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                className={`${INPUT_CLASSES} ${errors.company ? "!border-[#E63E31]" : ""}`}
              />
              {errors.company && (
                <p className="mt-1.5 text-[11px] text-[#E63E31]">
                  {errors.company}
                </p>
              )}
            </div>
          </div>
          <div className="mb-[18px]">
            <label
              className="mb-2 block text-[13.5px] font-medium text-[#0a0a0a]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
              className={`${INPUT_CLASSES} ${errors.email ? "!border-[#E63E31]" : ""}`}
            />
            {errors.email && (
              <p className="mt-1.5 text-[11px] text-[#E63E31]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-[18px]">
            <label
              className="mb-2 block text-[13.5px] font-medium text-[#0a0a0a]"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Your phone number"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
              className={`${INPUT_CLASSES} ${errors.phone ? "!border-[#E63E31]" : ""}`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-[11px] text-[#E63E31]">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Preferred Date */}
            <div className="relative">
              <input type="hidden" name="date" value={date} />

              <label
                htmlFor="preferred-date"
                className="mb-2 block text-[13.5px] font-medium text-[#0a0a0a]"
              >
                Preferred date <span className="text-[#E63E31]">*</span>
              </label>

              <button
                id="preferred-date"
                ref={triggerRef}
                type="button"
                onClick={() => setDatePickerOpen((prev) => !prev)}
                aria-haspopup="dialog"
                aria-expanded={datePickerOpen}
                className={`!flex !h-[50px] !w-full !items-center !justify-between rounded-[11px] border bg-[#f6f3ec] !px-[15px] !py-[13px] text-left font-[inherit] text-[15px] text-[#0a0a0a] outline-none transition-colors duration-150 ${
                  errors.date
                    ? "border-[#E63E31]"
                    : "border-[rgba(10,10,10,0.1)] hover:border-[rgba(10,10,10,0.2)] focus:border-[#E63E31]"
                }`}
              >
                <span className={date ? "text-[#0a0a0a]" : "text-[#77787b]"}>
                  {date ? date.split("-").reverse().join("-") : "Select date"}
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0  text-[#77787b] transition-transform duration-200 ${
                    datePickerOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {datePickerOpen &&
                coords &&
                createPortal(
                  <div
                    ref={popoverRef}
                    style={{
                      position: "fixed",
                      top: coords.top,
                      left: coords.left,
                    }}
                    className="z-10 max-h-[80vh] max-w-[calc(100vw-16px)] overflow-auto rounded-lg border border-white/10 bg-neutral-900 p-3 shadow-xl"
                  >
                    <DayPicker
                      mode="single"
                      selected={date ? new Date(`${date}T00:00:00`) : undefined}
                      defaultMonth={getTomorrow()}
                      disabled={[
                        { before: getTomorrow() },
                        { dayOfWeek: [0, 6] },
                      ]}
                      onSelect={(selectedDate) => {
                        if (!selectedDate) return;

                        const formattedDate = formatDate(selectedDate);

                        setDate(formattedDate);

                        const error = validateBookingField(
                          "date",
                          formattedDate,
                        );

                        setErrors((prev) => ({
                          ...prev,
                          date: error,
                        }));

                        setDatePickerOpen(false);
                      }}
                      classNames={{
                        root: "text-white",

                        months: "relative flex",

                        month: "space-y-3",

                        month_caption:
                          "relative flex h-8 items-center justify-start px-1 pl-[76px] mb-2",

                        caption_label: "text-sm font-medium text-white",

                        nav: "absolute left-1 top-0 flex items-center gap-1",

                        button_previous:
                          "!inline-flex !h-8 !w-8 !items-center !justify-center !rounded-md !text-[#E63E31] hover:!bg-white/10 [&_svg]:!text-[#E63E31] [&_svg]:!stroke-[#E63E31]",

                        button_next:
                          "!inline-flex !h-8 !w-8 !items-center !justify-center !rounded-md !text-[#E63E31] hover:!bg-white/10 [&_svg]:!text-[#E63E31] [&_svg]:!stroke-[#E63E31]",

                        month_grid: "w-full border-collapse",

                        weekdays: "flex",

                        weekday:
                          "w-9 text-center text-[13px] font-medium text-white/70",

                        week: "flex w-full mt-1",

                        day: "relative h-9 w-9 p-0 text-center",

                        day_button:
                          "h-9 w-9 rounded-md text-sm !text-white/60 hover:bg-white/10 hover:!text-white",

                        selected:
                          "rounded-md bg-transparent !text-[#E63E31] [&>button]:!text-[#E63E31]",

                        today:
                          "font-semibold !text-red-500 [&>button]:!text-[#E63E31]",

                        disabled: "text-white/30 opacity-50",

                        outside: "text-white/20",
                      }}
                    />
                  </div>,
                  document.body,
                )}

              {errors.date && (
                <p className="mt-1.5 text-[11px] text-[#E63E31]">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label
                htmlFor="ts"
                className="mb-2 block text-[13.5px] font-medium text-[#0a0a0a]"
              >
                Time slot <span className="text-[#E63E31]">*</span>
              </label>

              <select
                id="ts"
                name="timeSlot"
                required
                defaultValue=""
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                className={`!h-[50px] !w-full appearance-none rounded-[11px] border bg-[#f6f3ec] !px-[15px] text-[15px] text-[#0a0a0a] outline-none transition-colors duration-150 ${
                  errors.timeSlot
                    ? "border-[#E63E31]"
                    : "border-[rgba(10,10,10,0.1)] hover:border-[rgba(10,10,10,0.2)] focus:border-[#E63E31]"
                }`}
                style={{
                  backgroundImage:
                    "linear-gradient(45deg,transparent 50%,#77787b 50%),linear-gradient(135deg,#77787b 50%,transparent 50%)",
                  backgroundPosition:
                    "calc(100% - 19px) 50%, calc(100% - 14px) 50%",
                  backgroundSize: "5px 5px, 5px 5px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="">Select one</option>

                {TIME_SLOT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {errors.timeSlot && (
                <p className="mt-1.5 text-[11px] text-[#E63E31]">
                  {errors.timeSlot}
                </p>
              )}
            </div>
          </div>
          <button
            className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border-0 bg-[#E63E31] px-[26px] py-[17px] text-base font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#C9311F] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isPending}
          >
            Book my call
            {/* <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg> */}
          </button>
          {message && <p role="alert">{message}</p>}
        </form>
      )}
    </div>
  );
}
