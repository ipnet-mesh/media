# YouTube Video Framework Plan

## Overview

Create a reusable Remotion component library for rendering consistent YouTube videos with configurable backgrounds, headers, icons, and popup overlays.

---

## Components to Create

### 1. Background (`src/components/Background.tsx`)

General purpose background component with multiple rendering modes.

**Props:**
```typescript
interface BackgroundProps {
  // Mode selection
  mode: "solid" | "gradient" | "animated";

  // Solid mode
  color?: string;

  // Gradient mode
  gradient?: {
    type: "linear" | "radial";
    angle?: number;        // For linear (default: 180)
    colors: string[];      // Array of color stops
    positions?: number[];  // Optional stop positions (0-100)
  };

  // Preset color palettes
  palette?: "dark" | "light" | "warm" | "cool" | "emergency";

  // Animation options (subtle waves/pulses)
  animation?: {
    type: "none" | "pulse" | "wave" | "gradient-shift";
    speed?: number;      // Animation speed multiplier
    intensity?: number;  // How pronounced the effect is (0-1)
  };

  children?: React.ReactNode;
}
```

**Palettes (predefined gradient presets):**
- `dark`: Black to dark slate
- `light`: White to light gray
- `warm`: Deep orange to dark red
- `cool`: Deep blue to dark cyan
- `emergency`: Red to dark red (pulsing)

---

### 2. Header (`src/components/Header.tsx`)

Consistent header bar overlay with icon, title, and subtitle.

**Props:**
```typescript
interface HeaderProps {
  // Content
  icon?: React.ReactNode;      // SVG or image component
  title: string;
  subtitle?: string;

  // Preset levels (affects colors/styling)
  level?: "default" | "info" | "warn" | "emergency";

  // Positioning
  position?: "top" | "bottom";

  // Sizing
  height?: number;             // Height in pixels (default: 120)
  padding?: number;            // Internal padding (default: 24)

  // Animation
  animateIn?: boolean;         // Slide in animation
  animateInDelay?: number;     // Delay before animation starts

  // Styling overrides
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
}
```

**Level Styles:**
- `default`: Semi-transparent dark background, white text
- `info`: Blue accent, blue border
- `warn`: Amber/yellow accent, yellow border
- `emergency`: Red background pulse, white text, red border

**Layout Logic:**
- If icon exists: Icon (left) | Title/Subtitle (right of icon)
- If no icon: Title/Subtitle aligned to left with padding
- If no subtitle: Title scales to fill vertical space
- Title and Subtitle are left-aligned, stacked vertically

---

### 3. Icon (`src/components/Icon.tsx`)

Versatile icon component that works both as:
- Standalone absolute overlay (TV channel ident/watermark style)
- Relative element inside other components (e.g., Header)

**Props:**
```typescript
interface IconProps {
  // Content
  src?: string;                // Image URL or staticFile path
  children?: React.ReactNode;  // Or pass SVG as children

  // Positioning mode
  positioning?: "absolute" | "relative";  // Default: "absolute"

  // Absolute positioning (when positioning="absolute")
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };

  // Preset positions (absolute mode only)
  preset?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  // Sizing
  size?: number;               // Width/height in pixels (default: 64)

  // Styling
  opacity?: number;            // Default: 1.0 for relative, 0.8 for absolute
  backgroundColor?: string;    // Optional background (useful for non-transparent icons)
  borderRadius?: number;       // Optional rounding

  // Animation
  animateIn?: boolean;
  animateInDelay?: number;
  pulse?: boolean;             // Subtle pulse effect
}
```

**Usage Examples:**
```tsx
// As watermark (absolute, bottom-right corner)
<Icon src={staticFile("logo.png")} preset="bottom-right" opacity={0.5} />

// Inside Header (relative positioning)
<Header
  icon={<Icon positioning="relative" size={48}><MyLogoSVG /></Icon>}
  title="Breaking News"
/>

// With custom absolute position
<Icon position={{ top: 20, left: 20 }} size={80}>
  <ChannelLogo />
</Icon>
```

---

### 4. Title (`src/components/Title.tsx`) - Header Internal

Title component for use within Header.

**Props:**
```typescript
interface TitleProps {
  children: React.ReactNode;
  size?: "auto" | "sm" | "md" | "lg" | "xl";  // "auto" fills available space
  color?: string;
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}
```

---

### 5. Subtitle (`src/components/Subtitle.tsx`) - Header Internal

Subtitle component for use within Header.

**Props:**
```typescript
interface SubtitleProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: string;
  weight?: "normal" | "medium" | "semibold";
  className?: string;
}
```

---

### 6. Popup (`src/components/Popup.tsx`)

Animated popup overlay that can appear anywhere.

**Props:**
```typescript
interface PopupProps {
  children: React.ReactNode;

  // Visibility (frame-based)
  showAt?: number;             // Frame to appear
  hideAt?: number;             // Frame to disappear (optional)

  // Positioning
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };

  // Preset positions
  preset?: "center" | "top-center" | "bottom-center" |
           "left-center" | "right-center" |
           "top-left" | "top-right" | "bottom-left" | "bottom-right";

  // Sizing
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;

  // Styling
  backgroundColor?: string;    // Default: semi-transparent dark
  borderRadius?: number;
  padding?: number;
  shadow?: boolean;

  // Animation
  animation?: "fade" | "scale" | "slide-up" | "slide-down" |
              "slide-left" | "slide-right";
  animationDuration?: number;  // Frames for animation

  className?: string;
}
```

---

### 7. Scene (`src/components/Scene.tsx`)

Wrapper component that combines Background with optional persistent elements.

**Props:**
```typescript
interface SceneProps {
  children: React.ReactNode;

  // Background shorthand
  background?: BackgroundProps;

  // Persistent header
  header?: HeaderProps;

  // Persistent icon (watermark)
  watermark?: IconProps;
}
```

---

## Directory Structure

```
src/
├── components/
│   ├── index.ts           # Exports all components
│   ├── Background.tsx
│   ├── Header.tsx
│   ├── Icon.tsx
│   ├── Title.tsx
│   ├── Subtitle.tsx
│   ├── Popup.tsx
│   └── Scene.tsx
├── scenes/
│   ├── DemoScene1.tsx     # Demo: Background modes
│   ├── DemoScene2.tsx     # Demo: Header levels
│   ├── DemoScene3.tsx     # Demo: Popups
│   └── DemoScene4.tsx     # Demo: Full composition
├── utils/
│   ├── animations.ts      # Shared animation helpers
│   └── palettes.ts        # Color palette definitions
├── Root.tsx
├── Video.tsx              # Demo video composition
├── index.ts
└── index.css
```

---

## Demo Scenes

### Scene 1: Background Showcase (5 seconds)
- Cycle through: solid black, linear gradient, radial gradient, animated pulse
- Text overlay showing current mode

### Scene 2: Header Levels (5 seconds)
- Show header cycling through: default, info, warn, emergency
- With icon and without icon variants

### Scene 3: Popup Demo (5 seconds)
- Multiple popups appearing at different positions
- Different animation styles

### Scene 4: Full Composition (5 seconds)
- Complete scene with background, header, watermark icon, and popup
- Demonstrates all components working together

---

## Implementation Order

1. Create utility files (`palettes.ts`, `animations.ts`)
2. Create `Background` component
3. Create `Title` and `Subtitle` components
4. Create `Header` component (uses Title/Subtitle)
5. Create `Icon` component
6. Create `Popup` component
7. Create `Scene` wrapper component
8. Create demo scenes
9. Update `Video.tsx` and `Root.tsx`
10. Test and refine

---

## Notes

- All components use Remotion's `useCurrentFrame()` and `useVideoConfig()` for animations
- Tailwind CSS for styling
- Spring animations for smooth entrances
- Frame-based timing for precise control
- Components should be tree-shakeable (only import what you need)
