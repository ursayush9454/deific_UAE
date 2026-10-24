
import { CTABanner } from "@/components/site/CTABanner";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import {
    MapPin,
    Clock,
    ArrowRight,
    Sparkles,
    Briefcase,
    Users,
    Award,
    TrendingUp,
    ChevronRight,
    Code,
    Smartphone,
    Palette,
    Cloud,
    TrendingUp as SalesIcon,
    Bot,
    Heart,
    Coffee,
    Globe,
    Zap,
    Star,
    ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const jobs = [
    {
        title: "Senior React Developer",
        type: "Full-time",
        location: "Kanpur / Remote",
        dept: "Engineering",
        icon: Code,
        bgGradient: "from-blue-600 to-cyan-500",
        description:
            "Build cutting-edge web applications with React, TypeScript, and modern frontend technologies.",
    },
    {
        title: "Flutter Developer",
        type: "Full-time",
        location: "Kanpur / Remote",
        dept: "Mobile",
        icon: Smartphone,
        bgGradient: "from-purple-600 to-pink-500",
        description:
            "Create beautiful cross-platform mobile apps with Flutter and Dart for iOS and Android.",
    },
    {
        title: "UI/UX Designer",
        type: "Full-time",
        location: "Kanpur",
        dept: "Design",
        icon: Palette,
        bgGradient: "from-orange-500 to-red-500",
        description:
            "Design intuitive user experiences and stunning interfaces for web and mobile products.",
    },
    {
        title: "DevOps Engineer",
        type: "Full-time",
        location: "Remote",
        dept: "Infrastructure",
        icon: Cloud,
        bgGradient: "from-green-600 to-teal-500",
        description:
            "Build and maintain cloud infrastructure, CI/CD pipelines, and automate deployment workflows.",
    },
    {
        title: "Business Development Executive",
        type: "Full-time",
        location: "Kanpur",
        dept: "Sales",
        icon: SalesIcon,
        bgGradient: "from-yellow-600 to-orange-500",
        description:
            "Drive business growth by identifying new opportunities and building strong client relationships.",
    },
    {
        title: "AI/ML Intern",
        type: "Internship",
        location: "Kanpur / Remote",
        dept: "AI",
        icon: Bot,
        bgGradient: "from-indigo-600 to-purple-500",
        description:
            "Work on cutting-edge AI and machine learning projects with real-world applications.",
    },
];

// Animation helper: staggered entrance on scroll
const useStaggeredAnimation = () => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
};

