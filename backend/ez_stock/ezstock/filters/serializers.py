from rest_framework import serializers
from .models import Filter


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('name' , 'filter' , 'category')

class CreateFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('data',)