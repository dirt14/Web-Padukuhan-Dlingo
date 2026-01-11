# 🚀 Quick Start - UI Component Library

> Panduan cepat menggunakan design system & komponen UI yang baru

## 📦 Apa yang Baru?

✅ **8 Komponen UI Modern** di `/src/components/ui/`
✅ **Design System Lengkap** dengan color palette, typography, spacing
✅ **Layout Responsif** dengan animasi smooth
✅ **Dokumentasi Lengkap** untuk semua komponen

---

## 🎯 Setup (Sudah Selesai!)

Semua komponen sudah siap digunakan. Tidak perlu instalasi tambahan.

**Yang sudah di-setup:**
- ✅ Tailwind config extended
- ✅ Global CSS updated
- ✅ Inter font loaded
- ✅ All UI components created
- ✅ Navbar & AdminSidebar improved

---

## 💡 Cara Pakai

### 1. Import Komponen

```tsx
import { Button, Card, Input, Badge, Alert } from '@/components/ui'
```

### 2. Gunakan di JSX

```tsx
export default function MyPage() {
  return (
    <div className="container-custom section">
      <Card>
        <CardHeader>
          <h2 className="heading-3">Welcome</h2>
        </CardHeader>
        <CardBody>
          <p className="text-body">Content here</p>
        </CardBody>
      </Card>
    </div>
  )
}
```

---

## 🎨 Contoh Cepat

### Form dengan Validasi

```tsx
'use client'

import { useState } from 'react'
import { Input, Button, Alert } from '@/components/ui'
import { Mail, Lock } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  return (
    <div className="max-w-md mx-auto p-6">
      <Alert variant="info" title="Demo Login">
        Use: admin@example.com / password123
      </Alert>

      <div className="mt-6 space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-5 w-5" />}
          error={error}
          required
        />

        <Input
          label="Password"
          type="password"
          leftIcon={<Lock className="h-5 w-5" />}
          required
        />

        <Button variant="primary" className="w-full">
          Sign In
        </Button>
      </div>
    </div>
  )
}
```

### Card Grid dengan Data

```tsx
import { Card, CardBody, Badge } from '@/components/ui'
import { Calendar, MapPin } from 'lucide-react'

const events = [
  { id: 1, title: 'Bank Sampah', date: '15 Jan 2026', status: 'active' },
  { id: 2, title: 'Pengajian', date: '20 Jan 2026', status: 'upcoming' },
  { id: 3, title: 'Karang Taruna', date: '25 Jan 2026', status: 'upcoming' },
]

export default function EventsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} variant="hover">
          <CardBody>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <Badge variant={event.status === 'active' ? 'success' : 'info'}>
                {event.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
```

### Table dengan Loading & Empty State

```tsx
'use client'

import { useState } from 'react'
import {
  Button,
  Badge,
  LoadingSpinner,
  EmptyState,
  SkeletonTable
} from '@/components/ui'
import { Edit, Trash2, Inbox } from 'lucide-react'

export default function UsersTable() {
  const [isLoading, setIsLoading] = useState(false)
  const users = [] // Empty for demo

  if (isLoading) {
    return <SkeletonTable rows={5} />
  }

  if (users.length === 0) {
    return (
      <EmptyState
        icon={<Inbox className="w-16 h-16" />}
        title="No users found"
        description="Add your first user to get started"
        action={
          <Button variant="primary">Add User</Button>
        }
      />
    )
  }

  return (
    <div className="table-container">
      <table className="table">
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
          {users.map((user) => (
            <tr key={user.id}>
              <td className="font-medium">{user.name}</td>
              <td>{user.email}</td>
              <td><Badge variant="primary">{user.role}</Badge></td>
              <td><Badge variant="success">Active</Badge></td>
              <td>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" leftIcon={<Edit />}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" leftIcon={<Trash2 />}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## 🎨 CSS Classes

### Utility Classes yang Sering Dipakai

```html
<!-- Container & Section -->
<div class="container-custom section">...</div>

<!-- Headings -->
<h1 class="heading-1">Large Title</h1>
<h2 class="heading-2">Page Title</h2>
<h3 class="heading-3">Section Title</h3>
<h4 class="heading-4">Subsection Title</h4>

<!-- Text -->
<p class="text-body">Body text dengan line-height optimal</p>
<span class="text-muted">Secondary text</span>

<!-- Buttons (Manual) -->
<button class="btn-primary">Primary Action</button>
<button class="btn-secondary">Secondary Action</button>
<button class="btn-danger">Delete</button>

<!-- Cards (Manual) -->
<div class="card p-6">
  <h3 class="font-semibold mb-2">Card Title</h3>
  <p>Card content</p>
</div>

<!-- Forms (Manual) -->
<label class="label">Email Address</label>
<input type="email" class="input" placeholder="you@example.com" />
<p class="form-helper">We'll never share your email</p>

<!-- Badges (Manual) -->
<span class="badge-primary">New</span>
<span class="badge-success">Active</span>
<span class="badge-warning">Pending</span>
<span class="badge-danger">Inactive</span>

<!-- Alerts (Manual) -->
<div class="alert-info">
  <div>Information message here</div>
</div>
```

---

## 🎯 Color Palette

### Primary Colors (Brand)

```tsx
<div className="bg-primary-50">   {/* Very light blue */}
<div className="bg-primary-500">  {/* Main blue */}
<div className="bg-primary-600">  {/* Darker blue (hover) */}

