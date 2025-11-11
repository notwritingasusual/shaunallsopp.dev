# shaunallsopp.dev

Personal portfolio website showcasing projects, writing, fitness data, and blog posts.

**Live Site:** https://shaunallsopp-dev-rxf3.vercel.app

## Project Structure

```
shaunallsopp.dev/
├── frontend/          # React frontend (deployed on Vercel)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service functions
│   │   └── utils/        # Utility functions
│   ├── public/           # Static assets
│   └── package.json
│
└── backend/           # Django backend (deployed on PythonAnywhere)
    ├── config/        # Django project settings
    ├── api/           # Main API app
    ├── media/         # User uploaded files (project images, cover images)
    ├── manage.py
    └── requirements.txt
```

## Tech Stack

### Frontend
- React 19
- Tailwind CSS
- Axios (for API calls)
- Recharts (for data visualization)
- React Router (for navigation)

### Backend
- Django 5.2
- Django Ninja (API framework)
- Django CORS Headers
- SQLite database
- Python dotenv

## Deployment

### Frontend (Vercel)
- **URL:** https://shaunallsopp-dev-rxf3.vercel.app
- **Auto-deploys** on push to main branch
- See `DEPLOYMENT_WORKFLOW.md` for details

### Backend (PythonAnywhere)
- **API URL:** https://notwritingasusual.pythonanywhere.com
- **Manual deployment** required (git pull + reload)
- See `DEPLOYMENT_WORKFLOW.md` for details

## Local Development

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

**Note:** Frontend points to PythonAnywhere API by default, so you can develop locally without running the backend.

### Backend Setup (Optional for local development)

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The Django API will run on `http://localhost:8000`

## Features

- **Projects Showcase** - Display projects with images, descriptions, and links
- **Writing Portfolio** - Novels and short stories with cover images
- **Blog/Journal** - Personal blog posts
- **Fitness Dashboard** - Apple Health weight data visualization with charts
- **Contact Section** - Email and social media links

## API Endpoints

- `/api/projects` - List all projects
- `/api/blog` - List all blog posts
- `/api/novels` - List all novels
- `/api/shortstories` - List all short stories
- `/api/health/weight?days=90` - Get weight data for specified days

## Content Management

Add/edit content through the Django admin panel:
**https://notwritingasusual.pythonanywhere.com/admin**

## Environment Variables

### Backend (.env in backend/)
```
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=notwritingasusual.pythonanywhere.com,localhost,127.0.0.1
```

## Development Workflow

See `DEPLOYMENT_WORKFLOW.md` for complete deployment instructions.

**Quick reference:**
- Frontend changes: `git push` → Vercel auto-deploys
- Backend changes: `git push` → Pull on PythonAnywhere → Reload web app

## License

MIT
