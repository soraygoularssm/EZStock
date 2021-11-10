from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ShakhesSerializer
from .models import Shakhes

# Create your views here.

class ShakhesView(generics.ListAPIView):
    queryset = Shakhes.objects.all()
    serializer_class = ShakhesSerializer