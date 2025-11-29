from typing import List
from django.db.models import Q
from django.shortcuts import get_object_or_404
from ninja import Router, Form, File
from ninja.files import UploadedFile
from .models import BlogPost
from .schemas import BlogPostOut, BlogPostIn
from .auth import JWTAuth

blog_router = Router()

@blog_router.get("/", response=List[BlogPostOut])
def list_blog_posts(request):
    """Get all blog posts"""
    return BlogPost.objects.all()

@blog_router.get("/{post_id}", response=BlogPostOut)
def get_blog_post(request, post_id: int):
    """Get a specific blog post by ID"""
    return get_object_or_404(BlogPost, id=post_id)

@blog_router.get("/tags/{tag}", response=List[BlogPostOut])
def get_blog_posts_by_tag(request, tag: str):
    """Get blog posts by tag"""
    return BlogPost.objects.filter(tags__icontains=tag)

@blog_router.post("/", auth=JWTAuth(), response=BlogPostOut)
def create_blog_post(request, payload: BlogPostIn = Form(...), image: UploadedFile = File(None)):
    """Create a new blog post with an optional image upload"""
    if not request.user.is_staff:
        # This check is important for security
        return 403, {"detail": "Permission denied"}
    
    post_data = payload.dict()
    if image:
        post_data['image'] = image
    post = BlogPost.objects.create(**post_data)
    return post

@blog_router.put("/{post_id}", auth=JWTAuth(), response=BlogPostOut)
def update_blog_post(request, post_id: int, payload: BlogPostIn):
    """Update a blog post"""
    if not request.user.is_staff:
        return 403, {"detail": "Permission denied"}
    
    post = get_object_or_404(BlogPost, id=post_id)
    for attr, value in payload.dict().items():
        setattr(post, attr, value)
    post.save()
    return post

@blog_router.delete("/{post_id}", auth=JWTAuth())
def delete_blog_post(request, post_id: int):
    """Delete a blog post"""
    if not request.user.is_staff:
        return 403, {"detail": "Permission denied"}
        
    post = get_object_or_404(BlogPost, id=post_id)
    post.delete()
    return {"success": True}

@blog_router.get("/search/", response=List[BlogPostOut])
def search_blog(request, q: str):
    """Search blog posts by title, content, and tags"""
    return BlogPost.objects.filter(
        Q(title__icontains=q) | Q(content__icontains=q) | Q(tags__icontains=q)
    )
