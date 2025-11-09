# Session Log - Building shaunallsopp.dev Portfolio

## Project Overview
Built a portfolio website similar to adbo.io using React frontend and Django backend with Tailwind CSS.

**Project Location:** `~/shaunallsopp.dev/`

## Tech Stack
- **Frontend:** React 18 + Tailwind CSS v3 + Axios + React Router
- **Backend:** Django 5.2 + Django Ninja (switched from DRF) + SQLite
- **Styling:** Tailwind CSS v3 (initially tried v4 but had compatibility issues with CRA)

## Project Structure
```
shaunallsopp.dev/
├── frontend/                    # React + Tailwind CSS
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   └── Header.jsx       # ✅ CREATED
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API communication
│   │   ├── utils/               # Helper functions
│   │   ├── App.js               # ✅ UPDATED - imports Header
│   │   └── index.css            # ✅ Tailwind directives
│   ├── tailwind.config.js       # ✅ Tailwind v3 config
│   └── postcss.config.js        # ✅ PostCSS config
│
└── backend/                     # Django + Django Ninja + SQLite
    ├── config/                  # Django settings (renamed from typical project_name/)
    │   ├── settings.py          # ✅ CORS configured
    │   └── urls.py              # ✅ Routes to api.py
    ├── api/                     # Main API app
    │   ├── api.py               # ✅ CREATED - Django Ninja endpoints
    │   ├── models.py            # Database models
    │   ├── admin.py             # Admin interface
    │   └── migrations/          # Database migrations
    ├── venv/                    # Python virtual environment
    ├── manage.py
    └── requirements.txt         # ✅ Updated with Django Ninja

```

## What We Accomplished

### 1. Initial Project Scaffolding
- Created React app with Create React App
- Set up Django project with `config/` as settings folder (not typical project_name/)
- Installed and configured Tailwind CSS
- Set up folder structure (components, pages, hooks, services, utils)

### 2. Switched from DRF to Django Ninja
**Why:** User preferred Django Ninja for modern, cleaner API code with type hints

**Changes Made:**
- Uninstalled `djangorestframework`
- Installed `django-ninja` and `pydantic`
- Created `api/api.py` instead of using `views.py`
- Deleted `api/views.py` (no longer needed with Ninja)
- Updated `config/urls.py` to use Ninja API
- Updated `config/settings.py`:
  - Added `corsheaders` and `api` to INSTALLED_APPS
  - Added CORS middleware
  - Added CORS_ALLOWED_ORIGINS for localhost:3000

**Backend API Structure:**
```python
# api/api.py
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/health")
def health_check(request):
    return {"status": "ok"}
```

**URLs:**
```python
# config/urls.py
from api.api import api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),  # All API endpoints under /api/
]
```

### 3. Tailwind CSS Setup Issues & Resolution
**Problem:** Tailwind v4 was installed but incompatible with Create React App

**Symptoms:**
- PostCSS errors about missing `tailwindcss` module
- Errors about needing `@tailwindcss/postcss` plugin

**Solution:**
- Downgraded to Tailwind v3.4.1 (stable with CRA)
- Updated `index.css` to use v3 syntax: `@tailwind base; @tailwind components; @tailwind utilities;`
- Updated `postcss.config.js` to use `tailwindcss` plugin (not `@tailwindcss/postcss`)
- Created `tailwind.config.js` for v3
- Did clean reinstall: `rm -rf node_modules package-lock.json && npm install`

**Final Working Config:**

`index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`postcss.config.js`:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

`tailwind.config.js`:
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### 4. Built Header Component
**Location:** `frontend/src/components/Header.jsx`

**Requirements:**
- Bordered box container
- Profile picture on left (placeholder image)
- "shaunallsopp.dev" title
- Sharp corners on container, slightly rounded on profile pic
- Centered on page

**Final Code:**
```jsx
import React from 'react';

