"use client";
import { motion } from "framer-motion";
import { useRef, useState, useTransition, useLayoutEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { moveUp } from "../../animations/motionVariants";
import { submitBooking } from "@/app/actions/submitBooking";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const trustPoints: string[] = [
  "A senior strategist, not a salesperson",
  "No deck, no pitch — just the fit conversation",
  "A reply within one business day",
];

// const sectors = [
//   "E-commerce",
//   "SaaS",
//   "Healthcare",
//   "Real Estate",
//   "Manufacturing",
//   "Other",
// ];

const sectors = [
  "Construction",
  "Engineering & Infrastructure",
  "Real Estate & Property Developers",
  "Manufacturing",
  "Industrial",
  "Something else",
];

const timeSlots = [
  "9:00 AM – 9:30 AM",
  "9:30 AM – 10:00 AM",
  "10:00 AM – 10:30 AM",
  "10:30 AM – 11:00 AM",
  "11:00 AM – 11:30 AM",
  "11:30 AM – 12:00 PM",
  "2:00 PM – 2:30 PM",
  "2:30 PM – 3:00 PM",
  "3:00 PM – 3:30 PM",
  "3:30 PM – 4:00 PM",
  "4:00 PM – 4:30 PM",
  "4:30 PM – 5:00 PM",
  "5:00 PM – 5:30 PM",
];

type FormErrors = Partial<
  Record<
    "name" | "company" | "email" | "phone" | "sector" | "date" | "timeSlot",
    string
  >
>;

const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function validateField(name: string, value: string): string | undefined {
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
      if (digitsOnly.length < 7 || digitsOnly.length > 20) {
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

const ArrowIcon = ({ clipId }: { clipId: string }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:scale-105"
  >
    <g clipPath={`url(#${clipId})`}>
      <path
        d="M8.88346 1.26172L1.13281 8.8624"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M1.13281 1.26172H8.88346V8.71245"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <clipPath id={clipId}>
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CheckItem = ({ label, index }: { label: string; index: number }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    variants={moveUp(0.1 + index * 0.05)}
    viewport={{ once: true }}
    className="flex items-center gap-3 rounded-lg bg-[#FFFFFF]/10 px-[21px] py-[18px]"
  >
    <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center  bg-primary">
      <Check size={13} strokeWidth={3} className="text-white" />
    </span>
    <span className="fnt-lexend text-[length:var(--text-18-sm)] text-[#A3A3A3]">
      {label}
    </span>
  </motion.div>
);

const FormField = ({
  label,
  type = "text",
  name,
  required,
  error,
  min,
  onBlur,
  onChange,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  error?: string;
  min?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-18 block text-[#A3A3A3]">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      min={min}
      onBlur={onBlur}
      onChange={onChange}
      aria-invalid={!!error}
      className={`text-15 mt-2 w-full appearance-none border-0 border-b bg-transparent pt-3 text-white outline-none ring-0 transition-colors [color-scheme:dark] placeholder:text-white/30 focus:border-white/60 focus:outline-none focus:ring-0 ${
        error ? "border-primary" : "border-white/20"
      }`}
    />
    {error && <p className="mt-1.5 text-[11px] text-primary">{error}</p>}
  </div>
);

const GetInTouch = ({
  data,
}: {
  data: { title: string; description: string };
}) => {
  const [sectorOpen, setSectorOpen] = useState(false);
  const [sector, setSector] = useState("");
  const [timeSlotOpen, setTimeSlotOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [note, setNote] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");

  const runValidation = (form: HTMLFormElement): FormErrors => {
    const data = new FormData(form);
    const fields: (keyof FormErrors)[] = [
      "name",
      "company",
      "email",
      "phone",
      "sector",
      "date",
      "timeSlot",
    ];
    const nextErrors: FormErrors = {};

    for (const field of fields) {
      const value = (data.get(field) as string) ?? "";
      const error = validateField(field, value);
      if (error) nextErrors[field] = error;
    }

    return nextErrors;
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSectorSelect = (s: string) => {
    setSector(s);
    setSectorOpen(false);
    if (errors.sector) {
      setErrors((prev) => ({ ...prev, sector: undefined }));
    }
  };

  const handleTimeSlotSelect = (t: string) => {
    setTimeSlot(t);
    setTimeSlotOpen(false);
    if (errors.timeSlot) {
      setErrors((prev) => ({ ...prev, timeSlot: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const nextErrors = runValidation(form);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setNote("Please fix the highlighted fields.");
      return;
    }

    setNote("");
    const formData = new FormData(form);
    // sector and timeSlot aren't native inputs, so append them manually
    formData.set("sector", sector);
    formData.set("timeSlot", timeSlot);
    formData.set("date", date);

    startTransition(async () => {
      const result = await submitBooking(formData);

      setNote(
        result.message ??
          (result.success ? "Thank you." : "Something went wrong."),
      );
      if (result.success) {
        form.reset();
        setSector("");
        setTimeSlot("");
        setErrors({});
        window.location.replace("/growth-thank-you");
      }
    });
  };

  function getTomorrow(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);
    return d;
  }
  function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`; // "2026-09-04"
  }

  useLayoutEffect(() => {
    if (!datePickerOpen || !triggerRef.current) return;

    const updatePlacement = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      // Calendar is roughly 340-360px tall with padding - adjust if yours differs
      const estimatedHeight = popoverRef.current?.offsetHeight ?? 360;

      if (spaceBelow < estimatedHeight && spaceAbove > spaceBelow) {
        setPlacement("top");
      } else {
        setPlacement("bottom");
      }
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
    <section
      id="book"
      className="xl:pt-120 bg-black pt-[16px] text-white md:pt-20"
    >
      <div className="container border-b border-[#77787B] pb-[16px] md:pb-20 xl:pb-[120px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div>
            <motion.h2
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-60 text-[length:var(--text-60-sm)] lg:max-w-[658px] lg:leading-[65px] "
            >
              {data.title}
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="show"
              variants={moveUp(0.05)}
              viewport={{ once: true }}
              className="mt-[40px] max-w-[520px] text-[length:var(--text-18-sm)] leading-[26px] text-[#A3A3A3]"
            >
              {data.description}
            </motion.p>

            <div className="mt-8 flex max-w-[454px] flex-col gap-[15px]">
              {trustPoints.map((point, i) => (
                <CheckItem key={point} label={point} index={i} />
              ))}
            </div>
          </div>

          <motion.form
            ref={formRef}
            initial="hidden"
            whileInView="show"
            variants={moveUp(0.15)}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                label="Name"
                name="name"
                required
                error={errors.name}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              <FormField
                label="Company"
                name="company"
                required
                error={errors.company}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              <FormField
                label="Work email"
                name="email"
                type="email"
                required
                error={errors.email}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              <FormField
                label="Phone"
                name="phone"
                type="tel"
                required
                error={errors.phone}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
            </div>

            <div className="relative border-b border-white/20 pb-3">
              <input type="hidden" name="sector" value={sector} />
              <button
                type="button"
                onClick={() => setSectorOpen((v) => !v)}
                className="flex w-full items-center justify-between text-left"
                aria-haspopup="listbox"
                aria-expanded={sectorOpen}
              >
                <div>
                  <span className="text-13 block text-white/50">
                    Sector <span className="text-primary">*</span>
                  </span>
                  <span className="text-15 mt-2 block text-white">
                    {sector || "\u00A0"}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-white/60 transition-transform ${
                    sectorOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sectorOpen && (
                <ul
                  role="listbox"
                  className="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-lg"
                >
                  {sectors.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={sector === s}
                        onClick={() => handleSectorSelect(s)}
                        className="text-14 w-full px-4 py-2.5 text-left text-white/80 hover:bg-white/10"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {errors.sector && (
                <p className="mt-1.5 text-[11px] text-primary">
                  {errors.sector}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="relative">
                <input type="hidden" name="date" value={date} />
                <label className="text-13 block text-white/50">
                  Preferred date <span className="text-primary">*</span>
                </label>

                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setDatePickerOpen((prev) => !prev)}
                  className="flex w-full items-end justify-between border-b border-white/20 pb-3 pt-6 text-left"
                  aria-haspopup="dialog"
                  aria-expanded={datePickerOpen}
                >
                  <span className="text-15 text-white">
                    {date ? date.split("-").reverse().join("-") : "Select date"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/60 transition-transform ${
                      datePickerOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {datePickerOpen && (
                  <div
                    ref={popoverRef}
                    className={`absolute left-0 z-20 max-h-[80vh] overflow-y-auto rounded-lg border border-white/10 bg-neutral-900
        p-3 shadow-xl
        ${placement === "top" ? "bottom-full " : "top-full mt-2"}`}
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
                        const error = validateField("date", formattedDate);
                        setErrors((prev) => ({ ...prev, date: error }));
                        setDatePickerOpen(false);
                      }}
                    />
                  </div>
                )}

                {errors.date && (
                  <p className="mt-1.5 text-[11px] text-primary">
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="relative border-b border-white/20">
                <input type="hidden" name="timeSlot" value={timeSlot} />
                <button
                  type="button"
                  onClick={() => setTimeSlotOpen((v) => !v)}
                  className="flex w-full items-end justify-between text-left"
                  aria-haspopup="listbox"
                  aria-expanded={timeSlotOpen}
                >
                  <div className="">
                    <span className="text-13 block text-white/50">
                      Time slot <span className="text-primary">*</span>
                    </span>
                    <span className="text-15 mt-6 block truncate text-white">
                      {timeSlot || "\u00A0"}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-white/60 transition-transform ${
                      timeSlotOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {timeSlotOpen && (
                  <ul
                    role="listbox"
                    className="absolute left-0 top-full z-10 mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 shadow-lg"
                  >
                    {timeSlots.map((t) => (
                      <li key={t}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={timeSlot === t}
                          onClick={() => handleTimeSlotSelect(t)}
                          className="text-14 w-full px-4 py-2.5 text-left text-white/80 hover:bg-white/10"
                        >
                          {t}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {errors.timeSlot && (
                  <p className="mt-1.5 text-[11px] text-primary">
                    {errors.timeSlot}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-10 mt-10 flex flex-wrap  gap-4 lg:mb-0 lg:mt-[60px]">
              <button
                type="submit"
                disabled={isPending}
                className={`group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg ${
                  isPending ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <span className="fnt-lexend uppercase duration-300 ease-in">
                  {isPending ? "Submitting..." : "Submit"}
                </span>
                <div className="bg-primary p-1">
                  <ArrowIcon clipId="clip-submit" />
                </div>
              </button>

              {/* <button
                type="submit"
                className="group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg"
              >
                <span className="fnt-lexend uppercase duration-300 ease-in">
                  Book My 30-Minute Call
                </span>
                <div className="bg-primary p-1">
                  <ArrowIcon clipId="clip-book-call" />
                </div>
              </button> */}
            </div>

            <p className="min-h-[16px] text-start text-[11.5px] text-primary">
              {note}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
