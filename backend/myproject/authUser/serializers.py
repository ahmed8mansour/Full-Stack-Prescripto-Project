from rest_framework import serializers
from .models import User ,Doctor , CustomUser , Appointment 
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.forms.models import model_to_dict


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password', 'groups', 'user_permissions']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    



# -----  user-profile /
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password', 'groups', 'user_permissions']
    
    def get_profile(self, instance):
        if instance.role == 'user':
            return getattr(instance, 'user_profile', None)
        elif instance.role == 'doctor':
            return getattr(instance, 'doctor_profile', None)
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        profile = self.get_profile(instance)
        if profile:
            if instance.role == 'user':
                profile_data = UserProfileSerializer(profile).data
            else:
                profile_data = DoctorSerializer(profile).data
            
            data.update(profile_data)
        
        return data
    
# ----- update /
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'role': {'read_only': True},
            'is_active': {'read_only': True},
            'is_staff': {'read_only': True},
            'groups': {'read_only': True},
            'user_permissions': {'read_only': True}
        }

    def update(self, instance, validated_data):

        # معالجة كلمة المرور
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        
        # تحديث حقول CustomUser العادية
        for attr, value in validated_data.items():
            print( attr, value )
            setattr(instance, attr, value)
        
        instance.save()
        
        print("here what you neeedd : -------------")
# -------------------------------------------------------
# -------------------------------------------------------
# -------------------------------------------------------


        profile_data_updated = dict(self.initial_data) 
        profile_data_updated.pop('password' , None)

        if instance.role == 'user':
            profile = instance.user_profile 

        else:
            profile = instance.doctor_profile 


        print(profile_data_updated)
        print(model_to_dict(profile))


        for key in validated_data.keys():
            profile_data_updated.pop(key, None)

        

        print(profile_data_updated)
        print(model_to_dict(profile))

        for key, value in profile_data_updated.items():
            if isinstance(value, list):
                value = value[0]  # خذ أول عنصر من القائمة
            setattr(profile, key, value)

        profile.save()
    
        return instance
    def to_representation(self, instance):

        user_data = super().to_representation(instance)
        if instance.role == 'user':
            profile = instance.user_profile
        else:
            profile = instance.doctor_profile

        user_data.update(model_to_dict(profile))
        user_data.pop('id', None)
        user_data.pop('user', None)
        return user_data
# ----- register /
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'is_active': {'read_only': True},
            'groups': {'read_only': True},
            'user_permissions': {'read_only': True}
            }

    def create(self, validated_data):
        profile_data_all = dict(self.initial_data) 
        profile_data_all.pop('password' , None)
        request_path = self.context.get('request').path
        
        print(profile_data_all)
        print(validated_data)

        # إنشاء بروفايل حسب الدور
        
        if request_path == '/api/user/register/':
            validated_data['role'] = 'user'
        else:
            validated_data['role'] = 'doctor'


        user = CustomUser.objects.create_user(**validated_data)


        for key in validated_data.keys():
            profile_data_all.pop(key, None)

        for key , value in profile_data_all.items():
            if isinstance(value, list):
                value = value[0]
            profile_data_all[key] = value
            
            
        print( profile_data_all)
        profile_data_all.pop('image' , None)
        # إنشاء البروفايل المناسب
        if validated_data['role'] == 'user':
            User.objects.create(user=user, **profile_data_all)
        else:
            Doctor.objects.create(user=user, **profile_data_all)

# =====================================================
# =====================================================
# =====================================================
# =====================================================


        refresh = RefreshToken.for_user(user)

        user_data = CustomUserSerializer(user).data 



        if validated_data['role'] == 'user':
            if hasattr(user, 'user_profile'):
                user_data.update(UserProfileSerializer(user.user_profile).data)
        else:
            if hasattr(user, 'doctor_profile'):
                user_data.update(DoctorSerializer(user.doctor_profile).data)

        
        print(user_data)

        return {
            'message': 'تم التسجيل بنجاح',
            'user': user_data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
        }

