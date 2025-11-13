from ninja import NinjaAPI, Schema, Field
from typing import List, Optional
from datetime import datetime, date
from django.shortcuts import get_object_or_404
from .models import BlogPost, HealthWeight, Projects, Novels, ShortStories, WorkExperience

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


class ProjectIn(Schema):
    name: str
    description: str
    languages: Optional[str] = None
    link: Optional[str] = None
    image: Optional[str] = None


class ProjectOut(Schema):
    id: int
    name: str
    description: str
    languages: Optional[str]
    link: Optional[str]
    image: Optional[str]
    created_at: datetime


class NovelIn(Schema):
    title: str
    author: str
    description: Optional[str] = None
    cover_image: Optional[str] = None


class NovelOut(Schema):
    id: int
    title: str
    author: str
    description: Optional[str]
    cover_image: Optional[str]
    created_at: datetime


class ShortStoryIn(Schema):
    title: str
    author: str
    description: Optional[str] = None
    cover_image: Optional[str] = None


class ShortStoryOut(Schema):
    id: int
    title: str
    author: str
    description: Optional[str]
    cover_image: Optional[str]
    created_at: datetime

class WorkExperienceIn(Schema):
    company: str
    position: str
    start_date: date
    end_date: Optional[date] = None
    description: Optional[str] = None


# Blog endpoints
@api.get("/blog", response=List[BlogPostOut])
def list_blog_posts(request):
    """Get all blog posts"""
    return BlogPost.objects.all()


@api.get("/blog/{post_id}", response=BlogPostOut)
def get_blog_post(request, post_id: int):
    """Get a specific blog post by ID"""
    return get_object_or_404(BlogPost, id=post_id)


@api.post("/blog", response=BlogPostOut)
def create_blog_post(request, payload: BlogPostIn):
    """Create a new blog post"""
    post = BlogPost.objects.create(**payload.dict())
    return post


@api.put("/blog/{post_id}", response=BlogPostOut)
def update_blog_post(request, post_id: int, payload: BlogPostIn):
    """Update a blog post"""
    post = get_object_or_404(BlogPost, id=post_id)
    for attr, value in payload.dict().items():
        setattr(post, attr, value)
    post.save()
    return post


@api.delete("/blog/{post_id}")
def delete_blog_post(request, post_id: int):
    """Delete a blog post"""
    post = get_object_or_404(BlogPost, id=post_id)
    post.delete()
    return {"success": True}


# Project endpoints
@api.get("/projects", response=List[ProjectOut])
def list_projects(request):
    """Get all projects"""
    return Projects.objects.all()


@api.get("/projects/{project_id}", response=ProjectOut)
def get_project(request, project_id: int):
    """Get a specific project by ID"""
    return get_object_or_404(Projects, id=project_id)


@api.post("/projects", response=ProjectOut)
def create_project(request, payload: ProjectIn):
    """Create a new project"""
    project = Projects.objects.create(**payload.dict())
    return project


@api.put("/projects/{project_id}", response=ProjectOut)
def update_project(request, project_id: int, payload: ProjectIn):
    """Update a project"""
    project = get_object_or_404(Projects, id=project_id)
    for attr, value in payload.dict().items():
        setattr(project, attr, value)
    project.save()
    return project


@api.delete("/projects/{project_id}")
def delete_project(request, project_id: int):
    """Delete a project"""
    project = get_object_or_404(Projects, id=project_id)
    project.delete()
    return {"success": True}


# Health Weight endpoints
class HealthWeightOut(Schema):
    date: date
    weight: float
    unit: str


@api.get("/health/weight", response=List[HealthWeightOut])
def get_weight_data(request, days: int = 90):
    """Get weight data for last N days (default: 90)"""
    from datetime import timedelta
    
    cutoff = datetime.now().date() - timedelta(days=days)
    weights = HealthWeight.objects.filter(date__gte=cutoff)
    
    return weights


@api.get("/health/weight/all", response=List[HealthWeightOut])
def get_all_weight_data(request):
    """Get all weight data"""
    return HealthWeight.objects.all()


# Novels endpoints
@api.get("/novels", response=List[NovelOut])
def list_novels(request):
    """Get all novels"""
    return Novels.objects.all()


@api.get("/novels/{novel_id}", response=NovelOut)
def get_novel(request, novel_id: int):
    """Get a specific novel by ID"""
    return get_object_or_404(Novels, id=novel_id)


@api.post("/novels", response=NovelOut)
def create_novel(request, payload: NovelIn):
    """Create a new novel"""
    novel = Novels.objects.create(**payload.dict())
    return novel


@api.put("/novels/{novel_id}", response=NovelOut)
def update_novel(request, novel_id: int, payload: NovelIn):
    """Update a novel"""
    novel = get_object_or_404(Novels, id=novel_id)
    for attr, value in payload.dict().items():
        setattr(novel, attr, value)
    novel.save()
    return novel


@api.delete("/novels/{novel_id}")
def delete_novel(request, novel_id: int):
    """Delete a novel"""
    novel = get_object_or_404(Novels, id=novel_id)
    novel.delete()
    return {"success": True}


# Short Stories endpoints
@api.get("/shortstories", response=List[ShortStoryOut])
def list_short_stories(request):
    """Get all short stories"""
    return ShortStories.objects.all()


@api.get("/shortstories/{shortstory_id}", response=ShortStoryOut)
def get_short_story(request, shortstory_id: int):
    """Get a specific short story by ID"""
    return get_object_or_404(ShortStories, id=shortstory_id)


@api.post("/shortstories", response=ShortStoryOut)
def create_short_story(request, payload: ShortStoryIn):
    """Create a new short story"""
    short_story = ShortStories.objects.create(**payload.dict())
    return short_story


@api.put("/shortstories/{shortstory_id}", response=ShortStoryOut)
def update_short_story(request, shortstory_id: int, payload: ShortStoryIn):
    """Update a short story"""
    short_story = get_object_or_404(ShortStories, id=shortstory_id)
    for attr, value in payload.dict().items():
        setattr(short_story, attr, value)
    short_story.save()
    return short_story


@api.delete("/shortstories/{shortstory_id}")
def delete_short_story(request, shortstory_id: int):
    """Delete a short story"""
    short_story = get_object_or_404(ShortStories, id=shortstory_id)
    short_story.delete()
    return {"success": True}

@api.get("/workexperience", response=List[WorkExperienceIn])
def list_work_experiences(request):
    """Get all work experiences"""
    experiences = WorkExperience.objects.all()
    return WorkExperience.objects.all()


