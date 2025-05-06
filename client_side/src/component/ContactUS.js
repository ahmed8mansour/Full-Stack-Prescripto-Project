import React from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import ComponentHeader from "./ComponentHeader";

export default function ContactUS(){
    return(
        <div className="contactuS_page my_section">
            <div className="container">
                <NavBar/>


                <div className="contactus_content">
                    <ComponentHeader title={
                        <>
                        Contact <span>US</span>
                        </>} h2_available= {false} />

                        
                        <div className="contactus_content row">
                <div className=" col-12 col-md-6  contactus_content_left">
                    <img src={"/images/ContactUs/contact_image (1).png"} alt="about us" className="aboutus_img" />
                </div>
                <div className=" col-12 col-md-6  contactus_content_right">
                    
                    <h4> Our OFFICE </h4>
                    <p> 54709 Willms Station <br/>
                    Suite 350, Washington, USA</p>
                    <br/>
                    <br/>
                    <p> Tel: (415) 555‑0132 <br/>
                    Email: greatstackdev@gmail.com</p>
                    <br/>
                    <h2> Careers at PRESCRIPTO </h2>
                    <p> Learn more about our teams and job openings.</p>
                    <br/>
                    <button className="btn explore_btn">Expolore Jobs</button>

                </div>
                
            </div>

                        



                </div>



                <Footer/>
            </div>
        </div>
    )
}