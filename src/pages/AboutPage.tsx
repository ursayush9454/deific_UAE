// import { CTABanner } from "@/components/site/CTABanner";
// import { Helmet } from 'react-helmet-async';
// import atul from "../assets/team-5.webp";
// import shobhit from "../assets/team-3.webp";
// import hridyansh from "../assets/team-2.webp";
// import mohit from "../assets/team-mohit.webp";
// import shoaib from "../assets/team-4.webp";
// import mohsin from "../assets/team-6.webp";
// import cover from "../assets/cover-image.webp";
// import { useState, useEffect, useRef } from "react";
// import { Sparkles, Quote, Users, Award, Globe, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

// // ── Icons (inline SVG) ──────────────────────────────────────────────────────
// const HeartIcon = () => (
//     <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
//         <rect width="64" height="64" rx="16" fill="#EEF6FF" />
//         <path d="M32 46s-18-10.5-18-22a10 10 0 0120 0 10 10 0 0120 0c0 11.5-22 22-22 22z" fill="#3B82F6" />
//     </svg>
// );
// const SportIcon = () => (
//     <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
//         <rect width="64" height="64" rx="16" fill="#FFF3E0" />
//         <circle cx="32" cy="32" r="14" stroke="#F97316" strokeWidth="3" fill="none" />
//         <path d="M20 22 Q32 32 44 22M20 42 Q32 32 44 42" stroke="#F97316" strokeWidth="2.5" fill="none" />
//     </svg>
// );
// const BusinessIcon = () => (
//     <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
//         <rect width="64" height="64" rx="16" fill="#F0FDF4" />
//         <rect x="18" y="28" width="8" height="18" rx="2" fill="#22C55E" />
//         <rect x="28" y="20" width="8" height="26" rx="2" fill="#22C55E" />
//         <rect x="38" y="24" width="8" height="22" rx="2" fill="#22C55E" />
//     </svg>
// );
// const AgricultureIcon = () => (
//     <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
//         <rect width="64" height="64" rx="16" fill="#F5F3FF" />
//         <path d="M32 46 C32 46 20 36 22 24 C26 16 38 16 42 24 C44 36 32 46 32 46Z" fill="#8B5CF6" />
//         <line x1="32" y1="46" x2="32" y2="34" stroke="#8B5CF6" strokeWidth="2" />
//     </svg>
// );

// const socials = [
//     {
//         label: "LinkedIn",
//         href: "https://www.linkedin.com/company/innotical/",
//         icon: (
//             <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
//                 <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
//                 <circle cx="4" cy="4" r="2" />
//             </svg>
//         ),
//     },
//     {
//         label: "Twitter",
//         href: "https://twitter.com/Innotical",
//         icon: (
//             <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
//                 <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
//             </svg>
//         ),
//     },
//     {
//         label: "Email",
//         href: "mailto:info@innotical.com",
//         icon: (
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
//                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
//                 <polyline points="22,6 12,13 2,6" />
//             </svg>
//         ),
//     },
// ];

// const stats = [
//     { value: "450", label: "Happy Clients" },
//     { value: "95k", label: "Hours Worked" },
//     { value: "400", label: "Projects Done" },
// ];

// const industries = [
//     { icon: <HeartIcon />, label: "Health" },
//     { icon: <SportIcon />, label: "Sport Tech" },
//     { icon: <BusinessIcon />, label: "Business Solution" },
//     { icon: <AgricultureIcon />, label: "Agriculture" },
// ];

// const founderName = "Atul Singh";
// const role = "Founder & CEO";
// const company = "Deific Digital";
// const quote =
//     "We don't just build apps — we craft experiences that solve real problems for real people.";
// const bio1 =
//     "Atul Singh is the visionary Founder and CEO of Deific Digital. With a strong passion for technology and innovation, he founded the company with the goal of helping businesses thrive in an increasingly digital world. His expertise in web development, digital solutions, and business strategy has enabled Deific Digital to deliver impactful results for clients across various industries.";
// const bio2 =
//     "Committed to innovation and excellence, Atul leads a team focused on creating reliable and user-centric digital solutions. His mission is to help businesses overcome challenges through technology and achieve sustainable growth.";

// const teamMembers = [
//     {
//         name: "Shobhit Shukla",
//         role: "Managing Director",
//         photo: shobhit,
//     },
//     {
//         name: "Mohit Singh",
//         role: "Sales Manager",
//         photo: mohit,
//     },
//     {
//         name: "Hridyansh Shukla",
//         role: "AI Expert",
//         photo: hridyansh,
//     },
//     {
//         name: "Shoaib",
//         role: "Digital Marketing Expert",
//         photo: shoaib,
//     },
//     {
//         name: "Mohsin",
//         role: "Software Developer",
//         photo: mohsin,
//     },
// ];

