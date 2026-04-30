# Dodo Payments Supabase Subscription Starter

<img src="./public/readme-banner.png" />

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/dodopayments/dodo-supabase-subscription-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,DATABASE_URL,DODO_PAYMENTS_API_KEY,DODO_WEBHOOK_SECRET,DODO_PAYMENTS_ENVIRONMENT">
    <img src="https://img.shields.io/badge/Vercel-Deploy-red?logo=vercel" alt="Deploy on Vercel" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-GPLv3-blue.svg" alt="License: GPLv3" />
  </a>
  <a href="https://docs.dodopayments.com">
    <img src="https://img.shields.io/badge/docs-live-brightgreen.svg" alt="Live Documentation" />
  </a>
  <a href="https://discord.gg/bYqAp4ayYh">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Chat on Discord" />
  </a>
</p>

A **minimal subscription starter kit** built with **Next.js**, **Supabase**, and **Dodo Payments**.
This boilerplate helps you quickly set up a subscription-based SaaS with authentication, payments, and webhooks.

---

## 🎥 Demo

![Demo](./assets/demo.gif)

---

## 🚀 Features

- 🔑 **Authentication**: Google OAuth integration via Supabase
- 💳 **Payment Processing**: Complete subscription management with Dodo Payments
- 📦 **Dynamic Plans**: Products with configurable features via metadata
- 📡 **Webhook Integration**: Real-time subscription lifecycle events via Supabase functions
- 🗄️ **Database Management**: PostgreSQL with Drizzle ORM
- 🎨 **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS
- 📊 **Dashboard**: Comprehensive subscription and billing management
- 📜 **Invoice History**: Complete payment and billing tracking

---

## 📦 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) or **Bun** (v1.0 or higher)
- **Git** for cloning the repository
- A **Supabase** account ([sign up here](https://app.supabase.com))
- A **Dodo Payments** account ([sign up here](https://dashboard.dodopayments.com))
- **Google Cloud Console** account (for OAuth setup)

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/dodopayments/dodo-supabase-subscription-starter.git
cd dodo-supabase-subscription-starter

# Install dependencies
bun install
# or
npm install
# or
pnpm install
```

### 2. Create a Supabase Project

1. Go to [Supabase](https://app.supabase.com) and create a new project
2. Wait for the project to be fully provisioned (this may take 2-3 minutes)
3. Go to **Settings** → **API** and copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Anon/Public Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **Service Role Key** (for webhook function)
4. Go to **Settings** → **Database** and copy the **Connection String** (DATABASE_URL)

### 3. Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set authorized redirect URIs to: `https://[your-project-ref].supabase.co/auth/v1/callback`
6. Copy the **Client ID** and **Client Secret**
7. In Supabase, go to **Authentication** → **Providers** → **Google**
8. Enable Google provider and add your Client ID and Secret

### 4. Setup Dodo Payments

1. Create an account at [Dodo Payments](https://app.dodopayments.com/signup)
2. Go to **Settings** → **API Keys** and copy your API key
3. Go to **Settings** → **Webhooks** and copy the webhook secret

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-key

# Database URL (from Supabase Settings → Database)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Dodo Payments Configuration
DODO_PAYMENTS_API_KEY=your-dodo-api-key
DODO_WEBHOOK_SECRET=your-webhook-secret
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

### 6. Setup Database Schema

```bash
# Push the database schema to Supabase
bun run db:push
# or
npm run db:push
# or
pnpm run db:push
```

This creates the necessary tables: `users`, `subscriptions`, and `payments`.

### 7. Deploy Webhook Handler

```bash
# Login to Supabase (you'll be prompted to authenticate)
bunx supabase login
# or
npx supabase login

# Deploy the webhook function
bun run deploy:webhook --project-ref [your-project-ref]
# or
npm run deploy:webhook -- --project-ref [your-project-ref]
# or
pnpm run deploy:webhook --project-ref [your-project-ref]
```

**Note**: Replace `[your-project-ref]` with your actual Supabase project reference ID (found in your project URL).

### 8. Configure Webhook in Dodo Payments

1. In your Dodo Payments dashboard, go to **Settings** → **Webhooks**
2. Add a new webhook endpoint with this URL:
   ```
   https://[your-project-ref].supabase.co/functions/v1/dodo-webhook
   ```
3. Select all payment and subscription events
4. Save the webhook configuration

### 9. Create Products in Dodo Payments

In your **Dodo Payments dashboard**:

1. Go to **Products** → **Create Product**
2. Fill in the basic product information (name, price, billing cycle)
3. In the **Metadata** section, add:
   ```json
   {
     "features": ["Feature 1", "Feature 2", "Feature 3"]
   }
   ```
4. Save the product

The `features` array will be dynamically displayed in your application's pricing UI.

### 10. Run the Development Server

```bash
# Start the development server
bun run dev
# or
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🎯 Assumptions, Trade-offs, and Development Time

### Assumptions

- **Google OAuth only** - Additional auth providers require extra setup
- **Dodo Payments integration** - Built specifically for Dodo, switching payment providers needs significant changes
- **Subscription model** - Designed for recurring payments, not one-time purchases
- **Serverless deployment** - Optimized for Vercel, traditional servers may need adjustments

### Trade-offs

- ✅ **Fast setup** vs ❌ **Limited flexibility** - Quick to deploy but harder to customize
- ✅ **Managed services** vs ❌ **Vendor lock-in** - Faster development but dependent on third parties
- ✅ **Modern stack** vs ❌ **Learning curve** - Great DX but requires familiarity with latest tools

---

### ▲ Deploy with Vercel

You can deploy this project instantly using the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dodopayments/dodo-supabase-subscription-starter&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,DATABASE_URL,DODO_PAYMENTS_API_KEY,DODO_WEBHOOK_SECRET,DODO_PAYMENTS_ENVIRONMENT)

---

### 👤 Original Author

This project was originally created by [Darshan Gowda](https://github.com/darshansrc).

