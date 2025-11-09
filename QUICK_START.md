# Quick Start Guide

## 🚦 Get Up and Running in 5 Minutes

### Step 1: Install Dependencies

**Frontend:**
```bash
cd frontend
# Already installed during setup, but if needed:
npm install
```

**Backend:**
```bash
cd backend
source venv/bin/activate  # Mac/Linux
# On Windows: venv\Scripts\activate
# Already installed during setup, but if needed:
pip install -r requirements.txt
```

### Step 2: Set Up Environment Variables

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend (generate secret key first)
cd backend
source venv/bin/activate
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
# Copy the output, then:
cp .env.example .env
# Edit .env and paste the secret key
```

### Step 3: Initialize Database

```bash
cd backend
source venv/bin/activate
python manage.py migrate
python manage.py createsuperuser  # Follow prompts
```

### Step 4: Run Both Servers

**Terminal 1 - Django Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - React Frontend:**
```bash
cd frontend
npm start
```

### Step 5: Verify Everything Works

- Frontend: http://localhost:3000 ✅
- Backend API: http://localhost:8000/api ✅
- Django Admin: http://localhost:8000/admin ✅

## 🎨 Start Building

Now you're ready to build! Check out:
- `SETUP_GUIDE.md` for detailed implementation steps
- `README.md` for project documentation
- Individual README files in each directory for examples

## 📂 Key Files to Edit

1. **Backend Models**: `backend/api/models.py`
2. **Frontend Pages**: `frontend/src/pages/`
3. **Frontend Components**: `frontend/src/components/`
4. **API Services**: `frontend/src/services/`
5. **Tailwind Config**: `frontend/tailwind.config.js`

## 💡 Pro Tips

1. Keep both servers running during development
2. Django auto-reloads on code changes
3. React auto-reloads on code changes
4. Use Django Admin to add test data
5. Test API endpoints before building frontend features

Happy building! 🚀
