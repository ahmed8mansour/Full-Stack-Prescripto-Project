import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
export default function AadminDoctorList(){
    const dispatch = useDispatch();
    const {userInfo , loading , all_doctors_info} = useSelector((state) => state.auth)
    
    const top_doctors = Object.entries(all_doctors_info).map(function(element, index, arr){

    const specialties = {
        1: "General physician",
        2: "Gynecologist",
        3: "Dermatologist",
        4: "Pediatricians",
        5: "Neurologist",
        6: "Gastroenterologist"
    };
    
    var speciallity = specialties[element[1].specialty] || "Unknown specialty";
        console.log(element[1].id)
            return(

    
            <div className=" card col-12 col-sm-5 col-lg-3 col-xxl-2" >
                <img src={element[1].user.image} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h3 class="card-title">Dr. {element[1].user.username}</h3>
                    <p class="card-text">{speciallity}</p>
                </div>
            </div> 

        
            )        
        })

    return(
        <div className='doctor_list'>
            <h4>All Doctors</h4>
            <div className='doctor_list_content'>
                <div className='cards d-flex align-items-stretch justify-content-start ' style={{flexWrap:"wrap"}}>
                                {top_doctors}
                </div>
            </div>
        </div>
    )

}