function Header() {
    return (
        <header className="flex justify-center">
            <div className="flex items-center gap-4 border border-gray-300 p-6">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Shaun Allsopp"
                    className="w-20 h-20 rounded border border-gray-300"
                />
                <h1 className="text-2xl font-bold font-mono">
                    shaunallsopp.dev
                </h1>
            </div>
        </header>
    );
}

export default Header;
```

**App.js Updated:**
```jsx
import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
```

## Key Tailwind Classes Used
- `flex` - Flexbox layout
- `justify-center` - Center horizontally
- `items-center` - Center vertically
- `gap-4` - Space between items (1rem)
- `border border-gray-300` - Border with light gray color
- `p-6` - Padding (1.5rem)
- `w-20 h-20` - Width/height (5rem = 80px)
- `rounded` - Slightly rounded corners
- `text-2xl` - Large text size
- `font-bold` - Bold weight
- `font-mono` - Monospace font (like adbo.io)

## Important Notes

1. **Django Structure:** Using `config/` folder instead of typical `project_name/` for settings
   - `settings.py` is at: `backend/config/settings.py`
   - This is a cleaner naming convention for portfolio sites

2. **Single API App:** Using one `api` app instead of multiple apps
   - Good for simple portfolio sites
   - Could add more apps later if needed (e.g., `blog`, `portfolio`, `contact`)

3. **SQLite vs MySQL:** Using SQLite instead of MySQL
   - Simpler for portfolio sites
   - Can easily switch to MySQL by changing DATABASES in settings.py

4. **Django Ninja vs DRF:**
   - Ninja: Modern, type hints, less boilerplate, auto docs
   - DRF: More mature, more resources, industry standard
   - User preferred Ninja for this project

5. **Tailwind CSS Debugging:**
   - Make sure dev server is restarted after config changes
   - Check browser console for errors
   - Verify `index.css` is imported in `index.js`
   - Remove any conflicting CSS imports (like `App.css`)

## Current Status ✅
- ✅ Project scaffolded
- ✅ Django backend running with Ninja API
- ✅ React frontend running
- ✅ Tailwind CSS working
- ✅ Header component created and displaying
- ✅ CORS configured for frontend-backend communication

## API Endpoints Available
- `http://localhost:8000/api/health` - Health check endpoint
- `http://localhost:8000/api/docs` - Auto-generated Swagger docs (Django Ninja feature!)
- `http://localhost:8000/admin` - Django admin panel

## Next Steps (Not Yet Done)
1. Create Django models (Projects, Experience, Skills, etc.)
2. Create Ninja API endpoints for models
3. Create more React components (Hero, Projects, Experience, Contact)
4. Set up React Router for navigation
5. Customize Tailwind theme (colors, fonts similar to adbo.io)
6. Add real profile picture
7. Build out full portfolio content

## Running the Project

**Backend:**
```bash
cd ~/shaunallsopp.dev/backend
source venv/bin/activate
python manage.py runserver
```
Access at: http://localhost:8000

**Frontend:**
```bash
cd ~/shaunallsopp.dev/frontend
npm start
```
Access at: http://localhost:3000

## Troubleshooting Tips
- If Tailwind not working: Restart dev server
- If seeing old styles: Hard refresh browser (Cmd+Shift+R)
- If module errors: Try `rm -rf node_modules package-lock.json && npm install`
- Check you're in correct project: `~/shaunallsopp.dev` not `~/shaunallsopp.dev` (different location)

---

## Session 2: API Cleanup, Apple Health Integration, Styling (Nov 9, 2025)

### 🧹 Backend API Cleanup

#### Fixed .env Configuration Issues
**Problems Found:**
- `python-dotenv` was not installed (causing import errors)
- Missing `Pillow` library (required for ImageField)
- Incorrect imports in `urls.py` (leftover `ninja_api` reference)

**Solutions:**
- Installed `python-dotenv==1.2.1`
- Installed `Pillow==12.0.0`
- Cleaned up `config/urls.py` to only use `api` from `api.api`
- Updated `requirements.txt` with all dependencies

