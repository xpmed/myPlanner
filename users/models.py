from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    address = models.TextField(blank=True, null=True)
    postal_code = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    subscribe_newsletter = models.BooleanField(default=False)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], blank=True, null=True)
