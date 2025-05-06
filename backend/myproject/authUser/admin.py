from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import CustomUser, User, Doctor , Appointment 
admin.site.register(CustomUser)
admin.site.register(User)
admin.site.register(Doctor)
admin.site.register(Appointment)
