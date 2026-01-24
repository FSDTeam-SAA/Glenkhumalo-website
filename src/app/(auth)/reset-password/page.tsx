"use client";

import { Suspense, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const resetSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    otp: z.string().min(4, "OTP is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailParam = searchParams.get("email") || "";

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: emailParam,
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (emailParam) form.setValue("email", emailParam);
  }, [emailParam, form]);

  async function onSubmit(data: ResetFormValues) {
    setIsLoading(true);
    try {
      await authApi.resetPassword({
        email: data.email,
        otp: data.otp,
        password: data.password,
      });
      toast.success("Password reset successfully! Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
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
            src="/reset-password.png"
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
              Reset Password
            </h1>
            <p className="text-slate-500">
              Enter the OTP sent to {emailParam || "your email"} and your new
              password
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password"
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl pr-11"
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
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
                      <Input
                        type="password"
                        placeholder="Confirm New Password"
                        className="h-12 bg-slate-50 border-slate-200 rounded-xl"
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
                {isLoading ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
