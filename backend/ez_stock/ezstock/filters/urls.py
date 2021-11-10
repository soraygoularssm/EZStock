from django.urls import path
from .views import FiltersView , FilterView

urlpatterns = [
    path('filters/', FiltersView.as_view()),
    path('filter/<int:pk>', FilterView),
]