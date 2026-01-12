import React from "react";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ComponentHeader from "./ComponentHeader";
import Data from "./Data";

import { useLocation , Link , Outlet} from "react-router-dom";


import { useDispatch, useSelector } from 'react-redux';

export default function Doctors(){

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);
    

    const list_elemnts = document.getElementsByClassName("list-group-item")

    function clicked_function(e){
        Array.from(list_elemnts).forEach(function(element) { 
            element.classList.remove("active");
        });
            e.target.classList.add("active")

        const category = e.target.textContent;  
        console.log(category)
        
            const cards = document.querySelectorAll(".cards .card");
            cards.forEach(card => {
                const cardTitle = card.querySelector(".card-text").textContent;
                if (cardTitle.includes(category) ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

        
        
    }

    
// =========================================
// =========================================

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

    
            <div className=" card col-10  col-sm-5 col-lg-4 col-xl-4" >
                <Link to={`/doctors/${element[1].id}`} >
                <img src={element[1].user.image} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <li> Available</li>
                    <h3 class="card-title">{element[1].user.username}</h3>
                    <p class="card-text">{speciallity}</p>
                </div>
                </Link>
            </div> 

        
            )        
        })


    return(
        <div className="doctors_page my_section">
            <div className="container">

                <NavBar/>

                <div className="doctors_content">
                <p className="pretitle"> Browse through the doctors specialist. </p>
                <div class="row">
                    <div class="col-12 col-md-4 col-xl-2">
                        <div id="list-example" class="list-group">
                        <a class="list-group-item list-group-item-action " onClick={clicked_function} data-id="1" >General physician</a>
                        <a class="list-group-item list-group-item-action"  onClick={clicked_function} data-id="2" >Gynecologist</a>
                        <a class="list-group-item list-group-item-action" onClick={clicked_function} data-id="3" >Dermatologist</a>
                        <a class="list-group-item list-group-item-action" onClick={clicked_function} data-id="4"  >Pediatricians</a>
                        <a class="list-group-item list-group-item-action" onClick={clicked_function} data-id="5" >Neurologist</a>
                        <a class="list-group-item list-group-item-action" onClick={clicked_function} data-id="6" >Gastroenterologist</a>
                        </div>
                    </div>
                    <div class="col-12 col-md-8 col-xl-10">
                        {top_doctors && top_doctors.length > 0 ? 
                        <div className=' cards row align-items-stretch'>
                            {top_doctors}
                        </div>

                        : 
                        
                        <div className="no-doctors-error" style={{ 
                                display: "flex", 
                                flexDirection: "column", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                minHeight: "220px", 
                                background: "#ffeaea", 
                                border: "1px solid #ff5252",
                                borderRadius: "16px", 
                                boxShadow: "0 2px 12px rgba(255, 0, 0, 0.1)", 
                                margin: "2rem auto" 
                            }}>
                                <i className="fa-solid fa-triangle-exclamation" style={{color: "#ff5252", fontSize: "2.2rem", marginBottom: "1rem"}}></i>
                                <p style={{color: "#d32f2f", fontWeight: "600", fontSize: "1.1rem"}}>Error (network): No doctors available to display at this time.</p>
                                <span style={{color: "#b71c1c", fontSize: "0.95rem"}}>Please try again later.</span>
                            </div>
                        }
                        
                    </div>
                </div>

                </div>

                <Footer/>
            
            </div>
            

        </div>
    )
}