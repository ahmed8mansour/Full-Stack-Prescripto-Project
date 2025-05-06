from django.shortcuts import render
from rest_framework import mixins, permissions , generics
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import CustomUser , Appointment , Doctor 

from rest_framework.views import APIView
from rest_framework import status
from .serializers import RegisterSerializer , DoctorDailySlotSerializer ,doctorUpdateAppointmentSerializer, UserUpdateSerializer , UserSerializer , AppointmentSerializer

from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import MyTokenObtainPairSerializer , DoctorSerializer,adminAppointemntsSerializer , doctorAppointmentsSerializer, AllDoctorSerializer
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser

from datetime import timedelta

# Create your views here.
    

# ==============================================
# ==============================================
# ==============================================



# class RegisterView(generics.GenericAPIView, 
#                    mixins.CreateModelMixin,
#                    mixins.ListModelMixin,
#                    mixins.DestroyModelMixin,
#                    mixins.RetrieveModelMixin,
#                    mixins.UpdateModelMixin):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()

#             # توليد التوكن بعد التسجيل
#             refresh = RefreshToken.for_user(user)
#             tokens = {
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }

#             return Response({
#                 "message": "تم التسجيل بنجاح",
#                 "user": self.get_serializer(user).data,
#                 "tokens": tokens
#             }, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response(serializer.save(), status=201)
        return Response(serializer.errors, status=400)
    
class DoctorRegisterView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response(serializer.save(), status=201)
        return Response(serializer.errors, status=400)

class UserProfileView(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class UserProfileUpdateView(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = UserUpdateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

# هان بعمل اوفرايد على الفانكشن الاصلية الجاهزة من الريست فريمورك هان بخليه يقبل الايميل والياسورد بدال اليوزر والباسورد


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # ✨ هنا بنعمل بلاك ليست للتوكن
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class CreateAppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]


class AppointmentsView(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        doctor_email = request.data.get('doctor')
        start_time = request.data.get('start_time')
        if not doctor_email or not start_time:
            return Response(
                {"detail": "يرجى إرسال doctor_email و start_time."},
                status=status.HTTP_400_BAD_REQUEST
            )
        print(request.user)
        try:
            from django.utils.dateparse import parse_datetime
            start_time_parsed = parse_datetime(start_time)
            appointment = Appointment.objects.get(
                doctor__email=doctor_email,
                start_time=start_time_parsed
            )
            print(appointment)
            appointment.delete()
            return Response({"detail": "تم حذف الموعد بنجاح."}, status=status.HTTP_200_OK)

        except Appointment.DoesNotExist:
            return Response({"detail": "لم يتم العثور على الموعد."}, status=status.HTTP_404_NOT_FOUND)


class doctorAppointmentView(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    serializer_class = doctorAppointmentsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        return Appointment.objects.filter(doctor=self.request.user)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class doctorUpdateAppointmentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        serializer = doctorUpdateAppointmentSerializer(
            data=request.data,
            context={'request': request}
        )
        if not serializer.is_valid():
            print(serializer.error_messages)

        if serializer.is_valid():
            print(request.user.id)
            print(serializer.validated_data['start_time'])
            try:
                selected_appointment = Appointment.objects.get(
                    doctor=request.user.id, 
                    start_time=serializer.validated_data['start_time']
                )
                print("Appointment found:", selected_appointment)
                selected_appointment.completion_status = serializer.validated_data['completion_status']
                selected_appointment.save()

                appointments = Appointment.objects.filter(doctor=request.user)
                serializer = doctorUpdateAppointmentSerializer(appointments, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except Appointment.DoesNotExist:
                return Response(
                {"error": "Appointment not found or not owned by this doctor"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        
    
# =========================================
# =========================================
# =========================================

class AllDoctorsView(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    queryset = Doctor.objects.all()
    serializer_class = AllDoctorSerializer
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class UnAuthDoctor(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    queryset = Doctor.objects.all()
    serializer_class = AllDoctorSerializer
    
    def get_object(self):
        email = self.request.data.get('email')
        return get_object_or_404(Doctor, user__email=email)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    



class DoctorSlot(generics.CreateAPIView  , mixins.ListModelMixin , mixins.UpdateModelMixin , mixins.DestroyModelMixin , mixins.RetrieveModelMixin):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        doctor_email = request.data.get('doctor')
        date = request.data.get('date')

        print (doctor_email , date)

        base_slots = [
            '00:00:00 - 01:30:00', '01:30:00 - 03:00:00',
            '03:00:00 - 04:30:00', '04:30:00 - 06:00:00',
            '06:00:00 - 07:30:00', '07:30:00 - 09:00:00',
            '09:00:00 - 10:30:00', '10:30:00 - 12:00:00',
            '12:00:00 - 13:30:00', '13:30:00 - 15:00:00',
            '15:00:00 - 16:30:00', '16:30:00 - 18:00:00',
            '18:00:00 - 19:30:00', '19:30:00 - 21:00:00',
            '21:00:00 - 22:30:00', '22:30:00 - 00:00:00',
        ]

        # appointments for doctor in that day 
        all_doctor_appointments = Appointment.objects.filter(doctor__email=doctor_email).filter(start_time__date=date)

        for element in all_doctor_appointments:
            start = element.start_time
            end = element.start_time + timedelta(hours=1, minutes=30)
            base_slots.remove(f"{start.time()} - {end.time()}")

        if all_doctor_appointments:
            return Response(base_slots)
        else:
            return Response({"detail": "there is no appointments"}, status=status.HTTP_400_BAD_REQUEST)



# =====================================
# =====================================
# =====================================
# =====================================

# admin dashboard

class adminAppointmentsView(generics.GenericAPIView , mixins.CreateModelMixin,mixins.ListModelMixin,mixins.DestroyModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin):
    queryset = Appointment.objects.all()
    serializer_class = adminAppointemntsSerializer
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    


class adminUpdateAppointment(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]
    
    def put(self, request, *args, **kwargs):
        appointment_id = request.data.get("id")

        if not appointment_id:
            return Response({"error": "appointment_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = doctorUpdateAppointmentSerializer(
            appointment,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            all_appointments = Appointment.objects.all()
            return_serializer = adminAppointemntsSerializer(all_appointments , context={'request': request}, many=True)
            print(return_serializer.data)
            return Response(return_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    