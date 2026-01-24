import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Solace?",
    answer:
      "Solace is a mobile-first platform connecting trusted creatives with clients who value originality.",
  },
  {
    question: "How do I hire a creative?",
    answer:
      "Simply browse through our verified talent, view their portfolios, and start a conversation directly through the app.",
  },
  {
    question: "Is my data safe on Solace?",
    answer:
      "Yes, we use industry-standard encryption to ensure all your project data and personal information remains secure.",
  },
  {
    question: "Can creatives and clients both use the app?",
    answer:
      "Absolutely. Our platform is built to facilitate seamless collaboration for both parties.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1e293b]">
            Frequently Asked <span className="text-[#003594]">Questions</span>
          </h2>
          <p className="text-slate-500 mt-2">
            Find answers to common questions about our facilities
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-200 rounded-lg px-6 overflow-hidden last:border-b last:border-b-slate-200"
            >
              <AccordionTrigger className="hover:no-underline font-semibold text-[#003594] text-left">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-slate-600 leading-relaxed">
                <div className="pb-4">{faq.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
