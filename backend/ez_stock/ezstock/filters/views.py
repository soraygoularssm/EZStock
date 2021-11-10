from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FilterSerializer , CreateFilterSerializer
from .models import Filter

# Create your views here.


class FiltersView(generics.ListAPIView):
    queryset = Filter.objects.order_by('order','name').all()
    serializer_class = FilterSerializer

@api_view(['GET', 'PUT'])
def FilterView(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """

    if request.method == 'GET':
        queryset = Filter.objects.filter(id=pk)
        filter = queryset[0]
        serializer_class = FilterSerializer(filter)
        return Response(serializer_class.data)

    elif request.method == 'PUT':
        serializer_class = CreateFilterSerializer
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.data.get('data')
            queryset = Filter.objects.filter(id=pk)
            if queryset.exists():
                filter = queryset[0]
                filter.data = data
                filter.save(update_fields=['data'])
                return Response(FilterSerializer(filter).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)