# Design Guidelines: Lost & Found Inventory Management System

## Design Approach

**Selected Approach:** Design System - Clean SaaS Style

Drawing inspiration from modern productivity tools like Linear, Notion, and Asana, this system prioritizes clarity, efficiency, and intuitive data management. The design emphasizes functional excellence over visual flair, creating a professional internal tool that reduces cognitive load and speeds up item recovery processes.

**Core Principles:**
- Information clarity: Every element serves a functional purpose
- Efficient workflows: Minimize clicks to complete tasks
- Scannable layouts: Quick visual processing of item inventories
- Professional restraint: Clean, corporate-appropriate aesthetics
- Accessibility-first: Clear hierarchy and intuitive navigation

---

## Typography System

**Font Family:**
- Primary: Inter (via Google Fonts) - exceptional readability for UI and data
- Fallback: system-ui, -apple-system, sans-serif

**Type Scale:**
- Page Headers: text-3xl (30px) font-semibold
- Section Titles: text-xl (20px) font-semibold
- Card Titles/Item Names: text-lg (18px) font-medium
- Body Text: text-base (16px) font-normal
- Secondary Info: text-sm (14px) font-normal
- Captions/Meta: text-xs (12px) font-normal

**Hierarchy Rules:**
- Use font-weight variations (normal, medium, semibold) for hierarchy
- Maintain consistent line-height: leading-normal for body, leading-tight for headers
- Apply letter-spacing strategically: tracking-tight for large headings

---

## Layout System

**Spacing Primitives:**
Core spacing units: 2, 4, 6, 8, 12, 16, 20, 24 (Tailwind units)

**Common Patterns:**
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-6, space-y-8
- Grid gaps: gap-4, gap-6
- Margins: m-4, mb-8, mt-12

**Container Structure:**
- Max-width: max-w-7xl for main content areas
- Responsive padding: px-4 sm:px-6 lg:px-8
- Dashboard grid: Single column on mobile, 12-column grid on desktop

**Page Layouts:**

1. **Dashboard View** (Main Inventory)
   - Header: Fixed top bar with logo, search, and user menu (h-16)
   - Sidebar: Optional admin navigation (w-64, hidden on mobile)
   - Main Content: Grid of item cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
   - Filters Panel: Collapsible sidebar or top bar with category/date/status filters

2. **Item Registration Form** (Admin)
   - Centered form layout: max-w-2xl mx-auto
   - Generous spacing: space-y-6 between form sections
   - Two-column grid for related fields: grid-cols-1 md:grid-cols-2 gap-4

3. **Item Detail View**
   - Split layout: Image gallery (left, w-full lg:w-1/2) + Details (right)
   - Metadata cards: Stacked vertically with space-y-4
   - Action buttons: Fixed bottom bar on mobile, inline on desktop

---

## Component Library

### Navigation Components

**Top Navigation Bar:**
- Height: h-16
- Structure: Flex layout with justify-between
- Left: Logo + site title
- Center: Global search bar (max-w-md, w-full)
- Right: User profile dropdown + notification icon
- Border: border-b with subtle divide

**Admin Sidebar** (for authorized users):
- Width: w-64
- Sections: Dashboard, Add Item, All Items, Categories, Reports
- Each item: px-4 py-3 with hover states
- Active indicator: Left border accent

### Data Display Components

**Item Card:**
- Structure: Vertical card with rounded-lg and shadow-sm
- Image section: aspect-video with object-cover
- Content padding: p-4
- Elements:
  - Item thumbnail (w-full, h-48)
  - Item name (text-lg font-medium, truncate)
  - Found location (text-sm with map pin icon)
  - Found date (text-xs)
  - Status badge (inline-flex, px-2 py-1, rounded-full, text-xs)
  - "View Details" link (text-sm font-medium)

**Search & Filter Bar:**
- Container: Sticky top-16, py-4
- Search input: Prominent with search icon, rounded-lg, w-full md:max-w-md
- Filter buttons: Inline-flex gap-2, wrapped
- Active filters: Chips with dismiss icons
- Sort dropdown: Right-aligned

**Data Table** (Alternative to cards for admin):
- Full-width responsive table
- Columns: Thumbnail (w-20), Name, Category, Location, Date Found, Status, Actions
- Row height: h-16 with vertical align-middle
- Hover: Subtle row highlight
- Mobile: Stack into cards on small screens

### Form Components

**Input Fields:**
- Label: text-sm font-medium mb-2
- Input: h-10, px-3, rounded-lg, border, focus:ring-2
- Helper text: text-xs mt-1
- Error state: Border accent with error message

**Textarea:**
- Min height: h-24
- Resize: resize-none or resize-y
- Same styling as inputs

**Select Dropdown:**
- Height: h-10
- Custom arrow icon
- Options with adequate padding (py-2 px-3)

**File Upload (for item photos):**
- Drag-and-drop zone: border-2 border-dashed, rounded-lg, p-8
- Preview grid: Grid of thumbnails (grid-cols-4 gap-2)
- Upload button: Centered, with upload icon

**Submit Buttons:**
- Primary: px-6 py-3, rounded-lg, font-medium, w-full sm:w-auto
- Secondary: Same size with outline variant
- Disabled state: opacity-50, cursor-not-allowed

### Feedback Components

**Status Badges:**
- Available: px-2.5 py-0.5, rounded-full, text-xs font-medium
- Claimed: Same structure, different semantic treatment
- Pending: Same structure

**Empty States:**
- Centered content: text-center, py-12
- Icon: Large (w-16 h-16)
- Heading: text-lg font-medium, mt-4
- Description: text-sm, mt-2, max-w-md mx-auto
- Action button: mt-6

**Loading States:**
- Skeleton cards: animate-pulse with placeholder blocks
- Spinner: Centered, w-8 h-8 for page loads

### Modal/Dialog

**Item Detail Modal:**
- Overlay: Fixed inset-0 with backdrop
- Dialog: max-w-4xl, rounded-xl, shadow-2xl
- Close button: Absolute top-4 right-4
- Content: p-6 with scrollable body

**Confirmation Dialogs:**
- Smaller: max-w-md
- Actions: Flex justify-end gap-3
- Cancel + Confirm buttons

---

## Images

**Item Photographs:**
- Primary: Item cards require thumbnail images (300x200px recommended)
- Detail view: Larger gallery images (800x600px)
- Image treatment: rounded-lg, object-cover
- Fallback: Placeholder icon for items without photos

**No Hero Section:** This is a functional database tool, not a marketing site. The interface should load directly into the dashboard/inventory view with search and filtering immediately accessible.

---

## Animations

**Minimal, Functional Only:**
- Hover transitions: transition-colors duration-200
- Modal entry: Fade in with scale
- Loading states: Simple pulse animation
- NO scroll-based animations, parallax, or decorative motion

---

## Responsive Behavior

**Breakpoints:**
- Mobile: Default (< 640px) - Single column, stacked layout
- Tablet: sm/md (640-1024px) - 2-column grid, visible filters
- Desktop: lg+ (1024px+) - 3-4 column grid, sidebar navigation

**Mobile Priorities:**
- Bottom navigation for key actions
- Collapsible filters in drawer
- Simplified item cards with essential info
- Touch-friendly tap targets (min h-12)