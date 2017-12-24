from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (CreateView, DetailsView, CreateLike, DownloadView, 
                    CreateReport)

urlpatterns = {
    url(r'^wallpapers/$', CreateView.as_view(), name="create"),
    url(r'^wallpapers/(?P<pk>[0-9a-z\-]+)/$',
        DetailsView.as_view(), name="details"),
    url(r'^wallpapers/(?P<pk>[0-9a-z\-]+)/media/$',
        DownloadView.as_view(), name="media"),
    url(r'^wallpapers/(?P<pk>[0-9a-z\-]+)/like/$',
        CreateLike.as_view(), name="like"),
    url(r'^wallpapers/(?P<pk>[0-9a-z\-]+)/report/$',
        CreateReport.as_view(), name="report"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
