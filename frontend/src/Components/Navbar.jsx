import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const NavLinks = ({ isMobile, closeSidebar }) => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
    if (isMobile && closeSidebar) {
      closeSidebar();
    }
  };

  const baseLinkClass = isMobile 
    ? "flex flex-col items-start group w-full border-b-2 border-gray-200 hover:text-xl transition-all" 
    : "flex flex-col items-center group";
  
  const hrClass = "border-t-4 rounded-full w-0 border-[#42AE9A] transition-all duration-300 group-hover:w-full";

  const getLinks = () => {
    if (!isLoggedIn) {
      return [
        <NavLink key="home" to="/" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Home</p><hr className={hrClass} /></NavLink>,
        <NavLink key="auth" to="/auth" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Sign In / Sign Up</p><hr className={hrClass} /></NavLink>
      ];
    }

    let links = [
      <NavLink key="home" to="/" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Home</p><hr className={hrClass} /></NavLink>
    ];

    switch (userRole) {
      case 'patient':
        links.push(
          <NavLink key="appointments" to="/appointments" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Appointments</p><hr className={hrClass} /></NavLink>,
          <NavLink key="bills" to="/bills" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Bills</p><hr className={hrClass} /></NavLink>,
          <NavLink key="profile" to="/profile" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Profile</p><hr className={hrClass} /></NavLink>
        );
        break;
      case 'doctor':
        links.push(
          <NavLink key="appointments" to="/appointments" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Appointments</p><hr className={hrClass} /></NavLink>,
          <NavLink key="patients" to="/patients" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Patients</p><hr className={hrClass} /></NavLink>,
          <NavLink key="profile" to="/profile" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Profile</p><hr className={hrClass} /></NavLink>
        );
        break;
      case 'admin':
        links.push(
          <NavLink key="doctors" to="/admin/doctors" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Doctor Management</p><hr className={hrClass} /></NavLink>,
          <NavLink key="patients" to="/admin/patients" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Patient Management</p><hr className={hrClass} /></NavLink>,
          <NavLink key="inventory" to="/admin/inventory" className={baseLinkClass} onClick={closeSidebar}><p className="text-center">Inventory</p><hr className={hrClass} /></NavLink>
        );
        break;
      default:
        break;
    }

    links.push(<button key="logout" onClick={handleLogout} className={baseLinkClass + " text-red-500"}><p className="text-center">Logout</p></button>);
    return links;
  };

  return (
    <div className={isMobile ? "flex flex-col items-start gap-5" : "hidden sm:flex gap-6 lg:gap-8 items-center"}>
      {getLinks()}
    </div>
  );
};

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);

  useEffect(() => {
    if (sideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sideBar]);

  const closeSidebar = () => setSideBar(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`${
          sideBar
            ? "w-[90%] block transition-all duration-300 ease-in-out z-[100]"
            : "w-0 hidden transition-all duration-300 ease-in-out"
        } h-screen fixed top-0 left-0 bg-white z-10 flex flex-col gap-5 p-6`}
      >
        <button
          onClick={closeSidebar}
          className="text-2xl self-end"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <NavLinks isMobile={true} closeSidebar={closeSidebar} />
      </div>

      {/* Main Navigation */}
      <div
        className={`h-20 flex justify-between items-center px-4 sm:px-10 shadow-md fixed top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 w-full`}
      >
        <button
          className="block sm:hidden text-xl"
          onClick={() => setSideBar(true)}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Logo */}
        <NavLink to="/" className="h-full flex items-center">
          <span className="font-bold text-xl">Logo</span>
        </NavLink>

        <NavLinks isMobile={false} />
      </div>
    </>
  );
};

export default Navbar;