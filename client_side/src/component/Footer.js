import React from "react";

export default function Footer(){
    return (
        <div className="footer_section my_section">
            <div className="footer_container container">
                <div className="row footer_content">
                    
                    <div className="col-lg-6 col-12 footer_left">
                        <a class="navbar-brand landing_name" href="/">
                            <img src={"/images/Home/logo.png"} alt="logo" width="46" height="46" class="d-inline-block align-text-top"/>
                            <span>Prescripto</span>
                        </a>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                    <div className="col-lg-3 col-6 footer_mid">
                        <h1> COMPANY</h1>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" ><a href="/">Home</a></li>
                        <li class="list-group-item"><a  href="/AboutUs" >About us</a></li>
                        <li class="list-group-item"><a  href="/ContactUs" >Contact us</a></li>
                        <li class="list-group-item"><a  href="#" >Privacy policy</a></li>
                    </ul>
                    </div>
                    <div className="col-lg-3 col-6 footer_right">
                    <h1> GET IN TOUCH</h1>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" >+1-212-456-7890</li>
                        <li class="list-group-item">greatstackdev@gmail.com</li>
                    </ul>
                    </div>

                </div>

                <br></br>
                <br></br>
                <hr/>
                <p className="copy_para">
                Copyright © 2024 GreatStack - All Right Reserved. 
                </p>
            </div>

        </div>
    )    
}