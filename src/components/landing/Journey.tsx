import Image from 'next/image';

const steps = [
    {
        title: "Discover Top Talent",
        description: "Explore a vast network of skilled professionals ready to bring your vision to life.",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Hire With Confidence",
        description: "Transparent profiles, reviews, and secure payments ensuring you hire the best.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Get Work Done",
        description: "Collaborate seamlessly and track progress through our intuitive platform.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Creative Lives",
        description: "Join a community that supports your creative journey and career growth.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
    }
];

export default function Journey() {
    return (
        <section className="py-24 bg-white" id="journey">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="space-y-4 mb-16">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-brand-blue">
                        How it Works
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1e293b]">
                        Your Journey on Solace
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Our seamless process ensures you get the best results, whether you are hiring or looking for work.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="group rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 space-y-3">
                                <h3 className="font-bold text-xl text-[#1e293b]">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
