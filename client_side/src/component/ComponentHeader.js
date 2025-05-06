import React from "react";

export default function ComponentHeader( props){
    return(
        <div className="container com_header">
            <h1 className="com_header_title">{props.title} </h1>
            {props.h2_available && <h2 className="com_header_subtitle">{props.pretitle}</h2> }
            
        </div>
        
    )
}