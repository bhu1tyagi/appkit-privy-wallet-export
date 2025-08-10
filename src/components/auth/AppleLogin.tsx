'use client';

import { useLoginWithOAuth } from '@privy-io/react-auth';
import { Loader2 } from 'lucide-react';
import COLORS from '@/assets/colors';

export default function AppleLogin() {
  const { initOAuth, state } = useLoginWithOAuth({
    onComplete: ({ user, isNewUser }) => {
      console.log('Apple login successful!', { user, isNewUser });
    },
    onError: (error) => {
      console.error('Apple login error:', error);
    },
  });

  const handleAppleLogin = async () => {
    try {
      await initOAuth({ provider: 'apple' });
    } catch (error) {
      console.error('Error initiating Apple OAuth:', error);
    }
  };

  const isLoading = state.status === 'loading';

  return (
    <div>
      <button
        onClick={handleAppleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 sm:py-4 px-4 sm:px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base touch-manipulation"
        style={{
          backgroundColor: COLORS.lightBackground,
          border: `1px solid ${COLORS.borderDarkColor}`,
          color: COLORS.white,
          fontFamily: 'Inter',
          fontWeight: 500,
          minHeight: '44px'
        }}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
        ) : (
          <svg className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
        )}
        <span className="truncate">Continue with Apple</span>
      </button>

      {state.status === 'error' && state.error && (
        <div className="mt-3 p-3 sm:p-4 rounded-lg border" style={{ backgroundColor: COLORS.brandPrimaryLight, borderColor: COLORS.brandBlue }}>
          <p className="text-sm" style={{ color: COLORS.brandBlue, fontFamily: 'Inter' }}>{state.error.message}</p>
        </div>
      )}
    </div>
  );
} 
