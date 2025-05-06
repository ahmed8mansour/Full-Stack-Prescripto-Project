import React from "react";

import { useLocation, useNavigate , Link} from "react-router-dom";

import { doctorLogin , adminLogin } from "../../store/authActions";
import { useDispatch, useSelector  } from 'react-redux'

export default function DashboardSinging(){
    const { pathname } = useLocation();

        React.useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, [pathname]);
    
        
        const [page_type , setPageType] = React.useState({
            type : pathname === "/dashboard_doctor_login" ? 1 : 2
        });
        
        React.useEffect(() => {
            setPageType({ type: pathname === "/dashboard_doctor_login" ? 1 : 2 });
        }, [pathname]);

    const inputRef2 = React.useRef();
    const inputRef3 = React.useRef();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [existAlert , SetexistAlert] = React.useState({
        show:false,
        message:""
    })
    const {doctor_loading , doctor_error , admin_loading , admin_error , doctor_success} = useSelector((state) => state.auth)
async function handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
        email: inputRef2.current.value,
        password: inputRef3.current.value,
    };

    if (page_type.type === 1) {
      // حالة تسحيل الدكتور
    try {
        await dispatch(doctorLogin(requestBody)).unwrap().then(() => {
            console.log("تم التسجيل بنجاح");
            navigate('/doctor_dashboard');
        })
    } catch (err) {
        console.error("فشل في التسجيل:", err);
        SetexistAlert({
            show: true,
            message: err
        })
    }
    } 
    // حالة تسجيل الادمن هنا 
    else if (page_type.type === 2) {
      // حالة تسجيل الدخول
    try {
        console.log("يعم هادي فانكشن اللوجن")
        await dispatch(adminLogin({
            email: requestBody.email,
            password: requestBody.password
        }
        )).unwrap().then(() => {
            console.log("تم التسجيل بنجاح");
            navigate('/admin_dashboard');
        })
    } catch (err) {
        console.error("فشل في التسجيل:", err);
        SetexistAlert({
            show: true,
            message: err
        })
    }
    }
}



    return(
        <div className="dasboard_login ">
            { existAlert.show &&
                <div className="alert alert-danger" role="alert">
                    { existAlert.message}
                </div>
            }

{
                    doctor_loading || admin_loading ? 
                    <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div> : 
        <form className="singing_page_card row needs-validation" onSubmit={handleSubmit}  >
        
                            <h5 className="dashboard_login_title text-center"> <span> {page_type.type === 2 ? `Admin` : `Doctor`} </span> Login </h5>
                    
                            <div class="form-floating">
                                <input type="email" class="form-control" required ref={inputRef2} autocomplete="on" id="floatingInput2" placeholder="name@example.com"/>
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control" required ref={inputRef3} autocomplete="on" id="floatingPassword3" placeholder="Password"/>
                                <label for="floatingPassword">Password</label>
                            </div>
        
                            <button class="btn approved_link dashboard_login_btn blue_btn" type="submit">Login</button>
                        
                            {page_type.type === 1 ?
                            <p className="mt-3 have_account">Admin Login? <Link to="/dashboard_admin_login">Click Here</Link></p> :
                            <p className="mt-3 have_account">Doctor Login? <Link to="/dashboard_doctor_login">Click Here</Link></p> 
                            }
        
        
                        
                        
                        
                        </form>

}
        </div>
        
    )
}