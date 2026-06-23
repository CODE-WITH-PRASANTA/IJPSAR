import React, { useState } from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaArrowRight,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";


const notifications = [
  {
    id: 1,
    text: (
      <>
        Hey <b>Emery McKenzie</b>, get ready: Your order from{" "}
        <b>@Shopper.com</b>
      </>
    ),
    time: "sep 23",
  },
  {
    id: 2,
    text: (
      <>
        <b>Simon Young</b> shared a file called <b>Dropdown.pdf</b>
      </>
    ),
    time: "30 min",
  },
  {
    id: 3,
    text: (
      <>
        <b>Becky G. Hayes</b> has added a comment to{" "}
        <b>Final_Report.pdf</b>
      </>
    ),
    time: "45 min",
  },
  {
    id: 4,
    text: (
      <>
        <b>@Romaine</b> invited you to a meeting
        <br />
        <span className="join">Join</span>{" "}
        <span className="decline">Decline</span>
      </>
    ),
    time: "1 hour ago",
  },
];


const Topbar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  setMobileSidebar,
}) => {

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifyData, setNotifyData] = useState(notifications);


  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("editorToken");
    localStorage.removeItem("editorData");

    navigate("/editor-login", {
      replace:true,
    });

    window.location.reload();
  };


  const deleteNotification = (id)=>{
    setNotifyData(
      notifyData.filter((item)=>item.id !== id)
    );
  }


return (

<header className="topbar">


<div className="topbarLeft">

<button
className="topbarMenuBtn desktopBtn"
onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}
>
{sidebarCollapsed ? <FaArrowRight/> : <FaBars/>}
</button>


<button
className="topbarMenuBtn mobileBtn"
onClick={()=>setMobileSidebar(true)}
>
<FaBars/>
</button>



<div className="topbarSearch">

<FaSearch/>

<input 
type="text"
placeholder="Search..."
/>

</div>


</div>



<div className="topbarRight">


<div 
className="topbarNotification"
onClick={(e)=>{
 e.stopPropagation();
 setNotificationOpen(!notificationOpen)
}}
>


<FaBell/>

<span className="notificationBadge">
3
</span>



{
notificationOpen && (

<div className="notificationBox">


<div className="notificationHeader">

<h2>Notification</h2>

<button
onClick={()=>setNotificationOpen(false)}
>
×
</button>

</div>



{
notifyData.map((item)=>(

<div className="notificationItem" key={item.id}>


<div className="notificationText">

{item.text}

</div>


<div className="notificationBottom">

<span>
{item.time}
</span>


<button
onClick={()=>deleteNotification(item.id)}
>
<FaTrash/>
</button>


</div>



</div>


))

}



</div>

)

}



</div>





<div
className="topbarProfile"
onClick={()=>setProfileOpen(!profileOpen)}
>


<img 
src="https://i.pravatar.cc/150"
alt="profile"
/>


<div className="profileInfo">

<h4>Ann Adame</h4>

<p>Admin</p>

</div>



{
profileOpen &&

<div className="profileDropdown">

<button>
<FaUserCircle/>
Profile
</button>


<button>
<FaCog/>
Settings
</button>


<button onClick={handleLogout}>
<FaSignOutAlt/>
Logout
</button>


</div>

}



</div>


</div>


</header>

)

}


export default Topbar;