#### Cleaned Up Models & API
**Problem:** Confusion between Blog and Message models

**Solution:**
- Renamed `Blog` model → `BlogPost`
- Deleted `Message` model (was confused with blog posts)
- Created proper CRUD endpoints for BlogPost:
  - `GET /api/blog` - List all posts
  - `GET /api/blog/{id}` - Get single post
  - `POST /api/blog` - Create post
  - `PUT /api/blog/{id}` - Update post
  - `DELETE /api/blog/{id}` - Delete post

**Key Learning:** Django Ninja does NOT use trailing slashes!
- ✅ Use: `/api/blog`
- ❌ Don't use: `/api/blog/`

#### Added Projects Model & API
- Created `Projects` model (name, description, link, image)
- Added to admin interface
- Created API endpoints for projects

---

### 🏋️ Apple Health Weight Graph Integration

#### Created Complete System for Health Data
**Files Created:**
1. `backend/parse_health_data.py` - Python script to extract weight from Apple Health XML
2. `backend/api/models.py` - Added `HealthWeight` model
3. `backend/api/api.py` - Added health weight API endpoints
4. `backend/api/management/commands/load_weight_data.py` - Django command to import data
5. `APPLE_HEALTH_SETUP.md` - Complete step-by-step guide

**Models Added:**
```python
class HealthWeight(models.Model):
    date = models.DateField(unique=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=10, default='kg')
    created_at = models.DateTimeField(auto_now_add=True)
```

**API Endpoints:**
- `GET /api/health/weight?days=90` - Get weight data for last N days
- `GET /api/health/weight/all` - Get all weight data

**Workflow:**
1. Export health data from iPhone Health app
2. Parse XML: `python parse_health_data.py export.xml`
3. Load into Django: `python manage.py load_weight_data weight_data.json`
4. Display in React with Recharts

**What "Parse" Means:**
- **Parse** = Read and extract structured data from a file
- The XML file has thousands of lines → parser extracts ONLY weight data
- Creates clean JSON: `[{"date": "2025-11-09", "weight": 80.5, "unit": "kg"}]`

---

### ⚛️ React Components Created/Updated

#### Fitness Component (Complete with Graph)
**Location:** `frontend/src/components/Fitness.jsx`

