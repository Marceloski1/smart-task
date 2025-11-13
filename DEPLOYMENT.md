# SmartTask Deployment Guide

This guide explains how to deploy SmartTask to **Cloudflare Pages** (current configuration) or **Vercel** (alternative), including differences between Next.js 15 and 16.

---

## Next.js Version Considerations

### Current Setup: Next.js 16

SmartTask uses **Next.js 16** which includes:
- **Turbopack** (stable) as default bundler
- **React 19.2 and 18.3** with View Transitions
- **Async params/searchParams** (breaking change - must be awaited)
- **Proxy.js** (replaces middleware.ts, backward compatible)
- **Cache Components** with `"use cache"` directive
- **React Compiler** support (stable)

### Compatibility Notes

**Cloudflare Pages:**
- Next.js 16 support is **partial** - waiting for `@cloudflare/next-on-pages` adapter updates
- Some features may not work until adapter is updated
- **Recommendation:** Use Next.js 15.5.6 for production stability on Cloudflare

**Vercel:**
- **Full Next.js 16 support** from day 1
- All features work natively without adapters

---

## Current Configuration: Cloudflare Pages

The project is configured for **Cloudflare Pages** using standard Next.js build.

### Prerequisites
- Cloudflare account
- GitHub repository connected to Cloudflare Pages
- Node.js 18+ installed locally

### Cloudflare Deployment Steps

1. **Create Cloudflare Pages Project**
   - Go to Cloudflare Dashboard > Pages
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `.next`
     - Root directory: `/`
     - Node version: `18` or higher

2. **Environment Variables** (if needed)
   Add in Cloudflare Pages project settings:
   - `NODE_VERSION=18`
   - Any custom environment variables for your app
   - `NEXT_PUBLIC_*` variables for client-side access

3. **Compatibility Flags** (if using server features)
   - Enable `nodejs_compat` in project settings for Node.js APIs

