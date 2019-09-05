from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template.response import TemplateResponse
from django.views.generic import TemplateView


class HomeView(TemplateView):
    def get(self, request, *args, **kwargs):
        return TemplateResponse(request, 'home.html', {})
