---
name: Argana Media
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#ae3200'
  on-secondary: '#ffffff'
  secondary-container: '#fe6a3a'
  on-secondary-container: '#5f1700'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59f'
  on-secondary-fixed: '#3a0a00'
  on-secondary-fixed-variant: '#852400'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 32px
  margin-x: 24px
  section-padding-y: 100px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
This design system is built on a foundation of "Precision Minimalism." It targets high-growth B2B and enterprise clients by evoking a sense of technical mastery, transparency, and strategic confidence. 

The aesthetic is characterized by a stark monochrome base that allows content and data to speak for themselves. The design style blends **Corporate Modern** with **High-Contrast** elements, using vast amounts of negative space to create a premium, editorial feel. Visual interest is generated through thin-stroke iconography and a single, high-energy accent color that directs the user's journey toward conversion without overwhelming the sophisticated atmosphere.

## Colors
The palette is hyper-disciplined, relying on high-contrast relationships to establish hierarchy.

- **Primary (Black):** Used for typography, primary backgrounds, and structural elements to ground the design in authority.
- **Accent (Burnt Orange):** A high-visibility "Action" color reserved exclusively for call-to-action buttons, active indicators, and critical focus points.
- **Neutral (Slate/Gray):** Used for secondary text, borders, and metadata to ensure a clear distinction between core content and supportive information.
- **Backgrounds:** Utilizes a "Sectional Polarity" approach, alternating between pure white (#FFFFFF) and deep black (#0C0C0C) to delineate different content phases clearly.

## Typography
The system uses **Hanken Grotesk** across all roles to maintain a unified, modern, and engineering-led feel. 

Typography is treated as a structural element. Headlines use tight letter-spacing and heavy weights to create a sense of impact, while body copy maintains generous line-heights for maximum readability against both light and dark backgrounds. A specialized `label-caps` style is used for navigation and small headers to provide architectural rhythm to the page.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy with a focus on expansive vertical rhythm.

- **Grid:** A 12-column grid system is used for desktop, shifting to a single column for mobile.
- **Sectioning:** Content is grouped into high-contrast "bands." Transitions between black and white backgrounds should be abrupt to create clear mental shifts between topics.
- **White Space:** Generous 100px+ vertical padding between sections is mandatory to preserve the minimalist, premium feel. 
- **Alignment:** Central alignment is preferred for high-level messaging (Hero, Section Headers), while utility content (Feature cards, Grids) follows a left-aligned, structured layout.

## Elevation & Depth
This system avoids traditional drop shadows in favor of **Tonal Layering** and **Low-Contrast Outlines**.

- **Surfaces:** Depth is created through value contrast. On white backgrounds, cards use a very subtle 1px light gray border (#E0E0E0). On black backgrounds, interactive elements use tonal shifts (e.g., a dark gray surface against a black background).
- **Interactive States:** Lift is communicated via color shifts (e.g., a button becoming slightly brighter) rather than physical elevation shadows. 
- **Overlays:** Simple, high-opacity black overlays are used for video modals and mobile navigation to maintain the "Precision" aesthetic.

## Shapes
The shape language is "Soft-Geometric." While the overall layout feels rigid and grid-based, individual interactive components use a subtle 4px (Soft) radius to prevent the UI from feeling too aggressive or "sharp."

- **Cards:** Use a `rounded-lg` (8px) radius to create a containerized feel for content groups.
- **Buttons:** Follow a standard 4px radius unless a "Pill" variant is specifically required for secondary actions.
- **Media:** Images and videos should feature the same 8px radius to harmonize with the card system.

## Components

- **Buttons:** Primary buttons are solid Burnt Orange with white text. Secondary buttons are outlined (Ghost) or solid black with white text. All buttons use `label-caps` for the label.
- **Cards:** Feature cards are white with a subtle 1px border. They contain a thin-stroke icon (accent color), a bold headline, and limited body text.
- **Data Visuals:** Charts and statistics use massive font sizes (Display-LG) to emphasize results, paired with thin dividers.
- **Inputs:** Form fields are minimalist with 1px bottom borders or light-gray outlines, prioritizing clean typography and clear focus states.
- **Navigation:** The header is transparent or solid black with high-contrast white links. Hover states trigger a subtle opacity change or a bottom-border underline in the accent color.