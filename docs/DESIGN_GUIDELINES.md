# Health Timer - Design Guidelines

## 🌊 Liquid Glass Design System

This document outlines the **Liquid Glass aesthetic** principles for the Health Timer application - a modern, premium, and calming UI inspired by macOS Vision-style interfaces.

---

## 🎨 Design Philosophy

**Core Principles:**

- **Liquid Glass Aesthetic** - Translucent, frosted-glass panels with depth and refraction
- **Calm & Premium** - Non-intrusive, stress-reducing, encouraging healthy habits
- **Motion-Rich** - Fluid animations, gentle morphing, subtle micro-interactions
- **Lightweight & Alive** - Floating particles, light noise, responsive to user input

**Visual Mood:** Futuristic, elegant, minimal, calming, high-end desktop experience

---

## 🎨 Color Palette

### Background Colors

- **Primary Background**: Deep blue to charcoal gradient (`#1e293b` to `#0f172a`)
- **Accent Gradient**: Subtle purple hints (`#312e81`, `#1e1b4b`)
- **Blur Effect**: Soft gaussian blur (30-50px) for depth

```tsx
// Main background
className = "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950";
```

### Accent Colors (Minimal & Calming)

- **Soft Cyan**: `#67e8f9` (cyan-300) - Primary actions
- **Mint Green**: `#6ee7b7` (emerald-300) - Success states
- **Light Violet**: `#c4b5fd` (violet-300) - Secondary highlights
- **Muted Rose**: `#fda4af` (rose-300) - Warning/attention

### Text Colors

- **Primary Text**: Pure white (`#FFFFFF`) with subtle outer glow
- **Secondary Text**: White with opacity (`text-white/90`, `text-white/70`)
- **Glow Effect**: `text-shadow: 0 0 20px rgba(255,255,255,0.5)`

---

## 🪟 Liquid Glass Effect

### Enhanced `.glass-effect` Class

```css
background: rgba(15, 23, 42, 0.4); /* Deep translucent */
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
```

### `.glass-intense` (For Modals/Overlays)

```css
background: rgba(15, 23, 42, 0.7);
backdrop-filter: blur(40px) saturate(200%);
border: 1.5px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.15);
```

### Usage Rules

- ✅ Use `blur(20px)` minimum for proper glass effect
- ✅ Add `saturate(180%)` for vibrant colors through glass
- ✅ Layer inset shadows for depth and refraction
- ✅ Pair with white text + glow for readability
- ❌ Never use solid backgrounds
- ❌ Never exceed blur(50px) - loses focus

---

## 🎯 Component Design Patterns

### 1. Circular Timer (Centerpiece)

```tsx
// Container with liquid morphing
className="relative transition-all duration-700 ease-out"

// SVG Circle with fluid progress
<circle
  stroke="url(#liquidGradient)"
  strokeLinecap="round"
  className="transition-all duration-1000 ease-in-out"
/>

// Gradient definition (soft cyan to mint)
<linearGradient id="liquidGradient">
  <stop offset="0%" stopColor="#67e8f9" />   {/* cyan-300 */}
  <stop offset="50%" stopColor="#6ee7b7" />  {/* emerald-300 */}
  <stop offset="100%" stopColor="#67e8f9" />
</linearGradient>
```

### 2. Task Cards

```tsx
// Background glow layer
className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400
           rounded-3xl blur-2xl opacity-20 animate-pulse-slow"

// Glass card layer
className="glass-effect backdrop-blur-xl border border-white/20 rounded-3xl
           p-6 shadow-2xl relative"

// Text with glow
className="text-white font-black text-lg"
style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
```

### 3. Status Sections

```tsx
// Monitoring (soft mint glow)
className="glass-effect backdrop-blur-lg px-5 py-3 rounded-2xl
           border border-emerald-300/30
           shadow-[0_0_30px_rgba(110,231,183,0.15)]"

// Notification info (soft cyan)
className="glass-effect backdrop-blur-lg px-5 py-3 rounded-2xl
           border border-cyan-300/30
           shadow-[0_0_30px_rgba(103,232,249,0.15)]"
```

