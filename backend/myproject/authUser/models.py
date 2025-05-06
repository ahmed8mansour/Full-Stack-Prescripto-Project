from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    
    def create_staff(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)  # بدون صلاحيات superuser
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('doctor', 'Doctor'),
        ('admin','Admin')
    )
    email = models.EmailField(unique=True )
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=255 )
    image = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email
    

class User(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    
    user = models.OneToOneField(CustomUser, null=True , blank=True ,on_delete=models.CASCADE, related_name='user_profile')

    phone = models.CharField(max_length=150 , default='059')
    address = models.CharField(max_length=150 , null=True , default='Gaza')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES , null=True ,  default='M')
    birthday = models.DateField(null=True, blank=True ,default='2000-1-1')

    def __str__(self):
        
        return self.user.email



class Doctor(models.Model):
    SPECIALITY_CHOICES = [
        ('1' , 'General physician'),
        ('2' , 'Gynecologist'),
        ('3' , 'Dermatologist'),
        ('4' , 'Pediatricians'),
        ('5' , 'Neurologist'),
        ('6' , 'Gastroenterologist')
    ]

    EXPERIENCES =[
        ('1' , '1 years'),
        ('2' , '2 years'),
        ('3' , '3 years'),
        ('4' , '4 years'),
        ('5' , '5 years'),
        ('6' , '6 years'),
        ('0' , 'More than 6 Years'),
    ]

    user = models.OneToOneField(CustomUser, null=True , blank=True , on_delete=models.CASCADE, related_name='doctor_profile')

    specialty = models.CharField(max_length=100 , blank=True , choices=SPECIALITY_CHOICES)
    address = models.CharField(max_length=150 , null=True  , default='Gaza')
    degree = models.CharField(max_length=150 , null=True , blank=True)
    about = models.TextField(blank=True , null=True)
    fees = models.IntegerField(blank=True , null=True)
    experiences = models.CharField(max_length=150, choices=EXPERIENCES , null=True , blank=True)
    available_days = models.CharField(max_length=200 , blank=True , null=True)  # مثال: "Monday,Wednesday,Friday"
    
    
    def __str__(self):
        return f'Dr. {self.user.email}'



class Appointment(models.Model):
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='doctor_appointments'   ,limit_choices_to={'role': 'doctor'})
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_appointments'  , limit_choices_to={'role': 'user'})
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True , null= True)
    completion_status = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        from datetime import timedelta

        # تحديد نهاية الموعد
        self.end_time = self.start_time + timedelta(hours=1, minutes=30)

        # التحقق من التعارض مع مواعيد سابقة
        overlapping = Appointment.objects.filter(
            doctor=self.doctor,
            start_time__lt=self.end_time,
            end_time__gt=self.start_time
        ).exclude(id=self.id)

        if overlapping.exists():
            raise ValidationError("هذا الموعد يتعارض مع موعد سابق للدكتور.")
        
        
        user_overlapping = Appointment.objects.filter(
            user=self.user,
            start_time__lt=self.end_time,
            end_time__gt=self.start_time
        ).exclude(id=self.id)

        if user_overlapping.exists():
            raise ValidationError("لديك موعد آخر في هذا الوقت، يرجى اختيار وقت مختلف.")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.doctor} with {self.user} at {self.start_time}"
