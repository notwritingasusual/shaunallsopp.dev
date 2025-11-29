from typing import List
from ninja import Router
from .models import ImageGallery
from .schemas import ImageGalleryOut

image_gallery_router = Router()

@image_gallery_router.get("/", response=List[ImageGalleryOut])
def list_image_gallery(request):
    return ImageGallery.objects.all()
