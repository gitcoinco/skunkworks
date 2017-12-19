from django.test import TestCase
from .models import Wallpaper
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


class ModelTestCase(TestCase):

    """This class defines the test suite for the wallpaper model."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.wallpaper_title = "Write world class code"
        self.wallpaper = Wallpaper(title=self.wallpaper_title)

    def test_model_can_create_a_wallpaper(self):
        """Test the wallpaper model can create a wallpaper."""
        old_count = Wallpaper.objects.count()
        self.wallpaper.save()
        new_count = Wallpaper.objects.count()
        self.assertNotEqual(old_count, new_count)


class ViewTestCase(TestCase):

    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.wallpaper_data = {
            'title': 'Summertime', 'author': 'Unknown', 'tags': 'summer, sunshine'}
        self.response = self.client.post(
            reverse('create'),
            self.wallpaper_data,
            format="json")

    def test_api_can_create_a_wallpaper(self):
        """Test the api has wallpaper creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_a_wallpaper(self):
        """Test the api can get a given wallpaper."""
        wallpaper = Wallpaper.objects.get()
        response = self.client.get(
            reverse('details',
                    kwargs={'pk': wallpaper.id}), format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, wallpaper)

    def test_api_can_update_wallpaper(self):
        """Test the api can update a given wallpaper."""
        wallpaper = Wallpaper.objects.get()
        change_wallpaper = {
            'title': 'Something new', 'author': 'tester', 'tags': 'rwar,rrw'}
        res = self.client.put(
            reverse('details', kwargs={'pk': wallpaper.id}),
            change_wallpaper, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_wallpaper(self):
        """Test the api can delete a wallpaper."""
        wallpaper = Wallpaper.objects.get()
        response = self.client.delete(
            reverse('details', kwargs={'pk': wallpaper.id}),
            format='json',
            follow=True)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
