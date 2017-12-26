from rest_framework import serializers
from .models import Wallpaper, Like, Report


class WallpaperSerializer(serializers.ModelSerializer):

    """Serializer to map the Model instance into JSON format."""

    class Meta:

        """Meta class to map serializer's fields with the model fields."""
        model = Wallpaper
        fields = ('id', 'title', 'author', 'tags', 'ext',
                  'downloads', 'date_created', 'resolution', 'category')
        read_only_fields = (
            ['ext', 'resolution', 'category', 'date_created', 'date_updated',
             'downloads'])


class WallpaperDetailsSerializer(serializers.ModelSerializer):

    """Serializer to map the Model instance into JSON format."""

    likes = serializers.IntegerField()
    reports = serializers.IntegerField()
    url = serializers.CharField()

    class Meta:

        """Meta class to map serializer's fields with the model fields."""
        model = Wallpaper
        fields = (
            'id', 'title', 'author', 'tags', 'resolution', 'category', 'ext',
            'url', 'downloads', 'date_created', 'likes', 'reports')
        read_only_fields = (
            ['date_created', 'downloads', 'url', 'likes', 'reports'])


class LikesSerializer(serializers.ModelSerializer):

    """Serializer to map the Model instance into JSON format."""

    class Meta:

        """Meta class to map serializer's fields with the model fields."""
        model = Like
        fields = ('id', 'ip', 'wallpaper', 'date_created')
        read_only_fields = (['date_created'])


class ReportsSerializer(serializers.ModelSerializer):

    """Serializer to map the Model instance into JSON format."""

    class Meta:

        """Meta class to map serializer's fields with the model fields."""
        model = Report
        fields = ('id', 'ip', 'wallpaper', 'date_created')
        read_only_fields = (['date_created'])
