"use client";

import { SectionContent } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Sparkles } from "lucide-react"; // Added for the badge icon

interface SectionProps {
  data?: SectionContent;
  isLoading: boolean;
}

export default function About({ data, isLoading }: SectionProps) {
  if (isLoading) {
    return (
      <section className="bg-white py-20" id="about">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </section>
    );
  }

  // Process title to highlight "Solace" as seen in the design
  const rawTitle = data?.title || "What is Solace?";
  const titleParts = rawTitle.split(/(Solace)/g);

  const bodyText =
    data?.bodyText ||
    "Solace is the bridge between creativity and opportunity. It empowers clients to hire with confidence and creatives to grow with clarity.";
  const imageUrl = data?.image?.url || "/office-collaboration.png";
  const paragraphs = bodyText.split(/\n+/).filter(Boolean);

  return (
    <section className="bg-white py-16 lg:py-28 overflow-hidden" id="about">
      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Content: Text Section */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-[#102a56] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#3b82f6]" />
            About US
          </div>

          {/* Dynamic Heading */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#102a56]">
            {titleParts.map((part, i) =>
              part === "Solace" ? (
                <span key={i} className="text-[#3b82f6]">
                  Solace
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
            ?
          </h2>

          {/* Paragraphs */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-[#475569] leading-relaxed text-base lg:text-lg ${
                  idx === 0 ? "font-medium" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Content: Image Section */}
        <div className="relative group mt-8 lg:mt-0">
          {/* Shadow Decorator for depth */}
          <div className="absolute -inset-4 bg-slate-100/50 rounded-[2.5rem] -z-10 scale-95 transition-transform group-hover:scale-100" />

          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[540px] w-full rounded-3xl overflow-hidden shadow-xl border-8 border-white">
            <Image
              src={imageUrl}
              alt="Solace Team Collaboration"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
