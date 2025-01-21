from rest_framework import serializers
from database.models import Thing

class ThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thing
        fields = ['id', 'title', 'created', 'modified']