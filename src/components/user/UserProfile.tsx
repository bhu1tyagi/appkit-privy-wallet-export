'use client';

import { usePrivy } from '@privy-io/react-auth';
import { User, LogOut, Wallet, Mail } from 'lucide-react';

export default function UserProfile() {
  const { ready, authenticated, user, logout } = usePrivy();

  if (!ready || !authenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Get user's linked accounts
  const emailAccount = user.linkedAccounts.find(account => account.type === 'email');
  const googleAccount = user.linkedAccounts.find(account => account.type === 'google_oauth');
  const solanaWallets = user.linkedAccounts.filter(account => 
    account.type === 'wallet' && account.chainType === 'solana'
  );

  return (
    <div className="rounded-lg border p-4 sm:p-6" style={{ backgroundColor: '#0D1F2C', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <User className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#3AC1E1' }} />
        <h2 className="text-base sm:text-lg font-medium" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600 }}>Account</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Email Account */}
        {emailAccount && (
          <div className="flex items-center justify-between py-2 sm:py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" style={{ color: '#B7B7B7' }} />
              <span className="text-sm sm:text-base truncate" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 400 }}>{emailAccount.address}</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(58, 193, 225, 0.1)', color: '#3AC1E1', fontFamily: 'Inter' }}>
              ✓
            </span>
          </div>
        )}

        {/* Google Account */}
        {googleAccount && (
          <div className="flex items-center justify-between py-2 sm:py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm sm:text-base truncate" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 400 }}>{googleAccount.email || googleAccount.name}</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(58, 193, 225, 0.1)', color: '#3AC1E1', fontFamily: 'Inter' }}>
              ✓
            </span>
          </div>
        )}

        {/* Solana Wallets */}
        {solanaWallets.map((wallet, index) => (
          <div key={(wallet as any).address} className="flex items-center justify-between py-2 sm:py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Wallet className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" style={{ color: '#B7B7B7' }} />
              <span className="text-sm sm:text-base font-mono truncate" style={{ color: '#FFFFFF', fontFamily: 'monospace', fontWeight: 400 }}>
                {(wallet as any).address.slice(0, 6)}...{(wallet as any).address.slice(-4)}
              </span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(39, 94, 117, 0.3)', color: '#89EAF6', fontFamily: 'Inter' }}>
              {(wallet as any).walletClientType === 'privy' ? 'App' : 'External'}
            </span>
          </div>
        ))}

        {solanaWallets.length === 0 && (
          <div className="text-center py-6 sm:py-8">
            <Wallet className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2" style={{ color: '#B7B7B7' }} />
            <p className="text-xs sm:text-sm" style={{ color: '#ADADAD', fontFamily: 'Inter' }}>No Solana wallets found</p>
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base font-medium touch-manipulation"
          style={{ 
            backgroundColor: '#275E75', 
            color: '#FFFFFF', 
            fontFamily: 'Inter', 
            fontWeight: 500,
            minHeight: '44px'
          }}
        >
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
} 