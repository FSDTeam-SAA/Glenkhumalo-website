"use client";

import { HeroContent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  data?: HeroContent;
  isLoading: boolean;
}

const splitTitle = (value: string): [string, string] => {
  if (!value) return ["", ""];
  const sentences = value.split(/(?<=\.)\s+/).filter(Boolean);
  if (sentences.length >= 2) {
    return [sentences[0].replace(/\.$/, ""), sentences.slice(1).join(" ").trim()];
  }
  const midpoint = Math.floor(value.length / 2);
  const splitIndex = value.lastIndexOf(" ", midpoint);
  if (splitIndex === -1) return [value, ""];
  return [value.slice(0, splitIndex), value.slice(splitIndex + 1)];
};

export default function Hero({ data, isLoading }: HeroProps) {
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="flex-1 flex justify-center">
          <Skeleton className="h-[450px] w-[450px] rounded-full" />
        </div>
      </section>
    );
  }

  const title = data?.title || "Where Creative Talent Finds True Opportunity.";
  const bodyText = data?.bodyText || "Connect With Skilled Creatives, Explore Verified Talent, And Launch Projects With Confidence. Our Platform Makes Collaboration Simple, Transparent, And Efficient For Both Clients And Creatives.";
  const heroImage = data?.image?.url || "/creative-professional.png"; // Replace with your transparent PNG
  const [primaryTitle, secondaryTitle] = splitTitle(title);

  return (
    <section className="container mx-auto px-6 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-16 min-h-[700px] overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 space-y-10 z-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
            <span className="text-[#102a56]">{primaryTitle}</span>
            {secondaryTitle && (
              <>
                <br />
                <span className="text-[#3b82f6]">{secondaryTitle}</span>
              </>
            )}
          </h1>
          <p className="text-[#475569] text-base lg:text-lg leading-relaxed max-w-xl">
            {bodyText}
          </p>
        </div>

        {/* Input and Join Button Group */}
        <div className="flex w-full max-w-lg items-center p-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
          <Input
            type="text"
            placeholder="Email/Phone number"
            className="flex-grow border-none shadow-none focus-visible:ring-0 px-6 text-slate-600 placeholder:text-slate-400 h-11 bg-transparent"
          />
          <Button className="h-11 px-8 rounded-full bg-[#003594] hover:bg-[#002a75] text-white font-semibold transition-colors">
            Join
          </Button>
        </div>

        {/* App Store Links */}
        <div className="space-y-4 pt-2">
          <p className="text-sm font-medium text-slate-400">Download the App & Start Hiring Today</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="bg-slate-50 p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
              <Image src="/Google_PLay.png" alt="Google Play" width={24} height={24} className="w-6 h-6 object-contain" />
            </Link>
            <Link href="#" className="bg-slate-50 p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
              <Image src="/Symbols.png" alt="App Store" width={24} height={24} className="w-6 h-6 object-contain" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Content - The Styled Visual Assembly */}
      <div className="flex-1 flex justify-center relative scale-90 lg:scale-100">
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[520px] lg:h-[520px]">
          
          {/* 1. The Thin Outermost Border Circle */}
          <div className="absolute inset-0 border-[2px] border-[#3b82f6] rounded-full opacity-70 z-0" />
          
          {/* 2. Soft Light Blue Background Circle */}
          <div className="absolute inset-[10%] bg-blue-50/80 rounded-full z-0" />

          {/* 3. Floating Decorative Circles */}
          {/* Top Right Bubble */}
          <div className="absolute -right-6 top-16 w-24 h-24 bg-[#bfdbfe] rounded-full opacity-60 z-0" />
          {/* Bottom Left Bubble */}
          <div className="absolute -left-4 bottom-12 w-20 h-20 bg-[#bfdbfe] rounded-full opacity-60 z-0" />

          {/* 4. Main Professional Image (Must be a transparent PNG) */}
          <div className="absolute inset-0 flex items-end justify-center z-10">
            <div className="relative w-[110%] h-[115%] -bottom-[5%]">
               <Image
                src={heroImage}
                alt="Creative Talent Professional"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}