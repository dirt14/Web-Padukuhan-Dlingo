# 🎨 Design System - Dusun Dlingo Website

> Modern, minimalist, and professional design system untuk website Dusun Dlingo

## 📋 Daftar Isi

- [Filosofi Desain](#filosofi-desain)
- [Warna](#warna)
- [Typography](#typography)
- [Spacing](#spacing)
- [Komponen UI](#komponen-ui)
- [Animasi](#animasi)
- [Responsiveness](#responsiveness)
- [Best Practices](#best-practices)

---

## 🎯 Filosofi Desain

### Prinsip Utama

1. **Modern & Minimalis** - Tampilan bersih tanpa elemen berlebihan
2. **User-Friendly** - Mudah digunakan untuk semua kalangan
3. **Konsisten** - Pola desain yang seragam di seluruh aplikasi
4. **Responsif** - Sempurna di desktop, tablet, dan mobile
5. **Accessible** - Dapat diakses oleh semua pengguna
6. **Light Mode Only** - Fokus pada satu tema yang optimal

### Hierarki Visual

```
1. Hero / Header → Perhatian pertama
2. Navigation → Akses mudah ke semua fitur
3. Content → Informasi utama
4. CTA (Call-to-Action) → Aksi yang diharapkan
5. Footer → Informasi sekunder
```

---

## 🎨 Warna

### Primary Colors (Blue)

Digunakan untuk brand identity, buttons, links, dan active states.

```css
primary-50:  #f0f9ff  /* Background highlight */
primary-100: #e0f2fe  /* Light background */
primary-200: #bae6fd
primary-300: #7dd3fc
primary-400: #38bdf8
primary-500: #0ea5e9  /* Main brand color */
primary-600: #0284c7  /* Hover state */
primary-700: #0369a1  /* Active state */
primary-800: #075985
primary-900: #0c4a6e
primary-950: #082f49  /* Darkest */
```

**Penggunaan:**
- `primary-500`: Tombol utama, link aktif
- `primary-600`: Hover state
- `primary-50`: Background highlight
- `primary-700`: Active/pressed state

### Status Colors

#### Success (Green)
```css
success-50:  #f0fdf4
success-100: #dcfce7
success-500: #22c55e  /* Main success */
success-600: #16a34a  /* Hover */
success-700: #15803d  /* Active */
```

**Penggunaan:** Konfirmasi, data berhasil disimpan, validasi sukses

#### Warning (Amber/Orange)
```css
warning-50:  #fffbeb
warning-100: #fef3c7
warning-500: #f59e0b  /* Main warning */
warning-600: #d97706  /* Hover */
warning-700: #b45309  /* Active */
```

**Penggunaan:** Peringatan, perhatian khusus, pending status

#### Danger (Red)
```css
danger-50:  #fef2f2
danger-100: #fee2e2
danger-500: #ef4444  /* Main danger */
danger-600: #dc2626  /* Hover */
danger-700: #b91c1c  /* Active */
```

**Penggunaan:** Error, delete actions, critical alerts

#### Info (Purple)
```css
info-50:  #f5f3ff
info-100: #ede9fe
info-500: #8b5cf6  /* Main info */
info-600: #7c3aed  /* Hover */
info-700: #6d28d9  /* Active */
```

**Penggunaan:** Informasi tambahan, tips, dokumentasi

### Neutral Colors (Gray)

```css
gray-50:  #f9fafb  /* Page background */
gray-100: #f3f4f6  /* Section background */
gray-200: #e5e7eb  /* Border light */
gray-300: #d1d5db  /* Border */
gray-400: #9ca3af  /* Placeholder */
gray-500: #6b7280  /* Text muted */
gray-600: #4b5563  /* Text secondary */
gray-700: #374151  /* Text primary */
gray-800: #1f2937
gray-900: #111827  /* Heading, bold text */
```

---

## ✍️ Typography

### Font Family

**Primary:** Inter (Google Fonts)
```css
font-sans: 'Inter', system-ui, -apple-system, sans-serif
font-display: 'Inter', system-ui, sans-serif
```

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1rem | Badges, tiny text |
| `text-sm` | 0.875rem (14px) | 1.25rem | Form labels, captions |
| `text-base` | 1rem (16px) | 1.5rem | Body text (default) |
| `text-lg` | 1.125rem (18px) | 1.75rem | Large body, subtitle |
| `text-xl` | 1.25rem (20px) | 1.75rem | Card title |
| `text-2xl` | 1.5rem (24px) | 2rem | Section title |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Page title |
| `text-4xl` | 2.25rem (36px) | 2.5rem | Hero title |
| `text-5xl` | 3rem (48px) | 1.16 | Large hero |

### Font Weights

```css
font-light:     300
font-normal:    400  /* Default body */
font-medium:    500  /* Buttons, labels */
font-semibold:  600  /* Subheadings */
font-bold:      700  /* Headings */
font-extrabold: 800  /* Hero text */
```

### Utility Classes

```css
.heading-1      /* 4xl/5xl, bold, tight tracking */
.heading-2      /* 3xl/4xl, bold, tight tracking */
.heading-3      /* 2xl/3xl, bold */
.heading-4      /* xl/2xl, semibold */

.section-title   /* Same as heading-3 */
.section-subtitle /* lg, text-gray-600 */

.text-body      /* base, gray-700, relaxed */
.text-muted     /* sm, gray-500 */
```

---

## 📏 Spacing

### Sistem Spacing (Tailwind Default + Custom)

```css
0:    0px
1:    0.25rem (4px)
2:    0.5rem (8px)
3:    0.75rem (12px)
4:    1rem (16px)
5:    1.25rem (20px)
6:    1.5rem (24px)
8:    2rem (32px)
10:   2.5rem (40px)
12:   3rem (48px)
16:   4rem (64px)
18:   4.5rem (72px)   /* Custom */
20:   5rem (80px)
24:   6rem (96px)
32:   8rem (128px)
88:   22rem (352px)   /* Custom */
112:  28rem (448px)   /* Custom */
128:  32rem (512px)   /* Custom */
```

### Padding/Margin Patterns

**Containers:**
```css
.container-custom  /* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */
```

**Sections:**
```css
.section     /* py-12 md:py-16 lg:py-20 */
.section-sm  /* py-8 md:py-10 */
```

**Cards:**
```css
Padding: p-6 (24px)
Gap: space-y-4 (16px)
```

---

## 🧩 Komponen UI

### 1. Buttons

#### Varian Button

```tsx
import { Button } from '@/components/ui'

// Primary (default)
<Button variant="primary">Save Changes</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Danger
<Button variant="danger">Delete</Button>

// Success
<Button variant="success">Approve</Button>

// Outline
<Button variant="outline">Learn More</Button>

// Ghost
<Button variant="ghost">Skip</Button>
```

#### Ukuran Button

```tsx
<Button size="sm">Small</Button>      // py-1.5 px-3
<Button size="md">Medium</Button>     // py-2.5 px-5 (default)
<Button size="lg">Large</Button>      // py-3 px-6
```

#### Button dengan Icon

```tsx
import { Save, Download } from 'lucide-react'

<Button leftIcon={<Save />}>Save</Button>
<Button rightIcon={<Download />}>Download</Button>
```

#### Loading State

```tsx
<Button isLoading>Processing...</Button>
```

#### CSS Classes (Manual)

```css
.btn             /* Base button class */
.btn-primary     /* Blue, white text */
.btn-secondary   /* White, gray text, border */
.btn-danger      /* Red, white text */
.btn-success     /* Green, white text */
.btn-outline     /* Transparent, primary border */
.btn-ghost       /* Transparent, gray hover */
.btn-sm          /* Small size */
.btn-lg          /* Large size */
```

---

### 2. Cards

#### Varian Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui'

// Default card
<Card>
  <CardHeader>Card Title</CardHeader>
  <CardBody>Card content here</CardBody>
  <CardFooter>Card footer actions</CardFooter>
</Card>

// Hover effect
<Card variant="hover">...</Card>

// Flat (no shadow)
<Card variant="flat">...</Card>

// Elevated (strong shadow)
<Card variant="elevated">...</Card>

// Interactive (with hover border)
<Card variant="interactive">...</Card>
```

#### CSS Classes

```css
.card            /* Default: shadow-soft, border-gray-100 */
.card-hover      /* Hover: shadow-medium, -translate-y-1 */
.card-flat       /* No shadow, only border */
.card-elevated   /* Strong shadow */
.card-interactive /* Hover: shadow-hover, border-primary-200 */
```

---

### 3. Form Elements

#### Input Field

```tsx
import { Input } from '@/components/ui'

// Basic input
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
/>

// With validation
<Input
  label="Username"
  required
  error="Username is required"
/>

<Input
  label="Email"
  success="Email is available"
/>

// With icons
import { Mail, Search } from 'lucide-react'

<Input
  label="Email"
  leftIcon={<Mail />}
/>

<Input
  placeholder="Search..."
  rightIcon={<Search />}
/>

// With helper text
<Input
  label="Password"
  helper="Must be at least 8 characters"
/>
```

#### CSS Classes

```css
.input           /* Base input class */
.input-error     /* Red border, red ring */
.input-success   /* Green border, green ring */
.textarea        /* Multiline input */
.select          /* Dropdown with custom arrow */
.label           /* Form label */
.label-required  /* Label with red asterisk */
.form-helper     /* Helper text below input */
.form-error      /* Error message with icon */
.checkbox        /* Styled checkbox */
.radio           /* Styled radio button */
```

---

### 4. Badges

```tsx
import { Badge } from '@/components/ui'

<Badge variant="primary">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
<Badge variant="info">Beta</Badge>
<Badge variant="gray">Draft</Badge>

// With icon
import { Check } from 'lucide-react'
<Badge variant="success" icon={<Check className="h-3 w-3" />}>
  Verified
</Badge>
```

#### CSS Classes

```css
.badge           /* Base badge */
.badge-primary   /* Blue background */
.badge-success   /* Green background */
.badge-warning   /* Amber background */
.badge-danger    /* Red background */
.badge-info      /* Purple background */
.badge-gray      /* Gray background */
```

---

### 5. Alerts

```tsx
import { Alert } from '@/components/ui'

<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

<Alert variant="warning" title="Warning">
  Please review before continuing.
</Alert>

<Alert variant="danger" title="Error">
  Something went wrong. Please try again.
</Alert>

// Dismissible
<Alert
  variant="info"
  onClose={() => console.log('closed')}
>
  You can close this message.
</Alert>
```

#### CSS Classes

```css
.alert           /* Base alert with border and icon */
.alert-info      /* Purple background */
.alert-success   /* Green background */
.alert-warning   /* Amber background */
.alert-danger    /* Red background */
```

---

### 6. Tables

#### Responsive Table

```html
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td><span class="badge-primary">Admin</span></td>
        <td>
          <button class="btn-sm btn-secondary">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### CSS Classes

```css
.table-container  /* Responsive wrapper with border */
.table            /* Base table class */
.table thead      /* Sticky header, uppercase */
.table th         /* Sticky top-0, gray-50 bg */
.table td         /* Padded cells with border */
.table-striped    /* Alternating row colors */
```

---

### 7. Loading States

#### Spinner

```tsx
import { LoadingSpinner } from '@/components/ui'

<LoadingSpinner size="sm" />   // 16px
<LoadingSpinner size="md" />   // 32px (default)
<LoadingSpinner size="lg" />   // 48px

<LoadingSpinner color="primary" />
<LoadingSpinner color="white" />
<LoadingSpinner color="gray" />
```

#### Skeleton

```tsx
import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui'

// Custom skeleton
<Skeleton variant="text" />
<Skeleton variant="title" />
<Skeleton variant="avatar" />
<Skeleton variant="card" />
<Skeleton width="200px" height="40px" />

// Pre-built skeletons
<SkeletonCard />
<SkeletonTable rows={5} />
```

#### CSS Classes

```css
.spinner          /* Rotating spinner */
.skeleton         /* Animated pulse background */
.skeleton-text    /* Text line placeholder */
.skeleton-title   /* Title placeholder */
.skeleton-avatar  /* Circle placeholder */
.skeleton-card    /* Card placeholder */
```

---

### 8. Empty States

```tsx
import { EmptyState } from '@/components/ui'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={<Inbox className="w-16 h-16" />}
  title="No messages yet"
  description="When you receive messages, they will appear here"
  action={
    <Button variant="primary">Compose Message</Button>
  }
/>
```

---

### 9. Navigation

#### Nav Link

```css
.nav-link         /* Default nav link */
.nav-link-active  /* Active state: primary-600, bg-primary-50 */
```

#### Dropdown Menu

```css
.dropdown-menu    /* Positioned dropdown with shadow */
.dropdown-item    /* Individual menu item */
```

---

## ✨ Animasi

### Keyframe Animations

```css
/* Fade in from bottom */
.animate-fade-in
animation: fadeIn 0.5s ease-out

/* Slide in from bottom */
.animate-slide-in-up
animation: slideInUp 0.4s ease-out

/* Slide in from top */
.animate-slide-in-down
animation: slideInDown 0.4s ease-out

/* Scale in */
.animate-scale-in
animation: scaleIn 0.3s ease-out

/* Slow spin */
.animate-spin-slow
animation: spin 3s linear infinite

/* Soft pulse */
.animate-pulse-soft
animation: pulseSoft 2s ease-in-out infinite
```

### Transitions

**Default Duration:** `duration-200` (200ms)

```css
transition-all     /* All properties */
transition-colors  /* Color properties */
transition-opacity /* Opacity only */
transition-transform /* Transform only */
```

**Timing Functions:**
```css
ease-in
ease-out
ease-in-out
linear
```

### Micro-interactions

#### Hover Effects

```css
/* Scale on hover */
hover:scale-105
hover:scale-110

/* Translate on hover */
hover:-translate-y-1
hover:translate-x-1

/* Shadow on hover */
hover:shadow-md
hover:shadow-lg
hover:shadow-hover

/* Color on hover */
hover:bg-gray-100
hover:text-primary-600
```

#### Focus States

```css
/* Ring on focus */
focus:ring-2
focus:ring-primary-500
focus:ring-offset-2

/* Border on focus */
focus:border-primary-500

/* Outline removal */
focus:outline-none
```

---

## 📱 Responsiveness

### Breakpoints

```css
sm:  640px   /* Small devices (landscape phones) */
md:  768px   /* Medium devices (tablets) */
lg:  1024px  /* Large devices (desktops) */
xl:  1280px  /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

### Mobile-First Approach

Selalu mulai dengan mobile, kemudian tambahkan breakpoint untuk layar lebih besar.

```html
<!-- Mobile first: Stack vertically -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/2">Column 1</div>
  <div class="w-full md:w-1/2">Column 2</div>
</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>

<!-- Responsive padding -->
<section class="px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
  Content
</section>
```

### Layout Patterns

#### Container

```html
<div class="container-custom">
  <!-- max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -->
</div>
```

#### Grid

```html
<!-- 1 column → 2 columns → 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 1 column → 2 columns → 4 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  ...
</div>
```

#### Flexbox

```html
<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col lg:flex-row gap-4">
  <aside class="lg:w-1/4">Sidebar</aside>
  <main class="lg:w-3/4">Main Content</main>
</div>
```

### Responsive Navigation

#### Desktop Navigation
- Full horizontal menu
- Hover dropdowns
- Logo di kiri

#### Mobile Navigation
- Hamburger menu
- Slide-in sidebar
- Stacked menu items
- Logo di tengah atau kiri

---

## 🎯 Best Practices

### 1. Konsistensi

✅ **DO:**
- Gunakan komponen dari `/components/ui`
- Ikuti color palette yang sudah ditentukan
- Gunakan spacing yang konsisten (kelipatan 4px)
- Terapkan font hierarchy yang sama

❌ **DON'T:**
- Membuat custom color di luar palette
- Menggunakan spacing random (13px, 17px, dll)
- Membuat button style baru tanpa alasan kuat

### 2. Accessibility

✅ **DO:**
- Tambahkan `aria-label` pada icon buttons
- Gunakan semantic HTML (`<button>`, `<nav>`, `<main>`)
- Pastikan contrast ratio minimal 4.5:1
- Tambahkan `alt` text pada semua gambar
- Support keyboard navigation

❌ **DON'T:**
- Menggunakan `<div>` untuk button yang bisa diklik
- Text terlalu kecil (< 14px untuk body)
- Low contrast colors

### 3. Performance

✅ **DO:**
- Lazy load images
- Gunakan Next.js `<Image>` component
- Minimalkan animasi berat
- Optimize font loading (Google Fonts)

❌ **DON'T:**
- Animasi terlalu banyak
- Large images tanpa optimasi
- Over-nesting components

### 4. Responsiveness

✅ **DO:**
- Test di berbagai device (mobile, tablet, desktop)
- Gunakan relative units (rem, %, vh/vw)
- Mobile-first approach
- Touch-friendly button size (min 44x44px)

❌ **DON'T:**
- Fixed width (kecuali untuk constraint)
- Horizontal scroll pada mobile
- Text terlalu panjang tanpa line-height

### 5. Code Organization

✅ **DO:**
```tsx
// Gunakan komponen reusable
import { Button, Card, Input } from '@/components/ui'

// Consistent naming
const UserProfileCard = () => { ... }
const AdminDashboardLayout = () => { ... }

// Utility classes grouped logically
<div className="
  flex items-center gap-4
  px-6 py-4
  bg-white rounded-lg shadow-sm
  hover:shadow-md transition-all
">
```

❌ **DON'T:**
```tsx
// Long inline styles
<div className="flex items-center gap-4 px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 active:shadow-sm transition-all duration-200 cursor-pointer">

// Random ordering
<div className="text-white bg-primary-500 rounded-lg px-4 flex items-center py-2">
```

---

## 📦 Component Usage Examples

### Login Form Example

```tsx
import { Card, CardHeader, CardBody, Input, Button, Alert } from '@/components/ui'
import { Mail, Lock } from 'lucide-react'

export default function LoginForm() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2 className="heading-3">Login</h2>
        <p className="text-muted mt-1">Welcome back! Please login to continue.</p>
      </CardHeader>

      <CardBody className="space-y-4">
        <Alert variant="info">
          Demo credentials: admin@example.com / password123
        </Alert>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-5 w-5" />}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          leftIcon={<Lock className="h-5 w-5" />}
          required
        />

        <Button variant="primary" className="w-full">
          Sign In
        </Button>

        <Button variant="ghost" className="w-full">
          Forgot Password?
        </Button>
      </CardBody>
    </Card>
  )
}
```

### Data Table Example

```tsx
import { Badge, Button, LoadingSpinner } from '@/components/ui'
import { Edit, Trash2 } from 'lucide-react'

export default function UsersTable() {
  const isLoading = false

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-medium">John Doe</td>
            <td>john@example.com</td>
            <td><Badge variant="primary">Admin</Badge></td>
            <td><Badge variant="success">Active</Badge></td>
            <td class="flex gap-2">
              <Button size="sm" variant="secondary" leftIcon={<Edit />}>
                Edit
              </Button>
              <Button size="sm" variant="danger" leftIcon={<Trash2 />}>
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
```

---

## 🚀 Quick Reference

### Common Patterns

```css
/* Card with hover */
<div class="card-hover p-6">...</div>

/* Primary button with icon */
<button class="btn-primary">
  <Save class="h-4 w-4" />
  <span>Save</span>
</button>

/* Input with error */
<input class="input-error" />
<p class="form-error">
  <AlertCircle class="h-4 w-4" />
  <span>This field is required</span>
</p>

/* Section with title */
<section class="section">
  <div class="container-custom">
    <h2 class="section-title">Section Title</h2>
    <p class="section-subtitle">Description text</p>
  </div>
</section>

/* Responsive grid */
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan dengan design system:

1. Lihat dokumentasi komponen di `/src/components/ui`
2. Check contoh penggunaan di file ini
3. Konsultasi dengan tim development

---

**Version:** 1.0.0
**Last Updated:** 2026-01-11
**Maintained by:** Dusun Dlingo Development Team
