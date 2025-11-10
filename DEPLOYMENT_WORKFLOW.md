# Deployment Workflow

This document outlines the deployment workflow for the shaunallsopp.dev full-stack application.

## Project Architecture

- **Frontend**: React app deployed on Vercel
- **Backend**: Django API deployed on PythonAnywhere
- **Database**: SQLite on PythonAnywhere
- **Repository**: GitHub (single monorepo)

---

## Frontend Deployment (Vercel)

### Making Changes

1. Make your changes to files in the `frontend/` directory
2. Test locally:
   ```bash
   cd frontend
   npm start
   ```

### Deploying to Production

```bash
git add .
git commit -m "Description of your changes"
git push
```

**That's it!** Vercel automatically:
- Detects the push to your GitHub repo
- Builds your React app
- Deploys to production
- Takes ~1-2 minutes

### View Your Site
- **Production URL**: https://shaunallsopp-dev-rxf3.vercel.app
- **Custom Domain**: (Add your custom domain in Vercel settings)

---

## Backend Deployment (PythonAnywhere)

### Making Changes

1. Make your changes to files in the `backend/` directory
2. Test locally:
   ```bash
   cd backend
   python manage.py runserver
   ```

### Deploying to Production

#### Step 1: Push to GitHub (from your local machine)
```bash
git add .
git commit -m "Description of your changes"
git push
```

#### Step 2: Pull and Reload on PythonAnywhere

**In PythonAnywhere console:**
```bash
workon shaunallsopp-env
cd ~/shaunallsopp.dev/backend
git pull
```

**In PythonAnywhere Web tab:**
- Click the green **"Reload notwritingasusual.pythonanywhere.com"** button

**Done!** Your backend is now updated.

### View Your API
- **API URL**: https://notwritingasusual.pythonanywhere.com/api/

---

## Special Cases

### When You Change Database Models

If you modify any models in `backend/api/models.py`:

```bash
# Local: Create migrations
cd backend
python manage.py makemigrations
python manage.py migrate

# Commit and push
git add .
git commit -m "Update database models"
git push
```

**On PythonAnywhere:**
```bash
workon shaunallsopp-env
cd ~/shaunallsopp.dev/backend
git pull
python manage.py migrate
```

Then reload the web app.

### When You Add New Dependencies

**Frontend:**
```bash
cd frontend
npm install package-name
npm install  # Updates package-lock.json
git add package.json package-lock.json
git commit -m "Add new dependency"
git push
```
Vercel will automatically install the new packages.

**Backend:**
```bash
cd backend
pip install package-name
pip freeze > requirements.txt
git add requirements.txt
git commit -m "Add new dependency"
git push
```

**On PythonAnywhere:**
```bash
workon shaunallsopp-env
cd ~/shaunallsopp.dev/backend
git pull
pip install -r requirements.txt
```

Then reload the web app.

### When You Add Static Files (CSS, Images, etc.)

**On PythonAnywhere:**
```bash
workon shaunallsopp-env
cd ~/shaunallsopp.dev/backend
git pull
python manage.py collectstatic --noinput
```

Then reload the web app.

---

## Quick Reference

### Frontend Workflow
```bash
# Make changes in frontend/
git add .
git commit -m "message"
git push
# ✅ Vercel auto-deploys
```

### Backend Workflow
```bash
# Make changes in backend/
git add .
git commit -m "message"
git push

# SSH/Console into PythonAnywhere
workon shaunallsopp-env
cd ~/shaunallsopp.dev/backend
git pull
# ✅ Click Reload button in Web tab
```

---

## Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **PythonAnywhere Dashboard**: https://www.pythonanywhere.com/dashboard
- **GitHub Repository**: https://github.com/notwritingasusual/shaunallsopp.dev
- **Live Frontend**: https://shaunallsopp-dev-rxf3.vercel.app
- **Live Backend API**: https://notwritingasusual.pythonanywhere.com/api/

---

## Troubleshooting

### Frontend Issues
- Check Vercel deployment logs in the Vercel dashboard
- Check browser console (F12) for JavaScript errors
- Verify API URLs point to PythonAnywhere, not localhost

### Backend Issues
- Check error logs: `/var/log/notwritingasusual.pythonanywhere.com.error.log`
- Check server logs: `/var/log/notwritingasusual.pythonanywhere.com.server.log`
- Verify virtual environment is activated: `workon shaunallsopp-env`
- Test locally: `python manage.py check`

### CORS Issues
If frontend can't access backend:
- Verify CORS settings in `backend/config/settings.py`
- Make sure your Vercel domain is in `CORS_ALLOWED_ORIGINS`
- Check `CORS_ALLOWED_ORIGIN_REGEXES` includes Vercel pattern

---

## Environment Variables

### Frontend (.env - not committed to git)
```
# Add if needed
REACT_APP_API_URL=https://notwritingasusual.pythonanywhere.com
```

### Backend (.env - on PythonAnywhere only)
```
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=notwritingasusual.pythonanywhere.com,localhost,127.0.0.1
```

---

## Tips

- 🚀 Always test locally before pushing
- 📝 Write clear commit messages
- ⏱️ Wait 1-2 minutes for Vercel deployments to complete
- 🔄 Don't forget to reload PythonAnywhere after pulling backend changes
- 📊 Monitor deployment logs for errors
- 💾 Regularly backup your PythonAnywhere database
