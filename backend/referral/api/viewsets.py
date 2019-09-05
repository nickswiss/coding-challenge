from rest_framework.viewsets import ModelViewSet
from .serializers import LinkSerializer
from ..models import Link


class LinkViewSet(ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
