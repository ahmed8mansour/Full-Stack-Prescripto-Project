import React from "react";
import { Link, useNavigate , Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getUserProfile , logoutUser} from "../store/authActions";

export default function NavBar(props){
        const navigate = useNavigate()
        const dispatch = useDispatch();
        const state = useSelector((state) => state.auth)
        const {userInfo} = useSelector((state) => state.auth)
        // const [isProfile, SetisProfile] = React.useState(false)
        // React.useEffect(() => {
        //     if(state.userInfo && Object.keys(state.userInfo).length > 0){
        //         SetisProfile(true)
        //     }
        // },[state])
        function handleLogout(){
            dispatch(logoutUser())   
                console.log("تم اللوجاوت من فانكشن الكومبونانت");
                navigate("/create_account", { replace: true });
        }

    return(
        <nav class="navbar navbar-expand-lg navbar  "> 
        <div class="container">
                    
                    <a class="navbar-brand landing_name" href="/">
                            <img src={"/images/Home/logo.png"} alt="logo" width="46" height="46" class="d-inline-block align-text-top"/>
                            <span>Prescripto</span>
                            
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span class="fas fa-bars navbar_toggler"></span>
                    {/* <span class="navbar-toggler-icon"></span> */}
                    </button>
                    
                    <div class=" navbar-collapse collapse" id="navbarSupportedContent">
                
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">HOME</a>
                        </li>
                        
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/Doctors">ALL DOCTORS</a>
                        </li> 
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/AboutUs">ABOUT</a>
                        </li>   
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/ContactUS">CONTACT</a>
                        </li>
                    </ul>
                    { state.userInfo && Object.keys(state.userInfo).length > 0 ? 
                        <div class="dropdown">
                            <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"  >
                                <img src={userInfo.image} style={{backgroundColor:"gray" }} width={60} height={50} class="btn btn-secondary "/>
                                <i class="fa-solid fa-angle-down"></i>
                            </div>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/my_profile">My Profile</a></li>
                                <li><a class="dropdown-item" href="/my_appointments">My Appointments</a></li>
                                <li className="drop_log" onClick={handleLogout} ><a class="dropdown-item">Logout</a></li>
                            </ul>
                        </div>
                        :
                        <a class="btn create_acc" href="/create_account">Create account </a>
                    }
                    </div>

        </div>
    </nav>
    )
}