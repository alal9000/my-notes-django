from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getRoutes, name="notes"),
    path('notes/<str:pk>', views.getNote, name="note"),
]