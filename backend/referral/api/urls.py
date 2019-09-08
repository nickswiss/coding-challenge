from django.urls import path, include
from rest_framework.routers import DefaultRouter

from referral.api.health import health_check
from .viewsets import LinkViewSet


router = DefaultRouter()
router.register('links', LinkViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('health-check', health_check),
]
