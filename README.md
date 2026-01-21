# Website Dusun Dlingo

> Portal Informasi Resmi Dusun Dlingo - Modern, Responsive, & User-Friendly

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)

Website resmi Dusun Dlingo yang menyediakan informasi lengkap untuk warga meliputi pengumuman, kegiatan, galeri, data demografi, portal edukasi, dan berbagai layanan digital lainnya.

---

## Fitur

### Fitur Publik
- **Beranda** - Hero section dengan carousel, statistik warga dinamis, pengumuman terbaru, kegiatan terbaru, artikel edukasi dengan animasi scroll reveal
- **Profil Desa** - Visi & misi, struktur organisasi dusun
- **Pengumuman** - Informasi & pengumuman penting dengan filter kategori (Bantuan Sosial, Kesehatan, Kegiatan Dusun, Umum)
- **Kegiatan** - Jadwal & dokumentasi kegiatan dusun dengan kategori (Sosial, Keagamaan, Budaya, Lainnya)
- **Karang Taruna** - Profil organisasi pemuda, visi misi, program kerja, dan struktur pengurus
- **Data Demografi** - Visualisasi data penduduk dengan charts interaktif (populasi, gender, usia, pendidikan, pekerjaan, per RT)
- **Portal Edukasi** - Artikel edukatif dengan kategori (Kesehatan, Pertanian, Kewirausahaan, Pendidikan, Lainnya) dan sistem komentar
- **Galeri** - Album foto & dokumentasi kegiatan dengan lightbox viewer
- **Kotak Saran** - Formulir saran & masukan dari warga dengan kategori
- **Kontak** - Informasi kontak dusun, peta lokasi, dan form kontak

### Fitur Admin
- **Dashboard** - Statistik & overview dengan quick actions
- **Profil Dusun** - Edit visi, misi, dan informasi dusun
- **Struktur Organisasi** - CRUD struktur pengurus dusun dan karang taruna
- **Pengumuman** - CRUD pengumuman dengan rich text editor, kurun waktu aktif, dan notifikasi
- **Kegiatan** - CRUD kegiatan dengan upload foto dokumentasi otomatis
- **Karang Taruna** - Edit profil, visi misi, dan program kerja
- **Data Demografi** - Input & update data demografi penduduk per tahun
- **Edukasi** - CRUD artikel edukatif dengan rich text editor
- **Galeri** - Manajemen album dan foto
- **Kotak Saran** - Review, respond, dan manage saran warga
- **Pengaturan** - Konfigurasi website:
  - Nama situs & tagline
  - Hero images (1-3 gambar)
  - Informasi kontak (Pak Dukuh, Karang Taruna, Sekretariat)
  - Social media links
  - Feature toggles (show/hide menu)

### Fitur Tambahan
- **Scroll Animations** - Animasi reveal saat scroll di halaman beranda
- **Dynamic Statistics** - Data statistik warga dan program aktif diambil langsung dari database
- **Rich Text Editor** - Editor Quill untuk konten pengumuman, kegiatan, dan artikel
- **Role-based Access** - User roles (ADMIN/Pak Dukuh & KARANG_TARUNA)
- **Dynamic Navigation** - Menu navbar menyesuaikan dengan pengaturan fitur
- **Responsive Design** - Mobile-first design dengan navigasi mobile yang smooth

### Design System
- **Modern UI/UX** - Clean, minimalist, professional
- **Fully Responsive** - Mobile-first design
- **Reusable Components** - Button, Card, Input, Badge, Alert, Spinner, Skeleton, EmptyState
- **Consistent Color Palette** - Primary (Blue), Success (Green), Warning (Amber), Danger (Red), Info (Purple)
- **Inter Font** - Modern & readable typography
- **Smooth Animations** - Micro-interactions, transitions, scroll reveal effects

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Custom component library
- **Icons:** Lucide React
- **Charts:** Recharts
- **Rich Text:** React Quill

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

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

---

