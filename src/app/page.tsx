'use client';

import { useQuery } from '@tanstack/react-query';
import { dataApi, WebsiteContent } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import Creative from '@/components/landing/Creative';
import Client from '@/components/landing/Client';
import Journey from '@/components/landing/Journey';
import MobileApp from '@/components/landing/MobileApp';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: websiteData, isLoading } = useQuery<WebsiteContent>({
    queryKey: ['website'],
    queryFn: dataApi.getWebsiteContent,
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero data={websiteData?.hero} isLoading={isLoading} />
        <About data={websiteData?.about} isLoading={isLoading} />
        <Creative data={websiteData?.creative} isLoading={isLoading} />
        <Client data={websiteData?.client} isLoading={isLoading} />
        <Journey />
        <MobileApp />
        <FAQ />
      </main>
      <Footer contact={websiteData?.contact} />
    </div>
  );
}
