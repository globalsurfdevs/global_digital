"use client";
import { motion } from "framer-motion";
import { useRef, useState, useTransition } from "react";
import { Check, ChevronDown } from "lucide-react";
import { moveUp } from "../../animations/motionVariants";
import { submitBooking } from "@/app/actions/submitBooking";

const trustPoints: string[] = [
    "A senior strategist, not a salesperson",
    "No deck, no pitch — just the fit conversation",
    "A reply within one business day",
];

const sectors = [
    "E-commerce",
    "SaaS",
    "Healthcare",
    "Real Estate",
    "Manufacturing",
    "Other",
];

type FormErrors = Partial<Record<"name" | "company" | "email" | "phone" | "sector", string>>;

const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s().-]{7,20}$/;

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

        case "phone":
            if (!v) return undefined; // optional
            if (!PHONE_REGEX.test(v)) return "Enter a valid phone number.";
            return undefined;

        case "sector":
            if (!v) return "Please select a sector.";
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
        <span className="text-18 fnt-lexend text-[#A3A3A3]">{label}</span>
    </motion.div>
);

const FormField = ({
    label,
    type = "text",
    name,
    required,
    error,
    onBlur,
    onChange,
}: {
    label: string;
    type?: string;
    name: string;
    required?: boolean;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <div className="flex flex-col gap-1">
        <label htmlFor={name} className="block text-18 text-[#A3A3A3]">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            onBlur={onBlur}
            onChange={onChange}
            aria-invalid={!!error}
            className={`mt-2 w-full appearance-none border-0 border-b bg-transparent pt-3 text-15 text-white outline-none ring-0 transition-colors placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-white/60 ${error ? "border-primary" : "border-white/20"
                }`}
        />
        {error && <p className="mt-1.5 text-[11px] text-primary">{error}</p>}
    </div>
);

const GetInTouch = ({ data }: { data: { title: string; description: string } }) => {
    const [sectorOpen, setSectorOpen] = useState(false);
    const [sector, setSector] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [note, setNote] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    const runValidation = (form: HTMLFormElement): FormErrors => {
        const data = new FormData(form);
        const fields: (keyof FormErrors)[] = ["name", "company", "email", "phone", "sector"];
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
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSectorSelect = (s: string) => {
        setSector(s);
        setSectorOpen(false);
        if (errors.sector) {
            setErrors((prev) => ({ ...prev, sector: undefined }));
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
        // sector isn't a native input, so append it manually
        formData.set("sector", sector);

        startTransition(async () => {
            const result = await submitBooking(formData);
            setNote(result.message ?? (result.success ? "Thank you." : "Something went wrong."));
            if (result.success) {
                form.reset();
                setSector("");
                setErrors({});
            }
        });
    };

    return (
        <section className="bg-black pt-[16px] text-white md:pt-20 xl:pt-120">
            <div className="container border-b border-[#77787B] pb-[16px] md:pb-20 xl:pb-[120px]">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
                    <div>
                        <motion.h2
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0)}
                            viewport={{ once: true }}
                            className="text-60 lg:max-w-[658px] lg:leading-[65px] "
                        >
                            {data.title}
                        </motion.h2>

                        <motion.p
                            initial="hidden"
                            whileInView="show"
                            variants={moveUp(0.05)}
                            viewport={{ once: true }}
                            className="mt-[40px] max-w-[520px] text-18 leading-[26px] text-[#A3A3A3]"
                        >
                            {data.description}
                        </motion.p>

                        <div className="mt-8 flex flex-col gap-[15px] max-w-[454px]">
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
                                    <span className="block text-13 text-white/50">
                                        Sector <span className="text-primary">*</span>
                                    </span>
                                    <span className="mt-2 block text-15 text-white">
                                        {sector || "\u00A0"}
                                    </span>
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={`shrink-0 text-white/60 transition-transform ${sectorOpen ? "rotate-180" : ""
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
                                                className="w-full px-4 py-2.5 text-left text-14 text-white/80 hover:bg-white/10"
                                            >
                                                {s}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {errors.sector && (
                                <p className="mt-1.5 text-[11px] text-primary">{errors.sector}</p>
                            )}
                        </div>

                        <div className="mt-10 lg:mt-[60px] mb-10 lg:mb-0  flex flex-wrap gap-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg ${isPending ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <span className="fnt-lexend uppercase duration-300 ease-in">
                                    {isPending ? "Submitting..." : "Submit"}
                                </span>
                                <div className="bg-primary p-1">
                                    <ArrowIcon clipId="clip-submit" />
                                </div>
                            </button>

                            <button
                                type="submit"
                                className="group flex items-center space-x-2 rounded-full border border-primary px-6 py-2 text-white transition duration-300 ease-in hover:shadow-lg"
                            >
                                <span className="fnt-lexend uppercase duration-300 ease-in">
                                    Book My 30-Minute Call
                                </span>
                                <div className="bg-primary p-1">
                                    <ArrowIcon clipId="clip-book-call" />
                                </div>
                            </button>
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