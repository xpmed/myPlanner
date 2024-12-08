from rest_framework import viewsets
from .models import Reservation
from .serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAdminUser()]
        return [IsAuthenticated()]
