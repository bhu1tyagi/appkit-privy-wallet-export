'use client';

import { useState } from 'react';
import { useLoginWithEmail } from '@privy-io/react-auth';
import { Mail, Loader2 } from 'lucide-react';

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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Mail className="h-5 w-5" />
        Email Login
      </h3>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isAwaitingCode}
          />
        </div>

        {!isAwaitingCode ? (
          <button
            onClick={handleSendCode}
            disabled={!email || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Send Verification Code
          </button>
        ) : (
          <div className="space-y-3">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={!code || isLoading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Verify & Login
            </button>
          </div>
        )}

        {state.status === 'error' && state.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
} 