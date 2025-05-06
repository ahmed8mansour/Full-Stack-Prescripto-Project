import React from "react";

// component 
import About from "./component/About";
import Home from "./component/Home";
// import TopDoctors from "./component/TopDoctors";
// import Panel from "./component/Panel";
// import Footer from "./component/Footer";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUS";
import Doctors from "./component/Doctors";
import SpecificDoctor from "./component/SpecificDoctor";
import SingingPage from "./component/SingingPage";
import UserProfile from "./component/UserProfile";
import MyAppointments from "./component/MyAppointments";
import ProtectedRoute from "./component/ProtectedRoute";
import ReversedProtectedRoute from "./component/ReversedProtectedRoute";

import DoctorDashboard from "./component/dashboard/DoctorDashboard";
import DefaultDoctorDash from "./component/dashboard/DefaultDoctorDash";
import DoctorAppointments from "./component/dashboard/DoctorAppointments";
import DoctorProfile from "./component/dashboard/DoctorProfile";
import DashboardSinging from "./component/dashboard/DashboardSinging";
import AdminAddDoctor from "./component/dashboard/AdminAddDoctor";
import AadminDoctorList from "./component/dashboard/AdminDoctorList";

import {createBrowserRouter , RouterProvider} from "react-router-dom"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile , getAllDoctors , getUserAppointments} from "./store/authActions";

const router = createBrowserRouter([    

    {
        path: "/",
        element : <Home/>,
        errorElement : "ايرور",
    }
    ,
    {
        path: "/AboutUs",
        element : <AboutUs/>
    }
    ,
    {
        path: "/ContactUs",
        element : <ContactUs/>
    }
    ,
    {
        path: "/Doctors",
        element : <Doctors/>
    }
    ,
    {
        path: "/doctors/:id",
        element : <SpecificDoctor/>
    }
    ,
    {
        path: "/create_account",
        element :(
            <ReversedProtectedRoute>
                <SingingPage/>
            </ReversedProtectedRoute>    
        )
    }
    ,
    {
        path: "/sign_in",
        element : (
        <ReversedProtectedRoute>
            <SingingPage/>
        </ReversedProtectedRoute>    
    )
    }
    ,
    {
        path: "/my_profile",
        element : ( 
            <ProtectedRoute>
                <UserProfile/>
            </ProtectedRoute>  
        )
        // element : <UserProfile/>
        
    }
    ,
    {
        path: "/my_appointments",
        element :( 
            <ProtectedRoute>
                <MyAppointments/>
            </ProtectedRoute>
            
        )
    }
    ,
    {
        path: "/doctor_dashboard",
        element :( 
            <ProtectedRoute>
                <DoctorDashboard/>
            </ProtectedRoute>
        ) , 
        children:[ 
            { path: "", element: <DefaultDoctorDash /> }, 
            { path: "doctor-appointments", element: <DoctorAppointments /> },
            { path: "doctor-profile", element: <DoctorProfile /> },
        ],
    }
    ,
    {
        path: "/admin_dashboard",
        element :( 
            <ProtectedRoute>
                <DoctorDashboard/>
            </ProtectedRoute> 
        ) , 
        children:[ 
            { path: "", element: <DefaultDoctorDash /> }, 
            { path: "admin-appointments", element: <DoctorAppointments /> },
            { path: "admin-addDoctor", element:<AdminAddDoctor/> },
            { path: "admin-doctorList", element:<AadminDoctorList/> },
        ],
    }
    ,
    {
        path: "/dashboard_doctor_login",
        element :( 
            <ReversedProtectedRoute>
                <DashboardSinging/>
            </ReversedProtectedRoute>
        )
    }
    ,
    {
        path: "/dashboard_admin_login",
        element :( 
            <ReversedProtectedRoute>
                <DashboardSinging/>
            </ReversedProtectedRoute>
        )
    }


]);

export default function App(){

    const dispatch = useDispatch();
    const {userInfo , loading , all_doctors_info} = useSelector((state) => state.auth)
    
    const token = localStorage.getItem('userToken');
    useEffect(() => {
    dispatch(getAllDoctors());
    if (token ) {
        dispatch(getUserProfile());
    }
    
}, [dispatch, token ]);

    return(
        
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}