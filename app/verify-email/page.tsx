'use client'

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      alert(err.errors?.[0]?.message || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
        <Input
          placeholder="Enter the verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4"
        />
        <Button className="w-full" onClick={handleVerify}>
          Verify & Continue
        </Button>
      </div>
    </div>
  );
}
