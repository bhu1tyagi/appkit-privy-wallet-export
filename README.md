# Privy Wallet - Next.js Integration

A modern Next.js application that demonstrates Privy's authentication and wallet management capabilities, including email/Google login and private key export functionality.

## 🚀 Features

### Authentication
- **Email Authentication**: Sign in using email with OTP verification
- **Google OAuth**: One-click sign in with Google accounts
- **Secure Session Management**: Powered by Privy's authentication infrastructure

### Wallet Management
- **Embedded Wallets**: Automatically created for users upon signup
- **Multi-Chain Support**: Ethereum and Solana networks
- **Private Key Export**: Securely export private keys and seed phrases
- **Non-Custodial**: Users maintain full control of their assets

### User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time State Management**: React-based state updates
- **Security-First**: Built-in security warnings and best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Privy React Auth SDK
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Wallet Integration**: Wagmi + Viem
- **TypeScript**: Full type safety

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js 18+** installed
2. **npm** or **yarn** package manager
3. A **Privy account** and app ID ([Get one here](https://privy.io))
4. Optional: **Google OAuth credentials** for Google login

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd appkit-privy-wallet-export
npm install
```

### 2. Configure Privy

1. Visit [Privy Dashboard](https://dashboard.privy.io)
2. Create a new app or use an existing one
3. Copy your App ID from the dashboard

### 3. Environment Variables

Update the `.env.local` file with your Privy configuration:

```env
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your_actual_privy_app_id_here

# For production, replace with your actual domain
NEXT_PUBLIC_PRIVY_APP_URL=http://localhost:3000
```

### 4. Configure Authentication Methods

In your Privy Dashboard:

1. **Enable Email Authentication**:
   - Go to Authentication → Login Methods
   - Enable "Email" authentication
   - Configure email settings

2. **Enable Google OAuth** (Optional):
   - Go to Authentication → Login Methods
   - Enable "Google" authentication
   - Add your OAuth credentials
   - Set up redirect URLs: `http://localhost:3000` (for development)

### 5. Configure Embedded Wallets

In your Privy Dashboard:
1. Go to Wallets → Embedded Wallets
2. Enable embedded wallet creation
3. Configure supported chains (Ethereum, Solana)

### 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🎯 Usage Guide

### For Users

1. **Landing Page**: Visit the homepage to learn about the app
2. **Sign In**: Click "Get Started" or "Sign In"
3. **Choose Authentication**: 
   - Use email (enter email → verify OTP)
   - Or sign in with Google
4. **Dashboard**: View your profile and embedded wallet details
5. **Export Keys**: Securely export your private keys when needed

### For Developers

#### Key Components

- `src/components/providers/PrivyProvider.tsx` - Main Privy configuration
- `src/components/auth/EmailLogin.tsx` - Email authentication UI
- `src/components/auth/GoogleLogin.tsx` - Google OAuth UI
- `src/components/wallet/WalletExport.tsx` - Private key export functionality
- `src/components/user/UserProfile.tsx` - User profile and account management

#### Authentication Flow

```typescript
// Email Login Example
const { sendCode, loginWithCode, state } = useLoginWithEmail({
  onComplete: (user, isNewUser) => {
    console.log('Login successful!', { user, isNewUser });
  },
  onError: (error) => {
    console.error('Login error:', error);
  },
});

// Google OAuth Example
const { initOAuth, state } = useLoginWithOAuth({
  onSuccess: ({ user, isNewUser }) => {
    console.log('Google login successful!', { user, isNewUser });
  },
});

await initOAuth({ provider: 'google' });
```

#### Wallet Export

```typescript
// Export wallet functionality
const { exportWallet } = usePrivy();

const handleExport = async () => {
  try {
    await exportWallet(); // Opens secure modal for key export
  } catch (error) {
    console.error('Export failed:', error);
  }
};
```

## 🔐 Security Features

### Authentication Security
- **OTP Verification**: Email-based one-time passwords
- **OAuth 2.0**: Secure Google authentication flow
- **Session Management**: Automatic session handling and renewal

### Wallet Security
- **Client-Side Key Generation**: Private keys generated in the browser
- **Non-Custodial**: Users maintain full control of their private keys
- **Secure Export**: Keys exported on separate secure domain
- **Encryption**: All sensitive data encrypted in transit and at rest

### Best Practices Implemented
- **Security Warnings**: Clear warnings about private key handling
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Graceful error handling and user feedback
- **Type Safety**: Full TypeScript implementation

## 🚀 Deployment

### Environment Setup for Production

1. Update `.env.local` with production values:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_production_app_id
NEXT_PUBLIC_PRIVY_APP_URL=https://yourdomain.com
```

2. Configure Privy Dashboard for production:
   - Update allowed origins
   - Set production redirect URLs
   - Configure production authentication providers

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # User dashboard
│   ├── login/
│   │   └── page.tsx              # Authentication page
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Landing page
├── components/
│   ├── auth/
│   │   ├── EmailLogin.tsx        # Email authentication
│   │   └── GoogleLogin.tsx       # Google OAuth
│   ├── providers/
│   │   └── PrivyProvider.tsx     # Privy configuration
│   ├── user/
│   │   └── UserProfile.tsx       # User profile component
│   └── wallet/
│       └── WalletExport.tsx      # Wallet export functionality
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📖 API Reference

### Privy React Auth Hooks

- `usePrivy()` - Main Privy hook for authentication state
- `useLoginWithEmail()` - Email authentication flow
- `useLoginWithOAuth()` - OAuth authentication flow
- `useWallets()` - Wallet management and information

### Key Methods

- `sendCode({ email })` - Send OTP to email
- `loginWithCode({ code })` - Verify OTP and login
- `initOAuth({ provider })` - Initiate OAuth flow
- `exportWallet()` - Export private keys securely
- `logout()` - Sign out user

## 🆘 Troubleshooting

### Common Issues

1. **Privy App ID Not Found**
   - Ensure `NEXT_PUBLIC_PRIVY_APP_ID` is set correctly
   - Verify the App ID in Privy Dashboard

2. **Google OAuth Not Working**
   - Check Google OAuth configuration in Privy Dashboard
   - Verify redirect URLs match your domain

3. **Email OTP Not Received**
   - Check email configuration in Privy Dashboard
   - Verify email provider settings

4. **Wallet Export Fails**
   - Ensure user has an embedded wallet
   - Check browser compatibility (requires modern browser)

### Debug Mode

Enable debug mode by adding to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Privy Documentation](https://docs.privy.io)
- [Privy Dashboard](https://dashboard.privy.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Wagmi Documentation](https://wagmi.sh)

## 💬 Support

- [Privy Discord](https://discord.gg/privy)
- [Privy Support](https://support.privy.io)
- Create an issue in this repository

---

Built with ❤️ using [Privy](https://privy.io) and [Next.js](https://nextjs.org)
