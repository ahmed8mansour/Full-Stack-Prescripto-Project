import React, { useRef ,useEffect } from "react";
import { useParams , useLocation , Link , useNavigate} from "react-router-dom";

// components
import NavBar from "./NavBar";
import Footer from "./Footer";
import ComponentHeader from "./ComponentHeader";
import Data from "./Data";
import Toast from "./Toast";
import { useDispatch, useSelector } from 'react-redux';
import { Appointmentregister , getDoctorAppointmentSlot } from "../store/authActions";

export default function SpecificDoctor(){
// ====================================================
// ====================================================
// ====================================================
//    1-  hooks calling 

    const navigate = useNavigate();
    const { id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const {userInfo , loading , doctor_loading , all_doctors_info , doctor_slot} = useSelector((state) => state.auth)


    const doctorsArray = Array.isArray(all_doctors_info) 
    ? all_doctors_info 
    : Object.values(all_doctors_info);
    
    // البحث عن الطبيب
    const selected_doctor = doctorsArray.find(doc => 
        doc?.id?.toString() === id
    );
    
    const selected_doctor_data = selected_doctor;
    
    console.log(doctor_slot)
// ====================================================
// =====================================================
// =====================================================
// =====================================================

//  2 - use states  and variable declartion

const [slot_day, setSlot_day] = React.useState(() => {
    const days = [];
    const days_for_request= [];
    const day = new Date();
    for (let i = 0; i < 7; i++){
        const currentDay = new Date();
        currentDay.setDate(day.getDate() + i);
        days_for_request.push(currentDay)
        days.push(currentDay.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric' }));
    }
    return {
        days,
        days_for_request
    }
});


const [slot_hour, setSlot_hour] = React.useState([]);


React.useEffect(() => {
    const hours = [];

    const convertTo12HourFormat = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hourNum = parseInt(hours, 10);
        const suffix = hourNum >= 12 ? 'PM' : 'AM';
        const hour12 = hourNum % 12 || 12; // تحويل 0 إلى 12
        return `${hour12}:${minutes} ${suffix}`;
    };
    if(!doctor_slot){
        setSlot_hour(
            [
    '12:00 AM', '1:30 AM',
    '3:00 AM', '4:30 AM',
    '6:00 AM', '7:30 AM',
    '9:00 AM', '10:30 AM',
    '12:00 PM', '1:30 PM',
    '3:00 PM', '4:30 PM',
    '6:00 PM', '7:30 PM',
    '9:00 PM', '10:30 PM'
]
        ); 
    }
    if (doctor_slot && doctor_slot.length > 0) {
        doctor_slot.forEach(slot => {
            const [startTime] = slot.split(' - '); // أخذ وقت البداية فقط
            const [time] = startTime.split('.'); // تجاهل الثواني إذا وجدت
            const time12Hour = convertTo12HourFormat(time);
            hours.push(time12Hour);
        });

        setSlot_hour(hours); // تحديث الستيت الجديد
    }

}, [doctor_slot]);




const [selectedDay, setSelectedDay] = React.useState(null);
const [selectedHour, setSelectedHour] = React.useState(null);

const [DayActive, setDayActive] = React.useState(null);
const [HoureActive, setHoureActive] = React.useState(null);


// ======= 

const [alert , setalert] = React.useState(false);
const [alertMessage , setalertMessage] = React.useState(null);

// ===========

// ====================================================
// ====================================================
// ====================================================
// ====================================================
//    3 -   UseEffects

useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
}, [pathname]);




React.useEffect(() => {
    const timer = setTimeout(() => {
        const day_buttons = document.getElementsByClassName("day_button");
        const hour_buttons = document.getElementsByClassName("hour_button");
        for(let i = 0; i < day_buttons.length; i++){
            if (day_buttons[i].classList.contains("active") == false ){
                for(let i= 0 ; i < hour_buttons.length ; i++){
                    hour_buttons[i].disabled = true;
                }
            } 
        }
    }, 100); // Delay by 100ms to ensure DOM is updated

    return () => clearTimeout(timer); // Cleanup the timer
}, []);



// ====================================================
// ====================================================
// ====================================================
// ====================================================
//    4 -   conditions

    

if (Object.keys(all_doctors_info).length === 0) {
    return <div className="loading">Loading doctor info...</div>;
}

if (!selected_doctor_data) {
    return <div className="error">Doctor not found.</div>;
}


// ====================================================
// ====================================================
// ====================================================
// ====================================================
//    5 -   data processing functions 
//   - disable  لعنصار الساعات حتى اختيار اليوم عمل  
//   - التاكد من عملية التسجيل ماشية صحيحة 
//   - عرض بيانات الدكتور المحدد 
//   - عرض الدكاترة الي الهم صلة

const handleDayClick = (e , index) => {
    setDayActive(index)
    const selectedDate = slot_day.days_for_request[index];
    setSelectedDay(selectedDate);
    // setSelectedDay(slot_day.days_for_request[index]);
    
    const hour_buttons = document.getElementsByClassName("hour_button");

    for(let i= 0 ; i < hour_buttons.length ; i++){
        hour_buttons[i].disabled = false;
    }

    //  ====== الفانكشن التانية 
    const newDate = new Date(selectedDate);
    const date = newDate.toISOString().slice(0, 10).toString();
    const requestBody = {
        doctor: selected_doctor.user.email,
        date: date,
    }
    dispatch(getDoctorAppointmentSlot(requestBody));

};


