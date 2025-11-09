# Tailwind CSS Cheat Sheet for shaunallsopp.dev

Quick reference for common Tailwind CSS classes used in this project.

## 📑 Quick Jump
- [Grid Layout](#-grid-layout) - 2 column layouts, responsive grids
- [Text Wrapping & Overflow](#-text-wrapping--overflow) - **NEW!** whitespace, break-words, truncate
- [Responsive Breakpoints](#-responsive-design-breakpoints) - sm:, md:, lg:, xl:
- [Flexbox](#-flexbox) - flex, justify, align, gap
- [Spacing](#-spacing-margin--padding) - Margin & padding
- [Colors & Borders](#-colors--shades) - Colors, shades, borders
- [Font Sizes](#-font-sizes) - text-xs to text-9xl
- [Width & Height](#-width--height) - Sizing elements
- [Common Patterns](#-common-patterns-for-this-project) - Ready-to-use code snippets
- [Common Mistakes](#-common-mistakes) - What to avoid

---

## 📏 Font Sizes

```
text-xs    → 0.75rem (12px)
text-sm    → 0.875rem (14px)
text-base  → 1rem (16px)     ← Default
text-lg    → 1.125rem (18px)
text-xl    → 1.25rem (20px)
text-2xl   → 1.5rem (24px)
text-3xl   → 1.875rem (30px)
text-4xl   → 2.25rem (36px)
text-5xl   → 3rem (48px)
text-6xl   → 3.75rem (60px)
text-7xl   → 4.5rem (72px)
text-8xl   → 6rem (96px)
text-9xl   → 8rem (128px)
```

**Note:** `text-md` doesn't exist - use `text-base` instead!

---

## 🎯 Grid Layout

### Enable Grid
```
grid         → display: grid
inline-grid  → display: inline-grid
```

### Grid Columns (Template Columns)
```
grid-cols-1   → 1 column
grid-cols-2   → 2 columns  ← Common for blog posts
grid-cols-3   → 3 columns
grid-cols-4   → 4 columns
grid-cols-5   → 5 columns
grid-cols-6   → 6 columns
grid-cols-12  → 12 columns (like Bootstrap)
grid-cols-none → no columns

Examples:
grid grid-cols-2           → Always 2 columns
grid grid-cols-1 md:grid-cols-2  → 1 col mobile, 2 cols desktop
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 → Responsive 1/2/3 cols
```

### Grid Rows
```
grid-rows-1   → 1 row
grid-rows-2   → 2 rows
grid-rows-3   → 3 rows
grid-rows-4   → 4 rows
grid-rows-6   → 6 rows
grid-rows-none → no rows
```

### Grid Auto Flow
```
grid-flow-row     → Fill by row (default)
grid-flow-col     → Fill by column
grid-flow-row-dense → Dense packing by row
grid-flow-col-dense → Dense packing by column
```

### Grid Gap (Space Between Items)
```
gap-0   → 0
gap-1   → 0.25rem (4px)
gap-2   → 0.5rem (8px)
gap-4   → 1rem (16px)    ← Common
gap-6   → 1.5rem (24px)  ← Common
gap-8   → 2rem (32px)
gap-10  → 2.5rem (40px)

gap-x-4  → Horizontal gap only
gap-y-4  → Vertical gap only
```

### Common Grid Patterns
```jsx
// 2 column layout (all screens)
<div className="grid grid-cols-2 gap-4">

// Responsive: 1 col mobile, 2 cols desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Responsive: 1/2/3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// 4 column grid with large gap
<div className="grid grid-cols-4 gap-8">
```


---

## 🎨 Colors & Shades

All colors have shades from **50 (lightest)** to **950 (darkest)**:

### Gray Scale (Most Common for Borders/Text)
```
gray-50   → Almost white
gray-100  → Very light gray
gray-200  → Light gray
gray-300  → Medium-light gray  ← Common for borders
gray-400  → Medium gray
gray-500  → True gray
gray-600  → Medium-dark gray   ← Good for secondary text
gray-700  → Dark gray
gray-800  → Very dark gray
gray-900  → Almost black
gray-950  → Darkest
```

### Other Colors
Same shade system (50-950) for:
- `red`, `blue`, `green`, `yellow`, `purple`, `pink`, `indigo`, `teal`, `orange`
- `black`, `white` (no shades)

**Usage:**
- Text: `text-gray-600`, `text-blue-500`
- Background: `bg-gray-100`, `bg-blue-500`
- Border: `border-gray-300`, `border-blue-500`

---

## 📦 Spacing (Margin & Padding)

### Format: `{property}{side}-{size}`

**Properties:**
- `m` = margin
- `p` = padding

**Sides:**
- *(none)* = all sides
- `t` = top
- `b` = bottom
- `l` = left
- `r` = right
- `x` = left & right (horizontal)
- `y` = top & bottom (vertical)

**Sizes:**
```
0   → 0
1   → 0.25rem (4px)
2   → 0.5rem (8px)
3   → 0.75rem (12px)
4   → 1rem (16px)      ← Common
5   → 1.25rem (20px)
6   → 1.5rem (24px)    ← Common
8   → 2rem (32px)      ← Common
10  → 2.5rem (40px)
12  → 3rem (48px)
16  → 4rem (64px)
20  → 5rem (80px)
24  → 6rem (96px)
32  → 8rem (128px)
```

**Examples:**
```
p-4        → padding: 1rem (all sides)
pt-2       → padding-top: 0.5rem
pb-6       → padding-bottom: 1.5rem
px-4       → padding: 0 1rem (left & right)
py-2       → padding: 0.5rem 0 (top & bottom)

m-4        → margin: 1rem (all sides)
mt-6       → margin-top: 1.5rem
mb-8       → margin-bottom: 2rem
mx-auto    → margin: 0 auto (center horizontally)
my-4       → margin: 1rem 0 (top & bottom)
```

---

## 🔲 Borders

### Border Width
```
border     → 1px (all sides)
border-0   → no border
border-2   → 2px
border-4   → 4px
border-8   → 8px

border-t   → top only
border-b   → bottom only
border-l   → left only
border-r   → right only
```

### Border Color
```
border-gray-300   → Light gray border (common)
border-blue-500   → Blue border
border-black      → Black border
border-white      → White border
```

### Border Radius (Rounded Corners)
```
rounded-none  → 0
rounded-sm    → 0.125rem (2px)
rounded       → 0.25rem (4px)    ← Default "slightly rounded"
rounded-md    → 0.375rem (6px)
rounded-lg    → 0.5rem (8px)
rounded-xl    → 0.75rem (12px)
rounded-2xl   → 1rem (16px)
rounded-3xl   → 1.5rem (24px)
rounded-full  → 9999px (perfect circle/pill)

rounded-t-lg  → top corners only
rounded-b-lg  → bottom corners only
rounded-l-lg  → left corners only
rounded-r-lg  → right corners only
```

---

## 📐 Flexbox

### Enable Flexbox
```
flex        → display: flex
inline-flex → display: inline-flex
```

### Flex Direction
```
flex-row         → row (default, horizontal)
flex-row-reverse → row reversed
flex-col         → column (vertical, stack items)
flex-col-reverse → column reversed
```

### Justify Content (Main Axis - Horizontal in flex-row)
```
justify-start    → items at start (default)
justify-center   → items centered
justify-end      → items at end
justify-between  → space between items
justify-around   → space around items
justify-evenly   → equal space between items
```

**Note:** `justify-left` doesn't exist - use `justify-start`!

### Align Items (Cross Axis - Vertical in flex-row)
```
items-start      → align to top
items-center     → align to center (vertically centered)
items-end        → align to bottom
items-baseline   → align to text baseline
items-stretch    → stretch to fill (default)
```

### Flex Wrap
```
flex-wrap         → wrap items to next line
flex-wrap-reverse → wrap in reverse
flex-nowrap       → don't wrap (default)
```

### Gap (Space Between Flex Items)
```
gap-0   → 0
gap-1   → 0.25rem (4px)
gap-2   → 0.5rem (8px)
gap-4   → 1rem (16px)    ← Common
gap-6   → 1.5rem (24px)
gap-8   → 2rem (32px)
gap-10  → 2.5rem (40px)
```

### Flex Grow/Shrink
```
flex-1      → flex: 1 1 0% (grow and shrink)
flex-auto   → flex: 1 1 auto
flex-initial → flex: 0 1 auto
flex-none   → flex: none (don't grow or shrink)
```

**Common Flex Patterns:**
```jsx
// Horizontal centered layout
<div className="flex justify-center items-center">

// Vertical stack
<div className="flex flex-col gap-4">

// Space between items
<div className="flex justify-between items-center">

// Center everything
<div className="flex justify-center items-center min-h-screen">
```

---

## 📏 Width & Height

### Width
```
w-0      → 0
w-1      → 0.25rem (4px)
w-4      → 1rem (16px)
w-20     → 5rem (80px)
w-1/2    → 50%
w-1/3    → 33.333%
w-2/3    → 66.666%
w-1/4    → 25%
w-3/4    → 75%
w-full   → 100%
w-screen → 100vw
w-auto   → auto
w-fit    → fit-content

max-w-xs     → 20rem (320px)
max-w-sm     → 24rem (384px)
max-w-md     → 28rem (448px)
max-w-lg     → 32rem (512px)
max-w-xl     → 36rem (576px)
max-w-2xl    → 42rem (672px)
max-w-4xl    → 56rem (896px)
max-w-6xl    → 72rem (1152px)
max-w-7xl    → 80rem (1280px)  ← Common for content containers
max-w-full   → 100%
```

### Height
```
h-0      → 0
h-1      → 0.25rem (4px)
h-4      → 1rem (16px)
h-20     → 5rem (80px)
h-full   → 100%
h-screen → 100vh
h-auto   → auto
h-fit    → fit-content

min-h-screen → min-height: 100vh (full viewport)
min-h-full   → min-height: 100%
```

---

## ✍️ Font Styling

### Font Weight
```
font-thin       → 100
font-extralight → 200
font-light      → 300
font-normal     → 400 (default)
font-medium     → 500
font-semibold   → 600
font-bold       → 700  ← Common
font-extrabold  → 800
font-black      → 900
```

### Font Family
```
font-sans  → Sans-serif (default)
font-serif → Serif
font-mono  → Monospace  ← Used in your header for "code" feel
```

### Text Alignment
```
text-left    → left aligned (default)
text-center  → centered
text-right   → right aligned
text-justify → justified
```

### Text Transform
```
uppercase    → UPPERCASE
lowercase    → lowercase
capitalize   → Capitalize First Letter
normal-case  → Normal Case
```

### Line Height
```
leading-none    → 1
leading-tight   → 1.25
leading-snug    → 1.375
leading-normal  → 1.5 (default)
leading-relaxed → 1.625
leading-loose   → 2
```

---

## 📝 Text Wrapping & Overflow

### Whitespace (Line Breaks & Spaces)
```
whitespace-normal    → Normal wrapping (default, collapses whitespace)
whitespace-nowrap    → No wrapping, single line (text overflows)
whitespace-pre       → Preserve all whitespace, no wrapping (like <pre>)
whitespace-pre-line  → Preserve line breaks, wrap text ← Best for paragraphs/blog posts
whitespace-pre-wrap  → Preserve all whitespace AND wrap text
whitespace-break-spaces → Like pre-wrap but breaks spaces too
```

**Common Use Cases:**
```jsx
// Blog posts with paragraphs
<p className="whitespace-pre-line">{post.content}</p>

// Keep text on one line
<span className="whitespace-nowrap">Don't break this</span>

// Code blocks
<pre className="whitespace-pre">const code = "formatted";</pre>
```

### Word Breaking (Prevent Overflow)
```
break-normal    → Normal word breaking (default)
break-words     → Break words to prevent overflow ← Best for general use
break-all       → Break anywhere, even mid-word ← Best for URLs/emails
break-keep      → Don't break words (for CJK languages)
```

**When to Use:**
```jsx
// General text that might have long words
<div className="break-words">
  LongWordWithoutSpacesThatMightOverflow
</div>

// URLs, emails, or other non-breaking strings
<a className="break-all" href={url}>{url}</a>

// Keep important text together
<span className="break-keep">Don't break this phrase</span>
```

### Text Overflow (Ellipsis)
```
truncate      → Single line with ... (overflow hidden + text-ellipsis + nowrap)
text-ellipsis → Shows ... when text overflows
text-clip     → Clips text without ...

line-clamp-1  → Max 1 line with ...
line-clamp-2  → Max 2 lines with ...
line-clamp-3  → Max 3 lines with ...
line-clamp-4  → Max 4 lines with ...
line-clamp-5  → Max 5 lines with ...
line-clamp-6  → Max 6 lines with ...
line-clamp-none → Remove line clamping
```

**Examples:**
```jsx
// Single line with ellipsis
<h2 className="truncate">Very long title that gets cut off...</h2>

// Multi-line with ellipsis
<p className="line-clamp-3">
  Long description that will show max 3 lines and then...
</p>

// Title + description pattern
<div>
  <h3 className="font-bold truncate">{project.name}</h3>
  <p className="text-sm line-clamp-2">{project.description}</p>
</div>
```

### Overflow Control
```
overflow-auto     → Show scrollbar when needed
overflow-hidden   → Hide overflow (cuts off content)
overflow-visible  → Show overflow (default, can break layout)
overflow-scroll   → Always show scrollbar

overflow-x-auto   → Horizontal scroll when needed
overflow-y-auto   → Vertical scroll when needed
overflow-x-hidden → Hide horizontal overflow
overflow-y-hidden → Hide vertical overflow
```

**Common Patterns:**
```jsx
// Prevent text from breaking layout
<div className="overflow-hidden break-words">

// Scrollable container
<div className="overflow-auto max-h-64">

// Hide overflow completely
<div className="overflow-hidden">
```

### Complete Text Overflow Solution
```jsx
// Blog post card (prevents all overflow issues)
<div className="border p-4 break-words overflow-hidden">
  <h2 className="text-lg font-bold truncate mb-2">
    {post.title}
  </h2>
  <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-line mb-2">
    {post.content}
  </p>
  <a href={post.link} className="text-blue-600 text-sm break-all hover:underline">
    {post.link}
  </a>
</div>

// Project card (grid layout)
<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
  {projects.map(project => (
    <div key={project.id} className="border p-4 break-words overflow-hidden">
      <h3 className="font-bold truncate">{project.name}</h3>
      <p className="text-sm line-clamp-2">{project.description}</p>
      <a href={project.link} className="text-sm text-blue-600 break-all block">
        {project.link}
      </a>
    </div>
  ))}
</div>
```

---

## 🎨 Background

### Background Color
```
bg-white        → White background
bg-black        → Black background
bg-gray-50      → Very light gray
bg-gray-100     → Light gray
bg-blue-500     → Blue background
bg-transparent  → Transparent
```

### Background Image
```
bg-cover    → cover entire area
bg-contain  → contain image
bg-center   → center image
bg-no-repeat → don't repeat
```

---

## 🖼️ Display

```
block        → display: block
inline-block → display: inline-block
inline       → display: inline
flex         → display: flex
inline-flex  → display: inline-flex
grid         → display: grid
inline-grid  → display: inline-grid
hidden       → display: none
```

---

## 🎯 Position

```
static    → position: static (default)
fixed     → position: fixed
absolute  → position: absolute
relative  → position: relative
sticky    → position: sticky
```

### Positioning
```
top-0, right-0, bottom-0, left-0   → 0
top-4, right-4, bottom-4, left-4   → 1rem
inset-0                             → top/right/bottom/left: 0
```

---

## 🌊 Overflow

```
overflow-auto      → auto scrollbar
overflow-hidden    → hide overflow
overflow-visible   → show overflow
overflow-scroll    → always show scrollbar
overflow-x-auto    → horizontal scroll
overflow-y-auto    → vertical scroll
```

---

## 👁️ Visibility & Opacity

```
visible   → visibility: visible
invisible → visibility: hidden (takes up space)
hidden    → display: none (doesn't take up space)

opacity-0    → fully transparent
opacity-25   → 25% opacity
opacity-50   → 50% opacity
opacity-75   → 75% opacity
opacity-100  → fully opaque (default)
```

---

## 📱 Responsive Design (Breakpoints)

**Tailwind is Mobile-First:** Base classes apply to all screens, prefixes apply to that size and UP.

### Breakpoint Prefixes

| Prefix | Name | Min Width | Applies To | Devices |
|--------|------|-----------|------------|---------|
| *(none)* | Default | 0px | **All screens** | Mobile first (default) |
| `sm:` | Small | 640px | ≥640px and up | Large phones+ |
| `md:` | **Medium** | **768px** | **≥768px and up** | **Tablets, laptops, desktops** ← Most common |
| `lg:` | Large | 1024px | ≥1024px and up | Laptops, desktops |
| `xl:` | Extra Large | 1280px | ≥1280px and up | Desktops |
| `2xl:` | 2X Large | 1536px | ≥1536px and up | Large monitors |

### 🔑 Key Concept:
```
md: = "medium screens AND LARGER"
    = tablets, laptops, desktops
    = NOT mobile only
    = Mobile-first means base class is mobile, md: overrides it for larger screens
```

### Visual Timeline:
```
0px ──────> 640px ──────> 768px ──────> 1024px ──────> 1280px ──────> ∞
  Mobile       sm:         md:           lg:            xl:
(base class)  (small+)   (medium+)    (large+)     (x-large+)
```

### Common Responsive Patterns:

**Grid: 1 col mobile, 2 cols desktop**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```
- Mobile (< 768px): 1 column (stacked)
- Desktop (≥ 768px): 2 columns side-by-side

**Grid: 1/2/3 columns responsive**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```
- Mobile (< 768px): 1 column
- Tablet (768px - 1023px): 2 columns
- Desktop (≥ 1024px): 3 columns

**Hidden on mobile, visible on desktop**
```jsx
<div className="hidden md:block">
```

**Stack on mobile, row on desktop**
```jsx
<div className="flex flex-col md:flex-row">
```

**Small text on mobile, large on desktop**
```jsx
<h1 className="text-2xl md:text-4xl">
```

**Different padding on different screens**
```jsx
<div className="p-4 md:p-8 lg:p-12">
```

**Responsive text alignment**
```jsx
<p className="text-center md:text-left">
```

**Responsive width**
```jsx
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

## 🎭 Hover, Focus, Active States

Add state prefix to any class:

```
hover:   → :hover
focus:   → :focus
active:  → :active
disabled: → :disabled
```

**Examples:**
```jsx
// Change color on hover
<button className="bg-blue-500 hover:bg-blue-600">

// Scale on hover
<img className="transform hover:scale-110">

// Border on focus
<input className="border focus:border-blue-500">

// Combine with responsive
<button className="bg-blue-500 hover:bg-blue-600 md:hover:bg-blue-700">
```

---

## 🎪 Common Patterns for This Project

### Centered Container
```jsx
<div className="max-w-7xl mx-auto px-4">
  {/* Content */}
</div>
```

### Card/Box Component
```jsx
<div className="border border-gray-300 rounded-lg p-6 bg-white">
  {/* Content */}
</div>
```

### Full-Width Header
```jsx
<header className="w-full border-b border-gray-300 py-4">
  {/* Content */}
</header>
```

### Profile Section (Image + Text)
```jsx
<div className="flex gap-4">
  <img className="w-20 h-20 rounded-full" />
  <div className="flex flex-col justify-center">
    <h2>Name</h2>
    <p className="text-gray-600">Description</p>
  </div>
</div>
```

### Button
```jsx
<button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click Me
</button>
```

### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Blog Post Card (With Overflow Protection)
```jsx
<div className="border border-gray-300 p-4 break-words overflow-hidden">
  <h2 className="text-lg font-bold truncate mb-2">
    {post.title}
  </h2>
  <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-line mb-2">
    {post.content}
  </p>
  <span className="text-xs text-gray-400">
    {new Date(post.created_at).toLocaleDateString()}
  </span>
</div>
```

### Project Card (Grid with Links)
```jsx
{projects.map(project => (
  <div key={project.id} className="border border-gray-300 p-4 break-words overflow-hidden">
    <h3 className="font-bold truncate mb-2">{project.name}</h3>
    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
      {project.description}
    </p>
    <a 
      href={project.link} 
      className="text-sm text-blue-600 hover:underline break-all block"
      target="_blank"
      rel="noopener noreferrer"
    >
      {project.link}
    </a>
  </div>
))}
```

### Responsive 2-Column Blog Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {posts.map(post => (
    <div key={post.id} className="border p-4 break-words overflow-hidden">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-600 whitespace-pre-line">
        {post.content}
      </p>
    </div>
  ))}
</div>
```

---

## 🚫 Common Mistakes

❌ **Don't:**
- `text-md` → Use `text-base`
- `justify-left` → Use `justify-start`
- `m-6 m-8` → Second overrides first, just use `m-8`
- `text-1` → Not valid, use `text-xl`, `text-2xl`, etc.
- `inline-flex flex-row` without `flex-wrap` → Items won't wrap to new rows
- `grid-cols-2 md:grid-cols-2` → Redundant! Both do the same thing
- Using trailing slashes in API URLs → `/api/blog/` should be `/api/blog`
- Forgetting `break-words` → Text overflows containers
- Not using `whitespace-pre-line` → Blog posts ignore line breaks
- Long URLs without `break-all` → URLs overflow boxes

✅ **Do:**
- Use semantic class names
- Combine responsive + hover: `md:hover:bg-blue-600`
- Use `max-w-*` with `mx-auto` to center containers
- Use `gap-*` instead of margin on flex/grid children
- Use `grid grid-cols-1 md:grid-cols-2` for responsive layouts
- Remember: `md:` means "medium screens AND UP" (not mobile only)
- Use `max-w-*` with `mx-auto` to center containers
- Use `gap-*` instead of margin on flex children

---

## 🔗 Useful Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind Play (Online Editor)](https://play.tailwindcss.com/)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)

---

**Last Updated:** 2025-11-09
**Project:** shaunallsopp.dev Portfolio