export default function CareersPage() {
    const { ref, visible } = useStaggeredAnimation();
    const [jobList, setJobList] = useState<any>(false);

    // Stats
    const stats = [
        { icon: Users, label: "Team Members", value: "50+" },
        { icon: Briefcase, label: "Open Positions", value: "6" },
        { icon: Award, label: "Years in Industry", value: "12+" },
        { icon: TrendingUp, label: "Growth Rate", value: "200%" },
    ];

    // Culture data (enhanced)
    const cultureItems = [
        {
            icon: "🚀",
            title: "Innovation First",
            desc: "We encourage creative thinking and provide the freedom to experiment with new technologies.",
            color: "from-blue-50 to-blue-100/50",
            iconColor: "text-blue-600",
        },
        {
            icon: "🤝",
            title: "Collaborative Culture",
            desc: "Work with a diverse team of experts who support each other and celebrate wins together.",
            color: "from-purple-50 to-purple-100/50",
            iconColor: "text-purple-600",
        },
        {
            icon: "📈",
            title: "Growth Opportunities",
            desc: "Continuous learning, mentorship, and clear career progression paths for every role.",
            color: "from-green-50 to-green-100/50",
            iconColor: "text-green-600",
        },
        {
            icon: "🌍",
            title: "Remote & Flexible",
            desc: "Work from anywhere with flexible hours that fit your lifestyle and productivity.",
            color: "from-orange-50 to-orange-100/50",
            iconColor: "text-orange-600",
        },
        {
            icon: "🏆",
            title: "Impactful Projects",
            desc: "Work on projects that make a real difference for clients across industries.",
            color: "from-red-50 to-red-100/50",
            iconColor: "text-red-600",
        },
        {
            icon: "🎉",
            title: "Fun & Rewards",
            desc: "Regular team events, competitive compensation, and a culture that values work-life balance.",
            color: "from-pink-50 to-pink-100/50",
            iconColor: "text-pink-600",
        },
    ];

    // Stats for culture section
    const cultureStats = [
        { value: "50+", label: "Team Members", icon: Users },
        { value: "12+", label: "Years of Excellence", icon: Award },
        { value: "550+", label: "Happy Clients", icon: Star },
        { value: "98%", label: "Employee Satisfaction", icon: Heart },
    ];

    return (

        <>

        <Helmet>
        <title>Careers | Deific Digital</title>
        <link rel="canonical" href="https://deificdigital.com/careers" />
        </Helmet>
        
                <div className="min-h-screen bg-white font-sans">
            {/* ===== HERO SECTION — COMPACT & ATTRACTIVE ===== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 py-12 md:py-16">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-red-500/25 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 text-xs font-medium text-white/90 mb-4 shadow-lg shadow-black/10">
                        <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                        <span>We're Hiring!</span>
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white leading-tight font-display">
                        Join Our
                        <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            Growing Team
                        </span>
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
                        Build your career with one of India's fastest-growing IT
                        companies. We're always looking for talented people.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="#openings"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
                        >
                            View Openings
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                            href="#culture"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                        >
                            Learn About Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            {/* <section className="border-b border-gray-100 bg-white py-2">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center animate-on-scroll"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ===== JOB OPENINGS — GRID CARDS ===== */}
            <section
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-10 "
                id="openings"
            >
               <div className="w-full">
                    <div className="h-64 w-full max-w-md mx-auto flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50">
                        <Briefcase className="w-10 h-10 text-gray-400" />
                        <p className="text-lg font-medium text-gray-600">No Current Job Openings</p>
                        <p className="text-sm text-gray-400">Please check back later for new opportunities</p>
                    </div>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >

                    {/* { jobList? */}
                  

                    {/* {jobs.map((job, index) => {
                        const IconComponent = job.icon;
                        return (
                            <div
                                key={job.title}
                                className={`group rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-red-200 ${
                                    visible ? "animate-fade-in-up" : "opacity-0"
                                }`}
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                               
                                <div
                                    className={`relative h-44 w-full bg-gradient-to-br ${job.bgGradient} flex items-center justify-center overflow-hidden`}
                                >
                                    <div className="absolute inset-0 opacity-20">
                                        <svg
                                            className="absolute -top-10 -right-10 h-32 w-32 text-white/30"
                                            fill="currentColor"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle cx="50" cy="50" r="40" />
                                        </svg>
                                        <svg
                                            className="absolute -bottom-10 -left-10 h-24 w-24 text-white/20"
                                            fill="currentColor"
                                            viewBox="0 0 100 100"
                                        >
                                            <rect
                                                x="10"
                                                y="10"
                                                width="80"
                                                height="80"
                                                rx="10"
                                            />
                                        </svg>
                                        <svg
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 text-white/10"
                                            fill="currentColor"
                                            viewBox="0 0 100 100"
                                        >
                                            <polygon points="50,0 100,50 50,100 0,50" />
                                        </svg>
                                    </div>

                                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl shadow-black/20 border border-white/30">
                                        <IconComponent className="h-12 w-12 text-white" />
                                    </div>

                                    <div className="absolute top-4 right-4 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/20">
                                        {job.type}
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>

                                
                                <div className="p-5 md:p-6">
                                    <span className="inline-block rounded-full bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 mb-2.5">
                                        {job.dept}
                                    </span>

                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                                        {job.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {job.type}
                                        </span>
                                    </div>

                                    <Link
                                        to="/contact"
                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all hover:shadow-lg hover:shadow-red-300 group-hover:scale-[1.02]"
                                    >
                                        Apply Now
                                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })} */}
                </div>
            </section>

            {/* ===== CULTURE / WHY JOIN US — ENHANCED ===== */}
            <section
                className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50/70 py-16 md:py-24"
                id="culture"
            >
                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-red-100/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-100/20 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-100/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-700 mb-4">
                            Culture & Values
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display leading-tight">
                            Why Work With <span className="text-red-600">Us</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
                            We believe in fostering a collaborative, innovative,
                            and inclusive environment where everyone can thrive
                            and grow.
                        </p>
                    </div>

                    {/* ===== HERO IMAGE WITH OVERLAY ===== */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-14 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&fm=webp"
                            alt="Team collaboration at Deific Digital"
                            loading="lazy"
                            decoding="async"
                            width={1400}
                            height={420}
                            className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
                            <div className="max-w-3xl">
                                <span className="inline-block bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                    Life at Deific Digital
                                </span>
                                <h3 className="text-2xl md:text-4xl font-bold text-white font-display leading-tight">
                                    Where Innovation Meets
                                    <span className="block text-red-300">
                                        Passion & Purpose
                                    </span>
                                </h3>
                                <p className="text-white/80 text-sm md:text-base mt-2 max-w-xl">
                                    We're not just building software — we're
                                    building a community of dreamers, doers, and
                                    disruptors.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ===== STATS ROW ===== */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
                        {cultureStats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-200 animate-on-scroll"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-2xl font-extrabold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ===== CULTURE GRID ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cultureItems.map((item, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-red-200 overflow-hidden animate-on-scroll ${
                                    visible ? "animate-fade-in-up" : "opacity-0"
                                }`}
                                style={{ animationDelay: `${index * 80 + 200}ms` }}
                            >
                                {/* Gradient background on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                <div className="relative z-10">
                                    <div className="text-4xl mb-3 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="w-10 h-0.5 bg-red-200 rounded-full mt-2 mb-3 group-hover:w-14 group-hover:bg-red-500 transition-all duration-300" />
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== QUOTE / TESTIMONIAL ===== */}
                    <div className="mt-14 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-6 md:p-10 text-center shadow-xl shadow-red-200/50">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-5xl text-white/30 font-display leading-none mb-2">
                                "
                            </div>
                            <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                                Working at Deific Digital has been a
                                transformative experience. The culture of
                                innovation, continuous learning, and genuine
                                camaraderie makes every day exciting. I've grown
                                more here in one year than in five years
                                elsewhere.
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                                    AS
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-semibold text-sm">
                                        Ankit Sharma
                                    </p>
                                    <p className="text-white/60 text-xs">
                                        Senior React Developer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== CTA ===== */}
                    <div className="text-center mt-12">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
                        >
                            Join Our Team Today
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <p className="text-xs text-gray-400 mt-3">
                            We're excited to meet you. Let's build something
                            amazing together.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <CTABanner />

            {/* ===== ANIMATION STYLES ===== */}
            <style dangerouslySetInnerHTML={{ __html: `

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.7s ease-out forwards;
                }
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
                }
                .animate-on-scroll.animate-fade-in-up {
                    opacity: 1;
                    transform: translateY(0);
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            ` }} />
        </div>

        </>
    );
}
