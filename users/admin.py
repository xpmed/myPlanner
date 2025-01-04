from django.contrib import admin
from .models import CustomUser
# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    pass

# Register the admin class with the associated model
admin.site.register(CustomUser, CustomUserAdmin)