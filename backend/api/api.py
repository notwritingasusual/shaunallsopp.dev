from ninja import NinjaAPI, Schema
from typing import List, Optional
from datetime import datetime
from .models import BlogPost

api = NinjaAPI()


# Schemas for BlogPost
class BlogPostIn(Schema):
    title: str
    content: str
    image: Optional[str] = None


class BlogPostOut(Schema):
    id: int
    title: str
    content: str
    image: Optional[str]
    created_at: datetime

class Project(Schema):
    id: int
    name: str
    description: str
    languages: Optional[str]
    link: Optional[str]
    image: Optional[str]
    created_at: datetime




# Blog endpoints
@api.get("/blog", response=List[BlogPostOut])
def list_blog_posts(request):
    """Get all blog posts"""
    return BlogPost.objects.all()


@api.get("/blog/{post_id}", response=BlogPostOut)
def get_blog_post(request, post_id: int):
    """Get a specific blog post by ID"""
    return BlogPost.objects.get(id=post_id)


@api.post("/blog", response=BlogPostOut)
def create_blog_post(request, payload: BlogPostIn):
    """Create a new blog post"""
    post = BlogPost.objects.create(**payload.dict())
    return post


@api.put("/blog/{post_id}", response=BlogPostOut)
def update_blog_post(request, post_id: int, payload: BlogPostIn):
    """Update a blog post"""
    post = BlogPost.objects.get(id=post_id)
    for attr, value in payload.dict().items():
        setattr(post, attr, value)
    post.save()
    return post


@api.delete("/blog/{post_id}")
def delete_blog_post(request, post_id: int):
    """Delete a blog post"""
    post = BlogPost.objects.get(id=post_id)
    post.delete()
    return {"success": True}

# Project endpoints

@api.get("/projects", response=List[Project])
def list_projects(request):
    """Get all projects"""
    from .models import Projects
    return Projects.objects.all()

@api.get("/projects/{project_id}", response=Project)
def get_project(request, project_id: int):
    """Get a specific project by ID"""
    from .models import Projects
    return Projects.objects.get(id=project_id)

@api.post("/projects", response=Project)
def create_project(request, payload: Project):
    """Create a new project"""
    from .models import Projects
    project = Projects.objects.create(**payload.dict())
    return project

@api.put("/projects/{project_id}", response=Project)
def update_project(request, project_id: int, payload: Project):
    """Update a project"""
    from .models import Projects
    project = Projects.objects.get(id=project_id)
    for attr, value in payload.dict().items():
        setattr(project, attr, value)
    project.save()
    return project


# Health Weight endpoints
class HealthWeightOut(Schema):
    date: str
    weight: float
    unit: str


@api.get("/health/weight", response=List[HealthWeightOut])
def get_weight_data(request, days: int = 90):
    """Get weight data for last N days (default: 90)"""
    from datetime import timedelta
    from .models import HealthWeight
    
    cutoff = datetime.now().date() - timedelta(days=days)
    weights = HealthWeight.objects.filter(date__gte=cutoff)
    
    return [
        {
            "date": w.date.strftime('%Y-%m-%d'),
            "weight": float(w.weight),
            "unit": w.unit
        }
        for w in weights
    ]


@api.get("/health/weight/all", response=List[HealthWeightOut])
def get_all_weight_data(request):
    """Get all weight data"""
    from .models import HealthWeight
    
    weights = HealthWeight.objects.all()
    
    return [
        {
            "date": w.date.strftime('%Y-%m-%d'),
            "weight": float(w.weight),
            "unit": w.unit
        }
        for w in weights
    ]