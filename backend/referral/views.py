from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template.response import TemplateResponse
from django.views.generic import TemplateView
from .models import Link


class HomeView(TemplateView):
    template_name = 'home.html'


class LandingView(TemplateView):
    template_name = 'landing.html'

    def get_context_data(self, **kwargs):
        title = self.kwargs['referral_title']
        page_link = Link.objects.get(title=title)

        return {
            'referral': page_link
        }
