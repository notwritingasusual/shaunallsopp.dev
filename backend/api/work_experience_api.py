from typing import List
from ninja import Router
from .models import WorkExperience
from .schemas import WorkExperienceOut

work_experience_router = Router()

@work_experience_router.get("/", response=List[WorkExperienceOut])
def list_work_experience(request):
    return WorkExperience.objects.all()