**Features:**
- Interactive line chart using Recharts library
- Time period selector buttons (30 days, 90 days, 6 months, 1 year)
- Statistics display (current, average, min, max)
- 2-column grid layout (like blog posts)
- Personal Records (PR's) section with placeholders
- Responsive design (mobile + desktop)

**Layout:**
```
Desktop:
┌──────────────────┬──────────────────┐
│ Weight Progress  │ Personal Records │
│ [Graph + Stats]  │ - Bench Press    │
│                  │ - Squat          │
│                  │ - Deadlift       │
│                  ├──────────────────┤
│                  │ Placeholder      │
└──────────────────┴──────────────────┘

Mobile: Stacked vertically
```

**Installed:** `npm install recharts`

#### Other Components
- **Header.jsx** - Profile + tech stack
- **Blog.jsx** - Displays blog posts in 2-column grid
- **Projects.jsx** - Displays projects in 4-column grid with images
- **GetInTouch.jsx** - Contact section

---

### 🎨 Styling & Design Updates

#### Added Olive Green Color Theme
**Color:** `#556B2F` (Dark Olive Green)

**Applied to:**
- All section headings (shaun, journal, projects, contact, fitness)
- Tech keywords in header (Python, MySQL, JavaScript, HTML, CSS, TailwindCSS) - made bold + green
- All links (email, project links) - green with hover underline
- Fitness graph line and dots

**Before:** Black headings, blue links
**After:** Olive green headings, olive green links, professional earthy aesthetic

#### Text Overflow Solutions
**Problems Fixed:**
- Text running outside box borders
- Long URLs breaking layout
- Blog posts ignoring line breaks

**Solutions Applied:**
```jsx
// Prevent overflow
<div className="border p-4 break-words overflow-hidden">

// Respect paragraphs in blog posts
<p className="whitespace-pre-line">{post.content}</p>

// Break URLs properly
<a className="break-all">{project.link}</a>

// Truncate long titles
<h2 className="truncate">{title}</h2>

// Multi-line with ellipsis
<p className="line-clamp-3">{description}</p>
```

#### Images in Projects
**Added:**
- Project images display at top of card
- Full width, fixed height (h-48 / 192px)
- `object-cover` for proper cropping
- Conditional rendering (only if image exists)
- Proper spacing and borders

---

### 📚 Documentation Created

#### TAILWIND_CHEATSHEET.md
**Major Update - Added:**
1. **Grid Layout Section**
   - `grid-cols-1` through `grid-cols-12`
   - Grid rows, auto-flow, gap
   - Common patterns with examples

2. **Text Wrapping & Overflow Section** (NEW!)
   - Whitespace classes (normal, nowrap, pre, pre-line, pre-wrap)
   - Word breaking (break-words, break-all, break-keep)
   - Text overflow with ellipsis (truncate, line-clamp-1 to 6)
   - Overflow control (hidden, auto, visible, scroll)
   - Complete examples for blog posts, project cards

3. **Enhanced Responsive Breakpoints**
   - Full table with device types
   - Visual timeline showing how breakpoints work
   - Key concept: `md:` means "medium AND UP" (not mobile only)
   - Mobile-first approach explained

4. **Common Patterns Section**
   - Blog post card (with overflow protection)
   - Project grid with links
   - Responsive 2-column grid

5. **Updated Common Mistakes**
   - Added grid mistakes
   - Added text overflow issues
   - Added API trailing slash note

#### APPLE_HEALTH_SETUP.md (NEW!)
**Complete guide with:**
- Step-by-step iPhone export process
- Python parser script usage
- Django migration and data import
- React component code with Recharts
- API endpoint documentation
- Troubleshooting section
- Privacy considerations

#### API_REFERENCE.md
**Created comprehensive API docs:**
- All BlogPost endpoints (CRUD)
- Health weight endpoints
- React/JavaScript examples
- cURL examples
- Common mistakes section

---

### 🔧 Key Technical Learnings

#### Django Ninja vs Trailing Slashes
- Django Ninja does NOT use trailing slashes (unlike DRF)
- `/api/blog` works ✅
- `/api/blog/` returns 404 ❌

#### DateTime Serialization
- Schema field must be `datetime` not `str`
- Fixed: `created_at: datetime` in Pydantic schemas

#### Responsive Grid Breakpoints
- `md:` = ≥768px (tablets, laptops, desktops) - NOT mobile
- Mobile-first: base class applies to all, prefix applies to that size UP
- `grid grid-cols-1 md:grid-cols-2` = 1 col mobile, 2 cols desktop

#### Text Overflow Formula
```jsx
<div className="break-words overflow-hidden">
  <h2 className="truncate">{title}</h2>
  <p className="whitespace-pre-line">{content}</p>
  <a className="break-all">{url}</a>
</div>
```

---

### 📁 Current File Structure

```
shaunallsopp.dev/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Profile + tech stack (olive green keywords)
│   │   │   ├── Blog.jsx            # 2-col grid, blog posts
│   │   │   ├── Projects.jsx        # 4-col grid, with images
│   │   │   ├── Fitness.jsx         # Weight graph + PR's (2-col layout)
│   │   │   └── GetInTouch.jsx      # Contact section
│   │   ├── assets/
│   │   │   └── profile.jpeg        # Profile picture
│   │   └── App.js                  # Main app component
│   └── package.json                # Added: recharts
│
├── backend/
│   ├── api/
│   │   ├── models.py               # BlogPost, Projects, HealthWeight
│   │   ├── api.py                  # All API endpoints (Ninja)
│   │   ├── admin.py                # Admin for all models
│   │   └── management/commands/
│   │       └── load_weight_data.py # Import health data
│   ├── config/
│   │   ├── settings.py             # .env, CORS, MEDIA config
│   │   └── urls.py                 # Clean, fixed URLs
│   ├── parse_health_data.py        # Apple Health XML parser
│   └── requirements.txt            # python-dotenv, Pillow, etc.
│
├── TAILWIND_CHEATSHEET.md          # Comprehensive Tailwind reference
├── APPLE_HEALTH_SETUP.md           # Health data integration guide
├── API_REFERENCE.md                # API documentation
└── SESSION_LOG.md                  # This file
```

---

### 🎯 API Endpoints Summary

```
Health Check:
GET  /api/health

Blog Posts:
GET    /api/blog              # List all
GET    /api/blog/{id}         # Get one
POST   /api/blog              # Create
PUT    /api/blog/{id}         # Update
DELETE /api/blog/{id}         # Delete

Projects:
GET    /api/projects          # List all
GET    /api/projects/{id}     # Get one
POST   /api/projects          # Create
PUT    /api/projects/{id}     # Update

Health Weight:
GET    /api/health/weight?days=90    # Last N days
GET    /api/health/weight/all        # All data

Interactive Docs:
GET    /api/docs              # Swagger UI
```

---

### 🎨 Design System

**Colors:**
- **Primary:** Olive Green `#556B2F`
- **Borders:** Gray 300 `#d1d5db`
- **Text:** Gray 600 `#4b5563` (secondary)
- **Background:** White

**Typography:**
- **Font:** Monospace (font-mono)
- **Headings:** Bold, Olive Green
- **Links:** Olive Green, hover underline

**Layout:**
- Border style: 1px solid gray-300
- Padding: p-4, p-6, p-8
- Gaps: gap-3, gap-4, gap-6
- Grids: 1/2/4 columns responsive

---

## Current Status ✅

### Backend
- ✅ Django 5.2 running with Ninja API
- ✅ .env configuration fixed
- ✅ Models: BlogPost, Projects, HealthWeight
- ✅ Admin interface configured
- ✅ CORS configured for localhost:3000
- ✅ Media files configured
- ✅ All dependencies installed (python-dotenv, Pillow)

### Frontend
- ✅ React 18 with Tailwind CSS v3
- ✅ Recharts for data visualization
- ✅ All components created and styled
- ✅ Responsive grid layouts
- ✅ Olive green color theme
- ✅ Text overflow handled properly
- ✅ Images displaying in projects

### Documentation
- ✅ Comprehensive Tailwind cheat sheet
- ✅ Apple Health integration guide
- ✅ API reference documentation
- ✅ Session logs up to date

---

## Running the Project

**Backend:**
```bash
cd ~/shaunallsopp.dev/backend
source venv/bin/activate
python manage.py runserver
```
Access at: http://localhost:8000
- Admin: http://localhost:8000/admin
- API Docs: http://localhost:8000/api/docs

**Frontend:**
```bash
cd ~/shaunallsopp.dev/frontend
npm start
```
Access at: http://localhost:3000

---

## Next Steps (Ideas for Future Sessions)

- [ ] Add real PR values to Fitness component
- [ ] Create admin panel for easy content management
- [ ] Add authentication for private health data
- [ ] Build out the "Placeholder" section in Fitness
- [ ] Add more blog posts and projects
- [ ] Implement contact form functionality
- [ ] Add pagination to blog/projects
- [ ] Deploy to production (Vercel + Railway/Heroku)
- [ ] Add SEO metadata
- [ ] Set up CI/CD pipeline

---

**Session 1 Date:** November 9, 2025  
**Session 2 Date:** November 9, 2025  
**Status:** Fitness graph working, olive green theme applied, all components functional ✅
