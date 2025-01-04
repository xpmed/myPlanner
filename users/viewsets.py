from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework import status

class AccountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated:
            raise AuthenticationFailed("Authentication required.")
        
        serializer = UserSerializer(request.user)
        return Response(serializer.data)



    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