// // ─── BREADCRUMB ─────────────────────────────────────────────────────────────
// function Breadcrumb() {
//     return (
//         <section
//             className="relative h-[280px] flex items-center justify-center"
//             style={{
//                 backgroundImage: `url(${cover})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//         >
//             <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
//             <div className="relative z-10 px-6 text-center">
//                 <span className="inline-block bg-red-600/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-4">
//                     About Us
//                 </span>
//                 <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
//                     Who We Are
//                 </h1>
//                 <p className="max-w-xl mx-auto mt-3 text-lg text-white/80">
//                     Discover the story, vision, and people behind Deific Digital.
//                 </p>
//             </div>
//         </section>
//     );
// }

// // ─── HERO (ABOUT INTRO) ────────────────────────────────────────────────────
// function HeroSection() {
//     return (
//         <section className="relative px-6 py-20 overflow-hidden bg-white md:px-12">
//             <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-96 h-96 bg-red-50/40 blur-3xl" />
//             <div className="relative z-10 grid items-center mx-auto max-w-7xl md:grid-cols-2 gap-14">
//                 <div>
//                     <span className="block mb-3 text-sm font-semibold tracking-widest text-red-600 uppercase">
//                         About Us
//                     </span>
//                     <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.15] font-display">
//                         About <span className="text-red-600">Deific</span> Digital
//                     </h2>
//                     <p className="mb-10 text-lg leading-relaxed text-gray-600">
//                         Deific Digital is more than a career or a stepping stone: We are a
//                         forward-thinking technology company dedicated to transforming ideas
//                         into impactful digital solutions. By combining creativity,
//                         innovation, and technical expertise, we deliver high-quality web
//                         applications, mobile apps, and business solutions tailored to meet
//                         the evolving needs of modern organizations.
//                     </p>
//                     <div className="grid grid-cols-3 gap-6">
//                         {stats.map((s) => (
//                             <div key={s.label} className="text-center border-r border-gray-200 last:border-r-0">
//                                 <p className="text-2xl font-extrabold text-red-600 sm:text-4xl">{s.value}</p>
//                                 <p className="mt-1 text-sm text-gray-500">{s.label}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="relative flex justify-center">
//                     <div className="w-full max-w-md overflow-hidden shadow-2xl aspect-square rounded-2xl ring-1 ring-gray-200">
//                         <img
//                             src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fm=webp"
//                             alt="Team"
//                             className="object-cover w-full h-full"
//                         />
//                     </div>
//                     <div className="absolute w-32 h-32 bg-red-100 rounded-full opacity-50 -bottom-6 -left-6 -z-10" />
//                     <div className="absolute w-24 h-24 bg-blue-100 rounded-full opacity-50 -top-6 -right-6 -z-10" />
//                 </div>
//             </div>
//         </section>
//     );
// }

// // ─── FOUNDER SECTION ──────────────────────────────────────────────────────
// function FounderAvatar() {
//     return (
//         <div className="relative w-full max-w-sm mx-auto">
//             <div className="absolute -inset-4 bg-gradient-to-tr from-red-500 via-orange-400 to-yellow-300 rounded-2xl blur-2xl opacity-30" />
//             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white">
//                 <img
//                     src={atul}
//                     alt="Atul Singh"
//                     className="object-cover w-full h-full"
//                     style={{ objectPosition: "center 20%" }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//             </div>
//             <div className="absolute px-6 py-2 -translate-x-1/2 bg-white border border-gray-100 rounded-full shadow-lg -bottom-3 left-1/2">
//                 <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Founder</span>
//             </div>
//         </div>
//     );
// }

// function AboutDetailSection() {
//     return (
//         <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white md:px-12 lg:px-20">
//             <div className="max-w-6xl mx-auto">
//                 <div className="mb-16 text-center">
//                     <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
//                         Meet the Founder
//                     </span>
//                     <h2 className="text-4xl font-bold text-gray-900 md:text-5xl font-display">
//                         The Person Behind the Vision
//                     </h2>
//                     <div className="w-24 h-1 mx-auto mt-4 bg-red-600 rounded-full" />
//                 </div>

