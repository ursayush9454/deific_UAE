import { Seo } from "@/components/site/Seo";
import { CTABanner } from "@/components/site/CTABanner";
import cover from "../assets/cover-image.webp";
import {
    Shield,
    FileText,
    Users,
    Clock,
    Scale,
    AlertTriangle,
    Eye,
    Cookie,
    Lock,
    Share2,
    UserCheck,
    Mail,
} from "lucide-react";

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
                    Privacy
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-display tracking-tight">
                    Privacy Policy
                </h1>
                <p className="mt-3 text-white/80 text-lg max-w-xl mx-auto">
                    How we collect, use, and protect your personal information.
                </p>
            </div>
        </section>
    );
}

// ─── PRIVACY POLICY CONTENT ──────────────────────────────────────────────
function PrivacyContent() {
    const sections = [
        {
            title: "1. Information We Collect",
            icon: <FileText className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        We collect information to provide better services to our
                        users. The types of information we collect include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Personal Information:</strong> Name, email
                            address, phone number, company name, and other
                            details you provide when filling out forms or
                            contacting us.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> Information about how
                            you interact with our website, including IP address,
                            browser type, pages visited, time spent, and
                            referring URLs.
                        </li>
                        <li>
                            <strong>Cookies:</strong> We use cookies to enhance
                            your experience and analyze site traffic. You can
                            control cookie settings in your browser.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: "2. How We Use Your Information",
            icon: <Users className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>We use your information for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>To provide, maintain, and improve our services</li>
                        <li>To process transactions and send confirmations</li>
                        <li>
                            To communicate with you about updates, promotions,
                            and project updates
                        </li>
                        <li>To personalize your experience on our website</li>
                        <li>To analyze usage trends and improve our offerings</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "3. Information Sharing and Disclosure",
            icon: <Share2 className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        We do not sell, trade, or rent your personal information
                        to third parties. However, we may share your information
                        in the following cases:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Service Providers:</strong> With trusted
                            partners who assist us in operating our website,
                            hosting, payment processing, or analytics.
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> If required by
                            law or to protect our rights and safety.
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> In the event of
                            a merger, acquisition, or asset sale.
                        </li>
                    </ul>
                    <p>
                        We ensure that any third parties we engage are bound by
                        confidentiality obligations and process your data only
                        on our instructions.
                    </p>
                </div>
            ),
        },
        {
            title: "4. Cookies and Tracking Technologies",
            icon: <Cookie className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        We use cookies and similar tracking technologies to
                        enhance your browsing experience, analyze site traffic,
                        and understand user behavior. You have the option to
                        accept or decline cookies through your browser settings.
                        Please note that disabling cookies may affect some
                        functionalities of our website.
                    </p>
                    <p>
                        Types of cookies we use include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Essential Cookies:</strong> Required for the
                            website to function properly.
                        </li>
                        <li>
                            <strong>Analytics Cookies:</strong> Help us
                            understand how visitors interact with the site.
                        </li>
                        <li>
                            <strong>Preference Cookies:</strong> Remember your
                            settings and preferences.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: "5. Data Security",
            icon: <Lock className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        We implement appropriate technical and organizational
                        measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or
                        destruction. These measures include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Encryption of sensitive data during transmission</li>
                        <li>Secure server infrastructure</li>
                        <li>Access controls and authentication mechanisms</li>
                        <li>Regular security assessments and updates</li>
                    </ul>
                    <p>
                        While we strive to protect your data, no method of
                        transmission over the internet is 100% secure. We
                        encourage you to keep your account credentials
                        confidential.
                    </p>
                </div>
            ),
        },
        {
            title: "6. Data Retention",
            icon: <Clock className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes for which it was collected,
                    including to satisfy legal, accounting, or reporting
                    requirements. When no longer needed, we securely delete or
                    anonymize the data.
                </p>
            ),
        },
        {
            title: "7. Your Rights and Choices",
            icon: <UserCheck className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        You have the right to access, correct, update, or delete
                        your personal information. You may also object to or
                        restrict certain processing activities. To exercise
                        these rights, please contact us at the details provided
                        below.
                    </p>
                    <p>
                        You can also:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Opt out of marketing communications</li>
                        <li>Request a copy of the data we hold about you</li>
                        <li>Withdraw consent where processing is based on consent</li>
                        <li>Lodge a complaint with a data protection authority</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "8. Third-Party Links",
            icon: <Eye className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Our website may contain links to external sites that are not
                    operated by us. We are not responsible for the privacy
                    practices or content of such third-party sites. We encourage
                    you to review their privacy policies before providing any
                    personal information.
                </p>
            ),
        },
        {
            title: "9. Children's Privacy",
            icon: <Shield className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <p className="text-gray-600 leading-relaxed">
                    Our services are not directed to children under the age of
                    13. We do not knowingly collect personal information from
                    children. If you believe we have inadvertently collected
                    such information, please contact us so we can promptly
                    remove it.
                </p>
            ),
        },
        {
            title: "10. Changes to This Policy",
            icon: <AlertTriangle className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices or legal requirements. The
                    updated version will be posted on this page with a revised
                    "Last Updated" date. We encourage you to review this page
                    periodically.
                </p>
            ),
        },
        {
            title: "11. Contact Us",
            icon: <Mail className="h-6 w-6 text-white-600 shrink-0" />,
            content: (
                <div className="space-y-3 text-gray-600 leading-relaxed">
                    <p>
                        If you have any questions, concerns, or requests
                        regarding this Privacy Policy, please reach out to us:
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
                        Privacy Commitment
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display">
                        Privacy <span className="text-white-600">Policy</span>
                    </h2>
                    <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        Your privacy matters to us. Here's how we handle your data.
                    </p>
                </div> */}

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl bg-gray-50/50 border border-gray-100 p-6 md:p-8 transition-all hover:shadow-md hover:border-red-200"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-white-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
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
                        This policy is subject to change. Please review it periodically.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Seo title="Privacy Policy | Deific Digital" description="How Deific Digital collects, uses and protects your personal data. ISO/IEC 27001 certified information security." path="/privacy-policy" />
            <Breadcrumb />
            <PrivacyContent />
            <CTABanner />

            <style dangerouslySetInnerHTML={{ __html: `
                html {
                    scroll-behavior: smooth;
                }
            ` }} />
        </div>
    );
}