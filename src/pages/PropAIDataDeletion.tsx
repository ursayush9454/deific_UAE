import { Mail } from "lucide-react";
import LegalLayout, { Section, UL, B } from "./LegalLayout";
import {
  APP_NAME,
  COMPANY,
  PATHS,
  RETENTION_DAYS,
  DELETION_DAYS,
} from "./propaiConfig";

export default function PropAIDataDeletion() {
  const subject = encodeURIComponent("Data Deletion Request");
  const body = encodeURIComponent(
    `Hello ${COMPANY.name},\n\nPlease delete my data from ${APP_NAME}.\n\nWhatsApp number (with country code): \nRegistered account email (if any): \n\nThank you.`,
  );

  return (
    <LegalLayout
      title="Data Deletion Instructions"
      intro={`You can ask ${COMPANY.name} to delete your data from ${APP_NAME} at any time. Here is how.`}
    >
      <Section n={1} title="How to Request Deletion">
        <UL
          items={[
            <>
              Send an email to <B>{COMPANY.email}</B> with the subject{" "}
              <B>“Data Deletion Request”</B>.
            </>,
            <>
              Include your <B>WhatsApp phone number</B> (with country code) or
              your <B>registered account email</B>.
            </>,
            "We may ask you to verify your identity to protect your data.",
          ]}
        />
        <a
          href={`mailto:${COMPANY.email}?subject=${subject}&body=${body}`}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0f1f4d] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#0a1840]"
        >
          <Mail size={14} /> Email a deletion request
        </a>
      </Section>

      <Section n={2} title="What Happens Next">
        <UL
          items={[
            <>
              We will delete your data within <B>{DELETION_DAYS} days</B> and
              confirm by email.
            </>,
            "Deleted data includes your messages, media, profile information and account data linked to your number or email.",
            "Some records, such as billing and tax records, may be kept where required by law.",
            `Message data that is not deleted on request is automatically removed after ${RETENTION_DAYS} days.`,
          ]}
        />
      </Section>

      <Section n={3} title={`Messaged a Business Using ${APP_NAME}?`}>
        <p>
          If you messaged a real estate business that uses {APP_NAME}, you can
          also ask that business directly to delete your data. For details on
          what we collect and why, see our{" "}
          <a className="text-[#2563eb] underline" href={PATHS.privacy}>
            Privacy Policy
          </a>
          .
        </p>
      </Section>

      <Section n={4} title="Contact">
        <p>
          {COMPANY.name}
          <br />
          {COMPANY.address}
          <br />
          Email: {COMPANY.email} · Phone: {COMPANY.phone}
        </p>
      </Section>
    </LegalLayout>
  );
}
