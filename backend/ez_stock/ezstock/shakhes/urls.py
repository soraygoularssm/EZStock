from django.urls import path
from .views import ShakhesView

urlpatterns = [
    path('shakhes/', ShakhesView.as_view())
]