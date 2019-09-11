import json

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from referral.models import Link


class TestLinksViewset(TestCase):
    def setUp(self):
        self.client = APIClient()

    def create_and_save_link(self):
        """
        Creates a new link and saves it to the database
        Returns:
            Link: the created link
        """
        link_id = 1
        title = "test"
        clicks = 2
        link = Link(id=link_id, title=title, clicks=clicks)
        link.save()
        return link

    def test_get_list(self):
        """
        GET on list route should return all links
        """
        link = self.create_and_save_link()
        resp = self.client.get(reverse("link-list"))
        self.assertEqual(
            json.loads(resp.content),
            [{"id": link.id, "title": link.title, "clicks": link.clicks}],
        )

    def test_get_by_id(self):
        """
        GET with ID on detail route should return the link identified by id
        """
        link = self.create_and_save_link()
        resp = self.client.get(reverse("link-detail", kwargs={"pk": link.id}))
        self.assertEqual(
            json.loads(resp.content),
            {"id": link.id, "title": link.title, "clicks": link.clicks},
        )

    def test_delete(self):
        """
        DEL with ID on detail route should delete the link identified by id
        """
        link = self.create_and_save_link()
        resp = self.client.delete(reverse("link-detail", kwargs={"pk": link.id}))
        self.assertEqual(resp.status_code, 204)
        with self.assertRaises(Link.DoesNotExist):
            Link.objects.get(id=link.id)

    def test_put(self):
        """
        PUT with ID on detail route should update the link identified by id
        """
        link = self.create_and_save_link()
        data = {"title": "abc", "clicks": 3}
        resp = self.client.put(reverse("link-detail", kwargs={"pk": link.id}), data)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(
            json.loads(resp.content),
            {"id": link.id, "title": data["title"], "clicks": data["clicks"]},
        )
        updated_link = Link.objects.get(id=link.id)
        self.assertEqual(updated_link.title, data["title"])
        self.assertEqual(updated_link.clicks, data["clicks"])

    def test_patch(self):
        """
        PATCH with ID on detail route should update the link identified by id
        without mutating or requiring full payload
        """
        link = self.create_and_save_link()
        data = {"title": "abc"}
        resp = self.client.patch(reverse("link-detail", kwargs={"pk": link.id}), data)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(
            json.loads(resp.content),
            {"id": link.id, "title": data["title"], "clicks": link.clicks},
        )
        updated_link = Link.objects.get(id=link.id)
        self.assertEqual(updated_link.title, data["title"])
        self.assertEqual(updated_link.clicks, link.clicks)

    def test_post(self):
        """
        POST on list route should create a link
        """
        data = {"id": 1, "title": "abc", "clicks": 3}
        resp = self.client.post(reverse("link-list"), data)
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(
            json.loads(resp.content),
            {"id": data["id"], "title": data["title"], "clicks": data["clicks"]},
        )
        created = Link.objects.get(id=data["id"])
        self.assertEqual(created.title, data["title"])
        self.assertEqual(created.clicks, data["clicks"])

    def test_click_detail_route(self):
        """
        POST on click detail route should increment clicks by 1
        """
        link = self.create_and_save_link()
        resp = self.client.post(reverse("link-click", kwargs={"pk": link.id}))
        resp_data = json.loads(resp.content)
        self.assertEqual(resp_data, {"redirect": f"/landing/{link.title}"})
        updated_link = Link.objects.get(id=link.id)
        self.assertEqual(updated_link.clicks, link.clicks + 1)


class TestHealthCheck(TestCase):
    def test_success(self):
        resp = self.client.get(reverse("health-check"))
        self.assertEqual(resp.status_code, 200)
