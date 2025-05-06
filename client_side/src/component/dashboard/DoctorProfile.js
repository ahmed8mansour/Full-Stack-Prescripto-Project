import React from "react";
import { useEffect , useRef } from "react";

import Toast from "../Toast";

import { useDispatch, useSelector } from 'react-redux';
import { updateDoctorProfile } from "../../store/authActions";

export default function DoctorProfile() {
    const dispatch = useDispatch();
    const { doctorInfo } = useSelector(state => state.auth)
    const [IsEdited , setIsEdited] = React.useState(true)

    console.log(doctorInfo)
    const specialties = {
        1: "General physician",
        2: "Gynecologist",
        3: "Dermatologist",
        4: "Pediatricians",
        5: "Neurologist",
        6: "Gastroenterologist"
    };
    
    var speciallity = specialties[doctorInfo.specialty] || "Unknown specialty";

    const aboutref = useRef(null);
    const feesRef = useRef(null);
    const addressRef = useRef(null);
    const [showToast, setShowToast] = React.useState(false);
    
    
    function handleUpdate(e){
        e.preventDefault();
        
        const formData = new FormData(); 
        formData.append("email", doctorInfo.email);
        formData.append("username", doctorInfo.username);
        formData.append("about", aboutref.current.value);
        formData.append("fees", feesRef.current.value);
        formData.append("address", addressRef.current.value);
        
        dispatch(updateDoctorProfile(formData)).unwrap().then(() => {
            console.log("how are you")
            setShowToast(true);
        })
        setIsEdited(e => !e)
    
    }
    return (
        <div className="doctor_profile">
            <Toast show={showToast} message={"Your profile has been updated successfully"} onClose={() => setShowToast(false)} />
            
            <div className="doctor_profile_content">
            <img src={doctorInfo.image} className="profile_img" />
            <div className="doctor_profile_content_up">
            <form className="doctor_profile_content_form" onSubmit={handleUpdate}>
                            
                            
                            <h1 className="doctor_profile_title">DR. {doctorInfo.username}</h1>
                            <div className="doctor_contact_info row">
                            <p className="doctor_disc"> {doctorInfo.degree} - {speciallity}  <span className="badge">{doctorInfo.experiences} years</span> </p>

                                <p className=" sub_info_title">About:</p>
                                {IsEdited ? 
                                <p className="info" >{doctorInfo.about}</p>
                                : 
                                <textarea type="email" ref={aboutref} style={{border:"none"}} defaultValue={doctorInfo.about} required/>
                                }
                                <div className="d-flex">
                                <p className=" sub_info_title">Appointment Fee:</p>
                                {IsEdited ? 
                                <p className="info info_fee" >${doctorInfo.fees}</p>
                                : 
                                <input type="number" ref={feesRef} className="number_input" defaultValue={doctorInfo.fees} required/>
                                }
                                </div>
                                <div className="d-flex">
                                <p className=" sub_info_title">Adress:</p>
                                {IsEdited ? 
                                <p className="info"  style={{border:"none" , marginLeft:"10px" , marginTop:"20px"}}>{doctorInfo.address}</p>
                                : 
                                <input ref={addressRef} style={{border:"none" , marginLeft:"10px" , marginTop:"20px"}} defaultValue={doctorInfo.address} required/>
                                }
                                </div>
                                

                            </div>
                            
                            {
                                !IsEdited &&
                            <button className="btn doctor_profile_button" type="submit">
                            Save 
                            </button>
                            }
            </form>



            { 
                        IsEdited &&
                            <button className="btn doctor_edit_btn"  type="button" onClick={() => setIsEdited(er => !er)}>
                            Edit
                            </button> 
                        }
                </div> 


            </div>
        </div>
    );
}