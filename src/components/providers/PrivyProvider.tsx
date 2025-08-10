'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';
import COLORS from '@/assets/colors';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Prevent hydration mismatch by only rendering on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if Privy App ID is configured
  if (!appId || appId === 'your_privy_app_id_here') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
        <div className="max-w-sm w-full rounded-lg shadow-lg p-4 sm:p-6 text-center" style={{ backgroundColor: COLORS.lightBackground }}>
          <div className="mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: COLORS.brandPrimaryLight }}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke={COLORS.brandBlue} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: COLORS.white, fontFamily: 'Inter', fontWeight: 600 }}>Configuration Required</h2>
            <p className="text-sm sm:text-base mb-4 sm:mb-6" style={{ color: COLORS.textHint, fontFamily: 'Inter' }}>
              App configuration needed to continue.
            </p>
          </div>
          
          <div className="text-left space-y-3 sm:space-y-4">
            <div className="rounded-lg p-3 sm:p-4" style={{ backgroundColor: COLORS.lightBackground }}>
              <h3 className="font-semibold mb-2 text-sm sm:text-base" style={{ color: COLORS.white, fontFamily: 'Inter', fontWeight: 600 }}>Setup:</h3>
              <ol className="text-xs sm:text-sm space-y-1" style={{ color: COLORS.greyMid, fontFamily: 'Inter' }}>
                <li>1. Configure Privy App ID</li>
                <li>2. Update environment:</li>
              </ol>
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 rounded text-xs sm:text-sm font-mono break-all" style={{ backgroundColor: COLORS.darkerBackground, color: COLORS.brandPrimary, fontFamily: 'monospace' }}>
                NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
              </div>
            </div>
            
            <p className="text-xs sm:text-sm" style={{ color: COLORS.greyMid, fontFamily: 'Inter' }}>
              Restart after updating configuration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render providers until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse" style={{ backgroundColor: COLORS.brandPrimary }}></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse" style={{ backgroundColor: COLORS.brandPrimary, animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse" style={{ backgroundColor: COLORS.brandPrimary, animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#3AC1E1',
        },
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
        loginMethods: ['email', 'google', 'apple'],
        
        solanaClusters: [
          { name: 'mainnet-beta', rpcUrl: 'https://api.mainnet-beta.solana.com' },
          { name: 'devnet', rpcUrl: 'https://api.devnet.solana.com' }
        ],
        
        walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        
        legal: {
          termsAndConditionsUrl: '/terms',
          privacyPolicyUrl: '/privacy',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
} 