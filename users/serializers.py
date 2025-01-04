from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'address', 'postal_code', 'city', 'subscribe_newsletter', 'age', 'gender']
