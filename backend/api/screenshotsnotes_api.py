from typing import List
from ninja import Router
from .models import ScreenshotsNotes
from .schemas import ScreenshotsNotesOut

screenshots_notes_router = Router()

@screenshots_notes_router.get("/", response=List[ScreenshotsNotesOut])
def list_screenshots_notes(request):
    return ScreenshotsNotes.objects.all()