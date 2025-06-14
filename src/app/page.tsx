"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmailLogin from "@/components/auth/EmailLogin";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { Wallet, ShieldCheck, EyeOff, Shield, X } from "lucide-react";

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
    <div className="min-h-screen relative" style={{ backgroundColor: '#0c101a' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(58, 193, 225, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(58, 193, 225, 0.05) 0%, transparent 50%)` 
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-4 sm:px-6 pt-12 sm:pt-16 pb-8 safe-area-top">
          <div className="max-w-lg mx-auto">
            {/* Modal Header */}
            <div className="text-center mb-10">

            </div>

            {/* Verification Icon */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-2xl" 
                     style={{ 
                       backgroundColor: '#3AC1E1',
                       boxShadow: '0 20px 40px rgba(58, 193, 225, 0.3), 0 0 0 1px rgba(58, 193, 225, 0.2)' 
                     }}>
                  <ShieldCheck className="h-12 w-12 sm:h-14 sm:w-14 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full animate-pulse" 
                     style={{ 
                       backgroundColor: '#3AC1E1', 
                       filter: 'blur(20px)', 
                       opacity: 0.4 
                     }}></div>
              </div>
            </div>

            {/* Verification Title */}
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8" 
                style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Verify Your Identity
            </h2>

            {/* Verification Description */}
            <p className="text-center text-lg sm:text-xl mb-12 leading-relaxed max-w-md mx-auto" 
               style={{ color: '#B7B7B7', fontFamily: 'Inter', fontWeight: 400 }}>
              To protect your wallet, we need you to log in again before exporting.
            </p>

            {/* Security Points */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                   style={{ 
                     backgroundColor: 'rgba(58, 193, 225, 0.08)', 
                     border: '1px solid rgba(58, 193, 225, 0.2)' 
                   }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: '#3AC1E1' }}>
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium" 
                   style={{ color: '#FFFFFF', fontFamily: 'Inter' }}>
                  This extra step keeps your wallet safe
                </p>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                   style={{ 
                     backgroundColor: 'rgba(58, 193, 225, 0.08)', 
                     border: '1px solid rgba(58, 193, 225, 0.2)' 
                   }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: '#3AC1E1' }}>
                  <EyeOff className="h-6 w-6 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium" 
                   style={{ color: '#FFFFFF', fontFamily: 'Inter' }}>
                  Private keys are only unlocked after you verify
                </p>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                   style={{ 
                     backgroundColor: 'rgba(58, 193, 225, 0.08)', 
                     border: '1px solid rgba(58, 193, 225, 0.2)' 
                   }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: '#3AC1E1' }}>
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium" 
                   style={{ color: '#FFFFFF', fontFamily: 'Inter' }}>
                  Your wallet data stays encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="flex-1 px-4 sm:px-6 pb-12">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-3xl opacity-50" 
                   style={{ 
                     backgroundColor: '#3AC1E1', 
                     filter: 'blur(40px)' 
                   }}></div>
              
              {/* Main card */}
              <div className="relative rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl" 
                   style={{ 
                     backgroundColor: '#0D1F2C',
                     border: '1px solid rgba(58, 193, 225, 0.3)',
                     boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                   }}>
                <GoogleLogin />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: 'rgba(58, 193, 225, 0.3)' }} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 py-2 text-base font-medium rounded-full" 
                          style={{ 
                            backgroundColor: '#0D1F2C', 
                            color: '#B7B7B7', 
                            fontFamily: 'Inter',
                            border: '1px solid rgba(58, 193, 225, 0.2)' 
                          }}>
                      or
                    </span>
                  </div>
                </div>

                <EmailLogin />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 sm:px-6 mb-10 sm:pb-8 safe-area-bottom">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-base flex items-center justify-center gap-3" 
               style={{ color: '#666666', fontFamily: 'Inter' }}>
              <span className="w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: '#3AC1E1' }}></span>
              Secured and powered by Privy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
