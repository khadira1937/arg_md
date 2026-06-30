---
name: Vibrant Enterprise
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#191c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2e3035'
  outline: '#a08e79'
  outline-variant: '#524433'
  surface-tint: '#ffb956'
  primary: '#ffcf93'
  on-primary: '#462b00'
  primary-container: '#ffaa17'
  on-primary-container: '#6a4300'
  inverse-primary: '#835400'
  secondary: '#cec2d5'
  on-secondary: '#352e3c'
  secondary-container: '#4e4655'
  on-secondary-container: '#c0b4c7'
  tertiary: '#9be1ff'
  on-tertiary: '#003545'
  tertiary-container: '#00cbfe'
  on-tertiary-container: '#005268'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb5'
  primary-fixed-dim: '#ffb956'
  on-primary-fixed: '#2a1800'
  on-primary-fixed-variant: '#643f00'
  secondary-fixed: '#eadef2'
  secondary-fixed-dim: '#cec2d5'
  on-secondary-fixed: '#1f1926'
  on-secondary-fixed-variant: '#4c4453'
  tertiary-fixed: '#bbe9ff'
  tertiary-fixed-dim: '#5ed4ff'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d63'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
  surface-white: '#FFFFFF'
  accent-gradient: 'linear-gradient(90deg, #FFAA17 0%, #FFCC33 100%)'
  glass-border: rgba(255, 255, 255, 0.1)
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-lg:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  button:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1240px
  gutter: 30px
  section-padding-desktop: 120px
  section-padding-mobile: 60px
  unit-xs: 4px
  unit-sm: 8px
  unit-md: 16px
  unit-lg: 24px
  unit-xl: 48px
---

## Brand & Style

This design system embodies a **Modern Corporate** aesthetic tailored for high-end digital agencies. It balances professional authority with creative energy, utilizing high-contrast layouts and precise geometric shapes. 

The visual narrative is driven by a "Dark Mode First" philosophy, where deep, ink-like backgrounds allow vibrant accent colors to pop with neon-like intensity. The style utilizes clean lines, generous whitespace (even in dark themes), and a sophisticated use of gradients to imply movement and digital fluency. The target emotional response is one of trust, innovation, and premium quality.

## Colors

The palette is anchored by a high-energy **Vibrant Orange** (#FFAA17) used strategically for calls to action and critical highlights. The primary background environment is **Deep Obsidian** (#130D1A), which provides a more sophisticated depth than pure black. 

**Secondary surfaces** use a lighter Charcoal (#222429) to create structural hierarchy. White is reserved for high-readability body text and stark contrast elements. Gradients should be used sparingly, primarily on primary buttons and decorative icons, transitioning from the base orange to a lighter, sun-kissed yellow-orange.

## Typography

The typographic system utilizes **Outfit** for all display and heading roles to leverage its geometric, modern character and wide aperture. It is paired with **DM Sans** for body text to ensure maximum legibility and a friendly, accessible tone in long-form content.

Headlines should utilize tight letter-spacing and bold weights to command attention. Labels and overlines should use uppercase Outfit with increased tracking for a technical, organized feel.

## Layout & Spacing

This system uses a **12-column fixed grid** for desktop, centered within a 1240px container. Large-scale vertical spacing (120px+) between sections is essential to maintain the premium, "breathable" feel of the agency brand.

On mobile, the layout transitions to a single-column fluid model with 20px side margins. Gutters remain consistent at 30px to ensure visual air between cards and grid items. Component-level spacing follows an 8px modular scale to maintain mathematical harmony.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** rather than traditional shadows. Because the background is dark, "elevated" elements like cards or modals are represented by shifting the background color from Deep Obsidian (#130D1A) to Charcoal (#222429).

Fine, 1px borders using `glass-border` (white at 10% opacity) should be used to define the edges of containers. For interactive elements, a subtle outer glow using the primary orange color may be used on hover to simulate luminescence.

## Shapes

The shape language is **Soft and Precise**. The base radius of 0.25rem (4px) ensures that elements look modern and professional without appearing too "bubbly" or playful. 

Buttons may diverge from this to use a fully rounded (pill-shaped) profile for distinct visual contrast against rectangular cards and sections. Icons should be placed within circular or slightly rounded square containers to maintain consistency.

## Components

### Buttons
Primary buttons use the `accent-gradient` with white text and a pill-shaped radius. They should include a subtle transition effect where the gradient shifts or the scale increases slightly (1.05x) on hover. Secondary buttons use a transparent background with a 1px white or orange border.

### Cards
Cards are built on the Charcoal (#222429) surface with the `glass-border`. They should feature generous internal padding (unit-xl) and an "accent tip" or icon in the primary orange color to draw the eye.

### Input Fields
Inputs use the Deep Obsidian background with a 1px Charcoal border. On focus, the border should transition to the Primary Orange. Placeholder text should use a reduced opacity of the body text color.

### Chips & Tags
Used for categories or services, these should be small, uppercase labels with a subtle background tint of the primary color (e.g., Orange at 15% opacity) to signify interactivity without competing with main buttons.

### Section Headers
Always include a "Label" (Overline) in the primary orange color above the main Headline to provide context and strengthen the brand's color presence.