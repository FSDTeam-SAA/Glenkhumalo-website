"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react"; // Import icons for password visibility

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    address: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    rememberMe: z.boolean().default(false).optional(),
    role: z.enum(["client", "creative"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") as "client" | "creative" | null;
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: roleParam || "client",
    },
  });

  useEffect(() => {
    if (roleParam) form.setValue("role", roleParam);
  }, [roleParam, form]);

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      const response = await authApi.register(data);
      if (response.data.success) {
        toast.success("Account created successfully!");
        router.push("/verify");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
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
            src="/register.png"
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
          <div className="text-center space-y-2">
            <Image
              src="/auth-logo.png"
              alt="Solace Logo"
              width={150}
              height={150}
              className="mx-auto w-[90px] h-[90px]"
            />
            <h1 className="text-3xl font-bold text-[#1e293b]">Sign up</h1>
            <p className="text-muted-foreground">
              Please enter your email and password to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        className="h-12 bg-slate-50 border-slate-200 rounded-lg"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="you@gmail.com"
                        className="h-12 bg-slate-50 border-slate-200 rounded-lg"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        className="h-12 bg-slate-50 border-slate-200 rounded-lg"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        className="h-12 bg-slate-50 border-slate-200 rounded-lg"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          className="h-12 border-slate-200 pr-10"
                          {...field}
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

              {/* Confirm Password Field with Eye Toggle */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="h-12 border-slate-200 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
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

              <Button
                type="submit"
                className="w-full h-12 text-white rounded-lg font-bold text-base transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(0deg, #263451 0%, #00297E 100%)",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-slate-500">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-[#1e293b] font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