## Installation

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
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed database
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
dusun-dlingo/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Database seeder
│   └── dev.db                 # SQLite database (dev)
├── public/
│   ├── images/                # Static images
│   └── uploads/               # User uploads
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── profil/            # Visi-misi, struktur
│   │   │   ├── pengumuman/        # Pengumuman list & detail
│   │   │   ├── kegiatan/          # Kegiatan list & detail
│   │   │   ├── karang-taruna/     # Profil karang taruna
│   │   │   ├── data/demografi/    # Data demografi
│   │   │   ├── edukasi/           # Artikel edukasi
│   │   │   ├── galeri/            # Galeri foto
│   │   │   ├── informasi/saran/   # Kotak saran
│   │   │   └── kontak/            # Halaman kontak
│   │   ├── admin/             # Admin panel
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── profil/            # Edit profil dusun
│   │   │   ├── struktur/          # Struktur organisasi
│   │   │   ├── pengumuman/        # CRUD pengumuman
│   │   │   ├── kegiatan/          # CRUD kegiatan
│   │   │   ├── karang-taruna/     # Edit karang taruna
│   │   │   ├── demografi/         # Edit demografi
│   │   │   ├── edukasi/           # CRUD artikel
│   │   │   ├── galeri/            # Manajemen galeri
│   │   │   ├── saran/             # Manajemen saran
│   │   │   └── pengaturan/        # Site settings
│   │   ├── api/               # API routes
│   │   │   ├── admin/             # Admin APIs
│   │   │   ├── articles/          # Public article APIs
│   │   │   ├── auth/              # NextAuth routes
│   │   │   └── upload/            # File upload
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── admin/             # Admin components
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── DeleteButton.tsx
│   │   ├── HomeContent.tsx    # Homepage client component
│   │   ├── ScrollReveal.tsx   # Scroll animation component
│   │   ├── RichTextEditor.tsx # Quill editor wrapper
│   │   ├── ArticleComments.tsx # Comment system
│   │   ├── Navbar.tsx         # Navigation
│   │   └── Footer.tsx         # Footer
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── db.ts              # Prisma client
│   │   └── utils.ts           # Utility functions
│   └── types/
├── .env.example               # Environment template
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
└── README.md                  # This file
```

---

## Database Schema

### Core Models
- **User** - Admin users (ADMIN/KARANG_TARUNA roles)
- **Announcement** - Pengumuman dengan kategori dan kurun waktu aktif
- **Activity** - Kegiatan dusun dengan foto dokumentasi
- **Photo/Album** - Galeri foto
- **VillageProfile** - Profil dusun (visi, misi, dll)
- **OrganizationMember** - Struktur organisasi (dusun & karang taruna)
- **KarangTarunaProfile** - Profil khusus karang taruna
- **Demographics** - Data demografi per tahun
- **Article** - Artikel edukasi dengan komentar
- **Suggestion** - Kotak saran warga
- **SiteSettings** - Pengaturan website
- **Notification** - Notifikasi site-wide

---

## API Endpoints

### Public APIs
- `GET /api/articles` - List published articles
- `GET /api/articles/[slug]` - Get article detail
- `POST /api/articles/[slug]/comments` - Add comment to article

### Admin APIs (Protected)
- `GET/POST /api/admin/announcements` - CRUD pengumuman
- `GET/PUT/DELETE /api/admin/announcements/[id]` - Single pengumuman
- `GET/POST /api/admin/activities` - CRUD kegiatan
- `GET/PUT/DELETE /api/admin/activitys/[id]` - Single kegiatan
- `GET/POST /api/admin/articles` - CRUD artikel
- `GET/PUT/DELETE /api/admin/articles/[id]` - Single artikel
- `GET/PUT /api/admin/demographics` - Data demografi
- `GET/PUT /api/admin/settings` - Site settings
- `GET/POST /api/admin/notifications` - Notifikasi
- `POST /api/upload` - File upload

---

## Testing

```bash
# Run build test
npm run build

# Run development mode
npm run dev

# Lint code
npm run lint
```

---

## Deployment

### Quick Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables for Production
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-a-secure-random-string"
NEXTAUTH_URL="https://your-domain.com"
```

---

## Default Admin Login

**Development only:**
```
Email: admin@dusundlingo.com
Password: admin123
```

**IMPORTANT:** Change password immediately in production!

---

## Security

- Password hashing dengan bcrypt
- Session-based authentication (NextAuth)
- CSRF protection built-in
- SQL injection prevention (Prisma)
- XSS prevention (React escaping)
- Protected API routes with auth checks
- Environment variables for secrets
- HTTPS recommended for production

---

## Menu Order

### Public Navigation
1. Beranda
2. Profil (Visi & Misi, Struktur Organisasi)
3. Pengumuman
4. Kegiatan
5. Karang Taruna
6. Demografi
7. Edukasi
8. Galeri
9. Kotak Saran
10. Kontak

### Admin Sidebar
1. Dashboard
2. Profil Dusun
3. Struktur Organisasi
4. Pengumuman
5. Kegiatan
6. Karang Taruna
7. Data Demografi
8. Edukasi
9. Galeri
10. Kotak Saran
11. Pengaturan

---

## Support

**Issues & Bug Reports:**
- GitHub Issues: [Create an issue](https://github.com/yourusername/dusun-dlingo/issues)

---

**Website Dusun Dlingo** | Built with Next.js & TypeScript
**Version:** 1.0.0 | **Last Updated:** 2026-01-18
