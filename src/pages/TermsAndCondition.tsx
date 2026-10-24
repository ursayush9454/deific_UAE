import { Seo } from "@/components/site/Seo";
import { CTABanner } from "@/components/site/CTABanner";
import cover from "../assets/cover-image.webp";
import { Shield, FileText, Users, Clock, Scale, AlertTriangle, CheckCircle, GlobeLock } from "lucide-react";

// ─── BREADCRUMB ─────────────────────────────────────────────────────────────
function Breadcrumb() {
  return (
    <section
      className="relative h-[280px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      <div className="relative z-10 text-center px-6">
        <span className="inline-block bg-red-600/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-4">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-display tracking-tight">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-white/80 text-lg max-w-xl mx-auto">
          Please read these terms carefully before using our services.
        </p>
      </div>
    </section>
  );
}

// ─── TERMS CONTENT ──────────────────────────────────────────────────────
function TermsContent() {
  const sections = [
    {
      title: "1. Introduction",
      icon: <FileText className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          Welcome to Deific Digital. By accessing or using our website, services,
          and products, you agree to be bound by these Terms & Conditions. If you
          do not agree with any part of these terms, you must not use our services.
          These terms apply to all visitors, users, and others who access or use
          our services.
        </p>
      ),
    },
    {
      title: "2. Intellectual Property Rights",
      icon: <Scale className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>
            All content, materials, designs, logos, graphics, and software on
            this website are the exclusive property of Deific Digital or its
            licensors and are protected by copyright, trademark, and other
            intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of,
            publicly display, or commercially exploit any content without our
            prior written consent.
          </p>
        </div>
      ),
    },
    {
      title: "3. User Obligations",
      icon: <Users className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>As a user, you agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate and complete information when using our services</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use our services only for lawful purposes</li>
            <li>Not interfere with or disrupt our systems or networks</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Payment and Refund Policy",
      icon: <Clock className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>
            Payments for our services are processed through secure third-party
            gateways. All fees are non-refundable unless otherwise specified in
            the service agreement.
          </p>
          <p>
            We reserve the right to change our pricing at any time, but such
            changes will not affect ongoing projects without prior notice.
          </p>
          <p className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm">
            <strong>Refund Policy:</strong> Refunds are issued only in cases of
            proven failure to deliver the agreed services. Please refer to your
            specific service contract for detailed refund terms.
          </p>
        </div>
      ),
    },
    {
      title: "5. Limitation of Liability",
      icon: <AlertTriangle className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>
            Deific Digital is not liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of our
            services. Our total liability, if any, is limited to the amount paid
            for the specific service giving rise to the claim.
          </p>
          <p>
            We do not guarantee that our services will be uninterrupted,
            error-free, or completely secure, but we strive to maintain the
            highest standards of quality and reliability.
          </p>
        </div>
      ),
    },
    {
      title: "6. Third-Party Links and Services",
      icon: <GlobeLock className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          Our website may contain links to third-party websites or services that
          are not owned or controlled by Deific Digital. We have no control over,
          and assume no responsibility for, the content, privacy policies, or
          practices of any third-party sites. You access them at your own risk.
        </p>
      ),
    },
    {
      title: "7. Governing Law",
      icon: <Scale className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          These Terms & Conditions are governed by and construed in accordance
          with the laws of India. Any disputes arising out of or related to these
          terms shall be subject to the exclusive jurisdiction of the courts in
          Kanpur, Uttar Pradesh.
        </p>
      ),
    },
    {
      title: "8. Changes to These Terms",
      icon: <Clock className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to update or modify these Terms & Conditions at any
          time without prior notice. Changes will be effective immediately upon
          posting on this page. Your continued use of our services after any
          changes constitutes your acceptance of the new terms.
        </p>
      ),
    },
    {
      title: "9. Contact Us",
      icon: <FileText className="h-6 w-6 text-white-600 shrink-0" />,
      content: (
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>
            If you have any questions, concerns, or requests regarding these
            Terms & Conditions, please contact us at:
          </p>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p><strong>Email:</strong> hello@deificdigital.com</p>
            <p><strong>Phone:</strong> +91 87502 00899</p>
            <p><strong>Address:</strong> 8th Floor A1/4, Lakhanpur, Khyora, Kanpur, UP 208024</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Legal Agreement
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display">
            Terms & <span className="text-red-600">Conditions</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div> */}

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-gray-50/50 border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md hover:border-red-200"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <div className="text-gray-600 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-12 p-6 bg-red-50 rounded-2xl border border-red-200 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Last Updated:</span> June 17, 2026
          </p>
          <p className="text-xs text-gray-500 mt-1">
            These terms are subject to change. Please check back regularly.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo title="Terms & Conditions | Deific Digital" description="Terms and conditions for using Deific Digital's website, software development and AI automation services." path="/terms-and-condition" />
      <Breadcrumb />
      <TermsContent />
      <CTABanner />

      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scroll-behavior: smooth;
        }
      ` }} />
    </div>
  );
}