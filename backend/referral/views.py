from django.http import HttpResponse
from django.views import View
from django.views.generic import TemplateView
from .models import Link
from django.conf import settings
import os


class HomeView(View):
    """
    Returns the index.html for the react app.
    Could solve this many ways, this is just least verbose, and does not require
    deploying react to its own static file server, or too much managing of directories
    to make a TemplateView
    """

    def get(self, request, *args, **kwargs):
        """
        Returns the react index.html in a HttpResponse
        Returns:
            HttpResponse: response with react html
        """
        with open(os.path.join(settings.REACT_APP, "build", "index.html")) as file:
            return HttpResponse(file.read())


class LandingView(TemplateView):
    """
    Landing for a link, displays the links name with copy and an image
    """

    template_name = "landing.html"

    def get_context_data(self, **kwargs):
        """
        Updates context data with relevant link information
        Returns:
            context_data: context data with updated link information
        """
        title = self.kwargs["link_title"]
        page_link = Link.objects.get(title=title)
        return {"referral": page_link}
