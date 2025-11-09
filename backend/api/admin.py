from django.contrib import admin
from .models import BlogPost, Projects, HealthWeight


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
    search_fields = ['title', 'content']
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
