# 🐍 Django Local–Production Database Sync Guide (Using `dumpdata` / `loaddata`)

This guide explains how to safely copy your **production database** (on PythonAnywhere) to your **local development machine** using Django’s built-in commands.

---

## 🧭 Overview

You will:

1. **Export (dump)** your production database to a JSON file on PythonAnywhere.
2. **Download** that JSON file to your local computer.
3. **Import (load)** that data into your local database.

---

## ⚙️ Step-by-Step Instructions

### **Step 1 — Dump Data on PythonAnywhere**

In your **PythonAnywhere Bash console**, run:

```bash
workon/shaunallsopp-env
python manage.py dumpdata --exclude auth.permission --exclude contenttypes --indent 2 > data.json
```

**Explanation:**
- Exports all database data to a JSON file called `data.json`
- Excludes permissions and content types (these can cause import conflicts)
- `--indent 2` makes the file readable

Check that it was created:
```bash
ls
```
You should see `data.json` in your project directory (usually next to `manage.py`).

---

### **Step 2 — Download the Data File**

1. In PythonAnywhere, open the **Files** tab.  
2. Navigate to where `data.json` is saved.  
3. Click the file name, then click **Download**.  
4. Save it to your local project folder.

*Optional (advanced):* Use `scp` to pull the file directly:
```bash
scp notwritingasusual@ssh.pythonanywhere.com:/home/notwritingasusual/shaunallsopp.dev/data.json .
```

---

### **Step 3 — Load Data on Your Local Machine**

In your **local terminal**, inside your Django project folder, run:

[flush db first or for sqlite delete the .db file and then migrate]

```bash
python manage.py loaddata data.json
```

**This imports all the data into your local database.**

IMPORT IMAGES: download media folder on python anywhere - unzip into local project folder

on python anywhere console:
cd /home/notwritingasusual/shaunallsopp.dev/backend
create a zip folder:
zip -r media_backup.zip /media/
Download the zip from python anywhere files tab
unzip the folder 
replace contents of local media folder with the downloaded media folder contents


---

## 🧹 Tips and Gotchas

### 1. **Make sure migrations are up to date**
Before loading data, ensure your local schema matches production:
```bash
python manage.py migrate
```

### 2. **Start from a clean database**
If your local database already has conflicting data, clear it first:
```bash
python manage.py flush
```
Or, if you’re using SQLite, you can delete your `.sqlite3` file and re-run migrations.

### 3. **File path matters**
If `data.json` is in another directory:
```bash
python manage.py loaddata path/to/data.json
```

---

## 🧩 Optional — Automate the Sync

You can make a simple script called `sync_data.sh`:

```bash
#!/bin/bash
# Sync production DB → local DB

scp yourusername@ssh.pythonanywhere.com:/home/yourusername/yourproject/data.json .
python manage.py flush --noinput
python manage.py loaddata data.json
```

Run it locally with:
```bash
bash sync_data.sh
```

---

## ✅ Summary

| Step | Action | Command |
|------|---------|----------|
| 1 | Dump data on PythonAnywhere | `python manage.py dumpdata > data.json` |
| 2 | Download or copy file | `scp` or via Files tab |
| 3 | Load data locally | `python manage.py loaddata data.json` |

---

## ⚠️ Important Warnings
- Never sync **local → production** — only pull production data down.
- Keep your `.env` files (`.env.dev`, `.env.prod`) separate and out of Git.
- If your production data contains sensitive user info, anonymize before loading locally.

---

**Author:** Your Name  
**Last updated:** November 2025