//                 <div className="grid items-start gap-16 md:grid-cols-2">
//                     {/* Left - Avatar */}
//                     <div className="flex flex-col items-center">
//                         <FounderAvatar />
//                         <div className="mt-6 text-center">
//                             <h3 className="text-2xl font-bold text-gray-900">{founderName}</h3>
//                             <p className="font-medium text-red-600">{role}</p>
//                             <p className="mt-1 text-sm text-gray-500">{company}</p>
//                             <div className="flex justify-center gap-3 mt-4">
//                                 {socials.map((s) => (
//                                     <a
//                                         key={s.label}
//                                         href={s.href}
//                                         aria-label={s.label}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all duration-300 border border-gray-200 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600"
//                                     >
//                                         {s.icon}
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right - Bio */}
//                     <div className="flex flex-col gap-6">
//                         <blockquote className="pl-6 text-2xl font-semibold leading-snug text-gray-800 border-l-4 border-red-600 md:text-3xl font-display">
//                             “{quote}”
//                         </blockquote>
//                         <p className="text-base leading-relaxed text-gray-600">{bio1}</p>
//                         <p className="text-base leading-relaxed text-gray-600">{bio2}</p>
//                         <div className="grid grid-cols-3 gap-2 mt-4 sm:gap-4">
//                             <div className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
//                                 <Users className="w-6 h-6 mx-auto mb-2 text-red-600" />
//                                 <p className="text-sm font-bold text-gray-900">50+</p>
//                                 <p className="text-xs text-gray-500">Team</p>
//                             </div>
//                             <div className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
//                                 <Award className="w-6 h-6 mx-auto mb-2 text-red-600" />
//                                 <p className="text-sm font-bold text-gray-900">12+</p>
//                                 <p className="text-xs text-gray-500">Awards</p>
//                             </div>
//                             <div className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
//                                 <Globe className="w-6 h-6 mx-auto mb-2 text-red-600" />
//                                 <p className="text-sm font-bold text-gray-900">20+</p>
//                                 <p className="text-xs text-gray-500">Countries</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// // ─── VISION SECTION ──────────────────────────────────────────────────────
// function VisionSection() {
//     return (
//         <section className="relative px-6 py-24 overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white">
//             <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-red-100/30 blur-3xl" />
//                 <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-blue-100/20 blur-3xl" />
//             </div>
//             <div className="relative z-10 max-w-4xl mx-auto text-center">
//                 <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
//                     Our Vision
//                 </span>
//                 <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-display leading-[1.1] mb-6">
//                     Our <span className="text-red-600">Vision</span>
//                 </h2>
//                 <div className="w-20 h-1 mx-auto mb-8 bg-red-600 rounded-full" />
//                 <div className="relative">
//                     <Quote className="absolute w-12 h-12 text-red-200 opacity-50 -top-4 -left-6" />
//                     <p className="max-w-2xl mx-auto text-2xl italic font-semibold leading-relaxed text-gray-700 md:text-3xl font-display">
//                         To be the leading technology partner in the region for fostering
//                         sports collaboration and facilitating the growth of the sports
//                         ecosystem.
//                     </p>
//                 </div>
//             </div>
//         </section>
//     );
// }

// // ─── MISSIONS SECTION ────────────────────────────────────────────────────
// function MissionsSection() {
//     return (
//         <section className="px-6 py-24 bg-white">
//             <div className="max-w-5xl mx-auto text-center">
//                 <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
//                     Our Missions
//                 </span>
//                 <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-display leading-[1.1] mb-4">
//                     Our <span className="text-red-600">Missions</span>
//                 </h2>
//                 <div className="w-20 h-1 mx-auto mb-6 bg-red-600 rounded-full" />
//                 <p className="max-w-2xl mx-auto mb-16 text-lg text-gray-500">
//                     We aspire to be the biggest supporters of sports! With our sports
//                     technology and a strong can-do sporting spirit, here are three things
//                     to which we are wholeheartedly committed:
//                 </p>

//                 <div className="grid gap-8 md:grid-cols-3">
//                     {/* Mission 1 */}
//                     <div className="p-8 transition-all border border-gray-100 shadow-lg bg-gradient-to-b from-white to-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-1">
//                         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
//                             <Briefcase className="w-8 h-8 text-red-600" />
//                         </div>
//                         <h3 className="mb-3 text-xl font-bold text-gray-900">Play More</h3>
//                         <p className="leading-relaxed text-gray-600">
//                             Getting people to <strong>play more sports</strong> by creating
//                             accessible and engaging digital experiences.
//                         </p>
//                     </div>

//                     {/* Mission 2 */}
//                     <div className="p-8 text-white transition-all shadow-xl bg-gradient-to-b from-red-600 to-red-700 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
//                         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-white/20">
//                             <Users className="w-8 h-8 text-white" />
//                         </div>
//                         <h3 className="mb-3 text-xl font-bold">Connect Communities</h3>
//                         <p className="leading-relaxed text-white/90">
//                             Connecting <strong>more players, businesses and communities</strong>{" "}
//                             with our technology to build a thriving ecosystem.
//                         </p>
//                     </div>

