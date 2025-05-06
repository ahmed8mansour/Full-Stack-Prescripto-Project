import React from "react";
import { Outlet , useNavigate} from "react-router-dom";


// components
import SideBar from "./SideBar";
import DefaultDoctorDash from "./DefaultDoctorDash";
import DoctorAppointments from "./DoctorAppointments";
import DoctorProfile from "./DoctorProfile";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutDoctor , getDoctorProfile ,getAllDoctors, logoutAdmin, getAdminAppointments , getDoctorAppointments} from "../../store/authActions";
export default function DoctorDashboard() {
        const navigate = useNavigate()
        const dispatch = useDispatch()

        // ================================  
        const {pathname} = useLocation();
        const [page_type , setPageType] = React.useState({
            type : pathname.startsWith("/doctor_dashboard") ? 1 : 2
        });
        
        React.useEffect(() => {
            setPageType({ type: pathname.startsWith("/doctor_dashboard") ? 1 : 2 });
        }, [pathname]);
        
        // ================================  
        
        function handleLogout(){
            console.log("تيستتتت")
            console.log(page_type)
            if (page_type.type == 1){
                dispatch(logoutDoctor()).unwrap().then(() => {
                    console.log("تم اللوجاوت من فانكشن الكومبونانت");
                    navigate("/dashboard_doctor_login", { replace: true });
                        }) 
            }else if (page_type.type == 2){
                dispatch(logoutAdmin()).unwrap().then(() => {
                    console.log("تم اللوجاوت من فانكشن الكومبونانت");
                    navigate("/dashboard_admin_login", { replace: true });
            })


            }
        }


        React.useEffect(() => {
            if (page_type.type == 1){
                dispatch(getDoctorProfile())
                dispatch(getDoctorAppointments())
            }else if (page_type.type == 2){
                dispatch(getAllDoctors())
                dispatch(getAdminAppointments()).then(() => {
                    console.log("تم الحصول على المواعيد")
                })
            }
        },[dispatch])



        return (

            <div className="doctor_dashboard ">
                    <nav className="navbar navbar-expand-lg dash_navbar d-flex align-items-center justify-content-between  "> 
                    
                        <a className="navbar-brand landing_name" href="/">
                                <img src={"/images/Home/logo.png"} alt="logo" width="46" height="46" class="d-inline-block align-text-top"/>
                                <span>Prescripto</span>
                        </a>
                        <span>{page_type.type == 1 ? "Doctor" : "admin"}</span>

                        <a class="btn create_acc" onClick={handleLogout}>Logout </a>
                    </nav>

                        <div style={{ display: 'flex' }} className="dash_content">
                        <SideBar />
                        <div style={{ flex: 1, padding: '20px' ,overflow:"auto", paddingTop:"10px " , backgroundColor:"rgb(248, 249, 253)"}}>
                            <Outlet/>
                        </div>
                        </div>
            </div>
                
        );
};
