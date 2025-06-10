"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmailLogin from "@/components/auth/EmailLogin";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { Wallet, AlertTriangle, EyeOff, Shield, X } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#0c101a' }}>
        <div className="animate-pulse">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#3AC1E1' }}></div>
        </div>
      </div>
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#0c101a' }}>
        <div className="text-center">
          <div className="animate-spin w-5 h-5 border-4 border-t-transparent rounded-full mx-auto mb-2" style={{ borderColor: '#3AC1E1', borderTopColor: 'transparent' }}></div>
          <p className="text-sm" style={{ color: '#ADADAD', fontFamily: 'Inter', fontSize: '13px' }}>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0c101a' }}>
      {/* Modal-like Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 pt-8 sm:pt-12 pb-6 safe-area-top">
        <div className="max-w-sm mx-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-8">
            <div></div> {/* Spacer */}
            <h1 className="text-xl sm:text-2xl font-semibold" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600 }}>
              Secure Access
            </h1>
            <div></div> {/* Spacer for X button if needed */}
          </div>

          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid #EF4444' }}>
              <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: '#EF4444' }} />
            </div>
          </div>

          {/* Warning Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600 }}>
            Security Verification
          </h2>

          {/* Warning Description */}
          <p className="text-center text-sm sm:text-base mb-8" style={{ color: '#B7B7B7', fontFamily: 'Inter', lineHeight: '1.5' }}>
            Please authenticate again to securely access your wallet export features
          </p>

          {/* Security Points */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(58, 193, 225, 0.1)' }}>
                <Shield className="h-4 w-4" style={{ color: '#3AC1E1' }} />
              </div>
              <div>
                <p className="text-sm sm:text-base" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 500 }}>
                  We&apos;re making you login again as we take security seriously
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(58, 193, 225, 0.1)' }}>
                <EyeOff className="h-4 w-4" style={{ color: '#3AC1E1' }} />
              </div>
              <div>
                <p className="text-sm sm:text-base" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 500 }}>
                  Your private keys will only be accessible after verification
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(58, 193, 225, 0.1)' }}>
                <Wallet className="h-4 w-4" style={{ color: '#3AC1E1' }} />
              </div>
              <div>
                <p className="text-sm sm:text-base" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 500 }}>
                  Your wallet data remains encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="flex-1 px-4 sm:px-6 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6" style={{ backgroundColor: '#0D1F2C', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <GoogleLogin />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 text-xs sm:text-sm" style={{ backgroundColor: '#0D1F2C', color: '#B7B7B7', fontFamily: 'Inter' }}>or</span>
              </div>
            </div>

            <EmailLogin />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 sm:px-6 mb-8 sm:pb-6 safe-area-bottom">
        <div className="max-w-sm mx-auto text-center">
          <p className="text-xs" style={{ color: '#666666', fontFamily: 'Inter' }}>
            Secured and powered by Privy
          </p>
        </div>
      </div>
    </div>
  );
}
