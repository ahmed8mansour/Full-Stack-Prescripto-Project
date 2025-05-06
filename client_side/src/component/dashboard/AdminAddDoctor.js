import React , {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { AdminRegisterDoctor} from "../../store/authActions";
import { useDispatch, useSelector  } from 'react-redux'
import Toast from "../Toast";

export default function AdminAddDoctor() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const usernameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const feesRef = useRef();
    const experiencesRef = useRef();
    const specialtyRef = useRef();
    const degreeRef = useRef();
    const passwordRef = useRef();
    const aboutRef = useRef();

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
    
        const [showToast, setShowToast] = React.useState({
                        show: false,
                        message: "",
                    }
                );


        const [selectedFile, setSelectedFile] = React.useState(null);   // الصورة نفسها
        const [previewUrl, setPreviewUrl] = React.useState(null);       // رابط العرض المؤقت
        const inputimageRef = React.useRef(null);
    
    const handleImageClick = () => {
        inputimageRef.current.click(); // لما تضغط عالصورة شغل الانبت الخفي
    
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        if (file) {
            const preview = URL.createObjectURL(file); // انشاء رابط مؤقت
            setPreviewUrl(preview);
        }
    };
    function handleAdd(e){
        e.preventDefault();
        console.log(specialtyRef.current.value)
        console.log(experiencesRef.current.value)
        console.log(degreeRef.current.value)
        const formData = new FormData(); 
        if (selectedFile) {
            formData.append("image", selectedFile);
        }
        formData.append("username", usernameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("address", addressRef.current.value);
        formData.append("fees", feesRef.current.value);
        formData.append("experiences", experiencesRef.current.value);
        formData.append("specialty", specialtyRef.current.value);
        formData.append("degree", degreeRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append("about", aboutRef.current.value);
        
        dispatch(AdminRegisterDoctor(formData)).unwrap().then(() => {
            setShowToast({
                show:true,
                message:"a new doctor has added successfully"
            });
            usernameRef.current.value = "";
            emailRef.current.value = "";
            addressRef.current.value = "";
            feesRef.current.value = "";
            experiencesRef.current.value = "";
            specialtyRef.current.value = "";
            degreeRef.current.value = "";
            passwordRef.current.value = "";
            aboutRef.current.value = "";
            setPreviewUrl(null);
            
            console.log("تم التسجيل الدكتور")

        })
    }
    return (
        <div className="admin_add_doctor">
            <div className="add_doctor">
                <Toast show={showToast.show} message={showToast.message} onClose={() => setShowToast(false)} />
                
                <h4> Add Doctor</h4>
                <div className="add_doctor_form_container">
                <form class="row g-3" onSubmit={handleAdd}>
                    <div className="col-12 upload_area">
                            <img src={ previewUrl ? previewUrl : "../../images/upload_area2.png"} className="doctor_image" onClick={handleImageClick} style={{cursor: "pointer" , marginLeft: "10px"}}  />
                            {
                                windowDimensions.width <= 450 && 
                            <>
                                <br/>
                                <br/>
                            </>
                            }
                            <span className="upload_text" >Upload doctor picture</span>
                            <input
                                type="file"
                                ref={inputimageRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                required
                            />
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputName" class="form-label">Doctor Name</label>
                        <input  type="text"  ref={usernameRef} class="form-control" id="inputName" placeholder="Doctor Name" required/>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputSpeciality" class="form-label">Speciality</label>
                        <select id="inputSpeciality" ref={specialtyRef} class="form-select" required>
                            <option selected>Choose...</option>
                            <option value="1">General physician</option>
                            <option value="2">Gynecologist</option>
                            <option value="3">Dermatologist</option>
                            <option value="4">Pediatricians</option>
                            <option value="5">Neurologist</option>
                            <option value="6">Gastroenterologist</option>
                        </select>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" ref={emailRef} class="form-control" id="inputEmail4" required/>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputDegree" class="form-label">Degree</label>
                        <input type="text" ref={degreeRef} class="form-control" id="inputDegree" placeholder="Degree" required/>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputPassword4" class="form-label">Doctor Password</label>
                        <input type="password" ref={passwordRef} class="form-control" id="inputPassword4" required/>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" ref={addressRef} class="form-control" id="inputAddress" placeholder="1234 Main St" required/>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputExperience" class="form-label">Experience</label>
                        <select id="inputExperience" ref={experiencesRef} class="form-select" required>
                            <option selected>Choose...</option>
                            <option value={1}>1 year</option>
                            <option value={2}>2 years</option>
                            <option value={3}>3 years</option>
                            <option value={4}>4 years</option>
                            <option value={5}>5 years</option>
                            <option value={6}>6 years</option>
                            <option value={0}>More than 6 years</option>
                        </select>
                    </div>
                    <div class="col-lg-6  col-12">
                        <label for="inputAddress2" class="form-label">Fees</label>
                        <input type="text" ref={feesRef} class="form-control" id="inputAddress2" placeholder="Your Fees" required/>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress2" class="form-label">About me</label>
                        <textarea type="text" ref={aboutRef} class="form-control" id="inputAddress2" placeholder="write about yourself" required/>
                    </div>

                    <div class="col-12">
                    <button type="submit" class="btn blue_btn">Add Doctor</button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    )
}