//                     {/* Mission 3 */}
//                     <div className="p-8 transition-all border border-gray-100 shadow-lg bg-gradient-to-b from-white to-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-1">
//                         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
//                             <Award className="w-8 h-8 text-red-600" />
//                         </div>
//                         <h3 className="mb-3 text-xl font-bold text-gray-900">Grow Ecosystem</h3>
//                         <p className="leading-relaxed text-gray-600">
//                             For the growth of the <strong>sports ecosystem</strong> by
//                             fostering innovation and collaboration at every level.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// // ─── TEAM — SINGLE ROW HORIZONTAL ────────────────────────────────────────
// function TeamGrid() {
//     const scrollRef = useRef<HTMLDivElement>(null);

//     const scroll = (direction: any) => {
//         if (scrollRef.current) {
//             const { current } = scrollRef;
//             const scrollAmount = direction === "left" ? -300 : 300;
//             current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//         }
//     };

//     return (
//         <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
//             <div className="mx-auto max-w-7xl">
//                 {/* Header */}
//                 <div className="text-center mb-14">
//                     <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
//                         Our Team
//                     </span>
//                     <h2 className="text-4xl font-bold text-gray-900 md:text-5xl font-display">
//                         Meet Our <span className="text-red-600">Team</span>
//                     </h2>
//                     <div className="w-20 h-1 mx-auto mt-4 bg-red-600 rounded-full" />
//                     <p className="max-w-2xl mx-auto mt-4 text-gray-500">
//                         A dedicated group of professionals passionate about delivering
//                         excellence in every project.
//                     </p>
//                 </div>

//                 {/* Horizontal scroll wrapper */}
//                 <div className="relative">
//                     {/* Left fade + arrow (desktop) */}
//                     <div className="absolute left-0 z-10 hidden -translate-y-1/2 pointer-events-none lg:block top-1/2">
//                         <div className="w-24 h-full pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
//                         <button
//                             onClick={() => scroll("left")}
//                             className="absolute flex items-center justify-center w-10 h-10 text-gray-700 transition-all duration-300 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-lg pointer-events-auto left-2 top-1/2 hover:bg-red-600 hover:text-white hover:border-red-600"
//                             aria-label="Scroll left"
//                         >
//                             <ChevronLeft className="w-5 h-5" />
//                         </button>
//                     </div>

//                     {/* Right fade + arrow (desktop) */}
//                     <div className="absolute right-0 z-10 hidden -translate-y-1/2 pointer-events-none lg:block top-1/2">
//                         <div className="w-24 h-full pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
//                         <button
//                             onClick={() => scroll("right")}
//                             className="absolute flex items-center justify-center w-10 h-10 text-gray-700 transition-all duration-300 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-lg pointer-events-auto right-2 top-1/2 hover:bg-red-600 hover:text-white hover:border-red-600"
//                             aria-label="Scroll right"
//                         >
//                             <ChevronRight className="w-5 h-5" />
//                         </button>
//                     </div>

//                     {/* Scrollable container — single row */}
//                     <div
//                         ref={scrollRef}
//                         className="flex gap-6 px-2 pt-2 pb-6 overflow-x-auto flex-nowrap scroll-smooth"
//                         style={{
//                             scrollbarWidth: "thin",
//                             scrollbarColor: "#B91C1C #f1f1f1",
//                             WebkitOverflowScrolling: "touch",
//                         }}
//                     >
//                         {teamMembers.map((member, index) => (
//                             <div
//                                 key={member.name}
//                                 className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[220px] xl:w-[240px] group"
//                             >
//                                 <div className="flex flex-col items-center gap-3 p-4 text-center transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 hover:border-red-200">
//                                     {/* Avatar */}
//                                     <div className="relative">
//                                         <div className="overflow-hidden transition-all duration-300 rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 ring-4 ring-red-100 group-hover:ring-red-500 ring-offset-2">
//                                             <img
//                                                 src={member.photo}
//                                                 alt={member.name}
//                                                 className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
//                                             />
//                                         </div>
//                                         {/* Decorative ring pulse */}
//                                         <div className="absolute inset-0 transition-all duration-700 scale-110 rounded-full ring-2 ring-red-500/0 group-hover:ring-red-500/30 -z-10 group-hover:scale-125" />
//                                     </div>

//                                     {/* Name & Role */}
//                                     <div>
//                                         <p className="text-sm font-bold text-gray-900 sm:text-base">
//                                             {member.name}
//                                         </p>
//                                         <p className="text-xs text-gray-400 mt-0.5 leading-snug font-medium">
//                                             {member.role}
//                                         </p>
//                                     </div>

