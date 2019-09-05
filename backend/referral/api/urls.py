from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import LinkViewSet

router = DefaultRouter()
router.register('links', LinkViewSet)


urlpatterns = [
    path('', include(router.urls))
]