### 4. Buttons with Ripple Effect

```tsx
// Primary action (cyan glow)
className="relative overflow-hidden
           bg-gradient-to-r from-cyan-400 to-emerald-400
           hover:from-cyan-300 hover:to-emerald-300
           text-slate-900 font-bold px-6 py-3 rounded-xl
           shadow-[0_0_30px_rgba(103,232,249,0.4)]
           transition-all duration-300 hover:scale-105
           active:scale-95"

// Glass button (with ripple on click)
className="glass-effect backdrop-blur-lg border border-white/20
           hover:bg-white/10 hover:border-white/30
           text-white font-semibold px-5 py-2.5 rounded-xl
           transition-all duration-300 hover:shadow-xl
           active:scale-95"
```

### 5. Settings Modal

```tsx
// Modal overlay
className="fixed inset-0 bg-black/40 backdrop-blur-md"

// Modal container (intense glass)
className="glass-intense backdrop-blur-3xl rounded-3xl
           border-2 border-white/20 shadow-2xl overflow-hidden
           w-96 animate-slideUp"

// Header (gradient with glow)
className="bg-gradient-to-r from-cyan-500 to-violet-500 p-5
           shadow-[0_0_40px_rgba(103,232,249,0.3)]"
```

---

## 🌊 Motion & Animation Guidelines

### Fluid Easing Functions

