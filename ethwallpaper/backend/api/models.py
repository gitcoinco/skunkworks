import uuid
from django.db import models


class Wallpaper(models.Model):

    """This class represents the Wallpaper model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=False, unique=False)
    author = models.CharField(max_length=255, blank=False, unique=False)
    author_email = models.EmailField(max_length=255, blank=True)
    logo_size = models.FloatField(default=1)
    tags = models.CharField(max_length=255, blank=True, unique=False)
    ext = models.CharField(max_length=255, blank=False, unique=False)
    resolution = models.CharField(max_length=255, blank=False, unique=False)
    category = models.CharField(max_length=255, blank=False, unique=False)
    downloads = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    status = models.CharField(
        default="Pending", max_length=10, blank=False, unique=False)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.title)


class Like(models.Model):

    """This class represents the Wallpaper Like model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ip = models.GenericIPAddressField(blank=False, unique=False)
    wallpaper = models.ForeignKey(Wallpaper, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}-{}".format(self.wallpaper, self.ip)

    class Meta:
        unique_together = (('wallpaper', 'ip'),)


class Report(models.Model):

    """This class represents the Wallpaper Report model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ip = models.GenericIPAddressField(blank=False, unique=False)
    wallpaper = models.ForeignKey(Wallpaper, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}-{}".format(self.wallpaper, self.ip)

    class Meta:
        unique_together = (('wallpaper', 'ip'),)
