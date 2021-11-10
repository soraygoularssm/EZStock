from rest_framework import serializers
from .models import Chart


class ChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chart
        fields = ('id' ,'name' , 'order' , 'category' , 'data' , 'last_update')

class CreateChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chart
        fields = ('data',)