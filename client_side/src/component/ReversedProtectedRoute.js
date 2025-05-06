import React from 'react'
import { Navigate , useLocation} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'

export default function ReversedProtectedRoute({children}){
        const { pathname } = useLocation();
        const { userInfo, loading } = useSelector((state) => state.auth)
        const dispatch = useDispatch()

        if (pathname.startsWith("/dashboard_doctor_login")){
            return (
                <>          
                { window.localStorage.getItem("doctorToken") ? 
                    "انت مسجل دخول يا وحش " : children
                }
                </>
            )
        }else if(pathname.startsWith("/dashboard_admin_login")){
            return (
                <>          
                { window.localStorage.getItem("adminToken") ? 
                    "انت مسجل دخول يا وحش " : children
                }
                </>
            )
        }
        else if ( userInfo && Object.keys(userInfo).length > 0) {
            return ("انت مسجل دخول يعميي")
        }else{
            return children
        }

//     return(
//         <>

// {Object.keys(userInfo).length > 0 ? 
//     "انت مسجل دخول يا محترم بزبطش تدخل هان " : children
// }
// </>

//     )



}