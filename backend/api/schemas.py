from ninja import Schema
from typing import List, Optional
from datetime import datetime, date

# Schemas for BlogPost
class BlogPostIn(Schema):
    title: str
    tags: Optional[str] = None
    content: str

class BlogPostOut(Schema):
    id: int
    title: str
    tags: Optional[str]
    content: str
    image: Optional[str] = None
    created_at: datetime

# Schemas for Project
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

# Schemas for Novel
class NovelIn(Schema):
    title: str
    genere: Optional[str] = None
    author: str
    description: Optional[str] = None
    cover_image: Optional[str] = None

class NovelOut(Schema):
    id: int
    title: str
    genere: Optional[str]
    author: str
    description: Optional[str]
    cover_image: Optional[str]
    created_at: datetime

# Schemas for ShortStory
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

# Schemas for WorkExperience
class WorkExperienceIn(Schema):
    company: str
    logo: Optional[str] = None
    position: str
    start_date: date
    end_date: Optional[date] = None
    description: Optional[str] = None

class WorkExperienceOut(Schema):
    id: int
    company: str
    logo: Optional[str]
    position: str
    start_date: date
    end_date: Optional[date]
    description: Optional[str]
    created_at: datetime

# Schemas for ImageGallery
class ImageGalleryIn(Schema):
    title: str
    image: Optional[str] = None
    description: Optional[str] = None

class ImageGalleryOut(Schema):
    id: int
    title: str
    image: Optional[str]
    description: Optional[str]
    created_at: datetime

# Schemas for HealthWeight
class HealthWeightOut(Schema):
    date: date
    weight: float
    unit: str
