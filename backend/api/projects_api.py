from typing import List
from django.db.models import Q
from django.shortcuts import get_object_or_404
from ninja import Router, Form, File
from ninja.files import UploadedFile
from .models import Projects
from .schemas import ProjectOut, ProjectIn
from .auth import JWTAuth

project_router = Router()



@project_router.get("/", response=List[ProjectOut])
def list_projects(request):
    """Get all projects"""
    return Projects.objects.all()

@project_router.get("/{project_id}", response=ProjectOut)
def get_project(request, project_id: int):
    """Get a specific project by ID"""
    project = get_object_or_404(Projects, id=project_id)
    return project