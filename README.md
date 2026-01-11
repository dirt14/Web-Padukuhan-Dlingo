# 🏡 Website Dusun Dlingo

> Portal Informasi Resmi Dusun Dlingo - Modern, Responsive, & User-Friendly

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)

Website resmi Dusun Dlingo yang menyediakan informasi lengkap untuk warga meliputi pengumuman, kegiatan, galeri, data demografi, forum diskusi, dan berbagai layanan digital lainnya.

---

## ✨ Features

### 🎯 Public Features
- **Homepage** - Hero carousel, pengumuman terbaru, kegiatan terbaru
- **Pengumuman** - Informasi & pengumuman penting dari dusun
- **Kegiatan** - Jadwal & dokumentasi kegiatan dusun
  - Bank Sampah
  - Pengajian
  - Karang Taruna
- **Galeri** - Album foto & dokumentasi kegiatan
- **Data Demografi** - Visualisasi data penduduk dengan charts interaktif
- **Forum Diskusi** - Platform diskusi untuk warga (optional)
- **Portal Edukasi** - Artikel edukasi untuk warga (optional)
- **Kotak Saran** - Formulir saran & masukan dari warga
- **Profil Dusun** - Visi & misi, struktur organisasi
- **Kontak** - Informasi kontak dusun

### 🔐 Admin Features
- **Dashboard** - Statistik & overview
- **Content Management** - CRUD untuk semua konten
  - Pengumuman
  - Kegiatan
  - Galeri (album & foto)
  - Profil & struktur organisasi
- **Notification Management** - Notifikasi site-wide
- **Demographics Management** - Input & update data demografi
- **Suggestion Management** - Review & manage saran warga
- **Settings** - Konfigurasi website
  - Site name & tagline
  - Contact information
  - Social media links
  - Feature toggles (show/hide menu)
  - Hero images (1-3 images)
  - Footer content

### 🎨 Design System
- **Modern UI/UX** - Clean, minimalist, professional
- **Fully Responsive** - Mobile-first design
- **8 Reusable Components** - Button, Card, Input, Badge, Alert, Spinner, Skeleton, EmptyState
- **Consistent Color Palette** - Primary (Blue), Success (Green), Warning (Amber), Danger (Red), Info (Purple)
- **Inter Font** - Modern & readable typography
- **Smooth Animations** - Micro-interactions & transitions
- **Light Mode Only** - Optimized single theme

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Custom component library (`/src/components/ui`)
- **Icons:** Lucide React
- **Charts:** Recharts

### Backend
- **API:** Next.js API Routes
- **ORM:** Prisma 5.22
- **Database:** SQLite (dev) / PostgreSQL (production)
- **Authentication:** NextAuth.js 4.24
- **Password:** bcryptjs
- **Image Optimization:** Sharp

### DevOps
- **Package Manager:** npm
- **Build Tool:** Next.js build
- **Deployment:** Vercel (recommended)

---

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

---

## 🛠️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/dusun-dlingo.git
cd dusun-dlingo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
# Copy example env
cp .env.example .env

# Edit .env with your values
nano .env
```

Required variables:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
dusun-dlingo/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── dev.db                 # SQLite database (dev)
├── public/
│   ├── images/                # Static images
│   ├── uploads/               # User uploads
│   └── robots.txt             # SEO
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin panel
│   │   ├── api/               # API routes
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── sitemap.ts         # Dynamic sitemap
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── admin/             # Admin components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── db.ts              # Prisma client
│   │   └── utils.ts
│   └── types/
├── .env.example               # Environment template
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── DESIGN_SYSTEM.md           # Design system guide
├── DEPLOYMENT.md              # Deployment guide
├── PRODUCTION_CHECKLIST.md    # Pre-launch checklist
└── README.md                  # This file
```

---

## 🎨 Design System

Comprehensive design system dengan:

- **Color Palette** - Primary, Success, Warning, Danger, Info, Gray
- **Typography** - Inter font, 9 size scales
- **Components** - 8 reusable React components
- **Animations** - Fade, slide, scale, pulse
- **Responsive** - Mobile-first breakpoints

📖 **Full Documentation:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 📚 Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system guide
- **[UI_UX_IMPROVEMENTS.md](./UI_UX_IMPROVEMENTS.md)** - UI/UX enhancements summary
- **[QUICK_START_UI.md](./QUICK_START_UI.md)** - Quick reference for UI components
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide (Vercel, VPS, etc)
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Pre-launch checklist
- **[src/components/ui/README.md](./src/components/ui/README.md)** - Component API reference

---

## 🧪 Testing

```bash
# Run build test
npm run build

# Run development mode
npm run dev

# Lint code
npm run lint
```

---

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms

- **Netlify** - Connect GitHub repo, auto-deploy
- **Railway** - One-click deploy with database
- **VPS** - Ubuntu/Debian with PM2 & Nginx

📖 **Full Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔐 Default Admin Login

**Development only:**
```
Email: admin@dusundlingo.com
Password: admin123
```

⚠️ **IMPORTANT:** Change password immediately in production!

---

## 🛡️ Security

- ✅ Password hashing dengan bcrypt
- ✅ Session-based authentication (NextAuth)
- ✅ CSRF protection built-in
- ✅ SQL injection prevention (Prisma)
- ✅ XSS prevention (React escaping)
- ✅ Environment variables for secrets
- ✅ HTTPS recommended for production

---

## 🔄 Update & Maintenance

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update packages
npm update
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Deploy to production
npx prisma migrate deploy
```

### Backup Database

```bash
# PostgreSQL
pg_dump -U user -d database > backup.sql

# SQLite
cp prisma/dev.db backup/dev_backup_$(date +%Y%m%d).db
```

---

## 📞 Support

**Issues & Bug Reports:**
- GitHub Issues: [Create an issue](https://github.com/yourusername/dusun-dlingo/issues)

**Contact:**
- Email: dusundlingo@gmail.com
- Phone: +62 812 3456 7890

---

## 🗺️ Roadmap

### Version 1.0 (Current) ✅
- [x] Public website dengan semua fitur
- [x] Admin panel lengkap
- [x] Modern UI/UX design system
- [x] Responsive design
- [x] SEO optimization

### Version 1.1 (Planned)
- [ ] Email notifications
- [ ] PWA (Progressive Web App)
- [ ] Advanced search functionality
- [ ] Export data (PDF, Excel)

### Version 2.0 (Future)
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Payment integration

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Website Dusun Dlingo** | Built with ❤️ using Next.js & TypeScript
**Version:** 1.0.0 | **Last Updated:** 2026-01-11
