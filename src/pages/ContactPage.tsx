import React, { useState, useRef, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    Sparkles,
    Building2,
    Users,
    Globe,
    Award,
    User,
    Briefcase,
    MessageSquare,
    AlertCircle,
    Building,
    ShieldCheck,
    RefreshCw,
} from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // ─── Captcha (simple math challenge, front-end only) ───────────────────
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        return { num1, num2 };
    };
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [captchaTouched, setCaptchaTouched] = useState(false);

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaAnswer("");
        setCaptchaTouched(false);
        if (errors.captcha) {
            setErrors((prev) => ({ ...prev, captcha: "" }));
        }
    };

    // Scroll animations on mount
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaptchaAnswer(e.target.value);
        if (errors.captcha) {
            setErrors((prev) => ({ ...prev, captcha: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim())
            newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
            newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[\+\d\s\-\(\)]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }
        // if (!formData.service) newErrors.service = "Please select a service";
        if (!formData.message.trim())
            newErrors.message = "Message is required";

        // CAPTCHA check: block submission unless the answer is correct.
        if (!captchaAnswer.trim()) {
            newErrors.captcha = "Please solve the captcha";
        } else if (
            !/^\d+$/.test(captchaAnswer.trim()) ||
            Number(captchaAnswer.trim()) !== captcha.num1 + captcha.num2
        ) {
            newErrors.captcha = "Incorrect answer. Please try again";
        }

        return newErrors;
    };

   
   
   
   
   
   
   
  
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
    });
    setTouched(allTouched);
    setCaptchaTouched(true);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        const firstError = Object.keys(newErrors)[0];
        const field = formRef.current?.querySelector<HTMLElement>(
            `[name="${firstError}"]`
        );

        field?.focus();
        field?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        return;
    }

    const recipient = "deific.solution@hotmail.com";
    const fullName = [
        formData.firstName.trim(),
        formData.lastName.trim(),
    ].filter(Boolean).join(" ");

    const subject = `Website enquiry from ${fullName}`;

    const body = [
        "New contact enquiry - Deific Digital",
        "",
        `Name: ${fullName}`,
        `Email: ${formData.email.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `Service: ${formData.service.trim() || "Not specified"}`,
        "",
        "Message:",
        formData.message.trim(),
    ].join("\n");

    const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(recipient)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    // Open Gmail directly instead of using the system mailto handler.
    window.location.assign(gmailUrl);
};


    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const allTouched: Record<string, boolean> = {};
    //     Object.keys(formData).forEach((key) => {
    //         allTouched[key] = true;
    //     });
    //     setTouched(allTouched);
    //     setCaptchaTouched(true);

    //     const newErrors = validateForm();
    //     if (Object.keys(newErrors).length > 0) {
    //         setErrors(newErrors);
    //         // Refresh captcha whenever it fails, so an answer can't be reused/brute-forced
    //         if (newErrors.captcha) {
    //             refreshCaptcha();
    //         }
    //         const firstError = Object.keys(newErrors)[0];
    //         const el = document.querySelector(`[name="${firstError}"]`);
    //         if (el) {
    //             (el as HTMLElement).focus();
    //             (el as HTMLElement).scrollIntoView({
    //                 behavior: "smooth",
    //                 block: "center",
    //             });
    //         }
    //         return;
    //     }

    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         setSubmitted(true);
    //         setFormData({
    //             firstName: "",
    //             lastName: "",
    //             email: "",
    //             phone: "",
    //             service: "",
    //             message: "",
    //         });
    //         setTouched({});
    //         refreshCaptcha();
    //     }, 1500);
    // };

    const getLabelClass = (fieldName: string) => {
        const hasError = errors[fieldName] && touched[fieldName];
        // Label focus ya value hone par upar float karta hai (peer = input), typed text se overlap nahi
        return `pointer-events-none absolute left-11 top-4 text-base transition-all duration-200 ${
            hasError ? "text-red-500" : "text-gray-400 peer-focus:text-red-500"
        } peer-focus:top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`;
    };

    const faqs = [
        {
            question: "What services do you offer?",
            answer:
                "We offer a comprehensive range of digital services including Web Development, Mobile App Development, UI/UX Design, AI Solutions, Cloud & DevOps, and Digital Marketing. Our team specializes in creating scalable, innovative solutions tailored to your business needs.",
        },
        {
            question: "How long does a typical project take?",
            answer:
                "Project timelines vary based on scope and complexity. A typical web development project takes 4-12 weeks, while mobile apps can take 8-16 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
        },
        {
            question: "What is your pricing model?",
            answer:
                "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Each project is unique, so we provide custom quotes based on your specific requirements. Contact us for a free consultation and detailed proposal.",
        },
        {
            question: "Do you provide post-launch support?",
            answer:
                "Absolutely! We offer comprehensive post-launch support including maintenance, updates, security patches, and performance optimization. Our support packages are designed to ensure your digital product runs smoothly and continues to evolve with your business.",
        },
        {
            question: "Can you help with digital marketing?",
            answer:
                "Yes, our digital marketing services include SEO, content marketing, social media management, PPC advertising, and analytics. We create data-driven strategies to help you reach your target audience and achieve your business goals.",
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: "https://www.facebook.com/deificdigital/", label: "Facebook" },
        // { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/deificdigital/posts/?feedView=all", label: "LinkedIn" },
        { icon: Instagram, href: "https://www.instagram.com/deificdigital?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
        
    ];

    const stats = [
        { icon: Building2, label: "Projects Delivered", value: "500+" },
        { icon: Users, label: "Happy Clients", value: "200+" },
        { icon: Globe, label: "Countries Served", value: "15+" },
        { icon: Award, label: "Awards Won", value: "12" },
    ];

    // ─── Deific Contact Details ──────────────────────────────────────────────
    const contactDetails = [
        {
            icon: Phone,
            label: "Phone",
            value: "+91 87502 00899",
            href: "tel:+918750200899",
            detail: "Mon–Sat, 9:00 AM – 7:00 PM IST",
            highlight: true,
        },
        {
            icon: Mail,
            label: "Email",
            value: "deific.solution@hotmail.com",
            href: "mailto:deific.solution@hotmail.com",
            detail: "We reply within 24 hours",
            highlight: false,
        },
        {
            icon: MapPin,
            label: "Address",
            value: "8th Floor A1/4, Lakhanpur, Khyora, Kanpur, UP 208024",
            href: "#",
            detail: "Visit our office",
            highlight: false,
        },
        {
            icon: Clock,
            label: "Working Hours",
            value: "Mon–Sat: 9:00 AM – 7:00 PM IST",
            href: "#",
            detail: "Sunday closed",
            highlight: false,
        },
    ];

    // ─── Office Locations ──────────────────────────────────────────────────────
    const officeLocations = [
        {
            country: "India",
            type: "Head Office",
            address: "8th Floor A1/4, Lakhanpur, Khyora, Kanpur, UP 208024",
            email: "deific.solution@hotmail.com",
            phone: "(+91) 8750200899",
            flag: "🇮🇳",
        },
        {
            country: "USA",
            type: "Registered Office",
            address: "13201 Legendary Drive # 6201, Austin, Texas - 78727",
            email: "deific.solution@hotmail.com",
            phone: "(+1) 4086220445",
            flag: "🇺🇸",
        },
        {
            country: "UAE",
            type: "Registered Office",
            address: "Suite 1403, Off 22 & 23, Opal Tower, Business Bay, PO. Box:97450, Dubai, UAE",
            email: "deific.solution@hotmail.com",
            phone: "(+971) 9319668389",
            flag: "🇦🇪",
        },
    ];

    return (

        <>
         <Helmet>
         <title>Contact Us | Deific Digital</title>
         <link rel="canonical" href="https://deificdigital.com/contact" />
        </Helmet>

        <div className="min-h-screen bg-white">
            {/* ===== CONTACT INFO + FORM ===== */}
            <section
                className="py-16 md:py-24 bg-gray-50/50"
                id="contact-form"
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-5">
                        {/* ─── LEFT: CONTACT CARDS ─── */}
                        <div className="lg:col-span-2 animate-on-scroll">
                            <div className="sticky top-24">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-red-700 uppercase bg-red-100 rounded-full">
                                    Contact Information
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Get In Touch
                                </h2>
                                <p className="mt-3 text-gray-500">
                                    We're here to help and answer any questions
                                    you might have. We look forward to hearing
                                    from you.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {contactDetails.map((item, index) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className={`group flex items-start gap-5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border ${
                                                item.highlight
                                                    ? "bg-gradient-to-br from-red-50 via-orange-50/50 to-red-50 border-red-200 shadow-md hover:shadow-red-200/50"
                                                    : "bg-white border-gray-100 hover:border-red-100 hover:shadow-red-100/30"
                                            } animate-on-scroll`}
                                            style={{
                                                animationDelay: `${index * 80}ms`,
                                            }}
                                        >
                                            <div
                                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                                                    item.highlight
                                                        ? "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/25"
                                                        : "bg-gradient-to-br from-red-50 to-orange-50 text-red-600 group-hover:from-red-600 group-hover:to-orange-500 group-hover:text-white"
                                                } transition-all duration-300 group-hover:scale-110`}
                                            >
                                                <item.icon className="w-6 h-6" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    {item.label}
                                                </p>
                                                <p
                                                    className={`font-semibold text-gray-900 break-words ${
                                                        item.highlight
                                                            ? "text-lg text-red-700"
                                                            : "text-base group-hover:text-red-600"
                                                    } transition-colors`}
                                                >
                                                    {item.value}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-0.5 break-words">
                                                    {item.detail}
                                                </p>
                                                {item.highlight && (
                                                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                        <Phone className="w-3 h-3" />
                                                        Available Now
                                                    </span>
                                                )}
                                            </div>

                                            <div className="self-center text-gray-300 transition-all shrink-0 group-hover:text-red-500 group-hover:translate-x-1">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="mt-10">
                                    <p className="mb-3 text-sm font-medium text-gray-700">
                                        Connect with us
                                    </p>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                className="flex items-center justify-center text-gray-600 transition-all bg-white border border-gray-100 rounded-full shadow-sm h-11 w-11 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-1"
                                                aria-label={social.label}
                                            >
                                                <social.icon className="h-4.5 w-4.5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── RIGHT: FORM ─── */}
                        <div className="lg:col-span-3 animate-on-scroll">
                            <div className="relative p-6 overflow-hidden transition-all bg-white border border-gray-100 shadow-xl rounded-3xl shadow-gray-200/50 sm:p-8 md:p-10 hover:shadow-2xl hover:shadow-red-100/30">
                                <div className="absolute w-64 h-64 rounded-full pointer-events-none -top-20 -right-20 bg-red-100/30 blur-3xl animate-pulse" />
                                <div className="absolute w-64 h-64 delay-1000 rounded-full pointer-events-none -bottom-20 -left-20 bg-blue-100/20 blur-3xl animate-pulse" />

                                {submitted ? (
                                    <div className="relative z-10 py-12 text-center animate-fade-in-up">
                                        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full animate-bounce">
                                            <CheckCircle className="w-12 h-12 text-green-600" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900">
                                            Message Submitted Successfully! ✉️
                                        </h3>
                                        <p className="max-w-sm mx-auto mt-3 text-gray-500">
                                            Thanks for contacting Deific Digital. Your enquiry has been
                                            submitted for delivery to deific.solution@hotmail.com. We'll
                                            get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="inline-flex items-center gap-2 px-8 py-3 mt-8 text-sm font-semibold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-red-600 to-orange-500 shadow-red-500/25 hover:scale-105 hover:shadow-red-500/40"
                                        >
                                            Back to Contact Form
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <form
                                        ref={formRef}
                                        onSubmit={handleSubmit}
                                        className="relative z-10 space-y-5 sm:space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                Send a Message
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Fill in the details and solve the security check. Your email composer will open with the enquiry filled in; press Send there to email us.
                                            </p>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            {/* First Name */}
                                            <div className="relative">
                                                <User className="pointer-events-none absolute left-3.5 top-[1.125rem] h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    autoComplete="given-name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder=" "
                                                    className={`w-full rounded-xl border ${
                                                        errors.firstName &&
                                                        touched.firstName
                                                            ? "border-red-500 ring-2 ring-red-500/20"
                                                            : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    } h-14 bg-gray-50/50 pl-11 pr-4 pt-5 pb-1.5 text-base outline-none transition-all peer`}
                                                />
                                                <label
                                                    className={getLabelClass(
                                                        "firstName"
                                                    )}
                                                >
                                                    First Name *
                                                </label>
                                                {errors.firstName &&
                                                    touched.firstName && (
                                                        <p className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-slide-down">
                                                            <AlertCircle className="w-3 h-3" />
                                                            {errors.firstName}
                                                        </p>
                                                    )}
                                            </div>

                                            {/* Last Name */}
                                            <div className="relative">
                                                <User className="pointer-events-none absolute left-3.5 top-[1.125rem] h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder=" "
                                                    className={`w-full rounded-xl border ${
                                                        errors.lastName &&
                                                        touched.lastName
                                                            ? "border-red-500 ring-2 ring-red-500/20"
                                                            : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    } h-14 bg-gray-50/50 pl-11 pr-4 pt-5 pb-1.5 text-base outline-none transition-all peer`}
                                                />
                                                <label
                                                    className={getLabelClass(
                                                        "lastName"
                                                    )}
                                                >
                                                    Last Name *
                                                </label>
                                                {errors.lastName &&
                                                    touched.lastName && (
                                                        <p className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-slide-down">
                                                            <AlertCircle className="w-3 h-3" />
                                                            {errors.lastName}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3.5 top-[1.125rem] h-5 w-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                    autoComplete="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder=" "
                                                className={`w-full rounded-xl border ${
                                                    errors.email && touched.email
                                                        ? "border-red-500 ring-2 ring-red-500/20"
                                                        : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                } h-14 bg-gray-50/50 pl-11 pr-4 pt-5 pb-1.5 text-base outline-none transition-all peer`}
                                            />
                                            <label
                                                className={getLabelClass(
                                                    "email"
                                                )}
                                            >
                                                Email Address *
                                            </label>
                                            {errors.email && touched.email && (
                                                <p className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-slide-down">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute left-3.5 top-[1.125rem] h-5 w-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                inputMode="tel"
                                                name="phone"
                                                    autoComplete="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder=" "
                                                className={`w-full rounded-xl border ${
                                                    errors.phone && touched.phone
                                                        ? "border-red-500 ring-2 ring-red-500/20"
                                                        : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                } h-14 bg-gray-50/50 pl-11 pr-4 pt-5 pb-1.5 text-base outline-none transition-all peer`}
                                            />
                                            <label
                                                className={getLabelClass(
                                                    "phone"
                                                )}
                                            >
                                                Phone Number *
                                            </label>
                                            {errors.phone && touched.phone && (
                                                <p className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-slide-down">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        {/* Service */}
                                        {/* <div className="relative">
                                            <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 transition-colors peer-focus:text-red-500 pointer-events-none" />
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full rounded-xl border ${
                                                    errors.service &&
                                                    touched.service
                                                        ? "border-red-500 ring-2 ring-red-500/20"
                                                        : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                } bg-gray-50/50 pl-10 pr-10 py-3.5 text-sm outline-none transition-all appearance-none peer`}
                                            >
                                                <option value="">
                                                    Select a service
                                                </option>
                                                <option value="web-development">
                                                    Web Development
                                                </option>
                                                <option value="mobile-app">
                                                    Mobile App Development
                                                </option>
                                                <option value="ui-ux-design">
                                                    UI/UX Design
                                                </option>
                                                <option value="ai-solutions">
                                                    AI & Machine Learning
                                                </option>
                                                <option value="cloud-devops">
                                                    Cloud & DevOps
                                                </option>
                                                <option value="digital-marketing">
                                                    Digital Marketing
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                            <label
                                                className={getLabelClass(
                                                    "service"
                                                )}
                                            >
                                                Service Needed *
                                            </label>
                                            {errors.service &&
                                                touched.service && (
                                                    <p className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-slide-down">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {errors.service}
                                                    </p>
                                                )}
                                        </div> */}

                                        {/* Message */}
                                        <div className="relative">
                                            <MessageSquare className="pointer-events-none absolute left-3.5 top-[1.125rem] h-5 w-5 text-gray-400" />
                                            <textarea
                                                name="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder=" "
                                                className={`w-full rounded-xl border ${
                                                    errors.message &&
                                                    touched.message
                                                        ? "border-red-500 ring-2 ring-red-500/20"
                                                        : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                } bg-gray-50/50 pl-11 pr-4 pt-7 pb-3 text-base outline-none transition-all resize-none peer`}
                                            />
                                            <label
                                                className={`${getLabelClass("message")}`}
                                            >
                                                Message *
                                            </label>
                                            {errors.message &&
                                                touched.message && (
                                                    <p className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-slide-down">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {errors.message}
                                                    </p>
                                                )}
                                            <div className="mt-1 text-xs text-right text-gray-400">
                                                {formData.message.length} / 500
                                            </div>
                                        </div>

                                        {/* CAPTCHA / anti-spam check */}
                                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/70">
                                            <div className="flex items-center gap-2 mb-3">
                                                <ShieldCheck className="w-4 h-4 text-red-500" />
                                                <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                    Security Check
                                                </span>
                                            </div>
                                            <p className="mb-3 text-sm text-gray-600">
                                                Please solve this quick math question to verify your submission.
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div
                                                    className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 select-none"
                                                    aria-label={`What is ${captcha.num1} plus ${captcha.num2}?`}
                                                >
                                                    <span className="text-base font-bold tracking-wider text-gray-800">
                                                        {captcha.num1} + {captcha.num2} =
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    maxLength={2}
                                                    autoComplete="off"
                                                    name="captcha"
                                                    aria-label="Captcha answer"
                                                    aria-invalid={Boolean(errors.captcha && captchaTouched)}
                                                    aria-describedby={errors.captcha && captchaTouched ? "captcha-error" : undefined}
                                                    value={captchaAnswer}
                                                    onChange={handleCaptchaChange}
                                                    onBlur={() => setCaptchaTouched(true)}
                                                    placeholder="Answer"
                                                    className={`w-28 rounded-lg border ${
                                                        errors.captcha && captchaTouched
                                                            ? "border-red-500 ring-2 ring-red-500/20"
                                                            : "border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                                    } bg-white px-3 py-2.5 text-sm text-center outline-none transition-all`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={refreshCaptcha}
                                                    className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all bg-white border border-gray-200 rounded-lg hover:text-red-600 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                                    aria-label="Get a new CAPTCHA question"
                                                    title="Get a new question"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {errors.captcha && captchaTouched && (
                                                <p id="captcha-error" role="alert" className="flex items-center gap-1 mt-2 text-xs text-red-500 animate-slide-down">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.captcha}
                                                </p>
                                            )}
                                        </div>

                                        {/* Opens the user's email app with the enquiry pre-filled. */}
                                        <button
                                            type="submit"
                                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-[1.02] hover:shadow-red-500/40"
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                Verify & Open Email
                                                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== OUR OFFICE LOCATIONS ===== */}
            <section className="py-16 bg-white md:py-20">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-12 text-center animate-on-scroll">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-red-700 uppercase bg-red-100 rounded-full">
                            Our Offices
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Our Office
                        </h2>
                        <p className="max-w-2xl mx-auto mt-2 text-gray-500">
                            We have a global presence with offices in three
                            countries. Reach out to the location nearest to you.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {officeLocations.map((location, index) => (
                            <div
                                key={location.country}
                                className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:-translate-y-2 hover:shadow-xl hover:shadow-red-100/30 animate-on-scroll"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Header with flag and country */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">
                                        {location.flag}
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {location.country}
                                        </h3>
                                        <p className="text-xs font-medium tracking-wider text-red-600 uppercase">
                                            {location.type}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3 mb-3">
                                    <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {location.address}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-3 mb-2">
                                    <Mail className="w-5 h-5 text-red-500 shrink-0" />
                                    <a
                                        href={`mailto:${location.email}`}
                                        className="text-sm text-gray-600 transition-colors hover:text-red-600"
                                    >
                                        {location.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-red-500 shrink-0" />
                                    <a
                                        href={`tel:${location.phone.replace(
                                            /[()\s+]/g,
                                            ""
                                        )}`}
                                        className="text-sm text-gray-600 transition-colors hover:text-red-600"
                                    >
                                        {location.phone}
                                    </a>
                                </div>

                                {/* Decorative line */}
                                <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-300 group-hover:w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== MAP ===== */}
            <section className="py-16 bg-gray-50/50">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-10 text-center animate-on-scroll">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-red-700 uppercase bg-red-100 rounded-full">
                            Find Us
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Visit Our Office
                        </h2>
                        <p className="mt-2 text-gray-500">
                            We'd love to meet you in person. Come say hello at
                            our headquarters.
                        </p>
                    </div>
                    <div className="overflow-hidden border border-gray-100 shadow-xl rounded-2xl animate-on-scroll">
                        <div className="aspect-[16/6] w-full bg-gray-200 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.123456789012!2d80.218!3d26.457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c3f8f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location"
                                className="absolute inset-0"
                            />
                            <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2.5 shadow-lg border border-white/20">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-red-600" />
                                    <span className="text-sm font-medium text-gray-900">
                                        8th Floor A1/4, Lakhanpur, Kanpur
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section className="py-16 bg-white md:py-20">
                <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="mb-12 text-center animate-on-scroll">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-red-700 uppercase bg-red-100 rounded-full">
                            FAQ
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Find answers to common questions about our services
                            and process.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="overflow-hidden transition-all border border-gray-100 shadow-sm rounded-2xl bg-gray-50/50 hover:shadow-md animate-on-scroll"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <button
                                    onClick={() =>
                                        setFaqOpen(
                                            faqOpen === index ? null : index
                                        )
                                    }
                                    className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors hover:bg-gray-100/50"
                                >
                                    <span className="font-medium text-gray-900">
                                        {faq.question}
                                    </span>
                                    <span className="flex items-center justify-center w-8 h-8 ml-4 text-red-600 transition-all rounded-full shrink-0 bg-red-50">
                                        {faqOpen === index ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        faqOpen === index
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div className="px-6 pt-1 pb-5 leading-relaxed text-gray-500 border-t border-gray-100">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="relative py-16 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-red-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute rounded-full -top-20 -right-20 h-60 w-60 bg-red-500/20 blur-3xl" />
                    <div className="absolute rounded-full -bottom-20 -left-20 h-60 w-60 bg-blue-500/20 blur-3xl" />
                </div>
                <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Ready to Start Your Project?
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-white/70">
                        Let's discuss your ideas and turn them into reality.
                        Book a free consultation with our experts today.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                        <a
                            href="#contact-form"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:scale-105 hover:shadow-red-500/40"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="tel:+918750200899"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                        >
                            <Phone className="w-4 h-4" />
                            Call Now
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== ANIMATION STYLES ===== */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                @keyframes float-delay {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-16px) rotate(-8deg); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delay {
                    animation: float-delay 7s ease-in-out infinite;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                .animate-slide-down {
                    animation: slideDown 0.2s ease-out forwards;
                }
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                .animate-on-scroll.animate-fade-in-up {
                    opacity: 1;
                    transform: translateY(0);
                }
                html {
                    scroll-behavior: smooth;
                }
                *:focus-visible {
                    outline: 2px solid #dc2626;
                    outline-offset: 2px;
                }
                .text-gradient {
                    background: linear-gradient(to right, #dc2626, #f97316, #eab308);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .peer:focus ~ label,
                .peer:not(:placeholder-shown) ~ label {
                    top: 0.25rem;
                    font-size: 0.7rem;
                    color: #ef4444;
                }
                .peer:focus ~ .absolute.left-3 {
                    color: #ef4444;
                }
            ` }} />
        </div>

        </>
    );
}