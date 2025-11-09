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

**Session Date:** November 9, 2025
**Status:** Header component complete and working ✅
