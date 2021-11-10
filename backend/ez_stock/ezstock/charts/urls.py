from django.urls import path
from .views import ChartsView , ChartView

urlpatterns = [
    path('charts/', ChartsView.as_view()),
    path('chart/<int:pk>', ChartView),
]