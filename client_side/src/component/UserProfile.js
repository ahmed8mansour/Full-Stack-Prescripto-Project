import React, { useState } from "react";
import { useEffect , useRef } from "react";
// router_dom and use form
import { Link , useParams , useLocation , useNavigate  , Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";

// components
import NavBar from "./NavBar";
import Toast from "./Toast";
// ====================================
// redux toolkit 
import { registerUser, userLogin , updateUserProfile} from "../store/authActions";
import { useDispatch, useSelector  } from 'react-redux'


export default function UserProfile(){

// ================================= 
// ================================= 
// ================================= 
// =================================
// redux toolkit

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector((state) => state.auth)
    const {success , userInfo} = useSelector((state) => state.auth)

    const [IsEdited , SetTsEdited] = useState(true)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        birthday: ''
    });
    
      // تحديث userData عندما تتغير بيانات userInfo
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length > 0) {
            setUserData({
            name: userInfo.username,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            gender: userInfo.gender,
            birthday: userInfo.birthday,
            });
        }
    }, [userInfo]);



    // {isFetching
    //     ? `Fetching your profile...`
    //     : userInfo !== null
    //     ? `Logged in as ${userInfo.email}`
    //     : "You're not logged in"}

    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const genderRef = useRef();
    const birthdayRef = useRef();


        const [showToast, setShowToast] = React.useState(false);
    
  

// ======================================================================

    const [selectedFile, setSelectedFile] = useState(null);   // الصورة نفسها
    const [previewUrl, setPreviewUrl] = useState(null);       // رابط العرض المؤقت
    const inputRef = useRef(null);

const handleImageClick = () => {
    inputRef.current.click(); // لما تضغط عالصورة شغل الانبت الخفي

};
const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
        const preview = URL.createObjectURL(file); // انشاء رابط مؤقت
        setPreviewUrl(preview);
    }
};


function handleUpdate(e){
    e.preventDefault();
    SetTsEdited(e => !e)

    const formData = new FormData(); 
    if (selectedFile) {
        formData.append("image", selectedFile);
    }
    formData.append("username", userData.name);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("gender", genderRef.current.value);
    formData.append("birthday", birthdayRef.current.value);
    
    dispatch(updateUserProfile(formData)).unwrap().then(() => {
        console.log("how are you")
        setShowToast(true);
    })

}


    return(   
        <div className="user_profile_page my_section">
            <Toast show={showToast} message={"Your profile has been updated successfully"} onClose={() => setShowToast(false)} />
            <div className="container">
                <NavBar is_profile={true} />
                <div className="profile_content">
                    <div className="row">
                

                        <form className="profile_content_part col-12 col-md-6" onSubmit={handleUpdate}>
                            
                            <img src={
                                previewUrl ? previewUrl : userInfo.image
                            } className="profile_img" /> 
                            { !IsEdited && 
                            <>

                            <input
                                type="file"
                                ref={inputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <img src="../images/upload_area.png" onClick={handleImageClick} style={{cursor: "pointer" , marginLeft: "10px"}} className="profile_img" />
                            
                            </>
                            }
                            
                            <h1 className="profile_title">{userData.name}</h1>
                            <hr/>
                            <div className="contact_info row">
                                <p className="info_title"> CONTACT INFORMATION </p>
                                <p className="col-6 sub_info_title">Email id:</p>
                                {IsEdited ? 
                                <p className="col-6 info_blue" >{userData.email}</p>
                                : 
                                <input type="email" className="col-6" defaultValue={userData.email}  ref={emailRef} required/>
                                }
                                <p className="col-6 sub_info_title">Phone:</p>
                                {IsEdited ? 
                                <p className="col-6 info_blue" >{userData.phone}</p>
                                : 
                                <input type="text" className="col-6" defaultValue={userData.phone} ref={phoneRef}  />
                            }
                                <p className="col-6 sub_info_title">Address:</p>
                                {IsEdited ? 
                                <p className="col-6 ">{userData.address}</p>
                                :
                                <input type="text" className="col-6" defaultValue={userData.address}  ref={addressRef}/>
                                }
                            </div>
                            <div className="contact_info_basic row">
                                <p className="info_title"> BASIC INFORMATION </p>
                                <p className="col-6 sub_info_title">Gender:</p>
                                {IsEdited ? 
                                <p className="col-6 ">{userData.gender}</p>
                                :
                                <select class="form-select" aria-label="Default select example" ref={genderRef}>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    
                                </select>
                                }
                                <p className="col-6 sub_info_title">Birthday:</p>
                                {IsEdited ? 
                                <p className="col-6 ">{userData.birthday}</p>
                                :
                                <input type="date" className="col-6" defaultValue={userData.birthday} ref={birthdayRef} /> 
                                }
                            </div>
                            {
                                !IsEdited &&
                            <button className="btn profile_button" type="submit">
                            Save information
                            </button>
                            }
                        </form>


                    </div>




                    { 
                        IsEdited &&
                            <button className="btn profile_button"  type="button" onClick={() => SetTsEdited(er => !er)}>
                            Edit
                            </button> 
                        }

                        
                </div>
            </div>
        </div>
    

    )
}