4. **GitHub Actions Setup** (Optional - for CI/CD)
   Add these secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`: From Cloudflare dashboard
   - `CLOUDFLARE_ACCOUNT_ID`: From Cloudflare dashboard URL

### Cloudflare Limitations with Next.js 16

- **Proxy.js** (new in Next.js 16) may have compatibility issues
- Server features work best with Edge Runtime: `export const runtime = "edge"`
- Some Next.js 16 features may not work until adapter is updated

### Files for Cloudflare

- `.github/workflows/ci.yml` - CI testing workflow
- `.github/workflows/deploy.yml` - Cloudflare Pages deployment
- `next.config.mjs` - Next.js configuration

---

## Alternative: Vercel Deployment

**Vercel is recommended if you want full Next.js 16 support immediately.**

### Why Choose Vercel?

- **Native Next.js 16 support** - all features work out of the box
- Zero configuration needed
- Automatic preview deployments for PRs
- Built-in analytics and Web Vitals
- Faster builds with Turbopack support
- No adapter or compatibility concerns

### Vercel Deployment Steps

#### Option 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js settings
4. Click **Deploy**
5. Done! Your app is live

#### Option 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (development)
vercel

# Deploy to production
vercel --prod
\`\`\`

### Vercel Configuration

**No configuration needed!** Vercel automatically:
- Detects Next.js framework
- Sets build command: `npm run build`
- Sets output directory: `.next`
- Configures caching and CDN
- Enables ISR and SSR

### Environment Variables (Vercel)

Add in: **Vercel Dashboard > Your Project > Settings > Environment Variables**

- Supports `NEXT_PUBLIC_*` for client-side
- Automatic encryption for secrets
- Preview/Production environment separation

---

## Migration: Cloudflare to Vercel

If you want to switch from Cloudflare to Vercel:

### Step 1: No Code Changes Needed

The app works on both platforms without modifications!

### Step 2: Deploy to Vercel

1. Keep your GitHub repository as-is
2. Import repository on Vercel dashboard
3. Deploy

### Step 3: Update DNS (Optional)

- Point your custom domain to Vercel instead of Cloudflare
- Both platforms provide DNS instructions

### Step 4: GitHub Actions (Optional)

- Disable `.github/workflows/deploy.yml` if using Vercel's automatic deployments
- Or update it to deploy to Vercel instead

---

## Comparison

| Feature | Cloudflare Pages | Vercel |
|---------|------------------|--------|
| **Next.js 16 Support** | Partial (waiting for updates) | ✅ Full native support |
| **Middleware/Proxy.js** | Limited | ✅ Full support |
| **Server Actions** | Edge Runtime recommended | ✅ Full support (all runtimes) |
| **ISR** | ✅ Supported | ✅ Supported |
| **SSR** | ✅ Supported | ✅ Supported |
| **Edge Functions** | ✅ Supported | ✅ Supported |
| **Build Speed** | Fast | Very Fast (Turbopack) |
| **Free Tier** | Generous | Generous |
| **Setup** | Medium | ✅ Zero config |
| **Analytics** | Free Web Analytics | Built-in (free on Pro) |
| **Preview Deploys** | ✅ PR previews | ✅ Automatic PR previews |
| **Custom Domains** | ✅ Free SSL | ✅ Free SSL |

---

## Recommendation

### For Production (Now)

**Use Vercel** if:
- You want guaranteed Next.js 16 compatibility
- You need all features to work immediately
- You want zero-config deployment
- You prefer built-in analytics

**Use Cloudflare Pages** if:
- You're comfortable with potential limitations
- You want Cloudflare's global network
- You're already using Cloudflare for DNS/CDN
- Cost optimization is critical (slightly cheaper at scale)

### For Future

Once `@cloudflare/next-on-pages` fully supports Next.js 16, both platforms will be equally viable.

---

## CI/CD

### Current Setup (GitHub Actions)

The project includes workflows for both:
- `.github/workflows/ci.yml` - Tests on every push
- `.github/workflows/deploy.yml` - Deploys to Cloudflare Pages

### Vercel Auto-Deploy

Vercel provides automatic deployments:
- **Every push to `main`** → Production deployment
- **Every PR** → Preview deployment with unique URL
- No GitHub Actions needed (but you can still use CI workflow)

---

## Performance Optimizations

Both platforms provide:
- ✅ Global CDN with edge caching
- ✅ Automatic HTTPS with free SSL
- ✅ Automatic image optimization
- ✅ Brotli compression
- ✅ HTTP/3 support
- ✅ Zero-downtime deployments

### SmartTask Optimizations

- Static generation where possible
- React Server Components for better performance
- Turbopack for faster builds (Next.js 16)
- Code splitting and lazy loading
- Optimized images with Next.js Image component

---

## Custom Domain Setup

### Cloudflare Pages

1. Go to Pages project > **Custom domains**
2. Click **Set up a custom domain**
3. Add your domain (e.g., `smarttask.com`)
4. Update DNS records as shown
5. SSL certificate auto-provisioned

### Vercel

1. Go to project > **Settings** > **Domains**
2. Add your domain
3. Configure DNS:
   - **A record**: Point to Vercel IP
   - **CNAME**: Point to `cname.vercel-dns.com`
4. SSL certificate auto-provisioned

---

## Monitoring & Analytics

### Cloudflare Pages

- **Web Analytics** (free): Real-time visitor metrics
- **Real User Monitoring** (RUM): Performance data
- **Logs**: Access logs in dashboard
- **Alerts**: Custom alerts for downtime

### Vercel

- **Vercel Analytics** (free on Pro): Page views, Web Vitals
- **Speed Insights**: Core Web Vitals tracking
- **Logs**: Real-time function logs
- **Deployment monitoring**: Build times and status

---

## Troubleshooting

### Cloudflare Issues

**Build fails with Next.js 16 features:**
- Check if feature is supported by current adapter
- Consider using Edge Runtime: `export const runtime = "edge"`
- Or downgrade to Next.js 15.5.6 temporarily

**Server Actions not working:**
- Ensure `nodejs_compat` flag is enabled
- Use Edge Runtime in route handlers

### Vercel Issues

**Environment variables not working:**
- Check variable names start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding variables

**Build fails:**
- Check Node.js version (should be 18+)
- Clear build cache in Vercel dashboard

---

## Getting Help

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **Vercel Docs**: https://vercel.com/docs/frameworks/nextjs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/yourusername/smarttask/issues

---

## Summary

**Current deployment:** Cloudflare Pages (works but with potential Next.js 16 limitations)

**Recommended for production:** Vercel (full Next.js 16 support, zero config)

**Switch anytime:** The app is platform-agnostic and works on both without code changes!
