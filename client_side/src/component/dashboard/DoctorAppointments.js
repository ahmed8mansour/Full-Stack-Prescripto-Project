import React from "react";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteDashboardAppointment , getAdminAppointments ,getDoctorAppointments ,updateAdminAppointmentCompletion,  updateAppointmentCompletion } from "../../store/authActions";
import Toast from "../Toast";
export default function DoctorAppointments() {
        const dispatch = useDispatch()
        const {appointments_info , appointments_loading} = useSelector((state) => state.auth)

        const [latest_appointments, setLatestAppointments] = React.useState(null);

        const {pathname} = useLocation();
        const [page_type , setPageType] = React.useState({
            type : pathname.startsWith("/doctor_dashboard") ? 1 : 2
        });
        
        React.useEffect(() => {
            setPageType({ type: pathname.startsWith("/doctor_dashboard") ? 1 : 2 });
        }, [pathname]);
                


        const [showToast, setShowToast] = React.useState({
                show: false,
                message: "",
            }
        );
                function handleComplete(requestBody){
                    if(page_type.type === 1){
                        console.log(requestBody)
                        dispatch(updateAppointmentCompletion(requestBody)).unwrap().then(() => {
                            dispatch(getDoctorAppointments())            
                        }).then(() => {
                            setShowToast({show: true, message: "Appointment has been completed successfully"})
                        })
                    }
                    else if(page_type.type === 2){
                        console.log(requestBody)
                        dispatch(updateAdminAppointmentCompletion(requestBody)).unwrap().then(() => {
                            dispatch(getAdminAppointments())            
                        }).then(() => {
                            setShowToast({show: true, message: "Appointment has been completed successfully"})
                        })
            
                    }
            
                }
            function handleCancel(requestBody){
                        if(page_type.type === 1){
                            console.log(requestBody)
                            dispatch(deleteDashboardAppointment(requestBody)).unwrap().then(() => {
                                dispatch(getDoctorAppointments())            
                            }).then(() => {
                                setShowToast({show: true, message: "Appointment has been canceled successfully"})
                            })
                        }
                        else if(page_type.type === 2){
                            console.log(requestBody)
                            dispatch(deleteDashboardAppointment(requestBody)).unwrap().then(() => {
                                dispatch(getAdminAppointments())            
                            }).then(() => {
                                setShowToast({show: true, message: "Appointment has been canceled successfully"})
                            })
                        }
            }

        React.useEffect(() => {
            if(appointments_info.length > 0){

    
            const latest_appointments = [...appointments_info].sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
            .map((appointment, index) => {
                if(page_type.type == 1){
                    return(
                    <tr>
                                <th scope="row">{index +1}</th>
                                <td className="d-flex image_td">
                                    <img src={appointment.user.image} />
                                    <span>Mr.{appointment.user.username}</span>
                                </td>
                                <td>offline</td>
                                <td>{appointment.user.birthday}</td>
                                <td>{appointment.edited_start_time}</td>
    
                                <td>{appointment.doctor.fees}$</td>
                                <td>
                                <div className="handle_td">
                                {appointment.completion_status 
                                    ?
                                    <h6 className="completed_text">Completed</h6> 
                                    :
                                    <>
                                    
                                    <button className="cancel_table" onClick={() => handleCancel({start_time: appointment.start_time ,doctor: appointment.doctor.email})} ><i class="fa-solid fa-xmark"></i></button>
                                    <button className="accept_table" onClick={() => {
                                        if (page_type.type == 1){
                                            handleComplete({start_time: appointment.start_time ,completion_status:true})
                                        }else if(page_type.type == 2){
                                            
                                            handleComplete({id: appointment.id ,completion_status:true})
                                            
                                        }
                                        }
                                        
                                        } ><i class="fa-solid fa-check"></i></button>
                                    
                                    </>
                                    }
                                    {/* <h6 className="cancelled_text">Cancelled</h6> */}
                                </div>
                                </td>
                    </tr>
                )
                }else if (page_type.type == 2){

                    const specialties = {
                        1: "General physician",
                        2: "Gynecologist",
                        3: "Dermatologist",
                        4: "Pediatricians",
                        5: "Neurologist",
                        6: "Gastroenterologist"
                    };
                    var doctor_speciality = specialties[appointment.doctor.specialty] || "Unknown specialty";
                    
                    return(
            <tr>
                <th scope="row">{index + 1}</th>
                <td className="d-flex image_td">
                    <img src={appointment.user.image} />
                    <span>{appointment.user.username}</span>
                </td>
                <td>{doctor_speciality}</td>
                <td>{appointment.user.birthday}</td>
                <td>{appointment.edited_start_time}</td>
                <td className="d-flex image_td">
                    <img src={appointment.doctor.image} />
                    <span>DR. {appointment.doctor.username}</span>
                </td>

                <td>{appointment.doctor.fees}$</td>
                <td>
                <div className="handle_td">
                                {appointment.completion_status 
                                    ?
                                    <h6 className="completed_text">Completed</h6> 
                                    :
                                    <>
                                    
                                    <button className="cancel_table" onClick={() => handleCancel({start_time: appointment.start_time ,doctor: appointment.doctor.email})} ><i class="fa-solid fa-xmark"></i></button>
                                    <button className="accept_table" onClick={() => {
                                        if (page_type.type == 1){
                                            handleComplete({start_time: appointment.start_time ,completion_status:true})
                                        }else if(page_type.type == 2){
                                            
                                            handleComplete({id: appointment.id ,completion_status:true})
                                            
                                        }
                                        }
                                        
                                        } ><i class="fa-solid fa-check"></i></button>
                                    
                                    </>
                                    }
                                    {/* <h6 className="cancelled_text">Cancelled</h6> */}
                </div>
                </td>
            </tr>
                    )
                }
        })
                
            setLatestAppointments(latest_appointments);
            }   
    
    
        }, [dispatch, appointments_info])
    
    return (
        <div className="doctor_appontments">
            <Toast show={showToast.show} message={showToast.message} onClose={() => setShowToast(false)} />
            
            <div className="doctor_appontments_content">
                <h4> All Appointments</h4>
                <div className="table-responsive">
            {
                page_type.type === 1 ?
            <table class="table " >
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Patient</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Age</th>     
                    <th scope="col">Date & Time</th>
                    <th scope="col">Fees</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                {latest_appointments}
                        
                </tbody>
            </table> :

<table class="table admin_table " >
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Patient</th>
        <th scope="col">Department</th>
        <th scope="col">Age</th>     
        <th scope="col">Date & Time</th>
        <th scope="col">Doctor</th>
        <th scope="col">Fees</th>
        <th scope="col">Handle</th>
    </tr>
    </thead>
    <tbody>
            {latest_appointments}

    </tbody>
</table>
            }
                </div>
            </div>
        </div>
    );
}



// table for admin



