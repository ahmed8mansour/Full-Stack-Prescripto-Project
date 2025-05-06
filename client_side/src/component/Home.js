import React from "react"

// component
import NavBar from "./NavBar";
import About from "./About";
import TopDoctors from "./TopDoctors";
import Panel from "./Panel";
import Footer from "./Footer";
import { Link } from "react-router-dom";





export default function Home(){
    
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

    return(
        <>
            <section id="home" className="my_section landing_page ">
            <NavBar/>

 {/* ========================== */}
 {/* ========================== */}
 {/* ========================== */}


            <div className="container Home_content">
                <div className="row home_content_row">
                    <div className="col-lg-6 col-md-12 col-sm-12 home_content_left
                        d-flex flex-column justify-content-center align-items-start">
                        <h1 className="home_content_left_heading">Book Appointment 
                        With Trusted Doctors</h1>
                        <div className="home_content_left_para d-flex">
                            {  windowDimensions.width > 560 && 

                            <img  src={"/images/Home/group_profiles.png"} width={"130px"} height={"56px"} className="quote_img" />
                            }
                            <p className="home_content_left_para_text">Simply browse through our extensive list of trusted doctors, 
                            schedule your appointment hassle-free.</p>
                        </div>
                        <Link to="/doctors" >

                        <button className=" btn home_content_left_btn white_btn">
                            Book Appointment
                        <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                        </Link>
                        
                    </div>


                    <div className="col-lg-6 col-md-12 col-sm-12 home_content_right ">
                        <img src={"/images/Home/doc-header-img-edited.png"} className="home_content_right_img" alt="home_content_right_img" />
                    </div>


                </div>


            </div>

            
        </section>
            <About/>
            <TopDoctors/>
            <Panel/>
            <Footer/>
        </>

        
    )
}

