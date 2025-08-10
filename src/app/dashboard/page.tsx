'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserProfile from '@/components/user/UserProfile';
import WalletExport from '@/components/wallet/WalletExport';
import COLORS from '@/assets/colors';

export default function DashboardPage() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
        <div className="text-center">
          <div className="animate-spin w-5 h-5 border-4 border-t-transparent rounded-full mx-auto mb-2" style={{ borderColor: COLORS.brandPrimary, borderTopColor: 'transparent' }}></div>
          <p className="text-sm" style={{ color: COLORS.textHint, fontFamily: 'Inter', fontSize: '13px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.backgroundHomeScreen }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 safe-area-top">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-lg sm:text-xl font-semibold" style={{ color: COLORS.white, fontFamily: 'Inter', fontWeight: 600 }}>
            Wallet Export
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: COLORS.textHint, fontFamily: 'Inter' }}>
            Manage your wallet keys securely
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 pb-6 sm:pb-8 safe-area-bottom">
        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
          <UserProfile />
          <WalletExport />
        </div>
      </div>
    </div>
  );
} 