<span className="text-primary-600"> {/* Primary text */}
```

### Status Colors

```tsx
{/* Success - Green */}
<Badge variant="success">Active</Badge>
<div className="bg-success-50 text-success-700">Success message</div>

{/* Warning - Amber */}
<Badge variant="warning">Pending</Badge>
<div className="bg-warning-50 text-warning-700">Warning message</div>

{/* Danger - Red */}
<Badge variant="danger">Inactive</Badge>
<div className="bg-danger-50 text-danger-700">Error message</div>

{/* Info - Purple */}
<Badge variant="info">Beta</Badge>
<div className="bg-info-50 text-info-700">Info message</div>
```

---

## 📱 Responsive Design

### Grid Patterns

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

### Responsive Text

```html
<!-- Small on mobile, larger on desktop -->
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>

<p class="text-sm md:text-base">
  Responsive body text
</p>
```

### Responsive Spacing

```html
<!-- Padding: small on mobile, larger on desktop -->
<div class="px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
  Content
</div>

<!-- Gap: smaller on mobile -->
<div class="flex gap-2 md:gap-4 lg:gap-6">
  ...
</div>
```

### Show/Hide by Breakpoint

```html
<!-- Show only on mobile -->
<div class="block lg:hidden">Mobile Menu</div>

<!-- Show only on desktop -->
<div class="hidden lg:block">Desktop Menu</div>

<!-- Hide on mobile, show on tablet+ -->
<div class="hidden md:block">Tablet and Desktop</div>
```

---

## ✨ Animasi

### Fade In

```html
<div class="animate-fade-in">
  Fades in from bottom
</div>
```

### Slide In

```html
<div class="animate-slide-in-up">Slides up</div>
<div class="animate-slide-in-down">Slides down</div>
```

### Stagger Animation (untuk Lists)

```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {item.name}
  </div>
))}
```

### Hover Effects

```html
<!-- Scale on hover -->
<div class="transition-transform hover:scale-105">
  Scales up on hover
</div>

<!-- Shadow on hover -->
<div class="transition-shadow hover:shadow-md">
  Shadow increases on hover
</div>

<!-- Color change -->
<button class="text-gray-700 hover:text-primary-600 transition-colors">
  Hover me
</button>
```

---

## 🎯 Common Patterns

### Page Layout

```tsx
export default function MyPage() {
  return (
    <div className="container-custom section">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="heading-2">Page Title</h1>
        <p className="text-muted mt-2">Page description</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              Main content here
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardBody>
              Sidebar content
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

### Modal/Dialog Pattern (dengan state)

```tsx
'use client'

import { useState } from 'react'
import { Button, Card, CardHeader, CardBody, CardFooter } from '@/components/ui'
import { X } from 'lucide-react'

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full animate-scale-in">
            <CardHeader className="flex items-center justify-between">
              <h3 className="heading-4">Dialog Title</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>

            <CardBody>
              Dialog content here
            </CardBody>

            <CardFooter className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Confirm
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
```

---

## 📚 Dokumentasi Lengkap

Untuk detail lebih lanjut, lihat:

1. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system guide
   - Color palette lengkap
   - Typography system
   - Spacing & shadows
   - All component documentation

2. **[UI_UX_IMPROVEMENTS.md](./UI_UX_IMPROVEMENTS.md)** - What's new & improved
   - Summary of all changes
   - Before/after comparisons
   - Visual examples

3. **[src/components/ui/README.md](./src/components/ui/README.md)** - Component library docs
   - Detailed props reference
   - Usage examples
   - Best practices

---

## 🎯 Tips & Best Practices

### ✅ DO

```tsx
// Use component library
import { Button, Card } from '@/components/ui'
<Button variant="primary">Save</Button>

// Use semantic colors
<Badge variant="success">Active</Badge>

// Use consistent spacing (multiples of 4)
<div className="p-6 gap-4">...</div>

// Mobile-first responsive
<div className="text-sm md:text-base">...</div>
```

### ❌ DON'T

```tsx
// Don't create custom styles
<button className="bg-blue-500 px-3 py-1.5">Save</button>

// Don't use random colors
<span className="text-green-400">Active</span>

// Don't use random spacing
<div className="p-7 gap-5">...</div>

// Don't ignore mobile
<div className="text-base">...</div>  // Same size everywhere
```

---

## 🚀 Next Steps

1. **Explore Components** - Try semua komponen di `/src/components/ui/`
2. **Read Design System** - Pahami color palette & typography
3. **Build Pages** - Mulai gunakan komponen untuk halaman baru
4. **Refactor Old Code** - Gradually migrate ke komponen baru

---

## 💬 Need Help?

- Lihat [Component Examples](./src/components/ui/README.md#usage-examples)
- Check [Design System Guide](./DESIGN_SYSTEM.md)
- Review existing components di codebase

---

## 🎉 Summary

Sekarang Anda punya:

✅ **8 Reusable Components** - Siap pakai dengan TypeScript
✅ **Consistent Design** - Color, typography, spacing yang seragam
✅ **Better UX** - Loading states, validation, animations
✅ **Responsive** - Mobile-first, works on all devices
✅ **Documentation** - Complete guides & examples

**Happy coding!** 🚀

---

**Version:** 1.0.0
**Created:** 2026-01-11
