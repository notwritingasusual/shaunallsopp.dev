from typing import List
from ninja import Router
from .models import Novels, ShortStories
from .schemas import NovelOut, ShortStoryOut

writing_router = Router()

@writing_router.get("/novels", response=List[NovelOut])
def list_novels(request):
    return Novels.objects.all()

@writing_router.get("/short-stories", response=List[ShortStoryOut])
def list_short_stories(request):
    return ShortStories.objects.all()
