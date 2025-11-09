from django.db import models
from django.conf import settings


class BlogPost(models.Model):
    title = models.CharField(max_length=200) 
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class HealthWeight(models.Model):
    date = models.DateField(unique=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # e.g., 123.45 kg
    unit = models.CharField(max_length=10, default='kg')  # kg or lb
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.date}: {self.weight} {self.unit}"
    
    class Meta:
        ordering = ['date']
        verbose_name = "Health Weight Record"
        verbose_name_plural = "Health Weight Records"

class Projects(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    languages = models.CharField(max_length=200, blank=True)
    link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']


class HealthWeight(models.Model):
    date = models.DateField(unique=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # e.g., 123.45 kg
    unit = models.CharField(max_length=10, default='kg')  # kg or lb
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.date}: {self.weight} {self.unit}"
    
    class Meta:
        ordering = ['date']
        verbose_name = "Health Weight Record"
        verbose_name_plural = "Health Weight Records"



