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
  // Only show Solana wallets
  const solanaWallets = user.linkedAccounts.filter(account => 
    account.type === 'wallet' && account.chainType === 'solana'
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Profile</h2>
            <p className="text-sm text-gray-500">Manage your Solana account and connected services</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* User ID */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-700">User ID</p>
              <p className="text-xs text-gray-500">{user.id}</p>
            </div>
          </div>

          {/* Email Account */}
          {emailAccount && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-xs text-gray-500">{emailAccount.address}</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Verified
              </span>
            </div>
          )}

          {/* Google Account */}
          {googleAccount && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">Google Account</p>
                  <p className="text-xs text-gray-500">{googleAccount.email || googleAccount.name}</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Connected
              </span>
            </div>
          )}

          {/* Solana Wallets */}
          {solanaWallets.map((wallet, index) => (
            <div key={(wallet as any).address} className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Solana Wallet</p>
                  <p className="text-xs text-gray-500 font-mono">
                    {(wallet as any).address.slice(0, 6)}...{(wallet as any).address.slice(-4)}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {(wallet as any).walletClientType === 'privy' ? 'Embedded' : 'External'}
              </span>
            </div>
          ))}

          {/* Show message if no Solana wallets */}
          {solanaWallets.length === 0 && (
            <div className="flex items-center justify-center py-6 border-b border-gray-100">
              <div className="text-center">
                <Wallet className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No Solana wallets connected</p>
                <p className="text-xs text-gray-400 mt-1">
                  Embedded wallets are created automatically when you sign up
                </p>
              </div>
            </div>
          )}

          {/* Created At */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Member Since</p>
              <p className="text-xs text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 