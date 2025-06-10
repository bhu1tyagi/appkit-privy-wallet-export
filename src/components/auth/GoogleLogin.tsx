'use client';

import { useLoginWithOAuth } from '@privy-io/react-auth';
import { Loader2 } from 'lucide-react';

export default function GoogleLogin() {
  const { initOAuth, state } = useLoginWithOAuth({
    onComplete: ({ user, isNewUser }) => {
      console.log('Google login successful!', { user, isNewUser });
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await initOAuth({ provider: 'google' });
    } catch (error) {
      console.error('Error initiating Google OAuth:', error);
    }
  };

  const isLoading = state.status === 'loading';

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 sm:py-4 px-4 sm:px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base touch-manipulation"
        style={{
          backgroundColor: '#14303E',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FFFFFF',
          fontFamily: 'Inter',
          fontWeight: 500,
          minHeight: '44px'
        }}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
        ) : (
          <svg className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" viewBox="0 0 24 24">
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
        )}
        <span className="truncate">Continue with Google</span>
      </button>

      {state.status === 'error' && state.error && (
        <div className="mt-3 p-3 sm:p-4 rounded-lg border" style={{ backgroundColor: 'rgba(137, 234, 246, 0.1)', borderColor: '#89EAF6' }}>
          <p className="text-sm" style={{ color: '#89EAF6', fontFamily: 'Inter' }}>{state.error.message}</p>
        </div>
      )}
    </div>
  );
} 