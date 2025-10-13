# Design Guidelines: Interactive Citation Network Visualization Dashboard

## Design Approach

**Selected Approach**: Design System - Data Visualization Focus

This project requires a specialized approach combining Material Design principles with academic data visualization best practices. Drawing inspiration from Observable, Semantic Scholar, and Papers with Code, we prioritize clarity, information density, and sophisticated data presentation over decorative elements.

**Core Principles**:
- Information clarity over visual flourish
- Sophisticated color coding for academic categorization
- Professional, research-grade aesthetic
- Seamless interactive feedback

---

## Color Palette

### Primary Academic Palette
**Background & Surface**:
- Primary Background (Dark): 220 15% 12%
- Secondary Surface: 220 12% 18%
- Elevated Surface: 220 10% 22%

**LLM Research Topic Colors** (8 distinct hues for maximum differentiation):
- Multimodal Learning: 280 70% 65%
- Educational Application: 200 75% 60%
- Model Adaptation: 160 65% 58%
- Bias & Culture: 25 80% 62%
- Advanced Reasoning: 340 70% 63%
- Domain Knowledge: 180 68% 60%
- Language Ability: 240 72% 64%
- Social Intelligence: 45 75% 60%

**Psychology Topic Colors** (6 distinct, complementary hues):
- Social-Clinical: 350 75% 65%
- Education: 190 70% 60%
- Language: 270 68% 63%
- Social Cognition: 30 72% 62%
- Neural Mechanisms: 150 65% 60%
- Psychometrics: 210 70% 62%

**Functional Colors**:
- Citation Edge: 220 40% 50% (with opacity variations)
- Hover Highlight: 210 95% 70%
- Selected State: 180 85% 65%
- Grid/Axes: 220 20% 35%

### Light Mode Adaptation
- Primary Background: 210 20% 98%
- Surface: 210 15% 95%
- Text: 220 25% 15%

---

## Typography

**Font Stack**:
- Primary: 'Inter', system-ui, sans-serif
- Monospace (data): 'JetBrains Mono', 'Courier New', monospace

**Type Scale**:
- Page Title: text-3xl font-semibold (LLM-Psychology Citation Network)
- Section Headers: text-xl font-medium
- Graph Labels: text-sm font-medium
- Axis Labels: text-xs font-normal
- Data Values: text-sm font-mono
- Table Headers: text-sm font-semibold uppercase tracking-wide
- Table Content: text-sm font-normal
- Tooltips: text-xs font-medium

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20

**Main Layout Structure**:
- Container: max-w-screen-2xl mx-auto
- Top Section (8:2 split): 
  - Left Visualization Area: w-4/5 p-8
  - Right Panel: w-1/5 p-6
- Bottom Section: Full width p-8
- Component Spacing: gap-8 between major sections
- Internal Padding: p-6 for cards, p-4 for compact elements

**Grid Systems**:
- Graph Container: grid grid-cols-2 gap-12 (bipartite + line chart)
- Table Layout: w-full with fixed column widths
- Bar Chart: Full width of bottom section

---

## Component Library

### Navigation & Header
- Sticky top bar: bg-surface backdrop-blur-sm border-b
- Logo/Title: Left-aligned with subtle accent color
- Minimal utility controls: Right-aligned (theme toggle, info)
- Height: h-16 with py-4 px-8

### Bipartite Graph Visualization
- Canvas/SVG container: aspect-[4/3] with responsive scaling
- Node Design:
  - Circles: r-based on topic size (8-24px range)
  - Fill: Topic-specific colors at 85% opacity
  - Stroke: 2px solid white/dark at 40% opacity
  - Hover: Scale 1.15, opacity 100%, glow effect (shadow-lg)
  - Selected: Persistent glow, stroke-4
- Edge Design:
  - Curved paths (cubic bezier)
  - Stroke width: 1-6px based on citation count
  - Opacity: 0.3 base, 0.7 on hover, 0.9 on selection
  - Color: Gradient from source to target topic colors
- Labels:
  - Topic names: text-sm positioned near nodes
  - Citation counts: text-xs on hover only

### Line Chart
- Container: border rounded-lg with subtle shadow
- Axes: Solid 1px grid lines at 30% opacity
- Line: 2.5px stroke, smooth curves
- Data Points: 8px circles on hover
- Legend: Horizontal layout, color-coded chips
- Transition: 300ms ease-in-out on data change
- Y-axis: "Citation Count", X-axis: "Time (Monthly)"

### Theory/Framework Table
- Header: Sticky, bg-elevated, border-b-2
- Columns: [Subtopic (30%), Theory/Framework (50%), Citation Frequency (20%)]
- Row Design:
  - Height: h-12, border-b border-surface
  - Hover: bg-surface/50 transition
  - Top 3 markers: Black triangle (▲) inline before text
  - Opacity mapping: 0.4 (low) to 1.0 (high) based on citations
- Cell Padding: px-4 py-3
- Triangle Icons: w-3 h-3 mr-2

### Bar Chart
- Orientation: Horizontal bars
- Bar Height: h-8 with gap-2
- Fill: Gradient from LLM topic color
- Labels: Left-aligned topic names, right-aligned values
- Animation: Width transition 400ms ease-out
- Container: p-8 bg-surface/30 rounded-xl

### Interactive States
**Hover Effects**:
- Nodes: transform scale-110, shadow-lg
- Table Rows: bg-surface/50
- Bars: brightness-110

**Selection States**:
- Active Node: Persistent highlight ring-4
- Connected Elements: Opacity increase, dim others to 0.3
- Duration: 250ms transitions

**Tooltips**:
- Background: bg-elevated/95 backdrop-blur
- Border: border border-accent/20
- Shadow: shadow-2xl
- Padding: px-4 py-2
- Arrow: 8px triangle pointer
- Content: Multi-line with label + value pairs

---

## Animations

**Use Sparingly**:
- Graph Transitions: 300ms ease-in-out on data change
- Hover States: 150ms ease-out
- Chart Updates: 400ms ease-in-out
- Table Sort/Filter: 250ms ease

**NO Animations For**:
- Initial page load (instant display)
- Decorative effects
- Scroll-based triggers

---

## Dark Mode Implementation

**Consistent Application**:
- All form inputs: bg-surface border-grid text-primary
- All text fields: Proper contrast ratios (WCAG AA)
- Graph backgrounds: Transparent or surface-tinted
- Code/data blocks: bg-elevated with syntax-appropriate colors

**Toggle Behavior**:
- Smooth 200ms transition on all color properties
- Persist user preference in localStorage
- Icon-based toggle in header (sun/moon)

---

## Accessibility Considerations

- Focus indicators: ring-2 ring-accent on all interactive elements
- Keyboard navigation: Tab order follows visual hierarchy
- ARIA labels: Descriptive labels for all graph nodes and data points
- Color contrast: Minimum 4.5:1 for text, 3:1 for UI elements
- Screen reader: Announce state changes on interactions
- Reduced motion: Respect prefers-reduced-motion media query

---

## Visual Hierarchy

1. **Primary Focus**: Bipartite Graph (largest, left-positioned)
2. **Secondary**: Line Chart (coordinated timing, right of graph)
3. **Tertiary**: Theory Table (below, triggered interaction)
4. **Supporting**: Bar Chart (bottom, final detail layer)

**Information Flow**: Top-to-bottom, left-to-right, progressive disclosure through interaction