import React from 'react';

// component
import ComponentHeader from "./ComponentHeader";
import Data from "./Data";
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TopDoctors() {
    const dispatch = useDispatch();
    const {userInfo , loading , all_doctors_info} = useSelector((state) => state.auth)

    // ('1' , 'General physician'),
    // ('2' , 'Gynecologist'),
    // ('3' , 'Dermatologist'),
    // ('4' , 'Pediatricians'),
    // ('5' , 'Neurologist'),
    // ('6' , 'Gastroenterologist')

    const top_doctors = Object.entries(all_doctors_info)
    .slice(0, 10) 
    .map(function(element, index, arr){
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
            <img src={element[1].user.image} class="card-img-top" alt="..."/>
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
        <div className='my_section top_doctors' id="top_doctors">
            <div className='container text-center'>

            <ComponentHeader 
            title="Top Doctors to Book"
            pretitle="Simply browse through our extensive list of trusted doctors." 
h2_available= {true} 
            
            />
            
        
        <div className=' cards row justify-content-between align-items-stretch'>
            {top_doctors}
                </div>

        <Link to={"/doctors"}> 
        <button className='btn blue_btn more_btn' type="button" id="load_more" data-bs-toggle="modal" data-bs-target="#exampleModal">
            More
        </button>
        </Link>

        


        </div>


            </div>
            
            


    )
}