# Heru AI Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Brand colors and logos customized
- [ ] Product database updated with real products
- [ ] Archetype definitions reviewed
- [ ] Privacy policy updated
- [ ] Terms of service prepared
- [ ] Contact/advisor connection method ready
- [ ] Analytics configured
- [ ] Security headers set
- [ ] HTTPS enforced

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository
\`\`\`bash
git add .
git commit -m "Ready for production deployment"
git push origin main
\`\`\`

### Step 2: Connect to Vercel
1. Go to vercel.com
2. Click "Import Project"
3. Select GitHub repository
4. Configure project settings

### Step 3: Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
\`\`\`

### Step 4: Deploy
\`\`\`bash
vercel deploy --prod
\`\`\`

### Step 5: Verify
- [ ] Landing page loads
- [ ] Wellness assessment works
- [ ] Charts render correctly
- [ ] Forms submit properly
- [ ] Export functionality works
- [ ] Mobile responsive

## Custom Domain Setup

### Vercel Domain Management
1. Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS records
4. Verify domain

### Alternative DNS Setup
1. In your domain registrar
2. Add CNAME: `your-domain.com → cname.vercel.sh`
3. Wait for propagation (24-48 hours)

## Analytics Integration

### Google Analytics
Add to environment variables:
\`\`\`
NEXT_PUBLIC_GA_ID=your_measurement_id
\`\`\`

### Datadog / Other Monitoring
Add APM instrumentation in `middleware.ts` or API routes

## Performance Optimization for Production

### Image Optimization
\`\`\`typescript
import Image from 'next/image'
<Image 
  src="/logo.png"
  alt="Heru AI"
  width={200}
  height={200}
  priority
/>
\`\`\`

### Bundle Analysis
\`\`\`bash
npm run build -- --analyze
\`\`\`

### Monitoring
- Set up Vercel Analytics
- Monitor Core Web Vitals
- Track error rates
- Monitor API latency

## Security Hardening

### SSL/TLS
- [ ] HTTPS enforced
- [ ] HSTS headers configured
- [ ] Certificate auto-renewal enabled

### Content Security Policy
Add to `next.config.mjs`:
\`\`\`javascript
headers: [
  {
    source: '/:path*',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline';"
      }
    ]
  }
]
\`\`\`

### Rate Limiting
Implement rate limiting on API routes:
\`\`\`typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
\`\`\`

## Scaling Considerations

### Database (if using Supabase)
- Monitor connection pooling
- Optimize queries
- Set up read replicas
- Enable backups

### CDN & Caching
- Vercel's built-in CDN caches all routes
- Set cache-control headers:
  \`\`\`typescript
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  )
  \`\`\`

### Monitoring & Alerts
- Set up Sentry for error tracking
- Monitor performance metrics
- Alert on high error rates
- Track user adoption

## Rollback Procedure

### Vercel Rollback
1. Vercel Dashboard → Deployments
2. Find previous working version
3. Click three dots → Promote to Production

### Git Rollback
\`\`\`bash
git revert <commit-hash>
git push origin main
# Vercel auto-redeploys
\`\`\`

## Database Seeding (if using Supabase)

Create seeding script in `/scripts/seed.sql`:
\`\`\`sql
INSERT INTO products (name, category, risk_rating) VALUES
  ('HSI Equity Fund', 'Equities', 55),
  ('Investment Grade Bonds', 'Fixed Income', 25),
  -- Add all products
;
\`\`\`

## Maintenance & Updates

### Weekly
- Monitor error rates
- Check performance metrics
- Review user feedback

### Monthly
- Update dependencies: `npm update`
- Security audit: `npm audit`
- Backup data if using database

### Quarterly
- Feature review
- Performance optimization
- Security assessment
- Product database refresh

## Troubleshooting

### Deployment Fails
\`\`\`bash
# Check logs
vercel logs

# Rebuild with cache clear
vercel deploy --prod --force
\`\`\`

### Performance Issues
- Check Vercel Analytics
- Optimize large components
- Reduce bundle size
- Enable image optimization

### Build Errors
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
\`\`\`

## Monitoring & Observability

### Key Metrics to Track
- Page load time (target: < 2s)
- Time to interactive (target: < 3s)
- Core Web Vitals scores
- Error rate (target: < 0.1%)
- User conversion rate

### Set Up Alerts
- Vercel Alerts for failed deployments
- Error rate spike alerts (Sentry)
- Performance degradation alerts
- Uptime monitoring (UptimeRobot)

## Support & SLA

For production support:
- Email: support@heru.ai
- Response time: 2 hours
- Resolution time: 24 hours

---

*Last Updated: December 2025*
