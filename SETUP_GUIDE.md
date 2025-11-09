# Setup Guide for shaunallsopp.dev

This guide will help you complete the setup and start building your portfolio site.

## ✅ What's Already Done

### Frontend (React + Tailwind CSS)
- ✅ React app created with Create React App
- ✅ Tailwind CSS installed and configured
- ✅ Folder structure created (components, pages, hooks, services, utils)
- ✅ Axios installed for API calls
- ✅ React Router installed for navigation
- ✅ Tailwind directives added to index.css
- ✅ .env.example file created

### Backend (Django + DRF)
- ✅ Django project created (config/)
- ✅ API app created
- ✅ Django REST Framework installed
- ✅ Django CORS Headers installed (for frontend-backend communication)
- ✅ SQLite configured (default Django database)
- ✅ Virtual environment created
- ✅ requirements.txt generated
- ✅ .env.example file created

### Project Setup
- ✅ .gitignore configured
- ✅ README files in all major directories
- ✅ Main README.md with project documentation

## 🚀 Next Steps

### 1. Configure Django Settings

Edit `backend/config/settings.py`:

```python
# Add to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',        # Add this
    'corsheaders',           # Add this
    'api',                   # Add this
]

# Add to MIDDLEWARE (corsheaders should be near the top)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add this (before CommonMiddleware)
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... rest of middleware
]

# Add at the bottom of settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```

### 2. Create Django Models

In `backend/api/models.py`, create your models. Example:

```python
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    technologies = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"
```

### 3. Create Serializers

Create `backend/api/serializers.py`:

```python
from rest_framework import serializers
from .models import Project, Experience

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
```

### 4. Create API Views

In `backend/api/views.py`:

```python
from rest_framework import viewsets
from .models import Project, Experience
from .serializers import ProjectSerializer, ExperienceSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
```

### 5. Configure URLs

Create `backend/api/urls.py`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ExperienceViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'experience', ExperienceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

Update `backend/config/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

### 6. Run Migrations

```bash
cd backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 7. Register Models in Admin

In `backend/api/admin.py`:

```python
from django.contrib import admin
from .models import Project, Experience

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'created_at']
    list_editable = ['order']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company', 'position', 'start_date', 'end_date', 'current']
```

### 8. Create Frontend Components

Example: `frontend/src/pages/Home.jsx`:

```jsx
import React from 'react';

function Home() {
  return (
    <main className="min-h-screen bg-background antialiased max-w-5xl mx-auto py-8 px-6">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Shaun Allsopp</h1>
        <p className="text-xl text-gray-600">Software Developer & Creator</p>
      </section>
    </main>
  );
}

export default Home;
```

### 9. Create API Service

`frontend/src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = () => api.get('/projects/');
export const getExperience = () => api.get('/experience/');

export default api;
```

### 10. Set Up Routing

Update `frontend/src/App.js`:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 11. Create Environment Files

Copy the example files:

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

Then generate a Django secret key:

```bash
cd backend
source venv/bin/activate
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Add the output to `backend/.env` as the SECRET_KEY value.

## 🎨 Tailwind CSS Customization

Edit `frontend/tailwind.config.js` to customize your theme (similar to adbo.io):

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fafafa',
        foreground: '#171717',
        border: '#e5e5e5',
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

## 🏃‍♂️ Running the Project

### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

## 📝 Development Workflow

1. Create models in Django
2. Create serializers and views
3. Test API endpoints at http://localhost:8000/api
4. Create React components that fetch from API
5. Style with Tailwind CSS utility classes
6. Add routing with React Router as needed

## 🎯 Inspiration from adbo.io

Key features to implement:
- Hero section with avatar and bio
- Work experience timeline
- Projects grid with images
- Contact section with social links
- Minimalist design with monospace font
- Clean border-based layout
- Hover effects and transitions

Happy coding! 🚀
