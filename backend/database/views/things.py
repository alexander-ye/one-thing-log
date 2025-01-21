from rest_framework import viewsets
from database.models import Thing
from database.serializers import ThingSerializer

class ThingsViewSet(viewsets.ModelViewSet):
    queryset = Thing.objects.all()
    serializer_class = ThingSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly]