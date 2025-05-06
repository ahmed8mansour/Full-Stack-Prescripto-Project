import React from "react";
import { useEffect , useRef } from "react";
// router_dom and use form
import { Link , useParams , useLocation , useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// components
import NavBar from "./NavBar";

// ====================================
// redux toolkit 
import { registerUser, userLogin } from "../store/authActions";
import { useDispatch, useSelector  } from 'react-redux'


export default function SingingPage(){
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    
    const [page_type , setPageType] = React.useState({
        type : pathname === "/sign_in" ? 1 : 2
    });
    
    useEffect(() => {
        setPageType({ type: pathname === "/sign_in" ? 1 : 2 });
    }, [pathname]); 

// ============================================
// ============================================
// ============================================
// ============== redux =======================





    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();

    const {success , userInfo , error , loading } = useSelector((state) => state.auth)
    const [existAlert , SetexistAlert] = React.useState({
        show: false,
        message:""
    })
async function handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
        username: inputRef1.current?.value || "",
        email: inputRef2.current.value,
        password: inputRef3.current.value,
        phone: "jsdicsdcs",
        gender: "M",
        address: "gaza road",
        birthday: "2000-1-1",

    };
    if (page_type.type === 2) {
      // حالة التسجيل
    try {
        await dispatch(registerUser(requestBody)).unwrap()
        console.log("تم التسجيل بنجاح");
        navigate('/my_profile');
    } catch (err) {
        console.error("فشل في التسجيل:", err);
        SetexistAlert({
            show: true,
            message: "the email or username is already associated with an existing account. Please log in or use a different email to register."
        })

    }
    } else {
      // حالة تسجيل الدخول
    try {
        console.log("يعم هادي فانكشن اللوجن")
        await dispatch(userLogin({
            email: requestBody.email,
            password: requestBody.password
        }
        )).unwrap().then(() => {
            navigate('/');
            console.log("تم تسجيل الدخول");  
        })
    } catch (err) {

        SetexistAlert({
            show: true,
            message: err
        })
    }
    }
}



    return(
        <div className="singing_page my_section">
            <div className="container">
                <NavBar/>
                { existAlert.show &&
                <div className="alert alert-danger" role="alert">
                    {existAlert.message}
                </div>
            }


                {
                    loading ? 
                    <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>  :
                <form className="singing_page_card row needs-validation" onSubmit={handleSubmit} >

                    <h5> {page_type.type === 2 ? `Create Account` : `Login`} </h5>
                    <p>Please sign {page_type.type === 2 ? `up` : `in` } to book appointment !</p>
                    {page_type.type === 2 &&  
                    <div class="form-floating ">
                    <input type="text" class="form-control" required ref={inputRef1} autocomplete="on" id="floatingInput1" placeholder="name"/>
                    <label for="floatingInput">Full Name</label>
                    </div>
                    }
                    

                    <div class="form-floating">
                        <input type="email" class="form-control" required ref={inputRef2} autocomplete="on" id="floatingInput2" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" required ref={inputRef3} autocomplete="on" id="floatingPassword3" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <button class="btn approved_link blue_btn" type="submit">{page_type.type === 2 ? `Create Account` : `Login`}</button>
                    {page_type.type === 2 ?
                    <p className="mt-3 have_account">Already have an account? <Link to="/sign_in">login here</Link></p> :
                    <p className="mt-3 have_account">Don't have an account ? <Link to="/create_account">create one</Link></p> 
                    }


                
                
                
                </form>
                }
            </div>

        </div>
    )
} 