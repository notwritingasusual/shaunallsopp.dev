from ninja import NinjaAPI, File
from ninja.files import UploadedFile
from typing import List
from django.shortcuts import get_object_or_404
from .models import HealthWeight, Projects, Novels, ShortStories, WorkExperience, ImageGallery
from .schemas import (
    ProjectOut, ProjectIn, HealthWeightOut, NovelOut, NovelIn,
    ShortStoryOut, ShortStoryIn, WorkExperienceOut, WorkExperienceIn,
    ImageGalleryOut, ImageGalleryIn
)
from .blog_api import blog_router
from .projects_api import project_router
from .work_experience_api import work_experience_router
from .fitness_api import fitness_router
from .writing_api import writing_router
from .image_gallery_api import image_gallery_router
from ninja.security import HttpBearer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime

class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        jwt_auth = JWTAuthentication()
        try:
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)
            return user
        except AuthenticationFailed:
            return None

api = NinjaAPI()
api.add_router("/blog", blog_router)
api.add_router("/projects", project_router)
api.add_router("/work-experience", work_experience_router)
api.add_router("/fitness", fitness_router)
api.add_router("/writing", writing_router)
api.add_router("/image-gallery", image_gallery_router)