//                                     {/* Subtle divider */}
//                                     <div className="w-8 h-0.5 bg-red-100 group-hover:bg-red-500 transition-all duration-300 rounded-full" />

//                                     {/* Hover badge */}
//                                     <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
//                                         <span className="text-[10px] font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
//                                             Meet {member.name.split(" ")[0]}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Mobile scroll hint */}
//                     <div className="flex items-center justify-center gap-2 mt-4 text-xs text-center text-gray-400 lg:hidden">
//                         <ChevronLeft className="w-3 h-3" />
//                         <span>Scroll to see all team members</span>
//                         <ChevronRight className="w-3 h-3" />
//                     </div>
//                 </div>
//             </div>

//             {/* Custom scrollbar styles */}
//             <style dangerouslySetInnerHTML={{ __html: `
//                 .flex-nowrap::-webkit-scrollbar {
//                 height: 6px;
//                 }
//                 .flex-nowrap::-webkit-scrollbar-track {
//                 background: #f1f1f1;
//                 border-radius: 9999px;
//                 }
//                 .flex-nowrap::-webkit-scrollbar-thumb {
//                 background: #B91C1C;
//                 border-radius: 9999px;
//                 }
//                 .flex-nowrap::-webkit-scrollbar-thumb:hover {
//                 background: #991b1b;
//                 }
//             ` }} />
//         </section>
//     );
// }

// // ─── MAIN ABOUT PAGE ────────────────────────────────────────────────────
// export default function AboutPage() {
//     return (

//     <>
//       <Helmet>
//         <title>About Us | Deific Digital</title>
//         <link rel="canonical" href="https://deificdigital.com/about" />
//       </Helmet>



//         <div className="min-h-screen bg-white">
//             <Breadcrumb />
//             <HeroSection />
//             <AboutDetailSection />
//             <VisionSection />
//             <MissionsSection />
//             <TeamGrid />
//             <CTABanner />

//             {/* Font styles and animations */}
//             <style dangerouslySetInnerHTML={{ __html: `
//                 @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

//                 .font-display {
//                 font-family: 'Playfair Display', serif;
//                 }
//                 body {
//                 font-family: 'Inter', sans-serif;
//                 }
//                 html {
//                 scroll-behavior: smooth;
//                 }
//                 @keyframes float {
//                 0%, 100% { transform: translateY(0px); }
//                 50% { transform: translateY(-10px); }
//                 }
//                 .animate-float {
//                 animation: float 4s ease-in-out infinite;
//                 }
//             ` }} />
//         </div>

//     </>
//     );
// }
import { CTABanner } from "@/components/site/CTABanner";
import { Helmet } from 'react-helmet-async';
import atul from "../assets/team-5.webp";
import mohit from "../assets/team-mohit.webp";
import cover from "../assets/cover-image.webp";
import ayush from "../assets/ayush.webp";
import brij from "../assets/brij.webp";
import srtanshu from "../assets/srtanshu.webp"
import mohshin from "../assets/mohshin.webp"
import satvik from "../assets/satvik.webp"
import bhumi from "../assets/bhumi.webp"
import riddhi from "../assets/riddhi.webp"
import { useState, useEffect, useRef } from "react";
import { Sparkles, Quote, Users, Award, Globe, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

// ── Icons (inline SVG) ──────────────────────────────────────────────────────
const HeartIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#EEF6FF" />
        <path d="M32 46s-18-10.5-18-22a10 10 0 0120 0 10 10 0 0120 0c0 11.5-22 22-22 22z" fill="#3B82F6" />
    </svg>
);
const SportIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#FFF3E0" />
        <circle cx="32" cy="32" r="14" stroke="#F97316" strokeWidth="3" fill="none" />
        <path d="M20 22 Q32 32 44 22M20 42 Q32 32 44 42" stroke="#F97316" strokeWidth="2.5" fill="none" />
    </svg>
);
const BusinessIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#F0FDF4" />
        <rect x="18" y="28" width="8" height="18" rx="2" fill="#22C55E" />
        <rect x="28" y="20" width="8" height="26" rx="2" fill="#22C55E" />
        <rect x="38" y="24" width="8" height="22" rx="2" fill="#22C55E" />
    </svg>
);
const AgricultureIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#F5F3FF" />
        <path d="M32 46 C32 46 20 36 22 24 C26 16 38 16 42 24 C44 36 32 46 32 46Z" fill="#8B5CF6" />
        <line x1="32" y1="46" x2="32" y2="34" stroke="#8B5CF6" strokeWidth="2" />
    </svg>
);

