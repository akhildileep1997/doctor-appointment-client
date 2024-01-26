import React from 'react'
import "../Styles/Layout.css";
import { adminSidebarMenu, userSidebarMenu } from "./SideBarData/Data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd'
import Footer from '../components/Footer'

function Layout({ children }) {


  const navigate = useNavigate()
  
  const { user } = useSelector(state => state.userReducer)


  //for logging out
 const handleLogout = () =>{
   localStorage.clear()
   navigate('/login')
   message.success('Logged out successfully')
  }

  //for side bar menu if admin approved as doctor doctor
  const doctorSideBarMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointment",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

    const sideBarMenu = user?.isAdmin
      ? adminSidebarMenu
      : user?.isDoctor
      ? doctorSideBarMenu
      : userSidebarMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h4>
                <i className="fa-solid fa-user-doctor"></i> <br />
                Med-Care
              </h4>
              <hr />
            </div>
            <div className="menu">
              {sideBarMenu.map((menu) => (
                <>
                  <div key={menu.id} className="menu-item">
                    <i className={menu.icon}></i>
                    <Link className="link" to={menu.path}>
                      {menu.name}
                    </Link>
                  </div>
                </>
              ))}
              <div className="menu-item" onClick={() => handleLogout()}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link className="link" to={"/login"}>
                  Log-Out
                </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  onClick={() => {
                    navigate("/notification");
                  }}
                  count={user && user.notification.length}
                >
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-regular fa-bell "
                  />
                </Badge>
                <Link className="ms-4 link">{user?.name}</Link>
              </div>
            </div>
            <div className="body ">{children}</div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout
