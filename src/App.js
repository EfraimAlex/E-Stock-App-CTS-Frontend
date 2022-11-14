import "./App.css";
import React, { Fragment } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import CompanyReg from "./Components/CompanyReg";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import { Route, Routes } from "react-router-dom";
import AllCompanies from "./Components/AllCompanies";
import CompanyDetails from "./Components/CompanyDetails";
import UpdateDetails from "./Components/UpdateDetails";
import axios from "axios";

export default function App() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.token}`;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {localStorage.isLoggedIn && localStorage.isLoggedIn === "true" ? (
          <Fragment>
            <Route path="/" element={<CompanyReg />} />
            <Route path="/listAllCompanies" element={<AllCompanies />} />
            <Route path="/companyDetails" element={<CompanyDetails />} />
            <Route path="/updateDetails" element={<UpdateDetails />} />
          </Fragment>
        ) : (
          <Fragment>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Fragment>
        )}
      </Routes>
    </div>
  );
}
