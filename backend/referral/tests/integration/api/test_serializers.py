from django.test import TestCase
from rest_framework.exceptions import ErrorDetail

from referral.api.serializers import LinkSerializer
from referral.models import Link


class TestLinkSerializer(TestCase):
    def test_link_serializer_create_success(self):
        """
        LinkSerializer should create Link when provided valid data
        """
        data = {"title": "abc", "clicks": 123}
        serializer = LinkSerializer(data=data)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        link = serializer.save()
        self.assertEqual(link.title, data["title"])
        self.assertEqual(link.clicks, data["clicks"])

    def test_link_serializer_update_success(self):
        """
        LinkSerializer should update Link when provided valid data
        """
        link = Link(title="old", clicks=1)
        data = {"title": "abc", "clicks": 123}
        serializer = LinkSerializer(link, data)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        updated_link = serializer.save()
        self.assertEqual(link.id, updated_link.id)
        self.assertEqual(link.title, data["title"])
        self.assertEqual(link.clicks, data["clicks"])

    def test_link_serializer_create_validation(self):
        """
        LinkSerializer should not create Link when provided invalid data
        """
        data = {
            "title": "super duper long title that is more than the character length",
            "clicks": 123,
        }
        serializer = LinkSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors,
            {
                "title": [
                    ErrorDetail(
                        string="Ensure this field has no more than 36 characters.",
                        code="max_length",
                    )
                ]
            },
        )
        self.assertEqual(0, len(Link.objects.all()))

    def test_link_serializer_update_validation(self):
        """
        LinkSerializer should not update Link when provided invalid data
        """
        link = Link(title="old", clicks=1)
        link.save()
        data = {
            "title": "super duper long title that is more than the character length",
            "clicks": 123,
        }
        serializer = LinkSerializer(link, data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors,
            {
                "title": [
                    ErrorDetail(
                        string="Ensure this field has no more than 36 characters.",
                        code="max_length",
                    )
                ]
            },
        )
        old_link = Link.objects.get(id=link.id)
        self.assertEqual(1, len(Link.objects.all()))
        self.assertEqual(link, old_link)
