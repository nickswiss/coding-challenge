from django.urls import reverse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import LinkSerializer
from ..models import Link


class LinkViewSet(ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

    @action(methods=['post'], detail=True)
    def click(self, request, pk=None):
        link = Link.objects.get(pk=pk)
        link.clicks += 1
        link.save()
        return Response(status=200)
