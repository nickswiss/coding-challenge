from django.http import HttpResponse
from django.views import View
from django.views.generic import TemplateView
from .models import Link
from django.conf import settings
import os


class HomeView(View):

    def get(self, request, *args, **kwargs):
        with open(os.path.join(settings.REACT_APP, 'build', 'index.html')) as file:
            return HttpResponse(file.read())


class LandingView(TemplateView):
    template_name = 'landing.html'

    def get_context_data(self, **kwargs):
        title = self.kwargs['link_title']
        page_link = Link.objects.get(title=title)
        return {
            'referral': page_link
        }
