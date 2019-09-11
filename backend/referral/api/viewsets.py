from django.urls import reverse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import LinkSerializer
from ..models import Link


class LinkViewSet(ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

    @action(methods=["post"], detail=True)
    def click(self, request, pk=None):
        """
        Updates the link click count by 1 and return a location to navigate
        to link landing
        Args:
            request (Request): drf request
            pk: Primary key of Link instance
        Returns:
            Response: response containing location to redirect to
        """
        link = Link.objects.get(pk=pk)
        link.clicks += 1
        link.save()
        return Response(
            {
                "redirect": reverse(
                    "referral-landing", kwargs={"link_title": link.title}
                )
            },
            status=200,
        )