const socials = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/innotical/",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: "Twitter",
        href: "https://twitter.com/Innotical",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:info@innotical.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

const stats = [
    { value: "450", label: "Happy Clients" },
    { value: "95k", label: "Hours Worked" },
    { value: "400", label: "Projects Done" },
];

const industries = [
    { icon: <HeartIcon />, label: "Health" },
    { icon: <SportIcon />, label: "Sport Tech" },
    { icon: <BusinessIcon />, label: "Business Solution" },
    { icon: <AgricultureIcon />, label: "Agriculture" },
];

const founderName = "Atul Singh";
const role = "Founder & CEO";
const company = "Deific Digital";
const quote =
    "We don't just build apps — we craft experiences that solve real problems for real people.";
const bio1 =
    "Atul Singh is the visionary Founder and CEO of Deific Digital. With a strong passion for technology and innovation, he founded the company with the goal of helping businesses thrive in an increasingly digital world. His expertise in web development, digital solutions, and business strategy has enabled Deific Digital to deliver impactful results for clients across various industries.";
const bio2 =
    "Committed to innovation and excellence, Atul leads a team focused on creating reliable and user-centric digital solutions. His mission is to help businesses overcome challenges through technology and achieve sustainable growth.";

const teamMembers = [
    
    {
        name: "Mohit Singh",
        role: "Senior Manager",
        photo: mohit,
    },
    {
        name: "Mohsin",
        role: "Software Developer",
        photo:mohshin,
        
    },
    {
        name:"Satvik Bajpai",
        role:"Software Developer",
        photo:satvik,
    },
    {
        name:"Ayush Bhadauriya",
        role:"Software Developer",
        photo:ayush,
    },
    {
        name:"Sratanshu Shukla",
        role:"Software Developer",
        photo:srtanshu,
    },
    {
        name:"Brij Mohan Shukla",
        role:"Sales Manager",
        photo:brij,
    },
    {
        name:"Bhumi Karan",
        role:"Graphic Designer",
        photo:bhumi,
    },
    {
        name:"Riddhi Chadhaury",
        role:"Sales Executive",
        photo:riddhi,
    }
];

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
            <div className="relative z-10 px-6 text-center">
                <span className="inline-block bg-red-600/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-4">
                    About Us
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-display">
                    Who We Are
                </h1>
                <p className="max-w-xl mx-auto mt-3 text-lg text-white/80">
                    Discover the story, vision, and people behind Deific Digital.
                </p>
            </div>
        </section>
    );
}

// ─── HERO (ABOUT INTRO) ────────────────────────────────────────────────────
function HeroSection() {
    return (
        <section className="relative px-6 py-20 overflow-hidden bg-white md:px-12">
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-96 h-96 bg-red-50/40 blur-3xl" />
            <div className="relative z-10 grid items-center mx-auto max-w-7xl md:grid-cols-2 gap-14">
                <div>
                    <span className="block mb-3 text-sm font-semibold tracking-widest text-red-600 uppercase">
                        About Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.15] font-display">
                        About <span className="text-red-600">Deific</span> Digital
                    </h2>
                    <p className="mb-10 text-lg leading-relaxed text-gray-600">
                        Deific Digital is more than a career or a stepping stone: We are a
                        forward-thinking technology company dedicated to transforming ideas
                        into impactful digital solutions. By combining creativity,
                        innovation, and technical expertise, we deliver high-quality web
                        applications, mobile apps, and business solutions tailored to meet
                        the evolving needs of modern organizations.
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center border-r border-gray-200 last:border-r-0">
                                <p className="text-2xl font-extrabold text-red-600 sm:text-4xl">{s.value}</p>
                                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <div className="w-full max-w-md overflow-hidden shadow-2xl aspect-square rounded-2xl ring-1 ring-gray-200">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fm=webp"
                            alt="Deific Digital team collaborating in the office"
                            loading="lazy"
                            decoding="async"
                            width={800}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="absolute w-32 h-32 bg-red-100 rounded-full opacity-50 -bottom-6 -left-6 -z-10" />
                    <div className="absolute w-24 h-24 bg-blue-100 rounded-full opacity-50 -top-6 -right-6 -z-10" />
                </div>
            </div>
        </section>
    );
}

// ─── FOUNDER SECTION ──────────────────────────────────────────────────────
function FounderAvatar() {
    return (
        <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-500 via-orange-400 to-yellow-300 rounded-2xl blur-2xl opacity-30" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white">
                <img
                    src={atul}
                    alt="Atul Singh, Founder of Deific Digital"
                    width={384}
                    height={480}
                    decoding="async"
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "center 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute px-6 py-2 -translate-x-1/2 bg-white border border-gray-100 rounded-full shadow-lg -bottom-3 left-1/2">
                <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Founder</span>
            </div>
        </div>
    );
}

