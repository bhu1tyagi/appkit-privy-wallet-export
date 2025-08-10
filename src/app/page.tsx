"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EmailLogin, GoogleLogin, AppleLogin } from "@/components/auth";
import { Wallet, ShieldCheck, EyeOff, Shield, X } from "lucide-react";
import COLORS from "@/assets/colors";

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
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
        <div className="animate-pulse">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS.brandPrimary }}></div>
        </div>
      </div>
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
        <div className="text-center">
          <div className="animate-spin w-5 h-5 border-4 border-t-transparent rounded-full mx-auto mb-2" style={{ borderColor: COLORS.brandPrimary, borderTopColor: 'transparent' }}></div>
          <p className="text-sm" style={{ color: COLORS.textHint, fontFamily: 'Inter', fontSize: '13px' }}>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25% 25%, ${COLORS.brandPrimaryLight} 0%, transparent 50%), 
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
                       backgroundColor: COLORS.brandPrimary,
                       boxShadow: `0 20px 40px ${COLORS.brandPrimaryMedium}, 0 0 0 1px ${COLORS.brandPrimaryBorder}` 
                     }}>
                  <ShieldCheck className="h-12 w-12 sm:h-14 sm:w-14 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full animate-pulse" 
                     style={{ 
                       backgroundColor: COLORS.brandPrimary, 
                       filter: 'blur(20px)', 
                       opacity: 0.4 
                     }}></div>
              </div>
            </div>

            {/* Verification Title */}
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8" 
                style={{ color: COLORS.white, fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Verify Your Identity
            </h2>

            {/* Verification Description */}
            <p className="text-center text-lg sm:text-xl mb-12 leading-relaxed max-w-md mx-auto" 
               style={{ color: COLORS.greyMid, fontFamily: 'Inter', fontWeight: 400 }}>
              To protect your wallet, we need you to log in again before exporting.
            </p>

            {/* Security Points */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                   style={{ 
                     backgroundColor: COLORS.brandPrimaryLight, 
                     border: `1px solid ${COLORS.brandPrimaryBorder}` 
                   }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: COLORS.brandPrimary }}>
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium" 
                   style={{ color: COLORS.white, fontFamily: 'Inter' }}>
                  This extra step keeps your wallet safe
                </p>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                   style={{ 
                     backgroundColor: COLORS.brandPrimaryLight, 
                     border: `1px solid ${COLORS.brandPrimaryBorder}` 
                   }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: COLORS.brandPrimary }}>
                  <EyeOff className="h-6 w-6 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium" 
                   style={{ color: COLORS.white, fontFamily: 'Inter' }}>
                  Private keys are only unlocked after you verify
                </p>
              </div>

              <div className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02]" 
                   style={{ 
                     backgroundColor: COLORS.brandPrimaryLight, 
                     border: `1px solid ${COLORS.brandPrimaryBorder}` 
                   }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: COLORS.brandPrimary }}>
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium" 
                   style={{ color: COLORS.white, fontFamily: 'Inter' }}>
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
                     backgroundColor: COLORS.brandPrimary, 
                     filter: 'blur(40px)' 
                   }}></div>
              
              {/* Main card */}
              <div className="relative rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl" 
                   style={{ 
                     backgroundColor: COLORS.lightBackground,
                     border: `1px solid ${COLORS.brandPrimaryBorder}`,
                     boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                   }}>
                <GoogleLogin />

                <AppleLogin />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: COLORS.brandPrimaryBorder }} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 py-2 text-base font-medium rounded-full" 
                          style={{ 
                            backgroundColor: COLORS.lightBackground, 
                            color: COLORS.greyMid, 
                            fontFamily: 'Inter',
                            border: `1px solid ${COLORS.brandPrimaryBorder}` 
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
               style={{ color: COLORS.textHint, fontFamily: 'Inter' }}>
              <span className="w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: COLORS.brandPrimary }}></span>
              Secured and powered by Privy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
