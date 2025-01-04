from django.db import models
from django.contrib.auth.models import User
from users.models import CustomUser

class Reservation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    details = models.TextField(blank=True)
