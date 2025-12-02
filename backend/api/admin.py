from django.contrib import admin
from .models import (
    BlogPost, Projects, HealthWeight, FitnessImage, Novels, ShortStories, 
    WorkExperience, ImageGallery, ScreenshotsNotes  
)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'tags']
    search_fields = ['title', 'content', 'tags']
    readonly_fields = ['created_at']
    list_per_page = 20

@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at']

@admin.register(HealthWeight)
class HealthWeightAdmin(admin.ModelAdmin):
    list_display = ['date', 'weight', 'unit', 'created_at']
    list_filter = ['unit', 'date']
    search_fields = ['date']
    readonly_fields = ['created_at']
    date_hierarchy = 'date'
    list_per_page = 50

@admin.register(FitnessImage)
class FitnessImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'uploaded_at']
    search_fields = ['description']
    readonly_fields = ['uploaded_at']
    date_hierarchy = 'uploaded_at'
    list_per_page = 50

@admin.register(Novels)
class NovelsAdmin(admin.ModelAdmin):
    list_display = ['title', 'genere', 'author', 'created_at']
    search_fields = ['title', 'genere', 'author', 'description']
    readonly_fields = ['created_at']
    list_per_page = 20

@admin.register(ShortStories)
class ShortStoriesAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_at']
    search_fields = ['title', 'author', 'description']
    readonly_fields = ['created_at']
    list_per_page = 20

@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ['company', 'position', 'start_date', 'end_date', 'created_at']
    search_fields = ['company', 'position', 'description']
    readonly_fields = ['created_at']
    list_per_page = 20

@admin.register(ImageGallery)
class ImageGalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at']
    list_per_page = 20

@admin.register(ScreenshotsNotes)
class ScreenshotsNotesAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at']
    list_per_page = 20  