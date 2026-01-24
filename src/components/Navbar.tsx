"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About us" },
  { href: "#creative", label: "Creatives" },
  { href: "#client", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#about"); // default (can be "#about" or "")

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Active section tracking for hash links
  useEffect(() => {
    // set initial hash on load (if user opened with a hash)
    if (window.location.hash) setActiveHash(window.location.hash);

    const sectionIds = links
      .map((l) => (l.href.startsWith("#") ? l.href.slice(1) : null))
      .filter(Boolean) as string[];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveHash(`#${visible.target.id}`);
      },
      {
        root: null,
        // tweak this so "active" changes around mid screen
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.75],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      // treat Home as active when no hash (top of page)
      return !activeHash || activeHash === "#";
    }
    return href === activeHash;
  };

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) setActiveHash(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 transition-transform active:scale-95"
          onClick={() => {
            setOpen(false);
            setActiveHash(""); // reset active hash to treat Home as active
          }}
        >
          <Image
            src="/logo.png"
            alt="Solace Logo"
            width={140}
            height={45}
            className="w-auto h-10 md:h-12"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-[15px] font-semibold transition-colors relative group ${
                  active ? "text-[#0047AB]" : "text-[#333333] hover:text-[#0047AB]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#0047AB] transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-[#00143F] font-bold bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-full px-8 h-12 transition-all"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-b from-[#0047AB] to-[#00143F] hover:shadow-blue-900/20 hover:shadow-xl text-white font-bold rounded-full px-8 h-12 shadow-lg transition-all active:scale-95">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#00143F] transition-all active:scale-90"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Side Drawer (Mobile) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-6 flex items-center justify-between border-b border-slate-50">
            <span className="font-bold text-lg text-[#00143F]">Navigation</span>
            <button
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#F1F5F9] text-[#00143F]"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 flex flex-col h-[calc(100%-80px)] justify-between">
            <nav className="flex flex-col">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`py-4 text-lg font-semibold border-b border-slate-50 transition-colors ${
                      active ? "text-[#0047AB]" : "text-[#333333] hover:text-[#0047AB]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-4 pb-8">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full text-[#00143F] font-bold bg-[#F1F5F9] rounded-full h-14"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full bg-gradient-to-b from-[#0047AB] to-[#00143F] text-white font-bold rounded-full h-14 shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </nav>
  );
}