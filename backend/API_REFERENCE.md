# API Reference - shaunallsopp.dev

## Base URL
```
http://127.0.0.1:8000/api
```

## Important Notes
⚠️ **Django Ninja does NOT use trailing slashes**
- ✅ Use: `/api/blog`
- ❌ Don't use: `/api/blog/`

---

## Models

### BlogPost
- `id` - Integer (auto-generated)
- `title` - String (max 200 chars)
- `content` - Text
- `image` - ImageField (optional)
- `created_at` - DateTime (auto-generated)

---

## Endpoints

### Health Check
**GET** `/api/health`

Returns server status.

**Response:**
```json
{
  "status": "ok"
}
```

---

### List All Blog Posts
**GET** `/api/blog`

Returns all blog posts ordered by most recent first.

**Response:**
```json
[
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content...",
    "image": null,
    "created_at": "2025-11-09T15:04:00.000Z"
  }
]
```

---

### Get Single Blog Post
**GET** `/api/blog/{post_id}`

Get a specific blog post by ID.

**Example:** `/api/blog/1`

**Response:**
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content...",
  "image": null,
  "created_at": "2025-11-09T15:04:00.000Z"
}
```

---

### Create Blog Post
**POST** `/api/blog`

Create a new blog post.

**Request Body:**
```json
{
  "title": "My Blog Post Title",
  "content": "The full content of the blog post...",
  "image": null
}
```

**Response:**
```json
{
  "id": 2,
  "title": "My Blog Post Title",
  "content": "The full content of the blog post...",
  "image": null,
  "created_at": "2025-11-09T15:04:00.000Z"
}
```

---

### Update Blog Post
**PUT** `/api/blog/{post_id}`

Update an existing blog post.

**Example:** `/api/blog/1`

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "image": null
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content...",
  "image": null,
  "created_at": "2025-11-09T15:04:00.000Z"
}
```

---

### Delete Blog Post
**DELETE** `/api/blog/{post_id}`

Delete a blog post.

**Example:** `/api/blog/1`

**Response:**
```json
{
  "success": true
}
```

---

## React/Frontend Usage

### Fetch All Blog Posts
```javascript
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Get all blog posts
const fetchBlogPosts = async () => {
  const response = await axios.get(`${API_URL}/blog`);
  return response.data;
};
```

### Create a Blog Post
```javascript
const createBlogPost = async (postData) => {
  const response = await axios.post(`${API_URL}/blog`, {
    title: postData.title,
    content: postData.content,
    image: postData.image || null
  });
  return response.data;
};
```

### Update a Blog Post
```javascript
const updateBlogPost = async (postId, postData) => {
  const response = await axios.put(`${API_URL}/blog/${postId}`, {
    title: postData.title,
    content: postData.content,
    image: postData.image || null
  });
  return response.data;
};
```

### Delete a Blog Post
```javascript
const deleteBlogPost = async (postId) => {
  const response = await axios.delete(`${API_URL}/blog/${postId}`);
  return response.data;
};
```

---

## Interactive API Documentation

Visit the auto-generated Swagger docs:
```
http://127.0.0.1:8000/api/docs
```

This provides an interactive interface to test all endpoints!

---

## CORS Configuration

Already configured in settings.py:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",      # React dev server
    "http://127.0.0.1:3000",
]
```

Your React app at `http://localhost:3000` can make API requests without CORS issues.

---

## Testing with cURL

```bash
# List all posts
curl http://127.0.0.1:8000/api/blog

# Get single post
curl http://127.0.0.1:8000/api/blog/1

# Create post
curl -X POST http://127.0.0.1:8000/api/blog \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Test content"}'

# Update post
curl -X PUT http://127.0.0.1:8000/api/blog/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated content"}'

# Delete post
curl -X DELETE http://127.0.0.1:8000/api/blog/1
```

---

## Summary of Changes

### ✅ Cleaned Up:
- ❌ Removed `Message` model (was confused with blog)
- ✅ Renamed `Blog` model to `BlogPost`
- ✅ Created proper blog endpoints (CRUD operations)
- ✅ Removed `/messages` endpoints
- ✅ Updated admin interface for BlogPost

### 📁 Current Structure:
```
backend/api/
├── models.py       # BlogPost model only
├── api.py          # Blog endpoints + health check
├── admin.py        # BlogPost admin interface
└── migrations/     # Database migrations applied
```

### 🎯 One Model, One Purpose:
- **BlogPost** = Your blog/portfolio posts
- Model has: title, content, image, created_at
- React component called "Blog" will use BlogPost API

---

**Last Updated:** 2025-11-09
