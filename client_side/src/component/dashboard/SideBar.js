import React, {useState} from "react";
import { NavLink , Link , useLocation} from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';



export default function SideBar(){
    const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
});

const {pathname} = useLocation();
        const [page_type , setPageType] = React.useState({
            type : pathname.startsWith("/doctor_dashboard") ? 1 : 2
        });
        
        React.useEffect(() => {
            setPageType({ type: pathname.startsWith("/doctor_dashboard") ? 1 : 2 });
        }, [pathname]);


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
      <Sidebar rootStyles={{backgroundColor:"rgb(255 255 255)" , width:"300px"}} collapsed={windowDimensions.width < 768 ? true : false}>


  <Menu 
    menuItemStyles={{
      button: {
        [`&.active`]: {
          backgroundColor: 'rgba(242, 243, 255, 1)',
          borderRight: '6px solid var(--mainText)',
        },
      },
    }}
    rootStyles={{paddingTop:"20px" }}
    >

    <MenuItem component={ page_type.type == 1 ? <NavLink to="/doctor_dashboard" end /> : <NavLink to="/admin_dashboard" end />} 
    
    rootStyles={{ fontWeight: 400, fontSize: '20px', lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle' , color:"rgba(81, 81, 81, 1)" }} 
    icon={<img src="data:image/svg+xml,%3csvg%20width='23'%20height='23'%20viewBox='0%200%2023%2023'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.35156%2015.6992C9.24446%2016.361%2010.3304%2016.7492%2011.5016%2016.7492C12.6727%2016.7492%2013.7586%2016.361%2014.6516%2015.6992'%20stroke='%231C274C'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M22%2011.7141V13.3112C22%2017.4071%2022%2019.4551%2020.7698%2020.7275C19.5397%2022%2017.5598%2022%2013.6%2022H9.4C5.4402%2022%203.46031%2022%202.23015%2020.7275C1%2019.4551%201%2017.4071%201%2013.3112V11.7141C1%209.31126%201%208.10984%201.54516%207.11388C2.09032%206.11792%203.0863%205.49979%205.07823%204.26354L7.17823%202.96021C9.28386%201.6534%2010.3367%201%2011.5%201C12.6633%201%2013.7161%201.6534%2015.8218%202.96021L17.9218%204.26353C19.9138%205.49979%2020.9097%206.11792%2021.4548%207.11388'%20stroke='%231C274C'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e"/>}> Dashboard </MenuItem>
  
  
    <MenuItem component={ page_type.type == 1 ? <NavLink to="/doctor_dashboard/doctor-appointments"  /> : <NavLink to="/admin_dashboard/admin-appointments" end />} 
    rootStyles={{ fontWeight: 400, fontSize: '20px', lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle' , color:"rgba(81, 81, 81, 1)" }} 
    icon={<img src="data:image/svg+xml,%3csvg%20width='24'%20height='23'%20viewBox='0%200%2024%2023'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%2011.2325C1%207.17118%201%205.14055%202.26167%203.87886C3.52336%202.61719%205.55399%202.61719%209.61527%202.61719H13.9229C17.9841%202.61719%2020.0149%202.61719%2021.2765%203.87886C22.5382%205.14055%2022.5382%207.17118%2022.5382%2011.2325V13.3863C22.5382%2017.4475%2022.5382%2019.4782%2021.2765%2020.7398C20.0149%2022.0015%2017.9841%2022.0015%2013.9229%2022.0015H9.61527C5.55399%2022.0015%203.52336%2022.0015%202.26167%2020.7398C1%2019.4782%201%2017.4475%201%2013.3863V11.2325Z'%20stroke='%231C274C'%20stroke-width='2'/%3e%3cpath%20d='M6.38281%202.61536V1'%20stroke='%231C274C'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M17.1523%202.61536V1'%20stroke='%231C274C'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M1.53906%207.99805H22.0003'%20stroke='%231C274C'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M18.2319%2016.614C18.2319%2017.2088%2017.7498%2017.6909%2017.155%2017.6909C16.5603%2017.6909%2016.0781%2017.2088%2016.0781%2016.614C16.0781%2016.0192%2016.5603%2015.5371%2017.155%2015.5371C17.7498%2015.5371%2018.2319%2016.0192%2018.2319%2016.614Z'%20fill='%231C274C'/%3e%3cpath%20d='M18.2319%2012.3074C18.2319%2012.9022%2017.7498%2013.3843%2017.155%2013.3843C16.5603%2013.3843%2016.0781%2012.9022%2016.0781%2012.3074C16.0781%2011.7126%2016.5603%2011.2305%2017.155%2011.2305C17.7498%2011.2305%2018.2319%2011.7126%2018.2319%2012.3074Z'%20fill='%231C274C'/%3e%3cpath%20d='M12.8452%2016.614C12.8452%2017.2088%2012.3631%2017.6909%2011.7683%2017.6909C11.1735%2017.6909%2010.6914%2017.2088%2010.6914%2016.614C10.6914%2016.0192%2011.1735%2015.5371%2011.7683%2015.5371C12.3631%2015.5371%2012.8452%2016.0192%2012.8452%2016.614Z'%20fill='%231C274C'/%3e%3cpath%20d='M12.8452%2012.3074C12.8452%2012.9022%2012.3631%2013.3843%2011.7683%2013.3843C11.1735%2013.3843%2010.6914%2012.9022%2010.6914%2012.3074C10.6914%2011.7126%2011.1735%2011.2305%2011.7683%2011.2305C12.3631%2011.2305%2012.8452%2011.7126%2012.8452%2012.3074Z'%20fill='%231C274C'/%3e%3cpath%20d='M7.46241%2016.614C7.46241%2017.2088%206.98026%2017.6909%206.3855%2017.6909C5.79075%2017.6909%205.30859%2017.2088%205.30859%2016.614C5.30859%2016.0192%205.79075%2015.5371%206.3855%2015.5371C6.98026%2015.5371%207.46241%2016.0192%207.46241%2016.614Z'%20fill='%231C274C'/%3e%3cpath%20d='M7.46241%2012.3074C7.46241%2012.9022%206.98026%2013.3843%206.3855%2013.3843C5.79075%2013.3843%205.30859%2012.9022%205.30859%2012.3074C5.30859%2011.7126%205.79075%2011.2305%206.3855%2011.2305C6.98026%2011.2305%207.46241%2011.7126%207.46241%2012.3074Z'%20fill='%231C274C'/%3e%3c/svg%3e"/>}> Appointments </MenuItem>
    
    
    <MenuItem component={ page_type.type == 1 ? <NavLink to="/doctor_dashboard/doctor-profile"  /> : <NavLink to="/admin_dashboard/admin-addDoctor" end />} 
    rootStyles={{ fontWeight: 400, fontSize: '20px', lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle' , color:"rgba(81, 81, 81, 1)" }} 
    icon={page_type.type == 2 ?
    <i class="fa-regular fa-pen-to-square"></i> :<img src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_5946_367'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3cpath%20d='M24%200H0V24H24V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_5946_367)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9%200C5.96243%200%203.5%202.46243%203.5%205.5C3.5%208.53757%205.96243%2011%209%2011C12.0376%2011%2014.5%208.53757%2014.5%205.5C14.5%202.46243%2012.0376%200%209%200ZM5.5%205.5C5.5%203.567%207.067%202%209%202C10.933%202%2012.5%203.567%2012.5%205.5C12.5%207.433%2010.933%209%209%209C7.067%209%205.5%207.433%205.5%205.5Z'%20fill='%231C274C'/%3e%3cpath%20d='M15.5%200C14.9477%200%2014.5%200.447715%2014.5%201C14.5%201.55228%2014.9477%202%2015.5%202C17.433%202%2019%203.567%2019%205.5C19%207.433%2017.433%209%2015.5%209C14.9477%209%2014.5%209.44771%2014.5%2010C14.5%2010.5523%2014.9477%2011%2015.5%2011C18.5376%2011%2021%208.53757%2021%205.5C21%202.46243%2018.5376%200%2015.5%200Z'%20fill='%231C274C'/%3e%3cpath%20d='M19.0839%2014.0159C19.305%2013.5098%2019.8945%2013.2788%2020.4006%2013.4999C22.5176%2014.4248%2024.0002%2016.5382%2024.0002%2019.0002V21.0002C24.0002%2021.5525%2023.5525%2022.0002%2023.0002%2022.0002C22.4479%2022.0002%2022.0002%2021.5525%2022.0002%2021.0002V19.0002C22.0002%2017.3615%2021.0147%2015.9507%2019.5998%2015.3326C19.0937%2015.1115%2018.8627%2014.5219%2019.0839%2014.0159Z'%20fill='%231C274C'/%3e%3cpath%20d='M6%2013C2.68629%2013%200%2015.6863%200%2019V21C0%2021.5523%200.447715%2022%201%2022C1.55228%2022%202%2021.5523%202%2021V19C2%2016.7909%203.79086%2015%206%2015H12C14.2091%2015%2016%2016.7909%2016%2019V21C16%2021.5523%2016.4477%2022%2017%2022C17.5523%2022%2018%2021.5523%2018%2021V19C18%2015.6863%2015.3137%2013%2012%2013H6Z'%20fill='%231C274C'/%3e%3c/g%3e%3c/svg%3e"/>}> 
    {page_type.type == 1 ? 'Profile' : 'Add Doctor' }
    </MenuItem>
    

    {
      page_type.type == 2 &&
      <MenuItem component={ <NavLink to="/admin_dashboard/admin-doctorList" end />} 
      rootStyles={{ fontWeight: 400, fontSize: '20px', lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle' , color:"rgba(81, 81, 81, 1)" }} 
      icon={<i class="fa-regular fa-address-card"></i>}> Doctor List </MenuItem>
      
    }

  </Menu>


</Sidebar>
    )
}