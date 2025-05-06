import React from "react";

// component
import NavBar from "./NavBar";
import Footer from "./Footer";
import ComponentHeader from "./ComponentHeader";
export default function AboutUs(){

            
            const [windowDimensions, setWindowDimensions] = React.useState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        
            React.useEffect(() => {
                const handleResize = () => {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
                };
                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
            }, []);
        



    return (
        <div className="AboutUs_page my_section">
            <div className="container ">
        <NavBar/>
        <div className="aboutus_content " >
            <ComponentHeader title={
                <>
                About <span>US</span>
                </>} h2_available= {false} />
            <div className="aboutus_content_top row">
                <div className=" col-12 col-md-6 col-lg-4 aboutus_content_top_left">
                    <img src={"/images/AboutUs/about_image.png"} alt="about us" className="aboutus_img" />
                </div>
                <div className=" col-12 col-md-6 col-lg-8  aboutus_content_top_right">



                <p>
                Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges
                individuals face when it comes to scheduling doctor appointments and managing their health records.
                {windowDimensions.width > 992 &&
                <>
                    <br/>
                    <br/> 
                </>
                }
                    <br/> 
                


{/* <br/>
<br/>  */}
Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way. <br/>
<br/>

<span> Our Vision
</span>
<br/>
{/* <br/>  */}


                {windowDimensions.width > 992 &&
                <>
                    <br/> 
                </>
                }
Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                </p>




                </div>
            </div>
            
            <div className="aboutus_content_bottom row">
                <h1 className="aboutus_content_bottom_title ">  why <span> choose us  </span> </h1>
                <div className="layouts row ">
                    <div className="col-md-4 col-12  layout_element ">
                        <h4> Efficiency:</h4>
                        <p className="pretitle"> Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                    </div>
                    <div className="col-md-4 col-12 layout_element ">
                        <h4> Convenience:</h4>
                        <p className="pretitle"> Access to a network of trusted healthcare professionals in your area.</p>
                    </div>
                    <div className="col-md-4 col-12 layout_element ">
                        <h4> Personalization:</h4>
                        <p className="pretitle"> Tailored recommendations and reminders to help you stay on top of your health. </p>
                    </div>
                </div>
            </div>

        </div>


        <Footer/>
                </div>

        </div>
        
    )
}