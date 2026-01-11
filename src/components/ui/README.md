# UI Components Library

> Modern, reusable React components dengan TypeScript support

## 📦 Available Components

- [Button](#button)
- [Card](#card)
- [Input](#input)
- [Badge](#badge)
- [Alert](#alert)
- [LoadingSpinner](#loadingspinner)
- [Skeleton](#skeleton)
- [EmptyState](#emptystate)

---

## Button

Modern button component dengan berbagai variant dan states.

### Import

```tsx
import { Button } from '@/components/ui'
```

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>  {/* Default */}
<Button size="lg">Large</Button>
```

### With Icons

```tsx
import { Save, Download } from 'lucide-react'

<Button leftIcon={<Save />}>Save</Button>
<Button rightIcon={<Download />}>Download</Button>
```

### Loading State

```tsx
<Button isLoading>Processing...</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'danger' \| 'success' \| 'outline' \| 'ghost' | 'primary' | Button style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| isLoading | boolean | false | Shows loading spinner |
| leftIcon | ReactNode | - | Icon on the left |
| rightIcon | ReactNode | - | Icon on the right |
| disabled | boolean | false | Disabled state |
| className | string | '' | Additional classes |

---

## Card

Flexible card component dengan Header, Body, dan Footer.

### Import

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui'
```

### Basic Usage

```tsx
<Card>
  <CardHeader>Card Title</CardHeader>
  <CardBody>Card content here</CardBody>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

### Variants

```tsx
<Card variant="default">Default Card</Card>
<Card variant="hover">Hover Effect</Card>
<Card variant="flat">Flat (No Shadow)</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="interactive">Interactive</Card>
```

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'hover' \| 'flat' \| 'elevated' \| 'interactive' | 'default' | Card style variant |
| className | string | '' | Additional classes |
| onClick | () => void | - | Click handler |

---

## Input

Input field dengan validation, icons, dan helper text.

### Import

```tsx
import { Input } from '@/components/ui'
```

### Basic Usage

```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
/>
```

### With Validation

```tsx
<Input
  label="Username"
  required
  error="Username is required"
/>

<Input
  label="Email"
  success="Email is available"
/>
```

### With Icons

```tsx
import { Mail, Search } from 'lucide-react'

<Input
  label="Email"
  leftIcon={<Mail />}
/>

<Input
  placeholder="Search..."
  rightIcon={<Search />}
/>
```

### With Helper Text

```tsx
<Input
  label="Password"
  type="password"
  helper="Must be at least 8 characters"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Input label |
| error | string | - | Error message |
| success | string | - | Success message |
| helper | string | - | Helper text |
| required | boolean | false | Show required asterisk |
| leftIcon | ReactNode | - | Icon on the left |
| rightIcon | ReactNode | - | Icon on the right |
| className | string | '' | Additional classes |

---

## Badge

Small status indicator badges.

### Import

```tsx
import { Badge } from '@/components/ui'
```

### Variants

```tsx
<Badge variant="primary">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
<Badge variant="info">Beta</Badge>
<Badge variant="gray">Draft</Badge>
```

### With Icon

```tsx
import { Check } from 'lucide-react'

<Badge variant="success" icon={<Check className="h-3 w-3" />}>
  Verified
</Badge>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'gray' | 'gray' | Badge color |
| icon | ReactNode | - | Icon element |
| className | string | '' | Additional classes |

---

## Alert

Alert boxes untuk notifications dan messages.

### Import

```tsx
import { Alert } from '@/components/ui'
```

### Variants

```tsx
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
  Something went wrong.
</Alert>
```

### Dismissible

```tsx
<Alert
  variant="info"
  onClose={() => console.log('closed')}
>
  You can close this message.
</Alert>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'info' \| 'success' \| 'warning' \| 'danger' | 'info' | Alert type |
| title | string | - | Alert title |
| onClose | () => void | - | Close handler |
| className | string | '' | Additional classes |

---

## LoadingSpinner

Animated loading spinner.

### Import

```tsx
import { LoadingSpinner } from '@/components/ui'
```

### Sizes

```tsx
<LoadingSpinner size="sm" />   {/* 16px */}
<LoadingSpinner size="md" />   {/* 32px - Default */}
<LoadingSpinner size="lg" />   {/* 48px */}
```

### Colors

```tsx
<LoadingSpinner color="primary" />
<LoadingSpinner color="white" />
<LoadingSpinner color="gray" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | Spinner size |
| color | 'primary' \| 'white' \| 'gray' | 'primary' | Spinner color |
| className | string | '' | Additional classes |

---

## Skeleton

Loading placeholder untuk content.

### Import

```tsx
import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui'
```

### Variants

```tsx
<Skeleton variant="text" />
<Skeleton variant="title" />
<Skeleton variant="avatar" />
<Skeleton variant="card" />
```

### Custom Size

```tsx
<Skeleton width="200px" height="40px" />
```

### Pre-built Skeletons

```tsx
<SkeletonCard />
<SkeletonTable rows={5} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'text' \| 'title' \| 'avatar' \| 'card' \| 'custom' | 'custom' | Skeleton type |
| width | string | - | Custom width |
| height | string | - | Custom height |
| className | string | '' | Additional classes |

---

## EmptyState

Empty state component dengan icon dan CTA.

### Import

```tsx
import { EmptyState } from '@/components/ui'
```

### Basic Usage

```tsx
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

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | FileQuestion icon | Custom icon |
| title | string | - | Empty state title |
| description | string | - | Description text |
| action | ReactNode | - | Action button |
| className | string | '' | Additional classes |

---

## 🎨 Usage Examples

### Login Form

```tsx
import { Card, CardHeader, CardBody, Input, Button, Alert } from '@/components/ui'
import { Mail, Lock } from 'lucide-react'

export default function LoginForm() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2 className="heading-3">Login</h2>
      </CardHeader>

      <CardBody className="space-y-4">
        <Alert variant="info">
          Demo: admin@example.com / password123
        </Alert>

        <Input
          label="Email"
          type="email"
          leftIcon={<Mail className="h-5 w-5" />}
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
      </CardBody>
    </Card>
  )
}
```

### Data Table with Loading

```tsx
import { Badge, Button, LoadingSpinner, EmptyState } from '@/components/ui'
import { Edit, Inbox } from 'lucide-react'

export default function UsersTable() {
  const isLoading = false
  const isEmpty = false

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={<Inbox className="w-16 h-16" />}
        title="No users found"
        description="Add your first user to get started"
        action={<Button variant="primary">Add User</Button>}
      />
    )
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td><Badge variant="success">Active</Badge></td>
            <td>
              <Button size="sm" leftIcon={<Edit />}>
                Edit
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

## 🎯 Best Practices

### 1. Import Only What You Need

```tsx
// ✅ Good
import { Button, Card } from '@/components/ui'

// ❌ Avoid
import * as UI from '@/components/ui'
```

### 2. Use Semantic Colors

```tsx
// ✅ Good
<Button variant="danger">Delete</Button>
<Badge variant="success">Active</Badge>

// ❌ Avoid custom colors
<button className="bg-red-500">Delete</button>
```

### 3. Consistent Sizing

```tsx
// ✅ Good - All buttons same size
<div className="flex gap-2">
  <Button size="sm">Cancel</Button>
  <Button size="sm">Save</Button>
</div>

// ❌ Avoid mixing sizes
<div className="flex gap-2">
  <Button size="sm">Cancel</Button>
  <Button size="lg">Save</Button>
</div>
```

### 4. Proper Loading States

```tsx
// ✅ Good
{isLoading ? (
  <SkeletonCard />
) : (
  <Card>...</Card>
)}

// ❌ Avoid blocking everything
{isLoading && <div>Loading...</div>}
```

---

## 📚 References

- [Design System Guide](../../../DESIGN_SYSTEM.md)
- [UI/UX Improvements](../../../UI_UX_IMPROVEMENTS.md)
- [Tailwind Config](../../../tailwind.config.ts)

---

**Version:** 1.0.0
**Last Updated:** 2026-01-11
