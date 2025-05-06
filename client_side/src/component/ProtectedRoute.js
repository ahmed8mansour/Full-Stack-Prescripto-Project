// ProtectedRoute.js
import React from 'react'
import { Navigate , useLocation } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'

// const ProtectedRoute = ({ children }) => {
// const { userInfo} = useSelector(state => state.auth)

// console.log(userInfo && Object.keys(userInfo).length === 0)
// console.log(userInfo)


// if (userInfo && Object.keys(userInfo).length === 0) {
//     console.log(userInfo && Object.keys(userInfo).length === 0)
//     // لو ما فيش توكن، رجّعه لصفحة تسجيل الدخول
//     console.log(" فشششش توكن ")
//     return <Navigate to="/create_account" replace />
// }
// console.log("فييييي توكييييين")
// return children
// }

// export default ProtectedRoute


const ProtectedRoute = ({ children }) => {
    const { pathname } = useLocation();
    const { userInfo, loading , doctorInfo } = useSelector((state) => state.auth)
    

    if (pathname.startsWith("/doctor_dashboard") ){
        return (
            <>          
            { window.localStorage.getItem("doctorToken") ? 
                children :  "لازم تسجل دخول يا وحشش "
            }
            </>
        )
    }else if (pathname.startsWith("/admin_dashboard") ){
        return (
            <>          
            { window.localStorage.getItem("adminToken") ? 
                children :  "لازم تسجل دخول يا وحشش "
            }
            </>
        )

    }
    else{
        return(
            <>
            
            { !userInfo || Object.keys(userInfo).length === 0 ? 
                "لازم تسجل دخول يا وحشش " : children
            }
            </>
            
                )
    }


}

export default ProtectedRoute;
