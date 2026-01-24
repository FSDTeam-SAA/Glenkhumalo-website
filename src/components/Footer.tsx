import { ContactContent } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
    contact?: ContactContent;
}

const sitemapLinks = [
    { href: '/', label: 'Home' },
    { href: '#mobile-app', label: 'Download App' },
    { href: '#about', label: 'About Us' },
    { href: '#journey', label: 'How it works' },
    { href: '#client', label: 'Clients' },
    { href: '#creative', label: 'Creatives' },
    { href: '#faq', label: 'FAQ' },
];

export default function Footer({ contact }: FooterProps) {
    const address = contact?.address || 'G.P.O. Box No. 123, Education Avenue, London 1200, England';
    const phone = contact?.phoneNumber || '+88-02-12345678 / 79';
    const email = contact?.email || 'info@solaceapp.uk';
    const addressLines = address.split(',').map((line) => line.trim()).filter(Boolean);
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-20" id="contact">
            {/* Contact Information Bar (Floating) */}
            <div className="container mx-auto px-4 relative z-20 -mb-16">
                <div className="bg-[#002a75] rounded-xl py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="text-yellow-400"><MapPin size={24} /></div>
                        <div>
                            <p className="font-bold text-lg">Address</p>
                            <p className="text-slate-300 text-sm leading-tight space-y-1">
                                {addressLines.map((line, idx) => (
                                    <span key={`${line}-${idx}`}>
                                        {line}
                                        {idx !== addressLines.length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    
                    <div className="hidden md:block w-px h-16 bg-blue-400/30" />

                    <div className="flex items-center gap-4 flex-1">
                        <div className="text-yellow-400"><Phone size={24} /></div>
                        <div>
                            <p className="font-bold text-lg">Phone Number</p>
                            <p className="text-slate-300 text-sm">{phone}</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-blue-400/30" />

                    <div className="flex items-center gap-4 flex-1">
                        <div className="text-yellow-400"><Mail size={24} /></div>
                        <div>
                            <p className="font-bold text-lg">Email Address</p>
                            <p className="text-slate-300 text-sm">{email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Body */}
            <div className="relative pt-32 pb-10 overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/footer.png"
                        alt="Office background" 
                        fill 
                        className="object-cover" 
                    />
                </div>

                <div className="container mx-auto max-w-[1111px] px-4 relative z-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        {/* Branding Section */}
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2 mb-4">
                                <Image src="/footer-logo.png" alt="Solace Logo" width={400} height={400} className='w-[232px] h-[93px]'/>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Solace is a mobile-first platform connecting trusted creatives with clients who value originality.
                            </p>
                        </div>

                        {/* Sitemap Section */}
                        <div className="w-full md:w-auto">
                            <h4 className="font-bold text-white border-b-2 border-yellow-500 inline-block mb-6">Our Sitemap</h4>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-slate-400">
                                {sitemapLinks.map((item) => (
                                    <Link key={item.label} href={item.href} className="hover:text-white transition-all flex items-center gap-2">
                                        <span>{'>'}</span> {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-12 flex justify-center gap-4">
                        {[Facebook, Twitter, Youtube, Linkedin].map((Icon, i) => (
                            <div key={Icon.displayName || i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-all" aria-label={Icon.displayName}>
                                <Icon size={18} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 text-center text-xs text-slate-500 uppercase tracking-widest">
                        (c) {year} Solace. All Rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
}
