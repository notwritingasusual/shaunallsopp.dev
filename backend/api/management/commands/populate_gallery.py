import os
from django.core.management.base import BaseCommand
from django.core.files import File
from api.models import ImageGallery
from django.conf import settings

class Command(BaseCommand):
    help = 'Populates the database with placeholder images for the image gallery.'

    def handle(self, *args, **options):
        self.stdout.write('Deleting existing gallery images...')
        ImageGallery.objects.all().delete()

        self.stdout.write('Populating database with 10 placeholder gallery images...')
        
        # Path to your placeholder image
        placeholder_image_path = '/Users/shaunallsopp/Desktop/Projectplaceholder.png'

        if not os.path.exists(placeholder_image_path):
            self.stderr.write(self.style.ERROR(f'Placeholder image not found at: {placeholder_image_path}'))
            return

        for i in range(1, 11):
            gallery_title = f'Placeholder Image {i}'
            gallery_description = f'This is a placeholder description for image {i}.'
            
            gallery_item = ImageGallery(
                title=gallery_title,
                description=gallery_description,
            )
            
            with open(placeholder_image_path, 'rb') as f:
                gallery_item.image.save(f'placeholder_gallery_{i}.jpeg', File(f))
            
            gallery_item.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with 10 placeholder gallery images.'))
