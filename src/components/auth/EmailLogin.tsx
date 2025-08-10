'use client';

import { useState } from 'react';
import { useLoginWithEmail } from '@privy-io/react-auth';
import { Mail, Loader2 } from 'lucide-react';
import COLORS from '@/assets/colors';

export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const { sendCode, loginWithCode, state } = useLoginWithEmail({
    onComplete: ({ user, isNewUser }) => {
      console.log('Email login successful!', { user, isNewUser });
    },
    onError: (error) => {
      console.error('Email login error:', error);
    },
  });

  const handleSendCode = async () => {
    if (!email) return;
    try {
      await sendCode({ email });
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleLogin = async () => {
    if (!code) return;
    try {
      await loginWithCode({ code });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const isLoading = state.status === 'sending-code';
  const isAwaitingCode = state.status === 'awaiting-code-input';

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base touch-manipulation"
            style={{ 
              backgroundColor: COLORS.lightBackground,
              border: `1px solid ${COLORS.borderDarkColor}`,
              color: COLORS.white,
              fontFamily: 'Inter',
              fontWeight: 400,
              minHeight: '44px'
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.brandPrimary}
            onBlur={(e) => e.target.style.borderColor = COLORS.borderDarkColor}
            disabled={isAwaitingCode}
          />
        </div>

        {!isAwaitingCode ? (
          <button
            onClick={handleSendCode}
            disabled={!email || isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium touch-manipulation"
            style={{
              backgroundColor: COLORS.brandPrimary,
              color: COLORS.textDark,
              fontFamily: 'Inter',
              fontWeight: 600,
              minHeight: '44px'
            }}
          >
            {isLoading && <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />}
            <span>Send Code</span>
          </button>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Verification code"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base touch-manipulation"
              style={{ 
                backgroundColor: COLORS.lightBackground,
                border: `1px solid ${COLORS.borderDarkColor}`,
                color: COLORS.white,
                fontFamily: 'Inter',
                fontWeight: 400,
                minHeight: '44px'
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.brandPrimary}
              onBlur={(e) => e.target.style.borderColor = COLORS.borderDarkColor}
            />
            <button
              onClick={handleLogin}
              disabled={!code || isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium touch-manipulation"
              style={{
                backgroundColor: COLORS.brandPurple,
                color: COLORS.white,
                fontFamily: 'Inter',
                fontWeight: 600,
                minHeight: '44px'
              }}
            >
              {isLoading && <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />}
              <span>Verify & Sign In</span>
            </button>
          </div>
        )}

        {state.status === 'error' && state.error && (
          <div className="p-3 sm:p-4 rounded-lg border" style={{ backgroundColor: COLORS.brandPrimaryLight, borderColor: COLORS.brandBlue }}>
            <p className="text-sm" style={{ color: COLORS.brandBlue, fontFamily: 'Inter' }}>{state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
} 