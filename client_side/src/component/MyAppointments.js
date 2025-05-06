import React from "react";

// components 
import NavBar from "./NavBar";
import Footer from "./Footer";
import ComponentHeader from "./ComponentHeader";
import Data from "./Data";
import Toast from "./Toast";

// redux toolkit 
import { getUserAppointments , deleteUserAppointment} from "../store/authActions";
import { useDispatch, useSelector  } from 'react-redux'

export default function MyAppointments(){
    const dispatch = useDispatch();
    const {userInfo , appointments_info , all_doctors_info} = useSelector((state) => state.auth)
    


    const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
});

    React.useEffect(() => {
        dispatch(getUserAppointments());
        const handleResize = () => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);




    const [showToast, setShowToast] = React.useState(false);








    const appointments = Array.isArray(appointments_info) 
    ? appointments_info 
    : Object.values(appointments_info);
    
    const doctorsArray = Array.isArray(all_doctors_info) 
    ? all_doctors_info 
    : Object.values(all_doctors_info);



function deleteAppointment(start_time ,email) {
    
    const data = {
        start_time : start_time,
        doctor : email,
    }

    dispatch(deleteUserAppointment(data)).unwrap().then(() => {
        dispatch(getUserAppointments())
    }).then(() => {
        setShowToast(true);
    })
}

    

    const top_doctors = appointments.map(function(element, index, arr){

            const selected_doctor = doctorsArray.find(doc => 
                doc?.user.email?.toString() === element.doctor
            );

            const date = new Date(element.start_time)
            const time = element.start_time.split('T')[1].replace('Z', '');
            const day = date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric' , month: 'short'  , year: 'numeric' , timeZone: 'UTC' });

            return(
                <form class="card mb-3 appointment_card" key={element.id} onSubmit={(e) =>{ 
                    e.preventDefault();
                    deleteAppointment(element.start_time ,element.doctor )
                    
                    }} >
                <div class="row g-0">
                    { windowDimensions.width > 768 &&
                    <div class="col-md-4 col-lg-2">
                    <img src={selected_doctor.user.image} class="img-fluid rounded-start" alt="..."/>
                    </div>
                    }
                    <div class="col-md-8 col-lg-10 row justify-content-between">
                    <div className="col-12 col-lg-6">

                            <div class="card-body">
                            <h3 class="card-title">Dr. {selected_doctor.user.username}</h3>
                            <p class="card-text">{selected_doctor.about}</p>
                            <h6> Address:</h6>
                            <p class="card-text"><small class="text-body-secondary">{selected_doctor.adress}</small></p>
                            <h6> Date&Time: </h6>
                            <p class="card-text"><small class="text-body-secondary">{day} at {time}</small></p>                            
                            
                            </div>
                    </div>
                    <div className="col-12  col-lg-6 row align-items-end justify-content-end">
                        <div>
                    <button type="submit" className="btn white_btn appointment_pay_btn" style={{width:"100%"}} >Pay here</button>
                    <button type="submit" className="btn white_btn appointment_cancel_btn" style={{width:"100%"}} >Cancel appointment</button>
                        </div>
                    </div>
                    </div>
                </div>
                </form>
    
            )        
        })



    return(
        <div className="my_appointemnt_page my_section" style={{position:"relative"}}>
            <div className="container">
                <NavBar/>

                <Toast show={showToast} message={"Appointment deleted successfully"} onClose={() => setShowToast(false)} />
                
                <div className="my_appointment_content">
                <p className="appointment_title">My appointments</p>
                <div className="row">
                {top_doctors}
                </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}