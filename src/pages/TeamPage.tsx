import { Seo, breadcrumbLd } from "@/components/site/Seo";
import { CTABanner } from "@/components/site/CTABanner";
import { Linkedin, Twitter } from "lucide-react";
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


const founderName = "Atul Singh";
const role = "Founder & CEO";
const company = "Deific Digital";
const quote =
    "We don't just build apps — we craft experiences that solve real problems for real people.";
const bio1 =
    "Atul Singh is the visionary Founder and CEO of Deific Digital. With a strong passion for technology and innovation, he founded the company with the goal of helping businesses thrive in an increasingly digital world. His expertise in web development, digital solutions, and business strategy has enabled Deific Digital to deliver impactful results for clients across various industries.";
const bio2 =
    "Committed to innovation and excellence, Atul leads a team focused on creating reliable and user-centric digital solutions. His mission is to help businesses overcome challenges through technology and achieve sustainable growth.";

const team = [
    
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


export default function TeamPage() {
  return (
    <div>
      <Seo
        title="Our Team | Software Engineers & AI Experts | Deific Digital"
        description="Meet the founders, engineers and AI specialists behind Deific Digital, an ISO-certified software company in Kanpur and Noida, India."
        path="/team"
        jsonLd={breadcrumbLd([["Home", "/"], ["Team", "/team"]])}
      />
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden text-center bg-gradient-to-br from-white via-gray-50 to-red-50/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 rounded-full opacity-50 w-72 h-72 bg-red-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="relative max-w-3xl px-4 mx-auto">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest text-red-700 uppercase border border-red-200 rounded-full bg-red-50">
            Our Team
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Meet The <span className="text-red-600">Experts</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            30+ passionate professionals dedicated to building exceptional digital products.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-2"
            >
              {/* Photo */}
              <div className="relative overflow-hidden h-72">
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role} at Deific Digital`}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={288}
                  className="object-contain object-top w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
                {/* Social icons on hover */}
                <div className="absolute left-0 right-0 flex justify-center gap-3 transition-all duration-300 translate-y-4 opacity-0 bottom-4 group-hover:translate-y-0 group-hover:opacity-100">
                  {[Linkedin, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-center justify-center text-gray-800 transition-colors bg-white rounded-full shadow-md h-9 w-9 hover:bg-red-600 hover:text-white"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-red-700 rounded-full bg-red-50">
                  {m.dept}
                </span>
                <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-red-600">
                  {m.name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{m.role}</p>
              </div>

              {/* Red accent bottom bar */}
              <div className="h-0.5 bg-gradient-to-r from-red-600 to-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}