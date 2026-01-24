"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto move to next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    // Add your verification logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left: Image Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-2xl">
          {/* Circular Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/50 rounded-full blur-3xl" />
          <Image
            src="/otp.png"
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
              Enter Code
            </h1>
            <p className="text-slate-500">
              Please check your Email for a message with your code. Your code is
              6 numbers long.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {code.map((digit, idx) => (
                <Input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>

            <div className="text-center text-sm text-slate-500">
              Resend code in{" "}
              <span className="font-semibold text-[#1e293b]">43s</span>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isLoading || code.some((d) => d === "")}
              type="submit"
              className="w-full h-12 text-white rounded-lg font-bold text-base transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(0deg, #263451 0%, #00297E 100%)",
              }}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
