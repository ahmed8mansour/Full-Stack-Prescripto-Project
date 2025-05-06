import React from "react";

export default function Panel(){
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
        <div className="panel_section my_section">
            <div className="container panel_content">
                <div className="row">
                    <div className="col-12 col-md-7 panel_left">
                    <h1>Book Appointment <br/>
                    With 100+ Trusted Doctors</h1>
                    <a className="btn white_btn panel_left_btn " href={window.localStorage.getItem("userToken") ? "/doctors" : "/create_account"} >
                            {window.localStorage.getItem("userToken") ? " Book Appointment " : "Login to Book Appointment"}
                        </a>
                    </div>
                    { windowDimensions.width >= 768 &&
                    <div className="col-5 panel_right">
                        <img src="/images/panel/appointment-doc-img.png" alt="Royal Care Hospital" className="img-fluid" />
                    </div>

                    }

                </div>
            </div>

        </div>
    )
}