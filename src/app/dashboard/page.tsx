'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserProfile from '@/components/user/UserProfile';
import WalletExport from '@/components/wallet/WalletExport';
import { Home, Wallet, Download } from 'lucide-react';

export default function DashboardPage() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login');
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your wallet and account</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - User Profile */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
            </div>
            <UserProfile />
          </div>

          {/* Right Column - Wallet Export */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Download className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Wallet Management</h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <WalletExport />
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About Embedded Wallets</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  Your embedded wallet is automatically created and managed by Privy when you sign up. 
                  It&apos;s a fully functional Solana wallet with secure private key management.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Key Features:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Non-custodial - you own your private keys</li>
                    <li>• Solana blockchain support</li>
                    <li>• Secure key export functionality</li>
                    <li>• Compatible with external wallets like Phantom & Solflare</li>
                  </ul>
                </div>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-amber-800 text-xs">
                    <strong>Security Note:</strong> Your private keys are encrypted and stored securely. 
                    Only you can access them through the export function.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 