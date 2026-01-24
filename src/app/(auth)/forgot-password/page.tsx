"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotFormValues) {
    setIsLoading(true);
    try {
      await authApi.forgetPassword(data.email);
      toast.success("OTP sent to your email!");
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left: Image Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-2xl">
          {/* Circular Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/50 rounded-full blur-3xl" />
          <Image
            src="/forgot-password.png"
            alt="Join Solace"
            fill
            className="object-cover object-center z-10"
            priority
          />
        </div>
      </div>

      {/* Right: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <Image
              src="/auth-logo.png"
              alt="Solace Logo"
              width={100}
              height={100}
              className="mx-auto w-[80px] h-[80px] mb-4"
            />
            <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">
              Forgot Password
            </h1>
            <p className="text-slate-500">
              Enter your email to receive a password reset OTP
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-white rounded-lg font-bold text-base transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #263451 0%, #00297E 100%)",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          </Form>

          <div className="text-center pt-4">
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-semibold text-[#1e293b] hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
