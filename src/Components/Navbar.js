import React, { Fragment } from "react";
import '../App.css';
import { FaRegPlusSquare, FaInfoCircle, FaList, FaSignInAlt, FaUserPlus, FaSignOutAlt} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import logo from "../Logo.png";


export default function Navbar() {

  const navLinkStyles = ({ isActive}) => {
    return{
      color: isActive ? 'rgb(255, 196, 0)' : 'white',
      
    }
  }
  

  const handleLogout = () => {
    localStorage.isLoggedIn = false;
    window.location = "/";
  }
  
  return (
    <div className="Navbar">
        <div className="Logo">
        <NavLink to="/"><img alt="logo" src={logo} /></NavLink>
        </div>
        <div className="Links">
        {localStorage.isLoggedIn && localStorage.isLoggedIn === 'true' ? (
          <Fragment>
            <NavLink to="/" className="firstCentralLink" style={navLinkStyles}>Add Company&nbsp;<FaRegPlusSquare/></NavLink>
            <NavLink to="/listAllCompanies" style={navLinkStyles}>List All Companies&nbsp;&nbsp;<FaList/></NavLink>
            <NavLink to="/companyDetails" style={navLinkStyles}>Company Details&nbsp;&nbsp;<FaInfoCircle/></NavLink>
            <div onClick={handleLogout} className="logoutButton firstRightLink">Logout&nbsp;&nbsp;<FaSignOutAlt/></div>
          </Fragment>
        ) : (
          <Fragment>
            {<NavLink to="/" className="firstRightLink" style={navLinkStyles}>Login&nbsp;<FaSignInAlt/></NavLink> }
            {<NavLink to="/signup" style={navLinkStyles}>Sign Up&nbsp;<FaUserPlus/></NavLink> }
          </Fragment>
        )}
        </div>
      
      </div>
   
  );
}