# class RegisterSerializer(serializers.ModelSerializer):


#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = '__all__'

#     def create(self, validated_data):
#         password = validated_data.pop('password')

#         # استخراج الحقول ManyToMany مثل groups (إذا بتستخدمها)
#         groups = validated_data.pop('groups', [])  # لو كنت عامل تخصيص
#         user_permissions = validated_data.pop('user_permissions', [])  # لو موجودة

#         # إنشاء المستخدم بدون الحقول ManyToMany
#         user = User(**validated_data)
#         user.set_password(password)
#         user.save()

#         # الآن أربط علاقات many-to-many
#         user.groups.set(groups)
#         user.user_permissions.set(user_permissions)

#         return user
    
#  بدي اعمل سيريلايزر اخليه يعمل لوجين بالايميل والباسورد يعني بدي اعمل اوفررايد على الفيو الجاهزة 

# ----- login / 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)

            if not user:
                raise serializers.ValidationError("Invalid email or password")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'")

        data = super().validate({
            'email': user.email,  # هيك بيتماشى مع SimpleJWT بدون إقحام اليوزرنيم الحقيقي
            'password': password
        })
        request_path = self.context.get('request').path
        print(request_path)
        if request_path == '/api/user/login/':
            if user.role == 'user':
                return data
            else: 
                raise serializers.ValidationError("Only the user can login here")
        elif request_path == '/api/doctor/login/':
            if user.role == 'doctor':
                return data
            else: 
                raise serializers.ValidationError("Only the doctors can login here")
        elif request_path == '/api/admin/login/':
            if user.role == 'admin':
                return data
            else: 
                raise serializers.ValidationError("Only the admin can login here")

    

# =====================================
# =====================================
# =====================================
# =====================================

# user

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.SlugRelatedField(
        slug_field='email',
        queryset=CustomUser.objects.filter(role='doctor')
    )
    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset=CustomUser.objects.filter(role='user')
    )


    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        request = self.context['request']
        user = request.user  # المستخدم الحالي
        validated_data['user'] = user

        print(user)


        return super().create(validated_data)
    

class AllDoctorSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    # print(user)
    class Meta:
        model = Doctor
        fields = '__all__'

class DoctorDailySlotSerializer(serializers.ModelSerializer):
    available_hours = serializers.ReadOnlyField()
    class Meta:
        model = Appointment
        fields = '__all__'



# doctors

class doctorAppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
    def to_representation(self, instance):
        request = self.context.get('request')  # الحصول على كائن الطلب
        Appointment_data = super().to_representation(instance)
        Appointment_data['user'] = UserSerializer(instance.user, context=self.context).data
        Appointment_data['doctor'] = UserSerializer(instance.doctor, context=self.context).data

        # بناء URL كامل للصورة
        if Appointment_data['user']['image']:
            Appointment_data['user']['image'] = request.build_absolute_uri(Appointment_data['user']['image'])

        return Appointment_data

class doctorUpdateAppointmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Appointment
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False},
            'doctor': {'required': False},
            'end_time': {'required': False},
            'start_time': {'required': False},
        }

    def to_representation(self, instance):
        Appointments_data_updated = super().to_representation(instance)
        Appointments_data_updated['user'] = UserSerializer(instance.user, context=self.context).data
        Appointments_data_updated['doctor'] = UserSerializer(instance.doctor, context=self.context).data
        return Appointments_data_updated


# ===========================================
# ===========================================
# ===========================================
# admin dashboard

class adminAppointemntsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
    def to_representation(self, instance):
        request = self.context.get('request')  # الحصول على كائن الطلب
        print(request)
        Appointment_data = super().to_representation(instance)
        Appointment_data['user'] = UserSerializer(instance.user, context=self.context).data
        Appointment_data['doctor'] = UserSerializer(instance.doctor, context=self.context).data
        print(Appointment_data)
        # بناء URL كامل للصورة
        if Appointment_data['user']['image']:
            Appointment_data['user']['image'] = request.build_absolute_uri(Appointment_data['user']['image'])

        return Appointment_data