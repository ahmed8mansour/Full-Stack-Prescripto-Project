import React from "react";

export default function Toast({ show , message  , onClose}) {
    if(!show) return null
    React.useEffect(() => {
        if (show) {
            const toastEl = document.getElementById('liveToast');
            const toast = new window.bootstrap.Toast(toastEl);
            toast.show();
            
            // إخفاء التوست تلقائياً بعد 5 ثواني
            const timer = setTimeout(() => {
            onClose();
        }, 5000);
        
        return () => clearTimeout(timer);
        }
    }, [show]);

    console.log(window.bootstrap)
    
    return(
        <div style={{ zIndex: 9999 }} className="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast"  role="alert" className="toast" >
                    <div className="toast-header">
                        <i class="fa-solid fa-circle-check" style={{ color: "green", marginRight: "10px" , fontSize: "20px"}}></i>
                        <strong className="me-auto">notification</strong>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="toast-body">
                    {message}
                    </div>
            </div>
        </div>

    )
}