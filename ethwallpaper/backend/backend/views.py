import os
import uuid

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from rest_framework import status
from rest_framework.response import Response

from api.models import Wallpaper


class IndexView(View):

    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        path = os.path.join(settings.BASE_DIR, '../frontend/build/index.html')
        abspath = open(os.path.normpath(path), 'r')
        return HttpResponse(content=abspath.read())


class DetailsView(View):

    """Render main page."""

    def get(self, request, pk):
        """Return html for main application page."""

        wp = Wallpaper.objects.filter(id=uuid.UUID(pk)).first()
        if wp is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        path = os.path.join(settings.BASE_DIR, '../frontend/build/index.html')
        abspath = open(os.path.normpath(path), 'r')
        html = abspath.read()

        html = html.replace(
            settings.DEFAULT_PREVIEW_IMAGE, '{}{}.{}'.format(settings.PREVIEW_URL, pk, wp.ext))
        return HttpResponse(content=html)
