'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { Download, Wallet, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function WalletExport() {
  const { ready, authenticated, user } = usePrivy();
  const { exportWallet: exportSolanaWallet } = useSolanaWallets();
  const [isExporting, setIsExporting] = useState(false);

  // Check that user is authenticated
  const isAuthenticated = ready && authenticated;

  // Debug: Log user and linked accounts to console
  console.log('User object:', user);
  console.log('Linked accounts:', user?.linkedAccounts);

  // Find embedded Solana wallet
  const embeddedSolanaWallet = user?.linkedAccounts.find(
    (account) => 
      account.type === 'wallet' && 
      (account.walletClientType === 'privy' || account.walletClientType === undefined) &&
      account.chainType === 'solana'
  );

  const hasEmbeddedWallet = !!embeddedSolanaWallet;

  console.log('Solana Wallet found:', embeddedSolanaWallet);
  console.log('Has embedded wallet:', hasEmbeddedWallet);

  // Additional debug: log all wallet accounts with their properties
  const walletAccounts = user?.linkedAccounts.filter(account => account.type === 'wallet');
  console.log('All wallet accounts with properties:', walletAccounts?.map(account => ({
    type: account.type,
    chainType: account.chainType,
    walletClientType: account.walletClientType,
    address: (account as any).address,
    imported: (account as any).imported,
    delegated: (account as any).delegated
  })));

  const handleExportWallet = async () => {
    if (!hasEmbeddedWallet) {
      console.error('No embedded Solana wallet found for export');
      return;
    }

    setIsExporting(true);
    try {
      console.log('Exporting Solana wallet...');
      const result = await exportSolanaWallet();
      console.log('Export result:', result);
    } catch (error) {
      console.error('Error exporting wallet:', error);
      alert(`Failed to export wallet: ${error instanceof Error ? error.message : 'Unknown error'}. Please make sure you have a valid embedded Solana wallet.`);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Solana Wallet Export</h3>
        <p className="text-gray-600">Please log in to access Solana wallet export functionality.</p>
      </div>
    );
  }

  if (!hasEmbeddedWallet) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
        <div className="text-center mb-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No Embedded Solana Wallet Found</h3>
          <p className="text-yellow-700 mb-4">
            You need to have an embedded Solana wallet to export private keys. 
            Embedded wallets are automatically created when you sign up with email or social login.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-sm">
          <h4 className="font-medium text-gray-900 mb-2">Debug Information:</h4>
          <div className="space-y-2 text-gray-700">
            <p><strong>User ID:</strong> {user?.id || 'Not found'}</p>
            <p><strong>Linked Accounts:</strong> {user?.linkedAccounts?.length || 0}</p>
            <div className="mt-2">
              <strong>Account Types:</strong>
              <ul className="list-disc list-inside ml-2 text-xs">
                {user?.linkedAccounts?.map((account, index) => (
                  <li key={index}>
                    {account.type} 
                    {account.type === 'wallet' && ` (client: ${account.walletClientType || 'undefined'}, chain: ${account.chainType})`}
                    {account.type === 'email' && ` (${(account as any).address})`}
                  </li>
                )) || <li>No accounts found</li>}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-yellow-700">
            If you just signed up, try refreshing the page or logging out and back in.
          </p>
        </div>
      </div>
    );
  }

  // Get wallet address safely
  const walletAddress = (embeddedSolanaWallet as any)?.address;
  const displayAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Loading...';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Download className="h-5 w-5" />
        Export Solana Private Key
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Important Security Information</p>
            <ul className="space-y-1 text-xs">
              <li>• Your private key gives full control over your Solana wallet</li>
              <li>• Never share your private key with anyone</li>
              <li>• Store it securely and keep it offline</li>
              <li>• This action cannot be undone</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="text-sm text-green-800">
          <p className="font-medium">✓ Embedded Solana Wallet Detected</p>
          <p className="text-xs mt-1">
            Address: {displayAddress}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Click the button below to export your embedded Solana wallet&apos;s private key. 
          This will open a secure modal where you can copy your private key.
        </p>

        <button
          onClick={handleExportWallet}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Download className="h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export Solana Private Key'}
        </button>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• For Solana wallets: You&apos;ll get the private key only</p>
          <p>• Compatible with Phantom, Solflare, and other Solana wallets</p>
          <p>• Note: Seed phrase export is not supported for Solana wallets</p>
          <p>• The export happens on a separate secure domain</p>
        </div>
      </div>
    </div>
  );
} 