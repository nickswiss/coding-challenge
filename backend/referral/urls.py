from django.urls import path, include

from .views import HomeView
from .api.urls import urlpatterns as api_urls

urlpatterns = [
    path('', HomeView.as_view()),
    path('api/', include(api_urls)),
]
