# 🚀 Deployment Guide - Dusun Dlingo Website

> Panduan lengkap untuk deploy website ke production

## 📋 Daftar Isi

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Build & Deployment](#build--deployment)
- [Platform Deployment](#platform-deployment)
- [Post-Deployment](#post-deployment)
- [Maintenance](#maintenance)

---

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

**CRITICAL - Must Change:**
- [ ] `NEXTAUTH_SECRET` - Generate dengan: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Update ke domain production Anda
- [ ] `DATABASE_URL` - Gunakan production database (PostgreSQL/MySQL recommended)

**Optional:**
- [ ] Email configuration (jika akan ada fitur email)
- [ ] External API keys (Google Maps, Analytics, dll)

### 2. Database

- [ ] Pilih production database (PostgreSQL/MySQL)
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Seed initial data (admin user, settings)
- [ ] Backup strategy sudah ready

### 3. Security

- [ ] NEXTAUTH_SECRET adalah random & strong
- [ ] Password di database ter-hash (bcrypt)
- [ ] HTTPS enabled di production
- [ ] CORS configured properly
- [ ] Rate limiting (jika perlu)

### 4. Performance

- [ ] Images optimized (Next.js Image component)
- [ ] Static assets compressed
- [ ] Database indexed properly
- [ ] Caching strategy (jika perlu)

### 5. SEO & Meta

- [ ] Update sitemap.xml
- [ ] robots.txt configured
- [ ] Meta tags di semua pages
- [ ] Open Graph images
- [ ] Google Analytics (optional)

### 6. Testing

- [ ] Build production berhasil: `npm run build`
- [ ] Test semua routes
- [ ] Test authentication flow
- [ ] Test forms & validations
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Test di berbagai browser

---

## 🔐 Environment Variables

### Development (.env.local)

```env
DATABASE_URL="file:prisma/dev.db"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Production (.env.production)

```env
# Database - Use PostgreSQL or MySQL
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth - MUST BE SECURE!
NEXTAUTH_SECRET="<GENERATE_WITH_openssl_rand_-base64_32>"
NEXTAUTH_URL="https://yourdomain.com"

# Optional
EMAIL_SERVER="smtp://username:password@smtp.gmail.com:587"
EMAIL_FROM="noreply@yourdomain.com"
```

### Generate Secure Secret

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Atau gunakan online generator (pastikan trusted)
# https://generate-secret.vercel.app/32
```

---

## 💾 Database Setup

### Option 1: PostgreSQL (Recommended for Production)

**1. Install PostgreSQL**
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

**2. Create Database**
```bash
sudo -u postgres psql
CREATE DATABASE dusun_dlingo;
CREATE USER dlingo_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dusun_dlingo TO dlingo_user;
\q
```

**3. Update .env**
```env
DATABASE_URL="postgresql://dlingo_user:your_password@localhost:5432/dusun_dlingo"
```

**4. Run Migrations**
```bash
npx prisma migrate deploy
npx prisma db seed  # If you have seed script
```

### Option 2: MySQL

**1. Create Database**
```sql
CREATE DATABASE dusun_dlingo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dlingo_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON dusun_dlingo.* TO 'dlingo_user'@'localhost';
FLUSH PRIVILEGES;
```

**2. Update .env**
```env
DATABASE_URL="mysql://dlingo_user:your_password@localhost:3306/dusun_dlingo"
```

**3. Run Migrations**
```bash
npx prisma migrate deploy
```

### Option 3: SQLite (Development Only)

```env
DATABASE_URL="file:./prisma/dev.db"
```

**NOT recommended for production** due to concurrency limitations.

---

## 🏗️ Build & Deployment

### Local Build Test

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Run migrations
npx prisma migrate deploy

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

### Build Output

```
Route                               Size      First Load JS
┌ ○ /                               1.59 kB        89.9 kB
├ ○ /admin                          33.5 kB         145 kB
├ ○ /data/demografi                 115 kB          203 kB
└ ... (other routes)

✓ Build successful
```

---

## 🌐 Platform Deployment

### Vercel (Recommended - Easiest)

**1. Install Vercel CLI**
```bash
npm i -g vercel
```

**2. Deploy**
```bash
# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

**3. Set Environment Variables**
```bash
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add DATABASE_URL
```

**Or via Vercel Dashboard:**
1. Go to Project Settings
2. Environment Variables
3. Add all variables from `.env.example`
4. Redeploy

**4. Database Setup (Vercel Postgres)**
```bash
# Install Vercel Postgres
vercel postgres create

# Connect to project
vercel link

# Get connection string
# Add to environment variables
```

---

### Netlify

**1. Build Settings**
```
Build command: npm run build
Publish directory: .next
```

**2. Environment Variables**
- Go to Site Settings > Environment Variables
- Add all variables from `.env.example`

**3. Functions (for API routes)**
```bash
npm install -D @netlify/plugin-nextjs
```

Add to `netlify.toml`:
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Railway

**1. Create Project**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

**2. Add PostgreSQL**
```bash
railway add postgresql
```

**3. Environment Variables**
```bash
railway variables set NEXTAUTH_SECRET="your-secret"
railway variables set NEXTAUTH_URL="https://your-app.railway.app"
```

---

### VPS (Ubuntu/Debian)

**1. Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Install PM2 (Process Manager)**
```bash
sudo npm install -g pm2
```

**3. Clone & Setup**
```bash
git clone https://github.com/yourusername/dusun-dlingo.git
cd dusun-dlingo
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
```

**4. Start with PM2**
```bash
pm2 start npm --name "dusun-dlingo" -- start
pm2 save
pm2 startup
```

**5. Setup Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**6. SSL with Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 📊 Post-Deployment

### 1. Health Check

- [ ] Website accessible via domain
- [ ] HTTPS working (SSL certificate)
- [ ] All pages load correctly
- [ ] Images loading properly
- [ ] Forms submitting successfully
- [ ] Admin login working
- [ ] Database connections stable

### 2. Create Admin User

```bash
# Via Prisma Studio
npx prisma studio

# Or via database
# Hash password first dengan bcrypt
# INSERT INTO User (email, password, name, role) VALUES (...)
```

### 3. Initial Configuration

- [ ] Login ke admin panel
- [ ] Update Site Settings (nama, contact, dll)
- [ ] Upload hero images
- [ ] Add initial content (pengumuman, kegiatan)
- [ ] Test all admin features

### 4. Monitoring Setup

**Option 1: Vercel Analytics**
- Enable di Vercel Dashboard
- Real-time traffic & performance

**Option 2: Google Analytics**
```tsx
// Add to app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

**Option 3: Sentry (Error Tracking)**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 🔧 Maintenance

### Regular Tasks

**Daily:**
- [ ] Monitor error logs
- [ ] Check website uptime
- [ ] Respond to user suggestions (kotak saran)

**Weekly:**
- [ ] Database backup
- [ ] Check performance metrics
- [ ] Update content (pengumuman, kegiatan)

**Monthly:**
- [ ] Update dependencies: `npm outdated && npm update`
- [ ] Review security advisories
- [ ] Analyze traffic & user behavior

### Backup Strategy

**Database Backup (PostgreSQL)**
```bash
# Create backup
pg_dump -U dlingo_user -d dusun_dlingo > backup_$(date +%Y%m%d).sql

# Restore
psql -U dlingo_user -d dusun_dlingo < backup_20260111.sql
```

**Automated Backup (Cron Job)**
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /usr/bin/pg_dump -U dlingo_user dusun_dlingo > /backups/db_$(date +\%Y\%m\%d).sql
```

**Upload Backup**
```bash
# Weekly backup to external storage
0 0 * * 0 tar -czf uploads_$(date +\%Y\%m\%d).tar.gz /path/to/public/uploads
```

### Update Process

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install new dependencies
npm install

# 3. Run migrations (if any)
npx prisma migrate deploy

# 4. Rebuild
npm run build

# 5. Restart (PM2)
pm2 restart dusun-dlingo

# Or (Systemd)
sudo systemctl restart dusun-dlingo
```

---

## 🐛 Troubleshooting

### Build Errors

**Error: "Module not found"**
```bash
# Clear cache & reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Error: "Prisma Client not generated"**
```bash
npx prisma generate
npm run build
```

### Runtime Errors

**Error: "NEXTAUTH_SECRET is not set"**
```bash
# Set environment variable
export NEXTAUTH_SECRET="your-secret"
# Or add to .env file
```

**Error: "Database connection failed"**
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db pull
```

### Performance Issues

**Slow Page Load**
1. Enable caching
2. Optimize images (use Next.js Image)
3. Add CDN (Cloudflare, etc)
4. Database indexing

**High Memory Usage**
```bash
# Check Node.js memory
node --max-old-space-size=2048 server.js

# Monitor with PM2
pm2 monit
```

---

## 📱 Mobile App (Future)

Jika ingin membuat mobile app:

**Option 1: React Native (Expo)**
- Reuse React components
- Share business logic

**Option 2: Progressive Web App (PWA)**
- Add `manifest.json`
- Service worker for offline
- "Add to Home Screen"

---

## 🔒 Security Best Practices

### Production Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] NEXTAUTH_SECRET is strong & random
- [ ] Database credentials are secure
- [ ] Admin password is strong
- [ ] File upload validation enabled
- [ ] Rate limiting on API routes
- [ ] CORS configured properly
- [ ] Security headers (Helmet.js)
- [ ] Regular dependency updates
- [ ] Error messages don't leak sensitive info

### Security Headers

Add to `next.config.js`:
```js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ]
},
```

---

## 📞 Support

**Documentation:**
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Production](https://next-auth.js.org/deployment)

**Troubleshooting:**
- Check application logs
- Review error messages
- Test in development first
- Consult platform documentation

---

## ✅ Quick Start Deployment

**Fastest way to deploy (Vercel):**

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dusun-dlingo.git
git push -u origin main

# 2. Import to Vercel
# Go to vercel.com
# Click "Import Project"
# Select your GitHub repo
# Add environment variables
# Deploy!
```

**Done in 5 minutes!** ⚡

---

**Version:** 1.0.0
**Last Updated:** 2026-01-11
**Ready for Production:** ✅