function AboutDetailSection() {
    return (
        <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Meet the Founder
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900 md:text-5xl font-display">
                        The Person Behind the Vision
                    </h2>
                    <div className="w-24 h-1 mx-auto mt-4 bg-red-600 rounded-full" />
                </div>

                <div className="grid items-start gap-16 md:grid-cols-2">
                    {/* Left - Avatar */}
                    <div className="flex flex-col items-center">
                        <FounderAvatar />
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-bold text-gray-900">{founderName}</h3>
                            <p className="font-medium text-red-600">{role}</p>
                            <p className="mt-1 text-sm text-gray-500">{company}</p>
                            <div className="flex justify-center gap-3 mt-4">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all duration-300 border border-gray-200 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Bio */}
                    <div className="flex flex-col gap-6">
                        <blockquote className="pl-6 text-2xl font-semibold leading-snug text-gray-800 border-l-4 border-red-600 md:text-3xl font-display">
                            “{quote}”
                        </blockquote>
                        <p className="text-base leading-relaxed text-gray-600">{bio1}</p>
                        <p className="text-base leading-relaxed text-gray-600">{bio2}</p>
                        <div className="grid grid-cols-3 gap-2 mt-4 sm:gap-4">
                            <div className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
                                <Users className="w-6 h-6 mx-auto mb-2 text-red-600" />
                                <p className="text-sm font-bold text-gray-900">50+</p>
                                <p className="text-xs text-gray-500">Team</p>
                            </div>
                            <div className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
                                <Award className="w-6 h-6 mx-auto mb-2 text-red-600" />
                                <p className="text-sm font-bold text-gray-900">12+</p>
                                <p className="text-xs text-gray-500">Awards</p>
                            </div>
                            <div className="p-4 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
                                <Globe className="w-6 h-6 mx-auto mb-2 text-red-600" />
                                <p className="text-sm font-bold text-gray-900">20+</p>
                                <p className="text-xs text-gray-500">Countries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── VISION SECTION ──────────────────────────────────────────────────────
function VisionSection() {
    return (
        <section className="relative px-6 py-24 overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-red-100/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-blue-100/20 blur-3xl" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                    Our Vision
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-display leading-[1.1] mb-6">
                    Our <span className="text-red-600">Vision</span>
                </h2>
                <div className="w-20 h-1 mx-auto mb-8 bg-red-600 rounded-full" />
                <div className="relative">
                    <Quote className="absolute w-12 h-12 text-red-200 opacity-50 -top-4 -left-6" />
                    <p className="max-w-2xl mx-auto text-2xl italic font-semibold leading-relaxed text-gray-700 md:text-3xl font-display">
                        To be the leading technology partner in the region for fostering
                        sports collaboration and facilitating the growth of the sports
                        ecosystem.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ─── MISSIONS SECTION ────────────────────────────────────────────────────
function MissionsSection() {
    return (
        <section className="px-6 py-24 bg-white">
            <div className="max-w-5xl mx-auto text-center">
                <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                    Our Missions
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-display leading-[1.1] mb-4">
                    Our <span className="text-red-600">Missions</span>
                </h2>
                <div className="w-20 h-1 mx-auto mb-6 bg-red-600 rounded-full" />
                <p className="max-w-2xl mx-auto mb-16 text-lg text-gray-500">
                    We aspire to be the biggest supporters of sports! With our sports
                    technology and a strong can-do sporting spirit, here are three things
                    to which we are wholeheartedly committed:
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Mission 1 */}
                    <div className="p-8 transition-all border border-gray-100 shadow-lg bg-gradient-to-b from-white to-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
                            <Briefcase className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">Play More</h3>
                        <p className="leading-relaxed text-gray-600">
                            Getting people to <strong>play more sports</strong> by creating
                            accessible and engaging digital experiences.
                        </p>
                    </div>

                    {/* Mission 2 */}
                    <div className="p-8 text-white transition-all shadow-xl bg-gradient-to-b from-red-600 to-red-700 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-white/20">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold">Connect Communities</h3>
                        <p className="leading-relaxed text-white/90">
                            Connecting <strong>more players, businesses and communities</strong>{" "}
                            with our technology to build a thriving ecosystem.
                        </p>
                    </div>

                    {/* Mission 3 */}
                    <div className="p-8 transition-all border border-gray-100 shadow-lg bg-gradient-to-b from-white to-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-1">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
                            <Award className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">Grow Ecosystem</h3>
                        <p className="leading-relaxed text-gray-600">
                            For the growth of the <strong>sports ecosystem</strong> by
                            fostering innovation and collaboration at every level.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── TEAM — SINGLE ROW HORIZONTAL ────────────────────────────────────────
function TeamGrid() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: any) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === "left" ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Our Team
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900 md:text-5xl font-display">
                        Meet Our <span className="text-red-600">Team</span>
                    </h2>
                    <div className="w-20 h-1 mx-auto mt-4 bg-red-600 rounded-full" />
                    <p className="max-w-2xl mx-auto mt-4 text-gray-500">
                        A dedicated group of professionals passionate about delivering
                        excellence in every project.
                    </p>
                </div>

                {/* Horizontal scroll wrapper */}
                <div className="relative">
                    {/* Left fade + arrow (desktop) */}
                    <div className="absolute left-0 z-10 hidden -translate-y-1/2 pointer-events-none lg:block top-1/2">
                        <div className="w-24 h-full pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
                        <button
                            onClick={() => scroll("left")}
                            className="absolute flex items-center justify-center w-10 h-10 text-gray-700 transition-all duration-300 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-lg pointer-events-auto left-2 top-1/2 hover:bg-red-600 hover:text-white hover:border-red-600"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Right fade + arrow (desktop) */}
                    <div className="absolute right-0 z-10 hidden -translate-y-1/2 pointer-events-none lg:block top-1/2">
                        <div className="w-24 h-full pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
                        <button
                            onClick={() => scroll("right")}
                            className="absolute flex items-center justify-center w-10 h-10 text-gray-700 transition-all duration-300 -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-lg pointer-events-auto right-2 top-1/2 hover:bg-red-600 hover:text-white hover:border-red-600"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Scrollable container — single row */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 px-2 pt-2 pb-6 overflow-x-auto flex-nowrap scroll-smooth"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#B91C1C #f1f1f1",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.name}
                                className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[220px] xl:w-[240px] group"
                            >
                                <div className="flex flex-col items-center gap-3 p-4 text-center transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-2 hover:border-red-200">
                                    {/* Avatar */}
                                    <div className="relative">
                                        <div className="overflow-hidden transition-all duration-300 rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 ring-4 ring-red-100 group-hover:ring-red-500 ring-offset-2">
                                            <img
                                                src={member.photo}
                                                alt={`${member.name}, Deific Digital team member`}
                                                loading="lazy"
                                                decoding="async"
                                                width={144}
                                                height={144}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        {/* Decorative ring pulse */}
                                        <div className="absolute inset-0 transition-all duration-700 scale-110 rounded-full ring-2 ring-red-500/0 group-hover:ring-red-500/30 -z-10 group-hover:scale-125" />
                                    </div>

                                    {/* Name & Role */}
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 sm:text-base">
                                            {member.name}
                                        </p>
                                        <p className="text-xs text-red-400 mt-0.5 leading-snug font-medium">
                                            {member.role}
                                        </p>
                                    </div>

                                    {/* Subtle divider */}
                                    <div className="w-8 h-0.5 bg-red-100 group-hover:bg-red-500 transition-all duration-300 rounded-full" />

                                    {/* Hover badge */}
                                    <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                        <span className="text-[10px] font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                            Meet {member.name.split(" ")[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile scroll hint */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-center text-gray-400 lg:hidden">
                        <ChevronLeft className="w-3 h-3" />
                        <span>Scroll to see all team members</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style>{`
                .flex-nowrap::-webkit-scrollbar {
                height: 6px;
                }
                .flex-nowrap::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 9999px;
                }
                .flex-nowrap::-webkit-scrollbar-thumb {
                background: #B91C1C;
                border-radius: 9999px;
                }
                .flex-nowrap::-webkit-scrollbar-thumb:hover {
                background: #991b1b;
                }
            `}</style>
        </section>
    );
}

// ─── MAIN ABOUT PAGE ────────────────────────────────────────────────────
export default function AboutPage() {
    return (

    <>
      <Helmet>
        <title>About Us | Deific Digital</title>
        <link rel="canonical" href="https://deificdigital.com/about" />
      </Helmet>



        <div className="min-h-screen bg-white">
            <Breadcrumb />
            <HeroSection />
            <AboutDetailSection />
            <VisionSection />
            <MissionsSection />
            <TeamGrid />
            <CTABanner />

            {/* Font styles and animations */}
            <style>{`
                html {
                scroll-behavior: smooth;
                }
                @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                }
                .animate-float {
                animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>

    </>
    );
}