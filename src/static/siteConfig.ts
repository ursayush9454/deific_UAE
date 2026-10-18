// ─────────────────────────────────────────────────────────────
// Site-wide contact + brand config. Change numbers here once,
// they update everywhere (header, footer, forms, WhatsApp links).
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Deific Digital",
  url: "https://deificdigital.com",
  email: "deific.solution@hotmail.com",

  // India (primary)
  phoneIN: "+91 87502 00899",
  telIN: "+918750200899",
  whatsapp: "918750200899", // wa.me format, no "+"

  // UAE — add your +971 number here when it's live.
  // While empty, UAE visitors are routed to the India WhatsApp line.
  phoneAE: "",
  telAE: "",
  whatsappAE: "",

  offices: [
    {
      city: "Kanpur",
      label: "Registered office",
      address: "8th Floor, STPI, A1/4 UPSIDA Building, Lakhanpur, Kanpur, Uttar Pradesh 208024, India",
    },
    {
      city: "Noida",
      label: "Branch office",
      address: "C-270, Sector 63, Noida, Uttar Pradesh 201301, India",
    },
  ],

  // Certifications shown in the trust strip, footer and schema.
  certifications: [
    { name: "ISO 9001", standard: "ISO 9001", detail: "Certified quality management" },
    { name: "ISO/IEC 27001", standard: "ISO/IEC 27001", detail: "Certified information security" },
  ],

  social: {
    facebook: "https://www.facebook.com/deificdigital/",
    linkedin: "https://www.linkedin.com/company/deificdigital/",
    instagram: "https://www.instagram.com/deificdigital",
  },
} as const;

/** Build a wa.me link with a pre-filled message. */
export function waLink(message: string, region: "IN" | "AE" = "IN") {
  const num = region === "AE" && SITE.whatsappAE ? SITE.whatsappAE : SITE.whatsapp;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
