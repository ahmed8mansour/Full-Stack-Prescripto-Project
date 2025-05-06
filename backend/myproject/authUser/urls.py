from django.urls import path
# from .views import UserMixinsAPIView 
from .views import UserRegisterView , UserProfileView , UserProfileUpdateView , LogoutView ,MyTokenObtainPairView
from .views import CreateAppointmentView , DoctorRegisterView ,doctorUpdateAppointmentView , adminUpdateAppointment, adminAppointmentsView , AppointmentsView , doctorAppointmentView , AllDoctorsView , UnAuthDoctor , DoctorSlot
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('user/register/', UserRegisterView.as_view(), name='register'),
    path('user/update/', UserProfileUpdateView.as_view() , name='update'),
    path('user/user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/logout/', LogoutView.as_view(), name='logout'),

    path('doctor/register/', DoctorRegisterView.as_view(), name='register'),
    path('doctor/update/', UserProfileUpdateView.as_view() , name='update'),
    path('doctor/user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('doctor/logout/', LogoutView.as_view(), name='logout'),
    
    path('doctor/all-doctors/', AllDoctorsView.as_view(), name='all-docotrs'),
    path('doctor/unauth-doctor/', UnAuthDoctor.as_view(), name='unauth-doctor'),
    


    # the orginal 
    # path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # after the edition
    path('user/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('doctor/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admin/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),



# ===========================================================
# ===========================================================
# ===========================================================

    path('appointments/create/', CreateAppointmentView.as_view(), name='create-appointment'),
    path('appointments/user/get', AppointmentsView.as_view(), name='get-appointment'),
    path('appointments/user/delete', AppointmentsView.as_view(), name='delete-appointment'),
    path('appointments/slot', DoctorSlot.as_view(), name='slot-appointment'),

    path('appointments/doctor/get', doctorAppointmentView.as_view(), name='get-doctor-appointment'),
    path('appointments/doctor/delete', AppointmentsView.as_view(), name='delete-doctor-appointment'),
    path('appointments/doctor/update', doctorUpdateAppointmentView.as_view(), name='get-doctor-appointment'),


    # admin dashboard
    path('admin/logout/', LogoutView.as_view(), name='logout'),
    path('admin/allAppointments/', adminAppointmentsView.as_view(), name='user-profile'),
    path('appointments/admin/delete', AppointmentsView.as_view(), name='delete-admin-appointment'),
    path('appointments/admin/update', adminUpdateAppointment.as_view(), name='get-admin-appointment'),

]

