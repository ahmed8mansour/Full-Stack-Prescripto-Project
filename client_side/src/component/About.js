import React from "react";

// components
import ComponentHeader from "./ComponentHeader";
import Data from "./Data";
export default function About(){


    const about_top = Data[0].map(function(element, index, arr){
        return(

        <div className="simple_card col-6 col-sm-4 col-lg-2  row align-items-center justify-content-center"  key={index}>
                <img className="img" src={element.src}/>
                <p>{element.title}</p>
                </div>
        )
        
    })


    return (
        <div id="about">
            <ComponentHeader
            title="Find by Speciality"
            pretitle={
                <>
                Simply browse through our extensive list of trusted doctors, schedule <br/> your appointment hassle-free.</>}

h2_available= {true} 
            />

            <div className="container about">
                <div className="about_cards row justify-content-between aign-items-center">
                        {about_top}

                </div>
            </div>
        </div>
    )
}