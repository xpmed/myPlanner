from rest_framework.routers import DefaultRouter
from .viewsets import ReservationViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]