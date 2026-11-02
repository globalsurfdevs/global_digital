export const CAMPAIGN_IDS = {
  growthPartnership: "Growth Partnership",
  digitalGrowth: "Digital Growth",
  chatGptAds: "ChatGPT Ads",
} as const;
export type CAMPAIGN_IDS =
  (typeof CAMPAIGN_IDS)[keyof typeof CAMPAIGN_IDS];
export const CAMPAIGN_TIME_SLOTS = [
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
] as const;

export type BookingField =
  "name" | "company" | "email" | "phone" | "sector" | "date" | "timeSlot";

export type BookingErrors = Partial<Record<BookingField, string>>;

const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBookingField(
  name: BookingField,
  value: string,
  options: { sectorRequired?: boolean } = {},
): string | undefined {
  const normalized = value.trim();

  switch (name) {
    case "name":
      if (!normalized) return "Please enter your name.";
      if (normalized.length < 2) return "Name looks too short.";
      if (!NAME_REGEX.test(normalized)) return "Name can only contain letters.";
      return undefined;
    case "company":
      if (!normalized) return "Please enter your company name.";
      if (normalized.length < 2) return "Company name looks too short.";
      return undefined;
    case "email":
      if (!normalized) return "Please enter your work email.";
      if (!EMAIL_REGEX.test(normalized)) return "Enter a valid email address.";
      return undefined;
    case "phone": {
      if (!normalized) return "Please enter your phone number.";
      const digitsOnly = normalized.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return "Enter a valid phone number.";
      }
      if (/^0+$/.test(digitsOnly) || /^(\d)\1+$/.test(digitsOnly)) {
        return "Enter a valid phone number.";
      }
      if (!/^[+\d\s().-]+$/.test(normalized)) {
        return "Enter a valid phone number.";
      }
      return undefined;
    }
    case "sector":
      return options.sectorRequired && !normalized
        ? "Please select a sector."
        : undefined;
    case "date": {
      if (!normalized) return "Please pick a date.";
      const picked = new Date(`${normalized}T00:00:00`);
      if (Number.isNaN(picked.getTime())) return "Enter a valid date.";
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (picked < tomorrow)
        return "Please select a date from tomorrow onward.";
      if (picked.getDay() === 0 || picked.getDay() === 6) {
        return "Bookings are not available on Saturdays and Sundays.";
      }
      return undefined;
    }
    case "timeSlot":
      if (!normalized) return "Please pick a time slot.";
      return undefined;
  }
}

export function validateBookingForm(
  formData: FormData,
  options: { sectorRequired?: boolean } = {},
): BookingErrors {
  const errors: BookingErrors = {};
  const fields: BookingField[] = [
    "name",
    "company",
    "email",
    "phone",
    "sector",
    "date",
    "timeSlot",
  ];

  for (const field of fields) {
    const value = String(formData.get(field) ?? "");
    const error = validateBookingField(field, value, options);
    if (error) errors[field] = error;
  }

  return errors;
}

export function addCampaignToFormData(
  formData: FormData,
  campaign: keyof typeof CAMPAIGN_IDS,
) {
  formData.set("campaign", CAMPAIGN_IDS[campaign]);
  return formData;
}
