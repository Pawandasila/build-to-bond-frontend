# Soulara Frontend

**A spiritual wellness platform connecting soul and aura** ✨

This is the frontend application for Soulara, built with Next.js 15, TypeScript, and a comprehensive design system for seamless team collaboration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main layout group
│   │   ├── _components/           # Server components
│   │   │   ├── _components/       # Client components
│   │   │   ├── Logo/             # Logo component
│   │   │   └── Navbar/           # Navigation components
│   │   ├── layout.tsx            # Main layout
│   │   └── page.tsx              # Home page
│   ├── globals.css               # Global styles & design system
│   └── layout.tsx                # Root layout
├── components/                   # Shared UI components
│   ├── ui/                      # shadcn/ui components
│   └── theme-provider.tsx       # Theme management
└── lib/
    └── utils.ts                 # Utility functions
```

## 🎨 Design System

### Color Palette

Our design system uses OKLCH color space for better perceptual uniformity:

#### Base Colors (Neutral)
```css
--base-50: oklch(0.9787 0.0051 48.69)    /* Lightest cream */
--base-100: oklch(0.97 0.0056 49.59)     /* Very light cream */
--base-200: oklch(0.923 0.0071 49.85)    /* Light cream */
--base-300: oklch(0.8692 0.0082 50.43)   /* Medium light */
--base-400: oklch(0.709 0.0092 50.33)    /* Medium */
--base-500: oklch(0.5534 0.0099 51.95)   /* Base neutral */
--base-600: oklch(0.4436 0.0097 53.36)   /* Medium dark */
--base-700: oklch(0.3738 0.0089 52.39)   /* Dark */
--base-800: oklch(0.2682 0.0077 50.37)   /* Very dark */
--base-900: oklch(0.2149 0.0071 50.14)   /* Darkest */
--base-950: oklch(0.1469 0.0066 48.54)   /* Near black */
--base-1000: oklch(0.1024 0.0061 49.06)  /* Black */
```

#### Primary Colors (Brand)
```css
--primary-50: oklch(0.968 0.01 8.56)     /* Lightest brand */
--primary-100: oklch(0.9409 0.02 8.58)   /* Very light brand */
--primary-200: oklch(0.8922 0.0393 6.47) /* Light brand */
--primary-300: oklch(0.8112 0.0791 8.26) /* Medium light brand */
--primary-400: oklch(0.7126 0.1314 10.17)/* Medium brand */
--primary-500: oklch(0.6735 0.1652 12.99)/* Base brand color */
--primary-600: oklch(0.5866 0.17 14.55)  /* Medium dark brand */
--primary-700: oklch(0.5152 0.1496 14.3) /* Dark brand */
--primary-800: oklch(0.4551 0.1265 11.6) /* Very dark brand */
--primary-900: oklch(0.4092 0.1065 8.71) /* Darkest brand */
--primary-950: oklch(0.2723 0.0711 10.49)/* Near black brand */
--primary-1000: oklch(0.1836 0.048 11.64)/* Black brand */
```

#### Usage in Tailwind
```jsx
<div className="bg-base-50 text-base-800">Light background</div>
<div className="bg-primary-500 text-primary-foreground">Brand button</div>
<div className="bg-primary-100 text-primary-800">Light brand accent</div>
```

### Typography

#### Font Family Variables
```css
--font-roboto: Roboto             /* Clean, readable UI text */
--font-playfair: Playfair Display /* Elegant display headings */
--font-sans: Plus Jakarta Sans    /* Primary sans-serif */
--font-serif: Lora               /* Body serif text */
--font-mono: IBM Plex Mono       /* Code and monospace */
--font-marcellus: Marcellus      /* Logo and special headings */
--font-montserrat: Montserrat    /* Modern headings */
--font-homemade-apple: Homemade Apple /* Handwritten accents */
```

#### Usage Examples
```jsx
<h1 className="font-playfair text-4xl">Elegant Heading</h1>
<h2 className="font-marcellus text-2xl">Logo Style</h2>
<p className="font-sans">Body text</p>
<p className="font-serif">Serif body text</p>
<code className="font-mono">Code snippet</code>
<span className="font-homemade-apple">Handwritten</span>
```

### Component Architecture

#### Server vs Client Components

**Server Components** (Default)
```tsx
// No "use client" directive
import React from 'react'

