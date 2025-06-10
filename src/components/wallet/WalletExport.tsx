'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { Download, Wallet, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function WalletExport() {
  const { ready, authenticated, user } = usePrivy();
  const { exportWallet: exportSolanaWallet } = useSolanaWallets();
  const [isExporting, setIsExporting] = useState(false);

  const isAuthenticated = ready && authenticated;

  const embeddedSolanaWallet = user?.linkedAccounts.find(
    (account) => 
      account.type === 'wallet' && 
      (account.walletClientType === 'privy' || account.walletClientType === undefined) &&
      account.chainType === 'solana'
  );

  const hasEmbeddedWallet = !!embeddedSolanaWallet;

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
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="border-2 border-dashed rounded-lg p-6 sm:p-8 text-center" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: '#0D1F2C' }}>
        <Wallet className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3" style={{ color: '#B7B7B7' }} />
        <h3 className="text-base sm:text-lg font-medium mb-2" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600 }}>Export Wallet</h3>
        <p className="text-sm sm:text-base" style={{ color: '#ADADAD', fontFamily: 'Inter' }}>Sign in to export your private keys</p>
      </div>
    );
  }

  if (!hasEmbeddedWallet) {
    return (
      <div className="border rounded-lg p-4 sm:p-6" style={{ backgroundColor: 'rgba(137, 234, 246, 0.05)', borderColor: '#89EAF6' }}>
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3" style={{ color: '#89EAF6' }} />
          <h3 className="text-base sm:text-lg font-medium mb-2" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600 }}>No Wallet Found</h3>
          <p className="text-sm sm:text-base mb-3" style={{ color: '#ADADAD', fontFamily: 'Inter' }}>
            No embedded wallet detected. Try signing out and back in.
          </p>
        </div>
      </div>
    );
  }

  const walletAddress = (embeddedSolanaWallet as any)?.address;
  const displayAddress = walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : 'Loading...';

  return (
    <div className="rounded-lg border p-4 sm:p-6 space-y-4 sm:space-y-6" style={{ backgroundColor: '#0D1F2C', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
      <div className="flex items-center gap-2 sm:gap-3">
        <Download className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#3AC1E1' }} />
        <h3 className="text-base sm:text-lg font-medium" style={{ color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 600 }}>Export Private Key</h3>
      </div>

      <div className="border rounded-lg p-3 sm:p-4" style={{ backgroundColor: 'rgba(58, 193, 225, 0.05)', borderColor: 'rgba(58, 193, 225, 0.2)' }}>
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" style={{ color: '#3AC1E1' }} />
          <div className="text-sm sm:text-base" style={{ color: '#FFFFFF', fontFamily: 'Inter' }}>
            <p className="font-medium">Security Warning</p>
            <p className="text-xs sm:text-sm mt-1" style={{ color: '#ADADAD', fontFamily: 'Inter' }}>Never share your private key with anyone</p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-3 sm:p-4" style={{ backgroundColor: 'rgba(39, 94, 117, 0.2)', borderColor: '#275E75' }}>
        <div className="text-sm sm:text-base" style={{ color: '#FFFFFF', fontFamily: 'Inter' }}>
          <p className="font-medium">✓ Wallet Detected</p>
          <p className="text-xs sm:text-sm mt-1 font-mono break-all" style={{ color: '#89EAF6', fontFamily: 'monospace' }}>
            {displayAddress}
          </p>
        </div>
      </div>

      <button
        onClick={handleExportWallet}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base touch-manipulation"
        style={{
          backgroundColor: '#3AC1E1',
          color: '#0c101a',
          fontFamily: 'Inter',
          fontWeight: 600,
          minHeight: '44px'
        }}
      >
        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>{isExporting ? 'Exporting...' : 'Export Private Key'}</span>
      </button>

      <div className="text-xs sm:text-sm space-y-1 sm:space-y-2" style={{ color: '#B7B7B7', fontFamily: 'Inter' }}>
        <p>• Compatible with Phantom, Solflare, and other Solana wallets</p>
        <p>• Export opens in a secure modal window</p>
      </div>
    </div>
  );
} 