```css
/* Liquid ease - natural, smooth deceleration */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce ease - playful, gentle spring */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Library

```css
/* Fade in with slight float */
@keyframes liquidFadeIn {
	from {
		opacity: 0;
		transform: translateY(20px) scale(0.95);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

/* Gentle morphing pulse */
@keyframes liquidPulse {
	0%,
	100% {
		opacity: 0.6;
		transform: scale(1);
	}
	50% {
		opacity: 0.8;
		transform: scale(1.05);
	}
}

/* Ripple effect on click */
@keyframes ripple {
	to {
		transform: scale(4);
		opacity: 0;
	}
}

/* Floating particles */
@keyframes float {
	0%,
	100% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
}

/* Shimmer light effect */
@keyframes shimmer {
	0% {
		background-position: -200% center;
	}
	100% {
		background-position: 200% center;
	}
}
```

### Motion Usage Rules

- **Timer progress**: 1000ms ease-in-out
- **Card transitions**: 700ms cubic-bezier (liquid ease)
- **Button hover**: 300ms ease-out
- **Modal appearance**: 600ms slide-up + fade
- **Ripple effect**: 600ms ease-out
- **Glow pulse**: 3000ms infinite
- **Particles**: 4000ms infinite random delay

---

## ✨ Micro-Interactions

### 1. Hover Effects

```tsx
// Button glow intensifies
hover:shadow-[0_0_40px_rgba(103,232,249,0.6)]

// Slight scale up
hover:scale-105

// Border becomes more opaque
hover:border-white/40
```

### 2. Click/Active Effects

```tsx
// Scale down (press feedback)
active:scale-95

// Ripple spawn
onClick={(e) => createRipple(e)}

// Glow burst
active:shadow-[0_0_60px_rgba(103,232,249,0.8)]
```

### 3. Loading States

```tsx
// Shimmer effect
className="relative overflow-hidden"
// Add shimmer pseudo-element
::before {
  background: linear-gradient(90deg,
    transparent,
    rgba(255,255,255,0.1),
    transparent);
  animation: shimmer 2s infinite;
}
```

---

## 🎨 Special Effects

### Noise Texture Overlay

```css
/* Adds subtle grain for realism */
.noise-overlay {
	position: absolute;
	inset: 0;
	opacity: 0.03;
	background-image: url("data:image/svg+xml,...");
	mix-blend-mode: overlay;
	pointer-events: none;
}
```

### Floating Particles

```tsx
// Scattered light dots inside glass layers
{
	[...Array(8)].map((_, i) => (
		<div
			key={i}
			className="absolute w-1 h-1 bg-white/40 rounded-full blur-sm"
			style={{
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
				animationDelay: `${Math.random() * 2}s`,
			}}
		/>
	));
}
```

### Subtle Parallax

```tsx
// Mouse position affects transform
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

onMouseMove={(e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  setMousePos({ x, y });
}}

style={{
  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
}}
```

---

## 📏 Spacing & Layout

### Compact & Breathable

- Main padding: `p-4` (16px)
- Card padding: `p-6` (24px) for emphasis
- Section gaps: `gap-4` (16px)
- Button padding: `px-6 py-3` (24px × 12px)
- Border radius: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for buttons

### Circular Timer

- Size: `220×220px` (slightly larger for emphasis)
- Stroke: `12px` (thicker for visibility)
- Text: `text-6xl` (60px) bold with glow

---

## ✅ Implementation Checklist

When creating new components:

- [ ] Background is dark gradient (slate-900 to indigo-950)
- [ ] Glass effects use `blur(20px)` minimum
- [ ] All text is white with subtle glow
- [ ] Borders are white with 15-20% opacity
- [ ] Accent colors are soft cyan, mint, or violet
- [ ] Hover states include scale + glow
- [ ] Transitions are 300-700ms with liquid easing
- [ ] Shadows include both outer + inset for depth
- [ ] Click feedback includes scale-down
- [ ] No harsh colors or high saturation

---

## 🚫 Common Mistakes

### ❌ DON'T

- Use bright, saturated accent colors (too harsh)
- Use blur below 10px (not glassy enough)
- Use solid backgrounds (breaks liquid aesthetic)
- Use linear easing (feels robotic)
- Forget inset shadows (loses depth)
- Use black text on glass (invisible)
- Use sharp corners on glass elements
- Add too many particles (becomes cluttered)

### ✅ DO

- Keep colors muted and calming
- Layer multiple blur levels for depth
- Add subtle glows to all interactive elements
- Use cubic-bezier for organic motion
- Combine outer + inset shadows
- Always use white text with glow
- Round all corners (rounded-xl minimum)
- Limit particles to 5-8 per view

---

## 📝 Code Examples

### Perfect Glass Card

```tsx
<div className="relative group">
	{/* Glow layer */}
	<div
		className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 
                  rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 
                  transition-opacity duration-500"
	/>

	{/* Glass card */}
	<div
		className="glass-effect backdrop-blur-xl border border-white/20 
                  rounded-3xl p-6 shadow-2xl relative
                  transition-all duration-300 hover:scale-105">
		{/* Noise overlay */}
		<div
			className="absolute inset-0 opacity-[0.03] mix-blend-overlay 
                    pointer-events-none noise-texture"
		/>

		{/* Content with glow */}
		<h3
			className="text-white font-black text-xl"
			style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}>
			Drink Water 💧
		</h3>
	</div>
</div>
```

### Perfect Glass Button with Ripple

```tsx
<button
	onClick={handleClick}
	className="relative overflow-hidden
             bg-gradient-to-r from-cyan-400 to-emerald-400
             hover:from-cyan-300 hover:to-emerald-300
             text-slate-900 font-bold px-6 py-3 rounded-xl
             shadow-[0_0_30px_rgba(103,232,249,0.4)]
             hover:shadow-[0_0_50px_rgba(103,232,249,0.6)]
             transition-all duration-300
             hover:scale-105 active:scale-95">
	<span className="relative z-10">Complete</span>

	{/* Ripple effect spawns here on click */}
</button>
```

---

## 🔄 Version History

- **v2.0.0** (2025-12-25): Liquid Glass Design System

  - Redesigned with liquid glass aesthetic
  - Enhanced blur effects (20px+)
  - Soft cyan/mint/violet accent palette
  - Fluid animations and micro-interactions
  - Noise textures and floating particles
  - Subtle parallax motion support

- **v1.0.0** (2025-12-25): Initial design guidelines

---

## 💡 Design Inspiration

- macOS Vision UI (Apple)
- Frosted glass interfaces (iOS 15+)
- Liquid motion design (Stripe, Linear)
- Premium desktop apps (Raycast, Arc Browser)

**Keywords:** liquid glass UI, translucent, frosted glass, depth, motion-rich, micro-interactions, premium UX, minimal, futuristic

#### Content Area

```tsx
className = "glass-effect backdrop-blur-xl border-2 border-white/20";
```

### 5. Form Elements

#### Toggle Switches

```tsx
// Track (off state)
className = "bg-white/20";

// Track (on state)
className = "bg-gradient-to-r from-green-500 to-emerald-500";

// Thumb
className = "bg-white"; // Always white for visibility
```

#### Sliders

```tsx
// Track
className = "bg-white/20";

// Accent color: indigo-500 (set via accent-indigo-500)
```

---

## 📏 Spacing & Sizing

### Compact Layout Principles

- Main content padding: `p-4` (16px)
- Section margins: `mt-5` (20px)
- Card padding: `p-4` to `p-6` (16-24px)
- Button padding: `py-2.5 px-5` (10px vertical, 20px horizontal)
- Gap between elements: `gap-2` to `gap-3` (8-12px)

### Circular Timer

- Size: `200x200` pixels
- Radius: `85` units
- Stroke width: `10` units
- Text: `text-5xl` (48px) for time display

---

## 🎭 Animation Guidelines

### Available Animations

```css
.animate-fadeIn      /* 0.5s fade in with slight upward movement */
/* 0.5s fade in with slight upward movement */
/* 0.5s fade in with slight upward movement */
/* 0.5s fade in with slight upward movement */
.animate-slideUp     /* 0.6s slide up with fade */
.animate-pulse-slow  /* 3s infinite pulse opacity */
.animate-bounce-slow; /* 2s infinite bounce */
```

### Usage Rules

- Use `animate-fadeIn` for modal appearances
- Use `animate-slideUp` for main content entrance
- Use `animate-pulse-slow` for decorative blobs and active indicators
- Use `animate-bounce-slow` for task icons

---

## ✅ DO's and DON'Ts

### ✅ DO

- Use white text on all glass-effect elements
- Add `drop-shadow` to white text for better readability
- Use semi-transparent colored backgrounds (`/20`, `/30`, `/40` opacity)
- Maintain consistent border colors (`border-white/20`, `border-white/30`)
- Use gradient borders for active states
- Keep padding consistent across similar elements

### ❌ DON'T

- Never use white background with white text
- Never use `glass-effect` without checking text color
- Don't use high opacity values (>50%) for decorative backgrounds
- Don't mix light/dark themes in the same view
- Don't use black or dark text colors (app uses dark theme only)
- Don't exceed `p-6` padding to maintain compact layout

---

## 🔍 Accessibility Considerations

### Contrast Ratios

- White text on `glass-effect` background: ~8:1 (AAA)
- White text on colored gradients: Always include drop-shadow
- Use `text-white/80` for secondary information (still readable)

### Interactive Elements

- Minimum touch target: `44x44` pixels
- Clear hover states with `hover:scale-105` or color changes
- Disabled states should use `opacity-50` and `cursor-not-allowed`

---

## 🛠️ Implementation Checklist

When creating new components:

- [ ] Background color is dark or semi-transparent
- [ ] Text color is white with appropriate opacity
- [ ] Hover states are defined and visible
- [ ] Borders use white with opacity (`border-white/20`)
- [ ] Animations are smooth (300ms transitions)
- [ ] Spacing follows the compact layout principles
- [ ] Glass effects are used consistently
- [ ] Drop shadows on text for readability

---

## 📝 Examples

### Good Example ✅

```tsx
<div className="glass-effect backdrop-blur-md border border-white/20 rounded-xl p-4">
	<p className="text-white font-bold drop-shadow-lg">Readable white text</p>
</div>
```

### Bad Example ❌

```tsx
<div className="bg-white rounded-xl p-4">
	<p className="text-white font-bold">
		{/* White text on white background - INVISIBLE! */}
	</p>
</div>
```

---

## 🔄 Version History

- **v1.0.0** (2025-12-25): Initial design guidelines established
  - Dark theme with glassmorphism
  - Consistent color palette
  - Compact layout principles
  - Accessibility standards

---

## 📞 Questions?

If you're unsure about a color choice or design decision, refer to existing components in `App.tsx` and `SettingsModal.tsx` as reference implementations.
