import LegalLayout, { Section, UL, B } from "./LegalLayout";
import {
  APP_NAME,
  COMPANY,
  PATHS,
  RETENTION_DAYS,
  DELETION_DAYS,
} from "./propaiConfig";

export default function PropAIPrivacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`This Privacy Policy explains how ${COMPANY.name} collects, uses, shares and protects information when businesses and their customers use ${APP_NAME}.`}
    >
      <Section n={1} title="Who We Are">
        <p>
          {APP_NAME} (“the Service”, “we”, “us”) is operated by{" "}
          <B>{COMPANY.name}</B>, {COMPANY.address}.
        </p>
        <p>
          Email:{" "}
          <a
            className="text-[#2563eb] underline"
            href={`mailto:${COMPANY.email}`}
          >
            {COMPANY.email}
          </a>{" "}
          · Phone: {COMPANY.phone} · Website:{" "}
          <a className="text-[#2563eb] underline" href={COMPANY.website}>
            {COMPANY.website}
          </a>
        </p>
        <p>
          {APP_NAME} is a software-as-a-service (SaaS) CRM and WhatsApp
          automation platform for real estate businesses (“Customers”). It uses
          the WhatsApp Business Platform provided by Meta to reply to buyer
          enquiries, qualify leads and schedule site visits.
        </p>
      </Section>

      <Section n={2} title="Our Role: Controller and Processor">
        <UL
          items={[
            <>
              For the account data of our Customers, {COMPANY.name} is the{" "}
              <B>Data Controller</B> (Data Fiduciary).
            </>,
            <>
              For data of people who message a Customer’s WhatsApp number (“End
              Users”, for example property buyers), the Customer is the{" "}
              <B>Data Controller</B> and {COMPANY.name} acts as the{" "}
              <B>Data Processor</B>, processing data only on the Customer’s
              instructions.
            </>,
          ]}
        />
      </Section>

      <Section n={3} title="Information We Collect">
        <UL
          items={[
            <>
              <B>Customer account data:</B> name, business name, email address,
              phone number, billing and GST details, team member details.
            </>,
            <>
              <B>WhatsApp Business data:</B> WhatsApp Business Account ID, phone
              number ID, access tokens, message templates and settings
              authorised by the Customer.
            </>,
            <>
              <B>End User data:</B> WhatsApp phone number, profile name, message
              content, media files, timestamps, delivery and read status.
            </>,
            <>
              <B>Lead information shared in chat:</B> property preferences,
              budget range, preferred location, timeline and site-visit
              bookings.
            </>,
            <>
              <B>Technical data:</B> IP address, browser and device information,
              usage logs.
            </>,
          ]}
        />
      </Section>

      <Section n={4} title="How We Use Information">
        <UL
          items={[
            "Send and receive WhatsApp messages on behalf of Customers.",
            "Generate automated replies, including with AI.",
            "Organise leads, score them based on information shared in the conversation, and schedule site visits.",
            "Create and manage WhatsApp message templates.",
            "Provide customer support, maintain security and prevent fraud or abuse.",
            "Improve and develop the Service.",
            "Comply with legal obligations.",
          ]}
        />
        <p>
          We do <B>not sell</B> personal data and we do not use End User
          messages for advertising.
        </p>
      </Section>

      <Section n={5} title="Sharing of Information">
        <p>We share data only with the following:</p>
        <UL
          items={[
            <>
              <B>Meta Platforms / WhatsApp</B>, to deliver messages through the
              WhatsApp Business Platform (subject to Meta’s own privacy policy).
            </>,
            <>
              <B>Google (Gemini AI)</B>, which processes message content to
              generate automated replies.
            </>,
            <>
              <B>Hostinger</B>, our hosting and server provider.
            </>,
            <>
              <B>The Customer</B> whose chatbot you messaged, who can access
              conversations and lead details related to its own WhatsApp number.
            </>,
            <>
              <B>Government or legal authorities</B>, when required by law.
            </>,
          ]}
        />
      </Section>

      <Section n={6} title="AI Processing">
        <p>
          {APP_NAME} uses Google Gemini to generate chatbot replies. Message
          content may be sent to Google’s AI services for this purpose. Please
          do not share sensitive information such as passwords, card numbers,
          OTPs or government ID numbers in chatbot conversations. AI-generated
          replies may sometimes be inaccurate, and conversations can be handed
          over to a human agent of the Customer.
        </p>
      </Section>

      <Section n={7} title="Data Retention">
        <UL
          items={[
            `Message data (content, media and logs) is retained for ${RETENTION_DAYS} days and then automatically deleted, unless a longer period is required by law.`,
            "Account data is kept while the account is active and deleted within 30 days after account closure or on request, except where law requires us to keep records (for example billing and tax records).",
          ]}
        />
      </Section>

      <Section n={8} title="Data Security">
        <p>
          We use HTTPS/TLS encryption in transit, encrypted storage of access
          tokens, access controls, separation of data between Customers, and
          regular server maintenance. No system is completely secure, but we
          work to protect your data.
        </p>
      </Section>

      <Section n={9} title="Your Rights">
        <p>
          Subject to applicable law, including India’s Digital Personal Data
          Protection Act, 2023, you may:
        </p>
        <UL
          items={[
            "request access to your data;",
            "request correction of inaccurate data;",
            "request deletion of your data;",
            "withdraw consent;",
            "raise a grievance.",
          ]}
        />
        <p>
          End Users should first contact the business they messaged. You can
          also write to us at{" "}
          <a
            className="text-[#2563eb] underline"
            href={`mailto:${COMPANY.email}`}
          >
            {COMPANY.email}
          </a>
          .
        </p>
      </Section>

      <Section n={10} title="Data Deletion">
        <p>
          To delete your data, email <B>{COMPANY.email}</B> with the subject
          “Data Deletion Request” and include your WhatsApp number or registered
          email, or visit our{" "}
          <a className="text-[#2563eb] underline" href={PATHS.dataDeletion}>
            Data Deletion page
          </a>
          . We will process the request within <B>{DELETION_DAYS} days</B> and
          confirm by email.
        </p>
      </Section>

      <Section n={11} title="Children’s Privacy">
        <p>
          The Service is not intended for children under 18. We do not knowingly
          collect data from children. If you believe a child has provided data,
          contact us and we will delete it.
        </p>
      </Section>

      <Section n={12} title="International Data Transfers">
        <p>
          Your data may be processed on servers or by service providers located
          outside your country, including through Meta and Google, with
          appropriate safeguards.
        </p>
      </Section>

      <Section n={13} title="Cookies">
        <p>
          Our website may use basic cookies for login sessions and analytics.
          You can disable cookies in your browser settings.
        </p>
      </Section>

      <Section n={14} title="Changes to This Policy">
        <p>
          We may update this policy from time to time. The updated date is shown
          at the top of this page. Continued use of the Service means you accept
          the changes.
        </p>
      </Section>

      <Section n={15} title="Contact and Grievance">
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
