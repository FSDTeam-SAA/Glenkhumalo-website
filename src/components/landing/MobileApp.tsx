"use client";

import Image from "next/image";
import Link from "next/link";

export default function MobileApp() {
  return (
    <section
      id="mobile-app"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-28"
    >
      {/* Background (matches reference: soft blue from left + bright right) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#AADCFF_0%,#FFFFFF_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[#8fd0ff]/60 blur-[80px] -z-10 sm:h-[650px] sm:w-[650px]" />
      <div className="pointer-events-none absolute left-24 top-10 h-[420px] w-[420px] rounded-full bg-white/60 blur-[70px] -z-10 lg:left-40 lg:top-16" />
      <div className="pointer-events-none absolute -bottom-28 left-10 h-[420px] w-[420px] rounded-full bg-[#7fc9ff]/30 blur-[90px] -z-10" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: Phone mockups */}
          <div className="order-1 lg:order-none">
            <div className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[640px]">
              {/* Responsive height for absolute positioning */}
              <div className="relative h-[320px] xs:h-[360px] sm:h-[440px] md:h-[520px] lg:h-[560px]">
                {/* Phone 1 (left/back) */}
                <div className="">
                  <div className="">
                    <Image
                      src="/phone.png"
                      alt="Profile Screen"
                      width={2000}
                      height={2000}
                      className="object-contain"
                      sizes="(min-width: 1024px) 320px, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="order-2 text-center lg:text-right">
            <div className="mx-auto lg:mx-0 max-w-[720px] space-y-5 lg:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                <span className="text-[#003093]">Download the app &</span>
                <br />
                <span className="text-[#00143F]">Get benefits</span>
              </h2>

              <p className="mx-auto lg:ml-auto lg:mr-0 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                Everything you need to hire or get hired, right in your pocket.
                Download the app and get started.
              </p>

              {/* Store buttons (square icon style like the reference) */}
              <div className="flex items-center justify-center gap-4 lg:justify-end pt-2">
                <Link
                  href="#"
                  aria-label="Get it on Google Play"
                  className="group inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg transition-transform active:scale-95 hover:scale-105"
                >
                  <Image
                    src="/Google_PLay.png"
                    alt="Google Play"
                    width={42}
                    height={42}
                    className="h-10 w-10 object-contain"
                  />
                </Link>

                <Link
                  href="#"
                  aria-label="Download on the App Store"
                  className="group inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg transition-transform active:scale-95 hover:scale-105"
                >
                  <Image
                    src="/Symbols.png"
                    alt="App Store"
                    width={42}
                    height={42}
                    className="h-10 w-10 object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}