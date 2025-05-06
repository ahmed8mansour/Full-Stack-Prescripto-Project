import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteDashboardAppointment , updateAdminAppointmentCompletion,getAdminAppointments, getDoctorAppointments , updateAppointmentCompletion} from "../../store/authActions";
import Toast from "../Toast";

export default function DefaultDoctorDash() {
    const dispatch = useDispatch()
    const {appointments_info , appointments_loading, all_doctors_info} = useSelector((state) => state.auth)
        const {pathname} = useLocation();
        const [page_type , setPageType] = React.useState({
            type : pathname.startsWith("/doctor_dashboard") ? 1 : 2
        });
        
        React.useEffect(() => {
            setPageType({ type: pathname.startsWith("/doctor_dashboard") ? 1 : 2 });
        }, [pathname]);
        
    const [pateints_number, setPateintsNumber] = React.useState(0);
    const [Earnings, setEarnings] = React.useState(0);
    const [latest_appointments, setLatestAppointments] = React.useState(null);
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
        setPateintsNumber(0);
        setEarnings(0);
        setLatestAppointments(null);
        let pateintsCount = 0;
        if(appointments_info.length > 0){
            
            let emails = [];
            let totalEarnings = 0;
            for(let i = 0 ; i < appointments_info.length ; i++){
                if(!emails.includes(appointments_info[i].user.email)){
                    pateintsCount++;
                    setPateintsNumber(pateintsCount);
                }
                emails.push(appointments_info[i].user.email)

                if(appointments_info[i].completion_status === true){
                    totalEarnings += appointments_info[i].doctor.fees;
                }
                setEarnings(totalEarnings);
            
            }
;

        var latest_appointments = [...appointments_info].sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
        .slice(0, 5)
        .map((appointment) => (
        <div className="table_cell d-flex align-items-center justify-content-between" style={{flexWrap: "wrap"}} key={appointment._id}>
                            <div className="cell_right d-flex ">
                                <img src={appointment.user.image}/>
                                <div className="cell_title">
                                    Mr. {appointment.user.username} <br/>
                                    <p> {appointment.edited_start_time} </p>
                                </div>

                            </div>
                            <div className="cell_left" >
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
                        </div>
        ))
        setLatestAppointments(latest_appointments)
        }   


    }, [appointments_info])

    return (
        <div className="default_dash ">
            <Toast show={showToast.show} message={showToast.message} onClose={() => setShowToast(false)} />
            
            <div className="default_dash_content">
                <div className="default_dash_content_top">
                    <div className="row align-items-center justify-content-between">
                        <div className="dash_card d-flex align-items-center ">
                            {
                                page_type.type == 1 ?
                                <>
                                    {/* هذه الصورة غير موجودة */}
                                    <img src="../../images/Dashboard/earnings_icon.png"/>
                                    <div className="dash_card_title">
                                    {Earnings}<br/>
                                    <p>Earnings</p>
                                    </div> 
                                </>
                                :   
                                
                                <>
                                    <img src="../../images/Dashboard/doctor_icon.png"/>
                                    <div className="dash_card_title">
                                    {all_doctors_info.length}<br/>
                                    <p>Doctors</p>
                                    </div>
                                </>
                            
                            }
                        
                        </div>

                        <div className="dash_card d-flex align-items-center ">
                        <img src="../../images/Dashboard/appointments_icon.png"/>
                        <div className="dash_card_title">
                        {appointments_info.length}<br/>
                            <p>Appointments</p>
                        </div>
                        </div>
                        <div className=" dash_card d-flex align-items-center ">
                        <img src="../../images/Dashboard/patients_icon.png"/>
                        <div className="dash_card_title">
                            { pateints_number} <br/>
                            <p>patients</p>
                        </div>
                        </div>

                    </div>
                </div>
                <div className="default_dash_content_bottom">
                    <div className="default_table_header">
                    <i class="fa-regular fa-rectangle-list"></i>
                    <span>Latest Appointment</span>
                    </div>
                    <hr/>
                    <div className="default_table_body">
                        {latest_appointments}
                    </div>
                </div>
            </div>
        </div>
    );
}