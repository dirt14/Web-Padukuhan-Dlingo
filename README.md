# Website Dusun Dlingo

Website resmi Dusun Dlingo dengan sistem manajemen konten (CMS) untuk pengelolaan informasi dusun.

## Fitur

### Halaman Publik
- **Beranda** - Landing page dengan pengumuman dan kegiatan terbaru
- **Profil Desa** - Visi & Misi, Struktur Organisasi, Peta Lokasi
- **Kegiatan** - Bank Sampah, Pengajian, Karang Taruna, dan kegiatan lainnya
- **Pengumuman** - Informasi penting untuk warga
- **Galeri** - Foto-foto kegiatan dusun
- **Kontak** - Informasi kontak dan lokasi
- **Karang Taruna** - Profil dan kegiatan Karang Taruna

### Dashboard Admin
- Dashboard overview dengan statistik
- Kelola pengumuman (CRUD)
- Kelola kegiatan (CRUD)
- Kelola galeri foto
- Kelola profil desa
- Kelola struktur organisasi
- Kelola Karang Taruna
- Kelola notifikasi
- Pengaturan website

### Role User
1. **Pak Dukuh (ADMIN)** - Full access ke semua fitur
2. **Karang Taruna** - Akses terbatas untuk mengelola konten Karang Taruna

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite dengan Prisma ORM
- **Authentication**: NextAuth.js
- **Language**: TypeScript

## Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd Web-Padukuhan-Dlingo
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env
```

4. Generate Prisma client dan push schema
```bash
npm run db:generate
npm run db:push
```

5. Seed database dengan data awal
```bash
npm run db:seed
```

6. Jalankan development server
```bash
npm run dev
```

7. Buka http://localhost:3000

## Kredensial Default

### Pak Dukuh (Admin)
- Email: admin@dusundlingo.com
- Password: password123

### Karang Taruna
- Email: kt@dusundlingo.com
- Password: password123

## Struktur Folder

```
src/
├── app/
│   ├── (public)/          # Halaman publik
│   ├── admin/             # Dashboard admin
│   ├── api/               # API routes
│   └── login/             # Halaman login
├── components/
│   ├── admin/             # Komponen admin
│   └── ...                # Komponen umum
├── lib/
│   ├── auth.ts            # Konfigurasi NextAuth
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
```

## Build untuk Produksi

```bash
npm run build
npm start
```

## Lisensi

Hak cipta © 2025 Dusun Dlingo
