'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';

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
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Privy Configuration Required</h2>
            <p className="text-gray-600 mb-6 text-sm">
              You need to configure your Privy App ID to use this Solana application.
            </p>
          </div>
          
          <div className="text-left space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Quick Setup:</h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li>1. Visit <a href="https://dashboard.privy.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">dashboard.privy.io</a></li>
                <li>2. Create a new app or use existing</li>
                <li>3. Copy your App ID</li>
                <li>4. Update <code className="bg-gray-200 px-1 rounded">.env.local</code>:</li>
              </ol>
              <div className="mt-3 bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
                NEXT_PUBLIC_PRIVY_APP_ID=your_actual_app_id
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-gray-500">
                After updating the environment file, restart the development server.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render providers until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
        loginMethods: ['email', 'google'],
        
        // Configure Solana clusters - mainnet-beta and devnet
        solanaClusters: [
          { name: 'mainnet-beta', rpcUrl: 'https://api.mainnet-beta.solana.com' },
          { name: 'devnet', rpcUrl: 'https://api.devnet.solana.com' }
        ],
        
        // Configure wallet connect metadata
        walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        
        // Additional security settings
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