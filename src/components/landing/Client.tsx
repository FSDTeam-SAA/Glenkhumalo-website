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

const fallbackImage = "/client-hero.png"; // Replace with your transparent PNG frame asset

export default function Client({ data, isLoading }: SectionProps) {
  if (isLoading) return <Skeleton className="h-[500px] w-full my-20 container mx-auto rounded-3xl" />;

  const title = data?.title || "Find the Right Creative for Your Project";
  const bodyText =
    data?.bodyText ||
    "Easily connect with skilled creatives who match your project needs. Browse profiles, review portfolios, and hire with confidence all in one place. Whether it's a small task or a full project, finding the right creative is simple and fast";
  
  const imageUrl = data?.image?.url || fallbackImage;
  const paragraphs = bodyText.split(/\n+/).filter(Boolean);

  // Split title to highlight "Your Project" in brand blue
  const titleParts = title.split(/(Your Project)/g);

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden" id="client">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Top Left Badge */}
        <div className="flex justify-start mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-[#102a56] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#3b82f6]" />
            Client
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8 text-left max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#102a56] leading-[1.2]">
              {titleParts.map((part, i) => 
                part === "Your Project" ? (
                  <span key={i} className="text-[#3b82f6]">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h2>
            
            <div className="space-y-4">
              {paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-[#475569] text-base lg:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <Button className="rounded-full bg-[#002a75] hover:bg-[#102a56] text-white px-10 h-14 text-base font-bold shadow-lg transition-all active:scale-95">
              Find A Creative
            </Button>
          </div>

          {/* Right: Visual Assembly */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background Navy Shape (The Decorative "Staircase" Underlay) */}
            <div className="absolute -bottom-6 -right-8 w-[80%] h-[90%] bg-[#002a75] rounded-[2rem] z-0 hidden lg:block" />
            
            {/* Main Image Container with Custom "Cut" Shape */}
            <div className="relative w-full max-w-[550px] aspect-square rounded-[2rem] overflow-hidden z-10 shadow-2xl bg-white">
              <Image
                src={imageUrl}
                alt="Client Professional"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              
              {/* Optional: Decorative overlay line to match the cut-out effect */}
              <div className="absolute inset-0 border-[12px] border-white/20 pointer-events-none rounded-[2rem]" />
            </div>

            {/* Floating UI Elements (Optional - to match mockup depth) */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}