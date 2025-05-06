import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser , userLogin ,  getUserProfile ,updateUserProfile , logoutUser } from './authActions'
import { getAllDoctors , doctorLogin , logoutDoctor , getDoctorProfile , updateDoctorProfile} from './authActions'
import { getUserAppointments , Appointmentregister , deleteUserAppointment , updateAppointmentCompletion , deleteDashboardAppointment ,getDoctorAppointments , getDoctorAppointmentSlot } from './authActions'
import { adminLogin , logoutAdmin , getAdminAppointments,AdminRegisterDoctor, updateAdminAppointmentCompletion} from "./authActions";
import AdminAddDoctor from "../component/dashboard/AdminAddDoctor";

// ===============================
// ===============================
// ===============================
// ===============================
// ===============================
// ===============================
// ===============================
// ===============================
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null
const refreshToken = localStorage.getItem('userTokenRefresh') ? localStorage.getItem('userTokenRefresh') : null

const doctorToken = localStorage.getItem('docotorToken') ? localStorage.getItem('doctorToken') : null
const doctorrefreshToken = localStorage.getItem('doctorTokenRefresh') ? localStorage.getItem('doctorTokenRefresh') : null

const adminToken = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null
const adminrefreshToken = localStorage.getItem('adminTokenRefresh') ? localStorage.getItem('adminTokenRefresh') : null


const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken, // for storing the JWT
    refreshToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
    // ====================================
    // ====================================

    all_doctors_info :{},
    doctor_loading: false,
    doctor_error: null,
    doctor_success: false,

    doctorInfo :{},
    doctorToken ,
    doctorrefreshToken,
    // ====================================
    // ====================================
    appointments_info :{},
    appointments_loading: false,
    appointments_error: null,
    appointments_success: false,
    // ====================================
    // ====================================

    register_appointment_loading:false,
    register_appointment_error:null,
    register_appointment_success:false,

    // ====================================
    // ====================================

    delete_appointment_loading:false,
    delete_appointment_error:null,
    delete_appointment_success:false,

    // ====================
    doctor_slot: [],

    // =================================
    // =================================
    
    adminInfo :{},
    admin_loading: false,
    admin_error: null,
    admin_success: false,
    adminToken ,
    adminrefreshToken,

}


const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        //  لم تستخدم في الكود 

    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state ) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.userInfo = payload.user;
            state.userToken = payload.userToken;
            state.refreshToken = payload.userTokenRefresh;
            localStorage.removeItem("doctorToken");
            localStorage.removeItem("doctorTokenRefresh");
            localStorage.setItem("userToken", payload.userToken);
            localStorage.setItem("userTokenRefresh", payload.userTokenRefresh);
            console.log("Token:", payload.userToken);
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            console.log("في مشكلة يا راجل ");
        })
        // ========= login 
        .addCase(userLogin.pending , (state ) => {
            state.loading = true
            state.error = null
        })

        .addCase(userLogin.fulfilled , (state , {payload}) => {
            state.loading = false
            state.userToken = payload.userToken;
            state.refreshToken = payload.userTokenRefresh;
            localStorage.removeItem("doctorToken");
            localStorage.removeItem("doctorTokenRefresh");

            localStorage.setItem("userToken", payload.userToken);
            localStorage.setItem("userTokenRefresh", payload.userTokenRefresh);

        })
        .addCase(userLogin.rejected , (state , {payload}) => {
            state.loading = false
            state.error = payload
            console.log(payload)
        })
        // =====================get user profile
        .addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserProfile.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            console.log(payload)
            console.log("نجت يعم شوف البيانات ")
        })
        .addCase(getUserProfile.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            console.log("طيييييييييييييييط")
        })
        
        // ===================== update
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.success = true;
            console.log(state.userInfo)
            console.log("نريددد نعييييش يابه")
        })
        .addCase(updateUserProfile.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            console.log("طييييييييييييط التعديل ما زبط يا عم ")
            
        })
        
        // ==================== logout
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state, {payload}) => {
            state.userInfo = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userTokenRefresh");
            console.log(state.userInfo)
            console.log(state.userToken)
            console.log(state.refreshToken)
            console.log(payload)
            console.log("تم اللوجاوت يا معلمممم")
        })
        .addCase(logoutUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
            console.log(payload)
            console.log("انرفض يا جحش ")
        })


// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// ============================    Doctors    ============================
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================

        .addCase(getAllDoctors.pending, (state) => {
            state.doctor_loading = true;
        })
        .addCase(getAllDoctors.fulfilled, (state, { payload }) => {
            state.doctor_loading = false;
            state.all_doctors_info = payload;
            console.log(payload)
            console.log("بيانات كل الدكاترة وصلت")
        })
        .addCase(getAllDoctors.rejected, (state, { payload }) => {
            state.doctor_loading = false;
            state.doctor_error = payload;
            console.log("بيانات كل الدكاترة انرفضت ")
        })

        // doctor login
        .addCase(doctorLogin.pending , (state ) => {
            state.doctor_loading = true
            state.doctor_error = null
        })
        .addCase(doctorLogin.fulfilled , (state , {payload}) => {
            state.loading = false
            state.doctorToken = payload.doctorToken;
            state.doctorrefreshToken = payload.doctorTokenRefresh;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userTokenRefresh");

            localStorage.setItem("doctorToken", payload.doctorToken);
            localStorage.setItem("doctorTokenRefresh", payload.doctorTokenRefresh);
            console.log(" تم تسجيل دخول يا دكتور")
            console.log(state.doctorToken)
        })
        .addCase(doctorLogin.rejected , (state , {payload}) => {
            state.doctor_loading = false
            state.doctor_error = payload
            console.log(payload)
            console.log(state.doctor_error)
        })

        .addCase(logoutDoctor.pending, (state) => {
            state.doctor_loading = true;
        })
        .addCase(logoutDoctor.fulfilled, (state, {payload}) => {
            state.doctorInfo = null;
            state.doctor_error = null;
            state.doctor_loading = false;
            localStorage.removeItem("doctorToken");
            localStorage.removeItem("doctorTokenRefresh");
            console.log(state.doctorInfo)
            console.log(state.doctorToken)
            console.log(state.doctorrefreshToken)
            console.log(payload)
            console.log("تم اللوجاوت يا معلمممم")
        })
        .addCase(logoutDoctor.rejected, (state, {payload}) => {
            state.doctor_loading = false;
            state.doctor_error = payload;
            console.log(payload)
            console.log("انرفض يا جحش ")
        })


         // =====================get doctor profile
        .addCase(getDoctorProfile.pending, (state) => {
            state.doctor_loading = true;
        })
        .addCase(getDoctorProfile.fulfilled, (state, { payload }) => {
            state.doctor_loading = false;
            state.doctorInfo = payload;
            console.log(payload)
            console.log("نجت يعم شوف البيانات ")
        })
        .addCase(getDoctorProfile.rejected, (state, { payload }) => {
            state.doctor_loading = false;
            state.doctor_error = payload;
            console.log("طيييييييييييييييط")
        })

        // ====================update doctor profile
        .addCase(updateDoctorProfile.pending, (state) => {
            state.doctor_loading = true;
            state.doctor_error = null;
        })
        .addCase(updateDoctorProfile.fulfilled, (state, { payload }) => {
            state.doctor_loading = false;
            state.doctorInfo = payload;
            state.doctor_success = true;
            console.log(state.doctorInfo)
            console.log("نريددد نعييييش يابه")
        })
        .addCase(updateDoctorProfile.rejected, (state, { payload }) => {
            state.doctor_loading = false;
            state.doctor_error = payload;
            console.log("طييييييييييييط التعديل ما زبط يا عم ")
            
        })
        
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// ============================    appointments    =======================
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================


        .addCase(getUserAppointments.pending, (state) => {
            state.appointments_loading = true;
        })
        .addCase(getUserAppointments.fulfilled, (state, { payload }) => {
            state.appointments_loading = false;
            state.appointments_info = payload;
            console.log(payload)
            console.log(" بيانت المقابلات وصلت")
        })
        .addCase(getUserAppointments.rejected, (state, { payload }) => {
            state.appointments_loading = false;
            state.appointments_error = payload;
            console.log(payload)
            console.log("بيانات المقابلات انرفضت")
        })


        
        .addCase(Appointmentregister.pending, (state) => {
            state.register_appointment_loading = true;
        })
        .addCase(Appointmentregister.fulfilled, (state, { payload }) => {
            state.register_appointment_loading = false;
            state.register_appointment_success = true;
            console.log(payload)
            console.log(" تم تسجيل المقابلة ")
        })
        .addCase(Appointmentregister.rejected, (state, { payload }) => {
            state.register_appointment_loading = false;
            state.register_appointment_error = payload;
            console.log(payload)
            console.log("عملية تسجيل المقابلة انرفضت")
        })



        .addCase(deleteUserAppointment.pending, (state) => {
            state.delete_appointment_loading = true;
        })
        .addCase(deleteUserAppointment.fulfilled, (state, { payload }) => {
            state.delete_appointment_loading = false;
            state.delete_appointment_success = true;
            console.log(payload)
            console.log("تم حذف المقابلة")
        })
        .addCase(deleteUserAppointment.rejected, (state, { payload }) => {
            state.delete_appointment_loading = false;
            state.delete_appointment_error = payload;
            console.log(payload)
            console.log("عملية حذف المقابلة انرفضت")
        })


        .addCase(getDoctorAppointmentSlot.pending, (state) => {
            console.log("the doctor slot is pending")
        })
        .addCase(getDoctorAppointmentSlot.fulfilled, (state, { payload }) => {
            state.doctor_slot =payload ;
            console.log(payload)
            console.log(" هي السلوت وصلل يا وحش ")
        })
        .addCase(getDoctorAppointmentSlot.rejected, (state, { payload }) => {
            state.doctor_slot = null
            console.log("عملية السلوت فشلت")
        })

        // dashboard

        .addCase(getDoctorAppointments.pending, (state) => {
            state.appointments_loading = true;
        })
        .addCase(getDoctorAppointments.fulfilled, (state, { payload }) => {
            for(let i = 0; i < payload.length; i++) {
                const date = new Date(payload[i].start_time);
                const time = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                const day = date.toLocaleDateString("en-US", {  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
                payload[i].edited_start_time = day + " " + time;
            }

            state.appointments_loading = false;
            state.appointments_info = payload;
            console.log(payload)
            console.log(" بيانت المقابلات وصلت")
        })
        .addCase(getDoctorAppointments.rejected, (state, { payload }) => {
            state.appointments_loading = false;
            state.appointments_error = payload;
            console.log(payload)
            console.log("بيانات المقابلات انرفضت")
        })



        .addCase(deleteDashboardAppointment.pending, (state) => {
            state.delete_appointment_loading = true;
        })
        .addCase(deleteDashboardAppointment.fulfilled, (state, { payload }) => {
            state.delete_appointment_loading = false;
            state.delete_appointment_success = true;
            console.log(payload)
            console.log("تم حذف المقابلة")
        })
        .addCase(deleteDashboardAppointment.rejected, (state, { payload }) => {
            state.delete_appointment_loading = false;
            state.delete_appointment_error = payload;
            console.log(payload)
            console.log("عملية حذف المقابلة انرفضت")
        })

        .addCase(updateAppointmentCompletion.pending, (state) => {
            state.appointments_loading = true;
        })
        .addCase(updateAppointmentCompletion.fulfilled, (state, { payload }) => {
            for(let i = 0; i < payload.length; i++) {
                const date = new Date(payload[i].start_time);
                const time = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                const day = date.toLocaleDateString("en-US", {  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
                payload[i].edited_start_time = day + " " + time;
            }

            state.appointments_loading = false;
            state.appointments_info = payload;
            console.log(payload)
            console.log(" بيانت المقابلات وصلت")
        })
        .addCase(updateAppointmentCompletion.rejected, (state, { payload }) => {
            state.appointments_loading = false;
            state.appointments_error = payload;
            console.log(payload)
            console.log("بيانات المقابلات انرفضت")
        })

    
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// ============================    admin dashboard =======================
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================

        .addCase(adminLogin.pending , (state ) => {
            state.admin_loading = true
            state.admin_error = null
        })
        .addCase(adminLogin.fulfilled , (state , {payload}) => {
            state.admin_loading = false
            state.adminToken = payload.adminToken;
            state.adminrefreshToken = payload.adminTokenRefresh;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userTokenRefresh");
            localStorage.removeItem("doctorToken");
            localStorage.removeItem("doctorTokenRefresh");


            localStorage.setItem("adminToken", payload.adminToken);
            localStorage.setItem("adminTokenRefresh", payload.adminTokenRefresh);
            console.log(" تم تسجيل دخول ياادمين")
            console.log(state.adminToken)
        })
        .addCase(adminLogin.rejected , (state , {payload}) => {
            state.admin_loading = false
            state.admin_error = payload
            console.log(payload)
            console.log(state.admin_error)
        })
// =======================
        .addCase(logoutAdmin.pending, (state) => {
            state.admin_loading = true;
        })
        .addCase(logoutAdmin.fulfilled, (state, {payload}) => {
            state.adminInfo = null;
            state.admin_error = null;
            state.admin_loading = false;
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminTokenRefresh");
            console.log("تم اللوجاوت يا معلمممم")
        })
        .addCase(logoutAdmin.rejected, (state, {payload}) => {
            state.admin_loading = false;
            state.admin_error = payload;
            console.log(payload)
            console.log("انرفض يا جحش ")
        })


        .addCase(getAdminAppointments.pending, (state) => {
            state.appointments_loading = true;
        })
        .addCase(getAdminAppointments.fulfilled, (state, { payload }) => {
            for(let i = 0; i < payload.length; i++) {
                const date = new Date(payload[i].start_time);
                const time = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                const day = date.toLocaleDateString("en-US", {  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
                payload[i].edited_start_time = day + " " + time;
            }

            state.appointments_loading = false;
            state.appointments_info = payload;
            console.log(payload)
            console.log(" بيانت المقابلات وصلت")
        })
        .addCase(getAdminAppointments.rejected, (state, { payload }) => {
            state.appointments_loading = false;
            state.appointments_error = payload;
            console.log(payload)
            console.log("بيانات المقابلات انرفضت")
        })


        .addCase(updateAdminAppointmentCompletion.pending, (state) => {
            state.appointments_loading = true;
        })
        .addCase(updateAdminAppointmentCompletion.fulfilled, (state, { payload }) => {
            for(let i = 0; i < payload.length; i++) {
                const date = new Date(payload[i].start_time);
                const time = date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                const day = date.toLocaleDateString("en-US", {  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
                payload[i].edited_start_time = day + " " + time;
            }

            state.appointments_loading = false;
            state.appointments_info = payload;
            console.log(payload)
            console.log(" بيانت المقابلات وصلت")
        })
        .addCase(updateAdminAppointmentCompletion.rejected, (state, { payload }) => {
            state.appointments_loading = false;
            state.appointments_error = payload;
            console.log(payload)
            console.log("بيانات المقابلات انرفضت")
        })


        .addCase(AdminRegisterDoctor.pending, (state ) => {
            state.admin_loading = true;
            state.admin_error = null;
        })
        .addCase(AdminRegisterDoctor.fulfilled, (state, { payload }) => {
            state.admin_loading = false;
            state.admin_success = true;
            console.log(payload)
        })
        .addCase(AdminRegisterDoctor.rejected, (state, { payload }) => {
            state.admin_loading = false;
            state.admin_error = payload;
            console.log("في مشكلة يا راجل ");
        })
    
    },





});

export default authSlice.reducer;