const MyServerComponent = () => {
  // Server-side logic, database calls, etc.
  return <div>Server rendered content</div>
}
```

**Client Components** (Interactive)
```tsx
"use client"
import React, { useState } from 'react'

const MyClientComponent = () => {
  const [state, setState] = useState(false)
  return <button onClick={() => setState(!state)}>Interactive</button>
}
```

#### Component Organization
- **`_components/`**: Client-side interactive components
- **Regular folders**: Server components
- **`./_components/`**: Client components specific to a parent server component

### UI Components (shadcn/ui)

We use shadcn/ui for consistent, accessible components:

```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
```

#### Available Components
- `Button` - Primary and secondary buttons
- `DropdownMenu` - Dropdown menus and popovers
- `Avatar` - User profile pictures
- More components as needed...

### Theme System

#### Dark/Light Mode
```jsx
// Automatic theme switching
<ThemeProvider
  attribute="class"
  defaultTheme="light"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

#### Custom CSS Properties
```css
:root {
  --background: var(--base-50);
  --foreground: var(--base-800);
  --primary: var(--primary-500);
  --cream: var(--primary-50);
}

.dark {
  --background: var(--base-950);
  --foreground: var(--base-200);
  --cream: var(--primary-1000);
}
```

## 🛠️ Development Guidelines

### Code Style

#### Component Structure
```tsx
"use client" // Only if client component

import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

const MyComponent = ({ children, className, variant = 'primary' }: ComponentProps) => {
  return (
    <div className={cn(
      'base-styles',
      variant === 'primary' && 'primary-styles',
      variant === 'secondary' && 'secondary-styles',
      className
    )}>
      {children}
    </div>
  )
}

export default MyComponent
```

#### CSS Classes
- Use Tailwind utility classes
- Use `cn()` for conditional classes
- Follow the design system colors
- Prefer semantic color names (`bg-background`, `text-foreground`)

### File Naming
- **Components**: PascalCase (`MyComponent.tsx`)
- **Files/Folders**: kebab-case (`my-folder/`)
- **Constants**: UPPER_SNAKE_CASE

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/component-name

# Commit with conventional commits
git commit -m "feat: add profile dropdown component"
git commit -m "fix: resolve navbar spacing issue"
git commit -m "docs: update component guidelines"

# Push and create PR
git push origin feature/component-name
```

## 📦 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## 🎯 Brand Guidelines

### Logo Usage
- **Soulara**: Use `font-marcellus` for logo text
- **Color**: `text-primary-700` for "Soul", `text-primary-500` for "ara"
- **Spacing**: Consistent with the Logo component

### Voice & Tone
- **Spiritual**: Warm, welcoming, mindful
- **Professional**: Clean, trustworthy, premium
- **Accessible**: Inclusive, clear, helpful

## 🔧 Common Patterns

### Navigation Items
```tsx
<NavbarItem
  icon={<IconComponent />}
  label="Item Name"
  badge={count > 0 ? count : undefined}
  onClick={handleClick}
/>
```

### Color Usage
```tsx
// Backgrounds
className="bg-background"      // Main background
className="bg-card"           // Card backgrounds
className="bg-primary"        // Brand actions

// Text
className="text-foreground"   // Primary text
className="text-muted-foreground" // Secondary text
className="text-primary"      // Brand text

// Interactive
className="hover:bg-accent"   // Hover states
className="focus:ring-primary" // Focus states
```

### Responsive Design
```tsx
className="text-sm md:text-base lg:text-lg"  // Responsive text
className="hidden md:block"                  // Responsive visibility
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // Responsive grid
```

## 🤝 Contributing

1. **Follow the design system** - Use predefined colors and fonts
2. **Write TypeScript** - Full type safety required
3. **Component patterns** - Follow established architectural patterns
4. **Test your components** - Ensure they work in both light and dark themes
5. **Documentation** - Update README for new patterns or components

## 📞 Support

For questions about the design system or development patterns:
- Check this README first
- Review existing components for patterns
- Ask in team channels for clarification

---

**Built with ❤️ for spiritual wellness and team collaboration**
