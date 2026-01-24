'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function RoleSelectionPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-[#1e293b]">
                    Select your role to begin <br />
                    <span className="text-brand-yellow">your journey.</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                    Solace tailors your experience based on who you are
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Client Card */}
                <Link href="/register?role=client" className="group">
                    <Card className="relative overflow-hidden border-2 border-transparent hover:border-green-400 transition-all duration-300 rounded-3xl cursor-pointer h-full">
                        <div className="aspect-[4/3] relative bg-[#1e293b] p-8 flex items-end justify-center">
                            {/* Background decoration or image */}
                            <div className="absolute inset-0 bg-blue-900/20" />
                            {/* Placeholder illustration for Client - Woman in yellow/professional */}
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                                    alt="Client"
                                    fill
                                    className="object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-[#1e293b]">Client</h3>
                            <p className="text-sm text-muted-foreground mt-2">I want to hire talent</p>
                        </div>
                    </Card>
                </Link>

                {/* Creative Card */}
                <Link href="/register?role=creative" className="group">
                    <Card className="relative overflow-hidden border-2 border-transparent hover:border-brand-yellow transition-all duration-300 rounded-3xl cursor-pointer h-full">
                        <div className="aspect-[4/3] relative bg-brand-yellow/10 p-8 flex items-end justify-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop"
                                    alt="Creative"
                                    fill
                                    className="object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-[#1e293b]">Creative</h3>
                            <p className="text-sm text-muted-foreground mt-2">I want to find work</p>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
