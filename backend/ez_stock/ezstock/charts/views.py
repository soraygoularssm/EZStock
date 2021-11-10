from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChartSerializer , CreateChartSerializer
from .models import Chart

# Create your views here.


class ChartsView(generics.ListAPIView):
    queryset = Chart.objects.order_by('order','category').all()
    serializer_class = ChartSerializer

@api_view(['GET', 'PUT', 'DELETE'])
def ChartView(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """

    if request.method == 'GET':
        queryset = Chart.objects.filter(id=pk)
        chart = queryset[0]
        serializer_class = ChartSerializer(chart)
        return Response(serializer_class.data)

    elif request.method == 'PUT':
        serializer_class = CreateChartSerializer
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.data.get('data')
            queryset = Chart.objects.filter(id=pk)
            if queryset.exists():
                chart = queryset[0]
                chart.data = data
                chart.save(update_fields=['data' , 'last_update'])
                return Response(ChartSerializer(chart).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        queryset = Chart.objects.filter(id=pk)
        chart = queryset[0]
        chart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)