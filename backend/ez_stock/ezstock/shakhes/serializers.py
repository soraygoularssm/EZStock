from rest_framework import serializers
from .models import Shakhes


class ShakhesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shakhes
        fields = ('shakheses')