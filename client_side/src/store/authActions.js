import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// تأكد إنك معرف backendURL مسبقًا
const backendURL = 'http://localhost:8000'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (requestBody, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } =await axios.post(`${backendURL}/api/user/register/`, requestBody, config);
      localStorage.setItem("userToken", data.tokens.access);
      localStorage.setItem("userTokenRefresh", data.tokens.refresh);

      return {
        user: data.user,
        userToken: data.tokens.access,
        userTokenRefresh: data.tokens.refresh
      };

    
    }
    catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:8000/api/user/user-profile/', config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`${backendURL}/api/user/update/`, updatedData, config);

      // يمكنك أيضًا تحديث localStorage لو البيانات رجعت فيها تغييرات مهمة
      // localStorage.setItem("userInfo", JSON.stringify(data));

      return data;

    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("userTokenRefresh");

      if (!refreshToken) throw new Error("No refresh token found");
      await axios.post(
        `${backendURL}/api/user/logout/`,
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        }
      );

      // حذف التوكنات من التخزين المحلي
      localStorage.removeItem("userToken");
      localStorage.removeItem("userTokenRefresh");

      return "تم اللوجاوت وهذي الرسالة من الاكشن";
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      
      const { data } = await axios.post(
        `${backendURL}/api/user/login/`,
        { email, password },
        config
      )

      return {
        userToken: data.access,
        userTokenRefresh: data.refresh
      };
    } catch (error) {

      // return custom error message from API if any
      if (error.response && error.response.data.non_field_errors
      ) {
        return rejectWithValue(error.response.data.non_field_errors
        )
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


// ============================================
// ============================================
// ============================================
// doctors
export const getAllDoctors = createAsyncThunk(
  'auth/getAllDoctors',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/api/doctor/all-doctors/');

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const doctorLogin = createAsyncThunk(
  'auth/doctorLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      
      const { data } = await axios.post(
        `${backendURL}/api/doctor/login/`,
        { email, password },
        config
      )
      // store user's token in local storage
      return {
        doctorToken: data.access,
        doctorTokenRefresh: data.refresh
      };
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.non_field_errors) {
        return rejectWithValue(error.response.data.non_field_errors)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const logoutDoctor = createAsyncThunk(
  "auth/logoutDoctor",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("doctorToken");
      const refreshToken = localStorage.getItem("doctorTokenRefresh");

      if (!refreshToken) throw new Error("No refresh token found");
      await axios.post(
        `${backendURL}/api/doctor/logout/`,
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        }
      );

      // حذف التوكنات من التخزين المحلي
      localStorage.removeItem("doctorToken");
      localStorage.removeItem("doctorTokenRefresh");

      return "تم اللوجاوت وهذي الرسالة من الاكشن";
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDoctorProfile = createAsyncThunk(
  'auth/getDoctorProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('doctorToken');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:8000/api/doctor/user-profile/', config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  'auth/updateDoctorProfile',
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const token = window.localStorage.getItem('doctorToken');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`${backendURL}/api/doctor/update/`, updatedData, config);

      return data;

    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

// ============================================
// ============================================
// ============================================
// appointments 

export const getUserAppointments = createAsyncThunk(
  'auth/getUserAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:8000/api/appointments/user/get', config);
      return data;
      }
  catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


export const Appointmentregister = createAsyncThunk(
  'auth/Appointmentregister',
  async (requestBody, {getState ,rejectWithValue }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } =await axios.post('http://127.0.0.1:8000/api/appointments/create/', requestBody, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const deleteUserAppointment = createAsyncThunk(
  'auth/deleteUserAppointment',
  async (requestBody, {getState ,rejectWithValue }) => {
    try {
      const token = getState().auth.userToken
      console.log(requestBody)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: requestBody
      }
      // console.log(config.headers.Authorization)
      const { data } = await axios.delete(`http://127.0.0.1:8000/api/appointments/user/delete`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getDoctorAppointmentSlot = createAsyncThunk(
  'auth/getDoctorAppointmentSlot', 
  async (requestBody, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.userToken
      console.log(requestBody)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post('http://127.0.0.1:8000/api/appointments/slot', requestBody , config);
      return data;
      }
  catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }

)

//appointments dashboard 

export const getDoctorAppointments = createAsyncThunk(
  'auth/getDoctorAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('doctorToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:8000/api/appointments/doctor/get', config);
      return data;
      }
  catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

// for admin and doctor

export const deleteDashboardAppointment = createAsyncThunk(
  'auth/deleteDashboardAppointment',
  async (requestBody, {getState ,rejectWithValue }) => {
    try {
      var token = null
      var endpoint = null
      if (window.localStorage.getItem("adminToken")) {
        token = window.localStorage.getItem("adminToken")
        endpoint = 'http://127.0.0.1:8000/api/appointments/admin/delete'
      }else if (window.localStorage.getItem("doctorToken")) {
        token = window.localStorage.getItem("doctorToken")
        endpoint = 'http://127.0.0.1:8000/api/appointments/doctor/delete'
      }
      console.log(endpoint)
      console.log(token)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: requestBody
      }
      const { data } = await axios.delete(endpoint, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }


)

//  only for doctors
export const updateAppointmentCompletion = createAsyncThunk(
  'auth/updateAppointmentCompletion',
  async (requestBody, {getState ,rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("doctorToken")
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } =await axios.put('http://127.0.0.1:8000/api/appointments/doctor/update', requestBody, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


// ============================================
// ============================================
// ============================================
// admin dashboard

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      
      const { data } = await axios.post(
        `${backendURL}/api/admin/login/`,
        { email, password },
        config
      )
      // store user's token in local storage
      return {
        adminToken: data.access,
        adminTokenRefresh: data.refresh
      };
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.non_field_errors) {
        return rejectWithValue(error.response.data.non_field_errors)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("adminToken");
      const refreshToken = localStorage.getItem("adminTokenRefresh");

      if (!refreshToken) throw new Error("No refresh token found");
      await axios.post(
        `${backendURL}/api/admin/logout/`,
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        }
      );

      return "تم اللوجاوت وهذي الرسالة من الاكشن";
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminAppointments = createAsyncThunk(
  'auth/getAdminAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('adminToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://127.0.0.1:8000/api/admin/allAppointments/', config);
      return data;
      }
  catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateAdminAppointmentCompletion = createAsyncThunk(
  'auth/updateAdminAppointmentCompletion',
  async (requestBody, {getState ,rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("adminToken")
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } =await axios.put('http://127.0.0.1:8000/api/appointments/admin/update', requestBody, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const AdminRegisterDoctor = createAsyncThunk(
  'auth/AdminRegisterDoctor',
  async (requestBody, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } =await axios.post(`${backendURL}/api/doctor/register/`, requestBody, config);
      // return {
      //   user: data.user,
      //   message : data.message

      // };

      return data

    
    }
    catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);