"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmailLogin from "@/components/auth/EmailLogin";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { Shield, Lock } from "lucide-react";

export default function LoginPage() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/dashboard");
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Privy Wallet
          </h2>
          <p className="text-gray-600">
            Sign in to access your embedded wallet and export your private keys
            securely
          </p>
        </div>

        {/* Login Methods */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800 text-sm">
              <Lock className="h-4 w-4" />
              <span className="font-medium">Secure Authentication</span>
            </div>
            <p className="text-blue-700 text-xs mt-1">
              Your credentials are encrypted and your private keys are never
              stored on our servers
            </p>
          </div>

          {/* Google Login */}
          <GoogleLogin />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Login */}
          <EmailLogin />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
          <p>
            New to Privy? An embedded wallet will be automatically created for
            you
          </p>
        </div>
      </div>
    </div>
  );
}
