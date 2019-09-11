from django.urls import path, include
from django.views.generic import TemplateView

from .views import HomeView, LandingView
from referral.api.urls import urlpatterns as api_urls

urlpatterns = [
    path("", HomeView.as_view()),
    path(
        "css-exercise",
        TemplateView.as_view(template_name="exercise.html"),
        name="css-exercise",
    ),
    path("landing/<str:link_title>", LandingView.as_view(), name="referral-landing"),
    path("api/", include(api_urls)),
]