const handleHourClick = (e , hour) => {
    setHoureActive(hour)
    setSelectedHour(e.target.innerText);
};

function registerAppointment(e){
        e.preventDefault();

        const [time, modifier] = selectedHour.split(' ');
        let [hours, minutes = '00'] = time.split(':');

        if (modifier === 'PM' && hours !== '12') {
            hours = parseInt(hours, 10) + 12;
        } else if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }

        // إنشاء نسخة من التاريخ الأصلي لتجنب التعديل عليه مباشرة
        const newDate = new Date(selectedDay);

        // تعيين الوقت الجديد
        newDate.setHours(parseInt(hours, 10));
        newDate.setMinutes(parseInt(minutes, 10));
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        console.log(newDate)
        const data = {
            doctor:selected_doctor.user?.email,
            user:userInfo.email,
            start_time: newDate
        }
        dispatch(Appointmentregister(data)).unwrap().then(() => {
            navigate("/my_appointments")
        })
        .catch((error) => {
            if(!window.localStorage.getItem("userToken")){
                setalert(true)
                setalertMessage(
                    <>
                    You must <Link to="/create_account" className="alert-link">login</Link> first to make an appointment.
                    </>
                )
            }else{
                setalert(true)
                setalertMessage(
                
                <> This appointment is already booked</>
                )
            }
        })
            
    }
    
// ==========================



const specialties = {
    1: "General physician",
    2: "Gynecologist",
    3: "Dermatologist",
    4: "Pediatricians",
    5: "Neurologist",
    6: "Gastroenterologist"
};
var user_speciality = specialties[selected_doctor_data.specialty] || "Unknown specialty";

const related_doctors_group = Object.entries(all_doctors_info).filter((doc) => doc[1].specialty === selected_doctor_data.specialty);


const filtered_related_doctors_group = related_doctors_group.filter((doc) => doc[1].id !== selected_doctor_data.id);

const top_doctors = filtered_related_doctors_group.map(function(element, index, arr){

    
    const specialties = {
        1: "General physician",
        2: "Gynecologist",
        3: "Dermatologist",
        4: "Pediatricians",
        5: "Neurologist",
        6: "Gastroenterologist"
    };
    
    var speciallity = specialties[element[1].specialty] || "Unknown specialty";

    return(
        <div className="card col-10  col-sm-5 col-lg-3 col-xl-2" >
            <Link to={`/doctors/${element[1].id}`} >
            <img src={element[1].user.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <li> Available</li>
                <h3 className="card-title">{element[1].user.username}</h3>
                <p className="card-text">{speciallity}</p>
            </div>
            </Link>
        </div> 
        )        
    })



    return (
        <div className="specific_doctor_page my_section">
            
            <div className="container">
                <NavBar/>
                {
                    alert &&
                    <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {alertMessage}
                        
                    </div>
                }
                { Object.keys(all_doctors_info).length === 0 ? " loading ..." : 
                <div className="specific_doctor_content">
                <div className="doctor_top row">
                    <div className="col-12 col-md-4 col-lg-3 doctor_top_left">
                        <img src={selected_doctor_data.user.image} alt="doctor" className="doctor_img" />
                    </div>
                    <div className=" col-12 col-md-8 col-lg-9 doctor_top_right">
                        <h4>Dr. {selected_doctor_data.user.username} <i className="fas fa-check-circle"></i>
                        </h4>
                        <p className="doctor_disc"> {selected_doctor_data.degree} - {user_speciality}  <span className="badge">{selected_doctor_data.experiences} years</span> </p>
                        <h5>About <i className="fa-sharp fa-solid fa-circle-info"></i></h5>
                        <p className="doctor_about">{selected_doctor_data.about}</p>
                        <h5> Appointment fee:  <span>{selected_doctor_data.fees} $</span> </h5>
                    </div>
                </div>





                <form className="doctor_bottom row" onSubmit={registerAppointment}>
                    
                <h5 className="slots_title"> Booking slots </h5>

                <div className="slots_buttons">
                    <div className="week_slots">

                        {
                        slot_day.days.map((_, index) => {
                            return (
                                <button key={index} type="button" className={`btn day_button white_btn ${index == DayActive ? 'active' : "" }`} onClick={(e) => handleDayClick(e,index)}>
                                    {slot_day.days[index]}
                                </button>
                            );
                        })
                        }
                    </div>

                    <div className="hour_slots mt-3">

                    
                        {slot_hour.map((_, hour) => (
                            <button key={hour} type="button" className={`btn hour_button white_btn ${hour == HoureActive ? 'active' : "" }`} onClick={(e) => handleHourClick(e, hour)}>
                                {slot_hour[hour]}

                            </button>
                        ))}



                    </div>

                    <button className="btn book_slots blue_btn" type="submit"> Book Appointment</button>

                </div>




                </form>
                






                <div className="related_doctors_part">
                <ComponentHeader 
                title={
                <>
                Related Doctors
                </>} 
                pretitle={`Simply browse through our extensive list of trusted doctors.`}
                h2_available= {true} />    


<div className=' cards row justify-content-between align-items-stretch'>
            
            {
            top_doctors.length > 0 ? top_doctors : <h5 className="no_doctor"> No doctors available </h5>    
            }
                </div>

                </div>




                </div>
                }

                <Footer/>

            </div>
        </div>
    )
}
