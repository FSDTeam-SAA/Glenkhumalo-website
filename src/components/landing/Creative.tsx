"use client";

import { SectionContent } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SectionProps {
  data?: SectionContent;
  isLoading: boolean;
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2000&auto=format&fit=crop",
];

export default function Creative({ data, isLoading }: SectionProps) {
  if (isLoading)
    return (
      <div className="py-24">
        <Skeleton className="h-96 w-full container" />
      </div>
    );

  const title = data?.title || "Find Work That Matches Your Skills";
  const bodyText =
    data?.bodyText ||
    "This app helps creatives connect with clients who are looking for specific skills. Create a profile, show your work, and receive project requests directly from clients. No bidding, no chasing just clear projects and real opportunities designed for creatives.";

  const collageImages = (
    data?.images?.map((img) => img.url).filter(Boolean) || []
  ).slice(0, 3);
  while (collageImages.length < 3) {
    collageImages.push(
      fallbackImages[collageImages.length % fallbackImages.length],
    );
  }

  const titleParts = title.split(/(Your Skills)/g);

  return (
    <section
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      id="creative"
    >
      {/* Background Gradient Element - Fixed and optimized */}
      <div
        className="-z-20 h-[40%] absolute top-[30%] left-0 w-full pointer-events-none transition-opacity duration-700"
        style={{
          background: "linear-gradient(90deg, #F0F9FF 0%, #FFFFFF 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Top Right Badge - Responsive spacing */}
        <div className="flex justify-end mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-5 py-2 text-sm font-semibold text-[#102a56] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#3b82f6]" />
            Creative
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* IMAGE COLLAGE: Mobile (390px) up to 2xl scaling */}
          <div className="relative h-[400px] w-full max-w-[340px] md:h-[500px] md:max-w-[450px] lg:h-[550px] lg:max-w-none xl:h-[650px] 2xl:h-[750px] mx-auto lg:mx-0">
            {/* 1. Top Left - Photographer */}
            <div className="absolute top-0 left-0 w-[48%] aspect-square rounded-[2rem] xl:rounded-[3rem] overflow-hidden z-10 shadow-xl transition-transform hover:scale-105 duration-500">
              <Image
                src={collageImages[0]}
                alt="Creative Talent 1"
                fill
                className="object-cover"
              />
            </div>

            {/* 2. Middle Right - Ballerina (Main Focus with Border Highlight) */}
            <div className="absolute top-[18%] left-[32%] w-[55%] aspect-square rounded-[2rem] xl:rounded-[3rem] overflow-hidden z-30 shadow-2xl border-[5px] md:border-[10px] border-white/90 transition-transform hover:scale-105 duration-500">
              <Image
                src={collageImages[1]}
                alt="Creative Talent 2"
                fill
                className="object-cover"
              />
            </div>

            {/* 3. Bottom Left - Guitarist */}
            <div className="absolute bottom-0 left-[8%] w-[45%] aspect-square rounded-[2rem] xl:rounded-[3rem] overflow-hidden z-20 shadow-xl transition-transform hover:scale-105 duration-500">
              <Image
                src={collageImages[2]}
                alt="Creative Talent 3"
                fill
                className="object-cover"
              />
            </div>

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-100/40 rounded-full blur-[80px] xl:blur-[120px] -z-10" />
          </div>

          {/* RIGHT CONTENT: Styled Text and Button */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-right flex flex-col items-center lg:items-end">
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-[#102a56] leading-[1.1] max-w-xl">
              {titleParts.map((part, i) =>
                part === "Your Skills" ? (
                  <span key={i} className="text-[#3b82f6] block md:inline">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </h2>

            <p className="text-[#475569] text-sm md:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-lg lg:text-right">
              {bodyText}
            </p>

            <Button className="rounded-full bg-[#002a75] hover:bg-[#102a56] text-white px-10 h-14 text-base font-bold shadow-lg transition-all active:scale-95">
              Join As Creative
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
