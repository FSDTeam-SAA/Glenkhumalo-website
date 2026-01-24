'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/lib/api';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

const changePasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    async function onSubmit(data: ChangePasswordFormValues) {
        setIsLoading(true);
        try {
            // Assuming token comes from URL or context in real app
            // For UI demo, just show success
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Password changed successfully!");
            router.push('/login');
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left: Image Section */}
            <div className="hidden lg:flex w-1/2 bg-blue-100 relative items-center justify-center overflow-hidden">
                <div className="relative w-full h-full max-w-2xl">
                    {/* Circular Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/50 rounded-full blur-3xl" />
                    <Image
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
                        alt="Change Password"
                        fill
                        className="object-cover object-center z-10"
                        priority
                    />
                </div>
            </div>

            {/* Right: Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center text-white font-serif italic text-2xl mx-auto mb-6">S</div>
                        <h1 className="text-2xl font-bold text-[#1e293b]">Change Password</h1>
                        <p className="text-muted-foreground text-sm">
                            Select which contact details should we use to reset your password
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type="password" placeholder="New Password" className="h-12 bg-slate-50 border-slate-200 rounded-lg pr-10" {...field} disabled={isLoading} />
                                                {/* Eye icon could go here */}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type="password" placeholder="Confirm Password" className="h-12 bg-slate-50 border-slate-200 rounded-lg pr-10" {...field} disabled={isLoading} />
                                                {/* Eye icon could go here */}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full h-12 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg text-lg font-medium" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Save Password"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
