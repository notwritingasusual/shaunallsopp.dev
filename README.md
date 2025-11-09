# shaunallsopp.dev

Personal portfolio website built with React and Django.

## Project Structure

```
shaunallsopp.dev/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service functions
│   │   └── utils/        # Utility functions
│   ├── public/           # Static assets
│   └── package.json
│
└── backend/           # Django backend
    ├── config/        # Django project settings
    ├── api/           # Main API app
    ├── venv/          # Python virtual environment
    ├── manage.py
    └── requirements.txt
```

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios (for API calls)
- React Router (for navigation)

### Backend
- Django 5.2
- Django REST Framework
- Django CORS Headers
- SQLite database

## Getting Started

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The Django API will run on `http://localhost:8000`

## Development

### Frontend Development
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend Development
- `python manage.py runserver` - Start development server
- `python manage.py makemigrations` - Create database migrations
- `python manage.py migrate` - Apply database migrations
- `python manage.py createsuperuser` - Create admin user

## Environment Variables

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8000
```

## Deployment

### Frontend
Can be deployed to Vercel, Netlify, or any static hosting service.

### Backend
Can be deployed to Heroku, Railway, PythonAnywhere, or any Django-compatible hosting.

## License

MIT
